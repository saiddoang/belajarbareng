import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getMessages } from "@/lib/i18n";
import { isLocale, locales } from "@/lib/i18n/config";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const messages = getMessages(locale);
  const origin = siteUrl;
  const canonical = origin ? `${origin}/${locale}` : undefined;

  return {
    // No origin means no base: relative URLs would otherwise be resolved
    // against http://localhost:3000 and published that way.
    metadataBase: origin ? new URL(origin) : undefined,
    title: {
      default: messages.meta.title,
      template: `%s — ${messages.meta.name}`,
    },
    description: messages.meta.description,
    alternates: origin
      ? {
          canonical,
          languages: Object.fromEntries(
            locales.map((item) => [item, `${origin}/${item}`]),
          ),
        }
      : undefined,
    openGraph: {
      type: "website",
      siteName: messages.meta.name,
      title: messages.meta.title,
      description: messages.meta.description,
      locale,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: messages.meta.title,
      description: messages.meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const messages = getMessages(locale);

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader locale={locale} messages={messages} />
      <main className="flex-1">{children}</main>
      <SiteFooter messages={messages} />
    </div>
  );
}
