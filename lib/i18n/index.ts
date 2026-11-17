import { defaultLocale, type Locale } from "./config";
import { en } from "./messages/en";
import type { Messages } from "./types";

const dictionaries: Record<Locale, Messages> = {
  en,
};

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export { isLocale } from "./config";
