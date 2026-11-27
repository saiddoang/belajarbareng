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
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-5 px-6 py-3 sm:py-4">
        <Link
          href={`/${locale}`}
          className="tap-target shrink-0 text-sm font-medium tracking-tight transition-colors hover:text-accent"
        >
          {messages.meta.name}
        </Link>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link
            href="/speech-delay"
            className="tap-target shrink-0 whitespace-nowrap rounded-full bg-accent px-3.5 py-1.5 text-xs font-medium text-paper transition-colors hover:opacity-90"
          >
            {messages.hub.nav}
          </Link>

          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:gap-x-5 sm:text-xs">
            <Link
              href={`/${locale}#work`}
              className="tap-target transition-colors hover:text-ink"
            >
              {messages.nav.work}
            </Link>
            <Link
              href={`/${locale}#about`}
              className="tap-target transition-colors hover:text-ink"
            >
              {messages.nav.about}
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="tap-target transition-colors hover:text-ink"
            >
              {messages.nav.contact}
            </Link>
            <LocaleSwitcher locale={locale} />
          </nav>
        </div>
      </div>
    </header>
  );
}
