import Link from "next/link";
import { buttonPrimary, buttonSecondary } from "@/components/speech-delay/ui";

export default function SpeechDelayNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        404 · Halaman tidak ditemukan
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        Halaman ini tidak ada.
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Alamatnya mungkin salah, atau halaman sudah dipindahkan. Anda bisa kembali ke
        beranda modul atau langsung memilih aktivitas.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/speech-delay" className={buttonPrimary}>
          Beranda Ruang Wicara
        </Link>
        <Link href="/speech-delay/exercises" className={buttonSecondary}>
          Semua aktivitas
        </Link>
      </div>
    </div>
  );
}
