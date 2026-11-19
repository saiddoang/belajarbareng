import type { Metadata } from "next";
import Link from "next/link";
import { MilestoneBoard } from "@/components/speech-delay/milestone-board";
import { milestoneBands, milestoneItems } from "@/lib/speech-delay/milestones";
import { getSource, MEDICAL_CONTENT_REVIEWED_AT } from "@/lib/speech-delay/sources";
import {
  Breadcrumbs,
  Disclaimer,
  SafetyNote,
  SectionTitle,
  buttonSecondary,
} from "@/components/speech-delay/ui";

export const metadata: Metadata = {
  title: "Milestone usia — Ruang Wicara",
  description:
    "Checklist milestone komunikasi CDC untuk usia 2 tahun, 30 bulan, 3 tahun, 4 tahun, dan 5 tahun, dengan kutipan asli dan catatan pengamatan.",
};

export default function MilestonesPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Milestone" }]} />

      <SectionTitle
        eyebrow="Panduan pemantauan"
        title="Milestone resmi, terpisah dari goal pribadi Anda"
        description="Checklist di bawah dikutip dari halaman CDC. CDC menjelaskan milestone sebagai hal yang dapat dilakukan sebagian besar anak (75% atau lebih) pada usia tertentu — panduan pemantauan, bukan ujian lulus/gagal."
      />

      <div className="mt-6">
        <SafetyNote>
          Bila milestone yang diharapkan belum terlihat dan Anda merasa ada yang tidak
          sesuai, bicarakan dengan dokter anak. Jangan menunggu sampai semua item
          tercentang.
        </SafetyNote>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Status yang tersedia: Belum diamati, Belum terlihat, Mulai muncul, Konsisten.
        Tanggal dan catatan pengamatan disimpan di perangkat ini. Goal pribadi Anda
        ada di{" "}
        <Link href="/speech-delay/progress" className="text-accent underline underline-offset-4">
          halaman Perkembangan
        </Link>
        .
      </p>

      <div className="mt-8 space-y-10">
        {milestoneBands.map((band) => {
          const items = milestoneItems.filter((item) => item.ageMonths === band.ageMonths);
          const source = getSource(band.sourceId);
          return (
            <section key={band.ageMonths} id={`usia-${band.ageMonths}`}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  Usia {band.label}
                </h2>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-accent underline underline-offset-4"
                >
                  {source.publisher.split(",")[0]} — halaman asli
                </a>
              </div>
              <p className="mt-1 text-xs text-muted">
                {items.length} item bahasa/komunikasi dan sosial/emosional.
              </p>
              <div className="mt-4">
                <MilestoneBoard items={items} />
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/speech-delay/progress" className={buttonSecondary}>
          Pantau perkembangan
        </Link>
        <Link href="/speech-delay/safety" className={buttonSecondary}>
          Kapan perlu bantuan
        </Link>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-muted">
        Teks asli CDC disimpan verbatim di setiap item. Konten diperiksa ulang pada{" "}
        {MEDICAL_CONTENT_REVIEWED_AT}. Belum ditinjau oleh klinisi.
      </p>
      <Disclaimer className="mt-2" />
    </div>
  );
}
