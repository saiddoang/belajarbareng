import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getMessages } from "@/lib/i18n";
import { defaultLocale } from "@/lib/i18n/config";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const messages = getMessages(defaultLocale);

// English-only launch: lang is fixed here. When a second locale is enabled,
// move this <html> shell into app/[locale]/layout.tsx and set lang={locale}.
//
// No title.template here on purpose: a template at this level would be applied
// to the title that app/[locale]/layout.tsx sets, producing
// "Name — Role — Name". This title only serves the root not-found page.
export const metadata: Metadata = {
  title: messages.meta.title,
  description: messages.meta.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
