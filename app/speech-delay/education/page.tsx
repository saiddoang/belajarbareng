import type { Metadata } from "next";
import Link from "next/link";
import { educationArticles } from "@/lib/speech-delay/education";
import { MEDICAL_CONTENT_REVIEWED_AT } from "@/lib/speech-delay/sources";
import {
  Badge,
  Breadcrumbs,
  Disclaimer,
  SafetyNote,
  SectionTitle,
  buttonSecondary,
} from "@/components/speech-delay/ui";

export const metadata: Metadata = {
  title: "Kenali speech delay — Ruang Wicara",
  description:
    "Sepuluh artikel Bahasa Indonesia tentang bicara, bahasa, komunikasi, dua bahasa, teknik pengasuh, AAC, mitos, dan kapan mencari bantuan profesional.",
};

export default function EducationIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Kenali" }]} />

      <SectionTitle
        eyebrow="Perpustakaan edukasi"
        title="Kenali speech delay tanpa label yang terburu-buru"
        description="Materi ini menjelaskan perbedaan bicara, bahasa, dan komunikasi, apa yang termasuk variasi, dan kapan sebaiknya memeriksakan anak. Semua klaim dirujuk ke sumber primer."
      />

      <div className="mt-4">
        <SafetyNote>
          Kekhawatiran tentang pendengaran, kehilangan kemampuan, atau pemahaman
          bukan alasan untuk menunggu. Modul ini tidak menggantikan pemeriksaan
          dokter anak, audiolog, atau terapis wicara.
        </SafetyNote>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {educationArticles.map((article, index) => (
          <li key={article.id}>
            <Link
              href={`/speech-delay/education/${article.slug}`}
              className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 transition hover:border-accent/40"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Badge>{article.readingMinutes} menit baca</Badge>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-ink">
                {article.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{article.dek}</p>
              <span className="mt-4 text-xs font-medium text-accent">
                Baca artikel →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link href="/speech-delay/programs" className={buttonSecondary}>
          Lihat program bertingkat
        </Link>
        <Link href="/speech-delay/resources" className={buttonSecondary}>
          Glosarium & sumber
        </Link>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-muted">
        Konten diperiksa ulang terhadap sumber primer pada {MEDICAL_CONTENT_REVIEWED_AT}.
        Belum ditinjau oleh klinisi.
      </p>
      <Disclaimer className="mt-2" />
    </div>
  );
}
