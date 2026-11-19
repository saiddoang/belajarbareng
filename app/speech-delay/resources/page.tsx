import type { Metadata } from "next";
import Link from "next/link";
import { sources, MEDICAL_CONTENT_REVIEWED_AT } from "@/lib/speech-delay/sources";
import { SourceList } from "@/components/speech-delay/source-list";
import {
  Breadcrumbs,
  Disclaimer,
  SectionTitle,
  buttonSecondary,
  cardClass,
} from "@/components/speech-delay/ui";

export const metadata: Metadata = {
  title: "Sumber & glosarium — Ruang Wicara",
  description:
    "Daftar sumber primer yang dipakai modul, istilah teknis dalam bahasa sederhana, dan catatan pembaruan konten.",
};

const glossary = [
  { term: "Bicara (speech)", meaning: "Cara anak menghasilkan bunyi kata." },
  { term: "Bahasa reseptif", meaning: "Kemampuan memahami kata dan instruksi." },
  { term: "Bahasa ekspresif", meaning: "Kemampuan menyampaikan maksud dengan kata atau kalimat." },
  { term: "Artikulasi", meaning: "Ketepatan bunyi tertentu, misalnya /r/ atau /s/." },
  {
    term: "Late language emergence / late talker",
    meaning:
      "Istilah untuk anak yang kosakatanya sedikit dan belum menggabungkan kata pada usia tertentu. Bukan diagnosis.",
  },
  {
    term: "Milestone",
    meaning:
      "Keterampilan yang dilakukan sebagian besar anak pada usia tertentu; panduan pemantauan, bukan ujian.",
  },
  { term: "AAC", meaning: "Alat atau cara komunikasi selain bicara: gestur, gambar, kartu, aplikasi." },
  { term: "Terapis wicara", meaning: "Profesional yang menilai dan menangani bicara dan bahasa." },
  { term: "Audiolog", meaning: "Profesional pemeriksaan pendengaran." },
  {
    term: "Dialogic reading",
    meaning:
      "Membaca bersama secara interaktif: bertanya, menunggu, dan menghubungkan cerita dengan pengalaman anak.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Sumber & glosarium" }]} />

      <SectionTitle
        eyebrow="Transparansi"
        title="Sumber, glosarium, dan batasan konten"
        description="Setiap klaim di modul ini dirujuk ke halaman primer. Kutipan disimpan apa adanya agar bisa Anda periksa sendiri."
      />

      <section className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Glosarium</h2>
        <dl className="mt-3 space-y-3 text-sm">
          {glossary.map((item) => (
            <div key={item.term}>
              <dt className="font-medium text-ink">{item.term}</dt>
              <dd className="text-muted">{item.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Pertanyaan umum</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          FAQ lengkap tersedia di artikel terakhir perpustakaan edukasi.
        </p>
        <Link
          href="/speech-delay/education/glosarium-faq"
          className={`${buttonSecondary} mt-3`}
        >
          Baca glosarium & FAQ
        </Link>
      </section>

      <section className="mt-8">
        <SourceList ids={sources.map((source) => source.id)} title="Daftar sumber primer" />
      </section>

      <section className={`${cardClass} mt-8`}>
        <h2 className="text-base font-semibold">Catatan pembaruan</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Konten diperiksa ulang terhadap sumber primer pada {MEDICAL_CONTENT_REVIEWED_AT}.
          Konten belum ditinjau oleh klinisi. Bila Anda seorang profesional dan menemukan
          ketidaksesuaian, perbaiki registri sumber di repositori agar semua halaman ikut
          diperbarui.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Tidak ada pelacakan pihak ketiga, iklan, atau unggahan data anak ke server.
          Data disimpan di peramban perangkat ini dan dapat diekspor atau dihapus.
        </p>
      </section>

      <Disclaimer className="mt-8" />
    </div>
  );
}
