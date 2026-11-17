import { NotFoundView } from "@/components/not-found-view";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getMessages } from "@/lib/i18n";
import { defaultLocale } from "@/lib/i18n/config";

// Catches paths outside the locale routes (for example /nope). It is outside
// app/[locale]/layout.tsx, so it rebuilds the header and footer itself.
export default function RootNotFound() {
  const messages = getMessages(defaultLocale);

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader locale={defaultLocale} messages={messages} />
      <main className="flex-1">
        <NotFoundView locale={defaultLocale} messages={messages} />
      </main>
      <SiteFooter messages={messages} />
    </div>
  );
}
