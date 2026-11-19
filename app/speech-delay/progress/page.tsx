import type { Metadata } from "next";
import Link from "next/link";
import { GoalManager } from "@/components/speech-delay/goal-manager";
import { ProgressView } from "@/components/speech-delay/progress-view";
import { ReflectionForms } from "@/components/speech-delay/reflection-forms";
import {
  Breadcrumbs,
  Disclaimer,
  SectionTitle,
  buttonSecondary,
} from "@/components/speech-delay/ui";

export const metadata: Metadata = {
  title: "Perkembangan — Ruang Wicara",
  description:
    "Pantau sesi latihan, area komunikasi yang dilatih, status goal keluarga, dan refleksi berkala dari data yang Anda simpan sendiri.",
};

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Perkembangan" }]} />

      <SectionTitle
        eyebrow="Data dari perangkat ini"
        title="Pantau apa yang benar-benar tercatat"
        description="Partisipasi kegiatan dan perubahan yang Anda amati ditampilkan terpisah. Tidak ada skor klinis, persentil, atau kesimpulan otomatis."
        action={
          <Link href="/speech-delay/report" className={buttonSecondary}>
            Laporan untuk konsultasi
          </Link>
        }
      />

      <div className="mt-8">
        <ProgressView />
      </div>

      <section className="mt-12" id="goal">
        <SectionTitle
          eyebrow="Goal keluarga"
          title="Target latihan yang Anda susun sendiri"
          description="Goal menyimpan titik awal, kriteria yang bisa diamati, jumlah situasi, status, dan ide latihan berikutnya. Ini bukan milestone resmi."
        />
        <div className="mt-5">
          <GoalManager />
        </div>
      </section>

      <section className="mt-12" id="refleksi">
        <SectionTitle
          eyebrow="Tinjauan berkala"
          title="Refleksi mingguan dan tinjauan bulanan"
          description="Ritme ini adalah kebiasaan meninjau yang Anda pilih sendiri, bukan jadwal terapi yang terbukti secara klinis. Sesuaikan dengan waktu keluarga."
        />
        <div className="mt-5">
          <ReflectionForms />
        </div>
      </section>

      <Disclaimer className="mt-10" />
    </div>
  );
}
