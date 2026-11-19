import type { Metadata } from "next";
import Link from "next/link";
import { getSource } from "@/lib/speech-delay/sources";
import {
  Breadcrumbs,
  Disclaimer,
  SafetyNote,
  SectionTitle,
  buttonSecondary,
  cardClass,
} from "@/components/speech-delay/ui";

export const metadata: Metadata = {
  title: "Kapan perlu bantuan profesional — Ruang Wicara",
  description:
    "Tanda yang tidak boleh ditunggu, siapa yang bisa ditemui, dan daftar persiapan sebelum konsultasi tumbuh kembang anak.",
};

const immediate = [
  "Anak kehilangan kemampuan yang sudah dimiliki, misalnya berhenti memakai kata atau gestur yang dulu sering dipakai.",
  "Ada kekhawatiran tentang pendengaran, atau anak sering tidak merespons panggilan.",
  "Anak sulit memahami instruksi sederhana yang biasa dipakai di rumah.",
  "Ada kekhawatiran tentang interaksi sosial, bermain, atau berbagi minat dengan orang lain.",
  "Anda merasa ada yang tidak sesuai dengan perkembangan anak, terlepas dari hasil cek di modul ini.",
];

const checklist = [
  "Catatan observasi: apa yang sudah bisa dilakukan anak, kapan, dan dalam situasi apa.",
  "Riwayat pendengaran: hasil skrining sebelumnya, infeksi telinga, atau kebiasaan mendengar terlalu keras.",
  "Bahasa yang dipakai di rumah dan siapa yang memakai bahasa apa.",
  "Dua atau tiga contoh ucapan anak apa adanya, bukan yang sudah diperbaiki.",
  "Milestone yang belum terlihat sesuai usia, beserta tanggal pengamatan.",
  "Pertanyaan yang paling ingin Anda ajukan, ditulis sebelum masuk ruang periksa.",
  "Laporan cetak dari modul ini bila Anda memakainya.",
];

export default function SafetyPage() {
  const sources = ["asha-lle", "aap-healthychildren", "nidcd-milestones"].map(getSource);

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Bantuan" }]} />

      <SectionTitle
        eyebrow="Panduan rujukan"
        title="Kapan perlu bantuan profesional"
        description="Modul ini dibuat untuk mendampingi, bukan menggantikan pemeriksaan. Tidak ada jumlah pekan latihan yang harus Anda lewati sebelum meminta bantuan."
      />

      <div className="mt-6">
        <SafetyNote>
          <strong>Jangan menunggu.</strong> Bila ada salah satu tanda di bawah ini,
          hubungi dokter anak atau layanan tumbuh kembang. Latihan di rumah boleh tetap
          berjalan sambil menunggu jadwal, tetapi bukan pengganti pemeriksaan.
        </SafetyNote>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Tanda yang perlu ditindaklanjuti</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
          {immediate.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true" className="text-accent">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Siapa yang bisa ditemui</h2>
        <dl className="mt-3 space-y-3 text-sm">
          <div>
            <dt className="font-medium text-ink">Dokter anak atau dokter keluarga</dt>
            <dd className="text-muted">
              Pintu masuk untuk pemeriksaan tumbuh kembang dan rujukan ke layanan lain.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-ink">Audiolog</dt>
            <dd className="text-muted">
              Pemeriksaan pendengaran. Kekhawatiran pendengaran sebaiknya diperiksa lebih
              dahulu, terlepas dari hasil latihan di rumah.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-ink">Terapis wicara (speech-language pathologist)</dt>
            <dd className="text-muted">
              Penilaian dan intervensi bicara, bahasa, serta komunikasi. Di Indonesia
              layanan tumbuh kembang tersedia di puskesmas, rumah sakit, dan klinik
              tumbuh kembang; tanyakan jalur rujukan di daerah Anda.
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Persiapan sebelum konsultasi</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/speech-delay/report" className={buttonSecondary}>
            Buka laporan cetak
          </Link>
          <Link href="/speech-delay/milestones" className={buttonSecondary}>
            Lihat checklist milestone
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Yang tidak boleh dilakukan</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
          <li>• Memaksa anak mengulang kata sampai benar, atau menghukum saat anak diam.</li>
          <li>• Memakai latihan oral-motor (meniup, memijat wajah) sebagai pengganti pemeriksaan.</li>
          <li>• Menyimpulkan diagnosis dari aplikasi, kuis, atau hitungan kata.</li>
          <li>• Menunda pemeriksaan karena ingin mencoba latihan di rumah lebih dahulu.</li>
        </ul>
      </section>

      <section className={`${cardClass} mt-8`}>
        <h2 className="text-base font-semibold">Rujukan yang dipakai halaman ini</h2>
        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted">
          {sources.map((source) => (
            <li key={source.id}>
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-ink underline underline-offset-4"
              >
                {source.title}
              </a>{" "}
              — {source.publisher}
            </li>
          ))}
        </ul>
      </section>

      <Disclaimer className="mt-8" />
    </div>
  );
}
