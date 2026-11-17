// Add "id" here when the Indonesian version is ready, then add
// lib/i18n/messages/id.ts with the same shape as en.ts. Every route already
// lives under /[locale], so no routing changes are needed.
export const locales = ["en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
