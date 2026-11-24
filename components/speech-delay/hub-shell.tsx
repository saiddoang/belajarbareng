"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LangSync } from "./lang-sync";

const navigation = [
  { href: "/speech-delay", label: "Beranda" },
  { href: "/speech-delay/education", label: "Kenali" },
  { href: "/speech-delay/programs", label: "Program" },
  { href: "/speech-delay/exercises", label: "Latihan" },
  { href: "/speech-delay/milestones", label: "Milestone" },
  { href: "/speech-delay/progress", label: "Perkembangan" },
  { href: "/speech-delay/safety", label: "Bantuan" },
];

export function HubShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/speech-delay"
      ? pathname === "/speech-delay"
      : pathname.startsWith(href);

  return (
    <div lang="id" className="flex min-h-dvh flex-col bg-paper">
      <LangSync />

      <a
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Lompat ke konten utama
      </a>

      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <Link href="/speech-delay" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-paper">
              w
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold tracking-tight text-ink">
                Ruang Wicara
              </span>
              <span className="block text-[11px] text-muted">
                Stimulasi komunikasi di rumah
              </span>
            </span>
          </Link>

          <nav
            aria-label="Navigasi modul"
            className="hidden flex-wrap items-center gap-1 text-sm md:flex"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-full px-3 py-2 transition ${
                  isActive(item.href)
                    ? "bg-accent/10 font-medium text-accent"
                    : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/speech-delay/settings"
            className="rounded-full border border-line px-3 py-2 text-xs text-muted transition hover:border-accent hover:text-accent"
          >
            Pengaturan
          </Link>
        </div>

        <nav
          aria-label="Navigasi modul (layar kecil)"
          className="flex gap-1 overflow-x-auto border-t border-line px-4 py-2 text-sm md:hidden"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`shrink-0 rounded-full px-3 py-1.5 ${
                isActive(item.href)
                  ? "bg-accent/10 font-medium text-accent"
                  : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main id="konten-utama" className="flex-1">
        {children}
      </main>

      <footer className="mt-16 border-t border-line bg-white/60">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 text-sm text-muted sm:grid-cols-3">
          <div>
            <p className="font-medium text-ink">Ruang Wicara</p>
            <p className="mt-2 text-xs leading-relaxed">
              Modul pendamping orang tua untuk latihan stimulasi komunikasi di
              rumah. Bukan layanan diagnosis atau terapi.
            </p>
            <Link
              href="/"
              className="mt-3 inline-block text-xs underline decoration-line underline-offset-4 hover:text-ink"
            >
              ← Kembali ke situs utama
            </Link>
          </div>
          <div className="text-xs leading-relaxed">
            <p className="font-medium text-ink">Bila ada kekhawatiran</p>
            <p className="mt-2">
              Hubungi dokter anak atau terapis wicara. Jangan menunda pemeriksaan
              hanya karena ingin mencoba latihan di rumah.
            </p>
          </div>
          <div className="text-xs leading-relaxed">
            <p className="font-medium text-ink">Privasi</p>
            <p className="mt-2">
              Data anak disimpan di peramban perangkat ini, tidak diunggah ke
              server.
            </p>
            <Link
              href="/speech-delay/resources"
              className="mt-3 inline-block underline decoration-line underline-offset-4 hover:text-ink"
            >
              Sumber & glosarium
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
