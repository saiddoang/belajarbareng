import { defineConfig } from "@playwright/test";

/**
 * Smoke tests run against a production build (`npm run build`) served on :3100,
 * because `/speech-delay` does not finish its device-data load under `next dev`.
 *
 * The checks are written for a 390x844 phone viewport, the size used for the
 * accessibility work on the home -> Ruang Wicara path.
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:3100",
    viewport: { width: 390, height: 844 },
    // The site fades sections in on scroll; honouring reduced motion keeps the
    // measurements deterministic without changing what a visitor sees.
    contextOptions: { reducedMotion: "reduce" },
  },
  projects: [{ name: "phone-390x844", use: { browserName: "chromium" } }],
  webServer: {
    command: "npm run start -- --port 3100",
    url: "http://127.0.0.1:3100/en",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
