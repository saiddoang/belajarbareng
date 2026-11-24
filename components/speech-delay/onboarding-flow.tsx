"use client";

import Link from "next/link";
import { BaselineFlow } from "./baseline-flow";
import { ChildSetup } from "./child-setup";
import { Disclaimer, SectionTitle, buttonSecondary, cardClass } from "./ui";
import { useSpeechStore } from "@/lib/speech-delay/store";

export function OnboardingFlow() {
  const { ready, activeChild } = useSpeechStore();

  if (!ready) {
    return <p className="text-sm text-muted">Memuat data perangkat…</p>;
  }

  return (
    <div className="space-y-8">
      {activeChild ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-line bg-white p-5">
            <p className="text-sm text-muted">
              Profil aktif: <span className="font-medium text-ink">{activeChild.nickname}</span>{" "}
              · {Math.floor(activeChild.ageMonths / 12)} tahun{" "}
              {activeChild.ageMonths % 12} bulan
            </p>
            <Link href="/speech-delay" className={buttonSecondary}>
              Ke beranda
            </Link>
          </div>
          <div>
            <SectionTitle
              eyebrow="Langkah 2 dari 2 · Cek kemampuan awal"
              title="Kenali kemampuan awal anak"
              description="Dua belas pertanyaan tentang apa yang Anda amati sehari-hari. Tidak ada jawaban benar atau salah, dan hasilnya bukan diagnosis."
            />
            <div className="mt-5">
              <BaselineFlow child={activeChild} />
            </div>
          </div>
        </>
      ) : (
        <>
          <SectionTitle
            eyebrow="Langkah 1 dari 2"
            title="Buat profil singkat di perangkat ini"
            description="Cukup nama panggilan dan usia. Data disimpan di peramban perangkat ini, tidak diunggah ke server, dan bisa dihapus kapan saja."
          />
          <div className={`${cardClass} mt-5`}>
            <ChildSetup />
          </div>
          <Disclaimer />
        </>
      )}
    </div>
  );
}
