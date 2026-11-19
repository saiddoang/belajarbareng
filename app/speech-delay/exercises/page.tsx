import type { Metadata } from "next";
import Link from "next/link";
import { ActivityBrowser } from "@/components/speech-delay/activity-browser";
import { activities } from "@/lib/speech-delay/activities";
import {
  Breadcrumbs,
  Disclaimer,
  SectionTitle,
  SafetyNote,
  buttonSecondary,
} from "@/components/speech-delay/ui";

export const metadata: Metadata = {
  title: "Latihan — Ruang Wicara",
  description:
    "30 aktivitas bermain untuk stimulasi komunikasi di rumah, lengkap dengan langkah, contoh dialog, dan catatan pengamatan.",
};

export default function ExercisesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Latihan" }]} />

      <SectionTitle
        eyebrow={`${activities.length} aktivitas`}
        title="Pilih satu kegiatan untuk hari ini"
        description="Setiap aktivitas memandu interaksi nyata orang tua–anak selama 5–15 menit. Tidak ada skor, tidak ada rekaman suara anak, dan tidak ada kewajiban menyelesaikan semuanya."
        action={
          <Link href="/speech-delay/programs" className={buttonSecondary}>
            Lihat jalur program
          </Link>
        }
      />

      <div className="mt-6">
        <SafetyNote>
          Ikuti minat anak dan berhenti bila ia menolak. Latihan komunikasi tidak
          boleh menjadi paksaan atau ujian.
        </SafetyNote>
      </div>

      <div className="mt-8">
        <ActivityBrowser />
      </div>

      <Disclaimer className="mt-10" />
    </div>
  );
}
