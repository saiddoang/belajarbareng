import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/types";
import { LocaleSwitcher } from "./locale-switcher";

export function SiteHeader({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href={`/${locale}`}
          className="text-sm font-medium tracking-tight transition-colors hover:text-accent"
        >
          {messages.meta.name}
        </Link>

        <nav className="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          <Link
            href={`/${locale}#work`}
            className="transition-colors hover:text-ink"
          >
            {messages.nav.work}
          </Link>
          <Link
            href={`/${locale}#about`}
            className="transition-colors hover:text-ink"
          >
            {messages.nav.about}
          </Link>
          <Link
            href={`/${locale}#contact`}
            className="transition-colors hover:text-ink"
          >
            {messages.nav.contact}
          </Link>
          <LocaleSwitcher locale={locale} />
        </nav>
      </div>
    </header>
  );
}
