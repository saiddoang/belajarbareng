import { NotFoundView } from "@/components/not-found-view";
import { getMessages } from "@/lib/i18n";
import { defaultLocale } from "@/lib/i18n/config";

// `not-found.tsx` receives no route params, so it always renders the default
// locale. With a second locale, keep this and accept the trade-off: an unknown
// /id/... path falls back to the default language.
export default function LocaleNotFound() {
  return (
    <NotFoundView
      locale={defaultLocale}
      messages={getMessages(defaultLocale)}
    />
  );
}
