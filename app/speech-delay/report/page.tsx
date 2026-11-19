import type { Metadata } from "next";
import { ReportView } from "@/components/speech-delay/report-view";
import { Breadcrumbs, SectionTitle } from "@/components/speech-delay/ui";

export const metadata: Metadata = {
  title: "Laporan konsultasi — Ruang Wicara",
  description:
    "Ringkasan observasi yang bisa dicetak atau disimpan sebagai PDF untuk dibawa ke dokter anak, audiolog, atau terapis wicara.",
};

export default function ReportPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
      <div className="no-print">
        <Breadcrumbs items={[{ label: "Perkembangan", href: "/speech-delay/progress" }, { label: "Laporan" }]} />
        <SectionTitle
          eyebrow="Persiapan konsultasi"
          title="Laporan observasi untuk dibawa ke profesional"
          description="Berisi rentang waktu, aktivitas yang dicoba, status goal, observasi milestone, refleksi keluarga, dan pertanyaan yang bisa Anda ajukan. Bukan hasil pemeriksaan."
        />
      </div>

      <div className="mt-8">
        <ReportView />
      </div>
    </div>
  );
}
