/**
 * Absolute origin of the site, or null when it genuinely cannot be known.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — set this in Vercel to pin your custom domain.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — injected by Vercel: production domain.
 *   3. VERCEL_URL — injected by Vercel: this specific deployment.
 *
 * Returning null is deliberate: metadata then omits canonical/hreflang/openGraph
 * URLs instead of publishing `http://localhost:3000` to the world.
 */
function toOrigin(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

export const siteUrl =
  toOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
  toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  toOrigin(process.env.VERCEL_URL);

/**
 * Everything a visitor can click out to. A null entry is simply not rendered,
 * so the site never ships a dead link. Set `email` (or `linkedin`) to a real
 * value and its button reappears everywhere.
 */
export const site = {
  email: null as string | null,
  linkedin: null as string | null,
  github: "https://github.com/saiddoang",

  // Drop your CV at public/cv.pdf and set this to "/cv.pdf".
  // While it is null the download button is not rendered (no dead links).
  cvUrl: null as string | null,
};
