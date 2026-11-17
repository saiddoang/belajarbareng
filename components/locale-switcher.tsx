"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "";

  // Nothing to switch between while only one locale is enabled.
  if (locales.length < 2) return null;

  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div className="flex items-center gap-1 font-mono text-xs uppercase tracking-[0.14em]">
      {locales.map((candidate) => (
        <Link
          key={candidate}
          href={`/${candidate}${rest ? `/${rest}` : ""}`}
          aria-current={candidate === locale ? "true" : undefined}
          className={
            candidate === locale
              ? "text-ink"
              : "text-muted transition-colors hover:text-ink"
          }
        >
          {candidate}
        </Link>
      ))}
    </div>
  );
}
