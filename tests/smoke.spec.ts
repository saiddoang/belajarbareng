import { expect, test, type Page } from "@playwright/test";

/**
 * Guards for the home -> Ruang Wicara accessibility work on a 390x844 phone:
 * - every control in the home header, the home card and the sticky hub nav has
 *   an effective 44x44 CSS px touch area (measured by hit-testing the page, not
 *   by reading CSS);
 * - the Ruang Wicara card's headline and explanation are on the first screen;
 * - the secondary text links keep their 44px-tall target without their visible
 *   text growing;
 * - every text/background pair meets WCAG AA (4.5:1, or 3:1 for large text).
 */

type Target = { label: string; width: number; height: number; textHeight: number };

const MIN_TARGET = 44;

/** Opens a path and waits for the network and web fonts, so geometry is measured on final layout. */
async function open(page: Page, path: string) {
  await page.goto(path, { waitUntil: "load" });
  await page.waitForLoadState("networkidle");
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

/** Measures the area that actually activates each matched control, via hit-testing. */
function measureControls(page: Page, selector: string): Promise<Target[]> {
  return page.evaluate((targetSelector) => {
    const probe = (el: HTMLElement): { label: string; width: number; height: number; textHeight: number } => {
      const abs = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.max(0, abs - 300), left: 0, behavior: "instant" });
      const rect = el.getBoundingClientRect();
      const cx = Math.round(rect.left + rect.width / 2);
      const cy = Math.round(rect.top + rect.height / 2);
      const label =
        (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 40) || el.tagName.toLowerCase();
      const owner = (x: number, y: number) => {
        const hit = document.elementFromPoint(x, y);
        return hit ? (hit.closest("a,button") as HTMLElement | null) : null;
      };
      // The control's own centre must already belong to it, otherwise the
      // measured extent would be meaningless.
      if (owner(cx, cy) !== el) {
        return { label, width: 0, height: 0, textHeight: Math.round(rect.height) };
      }
      let up = 0;
      let down = 0;
      let left = 0;
      let right = 0;
      while (up < 60 && owner(cx, cy - up - 1) === el) up++;
      while (down < 60 && owner(cx, cy + down + 1) === el) down++;
      while (left < 90 && owner(cx - left - 1, cy) === el) left++;
      while (right < 90 && owner(cx + right + 1, cy) === el) right++;
      return {
        label,
        width: left + right + 1,
        height: up + down + 1,
        textHeight: Math.round(rect.height),
      };
    };

    return [...document.querySelectorAll<HTMLElement>(targetSelector)]
      .filter((el) => {
        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          style.visibility !== "hidden" &&
          style.display !== "none" &&
          style.opacity !== "0"
        );
      })
      .map(probe);
  }, selector);
}

async function expectTouchTargets(page: Page, selector: string) {
  const targets = await measureControls(page, selector);
  expect(targets.length, `controls matched by ${selector}`).toBeGreaterThan(0);
  for (const target of targets) {
    expect.soft(target.width, `${selector} "${target.label}" hit width`).toBeGreaterThanOrEqual(MIN_TARGET);
    expect.soft(target.height, `${selector} "${target.label}" hit height`).toBeGreaterThanOrEqual(MIN_TARGET);
  }
}

/** Compares the composited text colour with the composited background behind it. */
function contrastPairs(page: Page) {
  return page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("2d context unavailable");

    const channel = (value: number) => {
      const v = value / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    const luminance = (r: number, g: number, b: number) =>
      0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

    const paintBackground = (el: HTMLElement) => {
      const layers: string[] = [];
      let node: HTMLElement | null = el;
      while (node) {
        const background = getComputedStyle(node).backgroundColor;
        if (background && background !== "rgba(0, 0, 0, 0)" && background !== "transparent") {
          layers.push(background);
        }
        node = node.parentElement;
      }
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 1, 1);
      for (let i = layers.length - 1; i >= 0; i--) {
        ctx.fillStyle = layers[i];
        ctx.fillRect(0, 0, 1, 1);
      }
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return [r, g, b] as [number, number, number];
    };

    const pairs = new Map<
      string,
      { color: string; background: string; ratio: number; required: number; sample: string }
    >();

    for (const el of document.querySelectorAll<HTMLElement>("body *")) {
      const hasText = [...el.childNodes].some(
        (node) => node.nodeType === Node.TEXT_NODE && (node.textContent ?? "").trim().length > 0,
      );
      if (!hasText) continue;
      const style = getComputedStyle(el);
      if (style.visibility === "hidden" || style.display === "none" || style.opacity === "0") continue;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) continue;

      const [br, bg, bb] = paintBackground(el);
      ctx.fillStyle = style.color;
      ctx.fillRect(0, 0, 1, 1);
      const [tr, tg, tb] = ctx.getImageData(0, 0, 1, 1).data;

      const fontSize = parseFloat(style.fontSize);
      const large = fontSize >= 24 || (fontSize >= 18.66 && Number(style.fontWeight) >= 700);
      const required = large ? 3 : 4.5;
      const light = luminance(tr, tg, tb);
      const dark = luminance(br, bg, bb);
      const ratio = (Math.max(light, dark) + 0.05) / (Math.min(light, dark) + 0.05);
      const background = `rgb(${br}, ${bg}, ${bb})`;
      const key = `${style.color} on ${background} @ ${fontSize}px`;
      if (!pairs.has(key)) {
        pairs.set(key, {
          color: style.color,
          background,
          ratio: Number(ratio.toFixed(2)),
          required,
          sample: el.textContent!.trim().replace(/\s+/g, " ").slice(0, 40),
        });
      }
    }
    return [...pairs.values()];
  });
}

/** Contrast of one element's text against its composited background. */
function contrastOf(page: Page, selector: string) {
  return page.evaluate((targetSelector) => {
    const el = document.querySelector<HTMLElement>(targetSelector);
    if (!el) throw new Error(`missing ${targetSelector}`);
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    const layers: string[] = [];
    let node: HTMLElement | null = el;
    while (node) {
      const background = getComputedStyle(node).backgroundColor;
      if (background && background !== "rgba(0, 0, 0, 0)" && background !== "transparent") {
        layers.push(background);
      }
      node = node.parentElement;
    }
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1, 1);
    for (let i = layers.length - 1; i >= 0; i--) {
      ctx.fillStyle = layers[i];
      ctx.fillRect(0, 0, 1, 1);
    }
    const [br, bg, bb] = ctx.getImageData(0, 0, 1, 1).data;
    ctx.fillStyle = getComputedStyle(el).color;
    ctx.fillRect(0, 0, 1, 1);
    const [tr, tg, tb] = ctx.getImageData(0, 0, 1, 1).data;
    const channel = (value: number) => {
      const v = value / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    const luminance = (r: number, g: number, b: number) =>
      0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    const light = luminance(tr, tg, tb);
    const dark = luminance(br, bg, bb);
    return {
      ratio: Number(((Math.max(light, dark) + 0.05) / (Math.min(light, dark) + 0.05)).toFixed(2)),
      color: getComputedStyle(el).color,
      background: `rgb(${br}, ${bg}, ${bb})`,
      size: parseFloat(getComputedStyle(el).fontSize),
    };
  }, selector);
}

test.describe("home -> Ruang Wicara", () => {
  test("home header and card controls have a 44x44 touch area", async ({ page }) => {
    await open(page, "/en");
    await expect(page.locator("#ruang-wicara h2")).toBeVisible();
    await expectTouchTargets(page, "header a, header button");
    await expectTouchTargets(page, "#ruang-wicara a, #ruang-wicara button");
  });

  test("the Ruang Wicara card, its explanation and both CTAs are on the first screen", async ({
    page,
  }) => {
    await open(page, "/en");
    await expect(page.locator("#ruang-wicara h2")).toBeVisible();

    const card = await page.evaluate(() => {
      const section = document.querySelector("#ruang-wicara");
      if (!section) throw new Error("card missing");
      const heading = section.querySelector("h2")!.getBoundingClientRect();
      const explanation = [...section.querySelectorAll("p")].find(
        (p) => (p.textContent ?? "").trim().length > 60,
      )!.getBoundingClientRect();
      const ctas = [...section.querySelectorAll("a")].map((a) => {
        const rect = a.getBoundingClientRect();
        return {
          text: (a.textContent ?? "").trim(),
          top: Math.round(rect.top),
          bottom: Math.round(rect.bottom),
        };
      });
      return {
        viewport: window.innerHeight,
        scrollY: window.scrollY,
        overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        headingTop: Math.round(heading.top),
        explanationTop: Math.round(explanation.top),
        explanationBottom: Math.round(explanation.bottom),
        ctas,
      };
    });

    expect(card.scrollY, "measured at the top of the page").toBe(0);
    expect(card.overflowX, "no horizontal scrolling").toBe(0);
    expect(card.headingTop, "headline starts inside the viewport").toBeGreaterThanOrEqual(0);
    expect(card.explanationTop, "explanation starts inside the viewport").toBeLessThan(card.viewport);
    expect(card.explanationBottom, "explanation ends inside the first screen").toBeLessThanOrEqual(
      card.viewport,
    );
    expect(card.ctas.map((cta) => cta.text)).toEqual([
      "Open Ruang Wicara",
      "See the education library",
    ]);
    for (const cta of card.ctas) {
      expect(cta.top, `${cta.text} starts inside the viewport`).toBeGreaterThanOrEqual(0);
      expect(cta.bottom, `${cta.text} ends inside the first screen`).toBeLessThanOrEqual(
        card.viewport,
      );
    }
  });

  test("the card CTA opens the Ruang Wicara hub", async ({ page }) => {
    await open(page, "/en");
    await page.getByRole("link", { name: "Open Ruang Wicara", exact: true }).click();
    await expect(page).toHaveURL(/\/speech-delay$/);
  });

  test("the sticky hub nav chips have a 44x44 touch area", async ({ page }) => {
    await open(page, "/speech-delay");
    await expect(
      page.locator('header nav[aria-label="Navigasi modul (layar kecil)"] a').first(),
    ).toBeVisible();
    await expectTouchTargets(page, "header a, header button");
  });

  test("secondary text links keep a 44px target without growing their text", async ({ page }) => {
    const cases = [
      { path: "/en", selector: "footer a" },
      { path: "/en/work/ruang-wicara", selector: "article > a" },
      { path: "/speech-delay", selector: "footer a" },
    ];

    for (const { path, selector } of cases) {
      await open(page, path);
      const targets = await measureControls(page, selector);
      expect(targets.length, `${selector} on ${path}`).toBeGreaterThan(0);
      for (const target of targets) {
        expect
          .soft(target.height, `${path} ${selector} "${target.label}" hit height`)
          .toBeGreaterThanOrEqual(MIN_TARGET);
        // The visible text stays a small text link; only the hit area grows.
        expect
          .soft(target.textHeight, `${path} ${selector} "${target.label}" text height`)
          .toBeLessThanOrEqual(24);
      }
    }
  });

  test("every text pair on /en and /speech-delay meets WCAG AA contrast", async ({ page }) => {
    for (const path of ["/en", "/speech-delay"]) {
      await open(page, path);
      const pairs = await contrastPairs(page);
      expect(pairs.length, `text pairs found on ${path}`).toBeGreaterThan(5);
      const failing = pairs.filter((pair) => pair.ratio < pair.required);
      expect(
        failing,
        `contrast failures on ${path}: ${failing
          .map((p) => `${p.ratio}:1 < ${p.required}:1 ${p.color} on ${p.background} ("${p.sample}")`)
          .join("; ")}`,
      ).toEqual([]);
    }
  });

  test("the named home and hub text pairs clear 4.5:1", async ({ page }) => {
    const cases = [
      { path: "/en", selector: 'header nav a[href$="#work"]', name: "text-muted on paper" },
      { path: "/en", selector: "#ruang-wicara p", name: "text-paper/70 on bg-accent" },
      { path: "/en", selector: 'section a[href="/speech-delay"]', name: "text-accent on bg-accent/5" },
      {
        path: "/speech-delay",
        selector: 'header a[aria-current="page"]',
        name: "text-accent on bg-accent/10",
      },
    ];

    for (const { path, selector, name } of cases) {
      await open(page, path);
      const pair = await contrastOf(page, selector);
      expect(pair.ratio, `${name} on ${path} (${pair.color} on ${pair.background})`).toBeGreaterThanOrEqual(
        4.5,
      );
    }
  });
});
