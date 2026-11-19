"use client";

import Link from "next/link";
import { useState } from "react";
import {
  baselineOptions,
  baselineQuestions,
  buildBaselineResult,
  emptyAnswers,
  levelSuggestions,
} from "@/lib/speech-delay/baseline";
import { useSpeechStore } from "@/lib/speech-delay/store";
import type {
  BaselineKey,
  BaselineResult,
  BaselineValue,
  ChildProfile,
} from "@/lib/speech-delay/types";
import { SafetyNote, buttonPrimary, buttonSecondary, cardClass } from "./ui";

export function BaselineFlow({ child }: { child: ChildProfile }) {
  const { saveBaseline } = useSpeechStore();
  const [answers, setAnswers] = useState<Record<BaselineKey, BaselineValue>>(
    emptyAnswers(),
  );
  const [result, setResult] = useState<BaselineResult | null>(null);

  const setAnswer = (key: BaselineKey, value: BaselineValue) => {
    setAnswers((previous) => ({ ...previous, [key]: value }));
  };

  const submit = () => {
    const next = buildBaselineResult(child, answers);
    saveBaseline(next);
    setResult(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (result) {
    const suggestion = levelSuggestions[result.level];

    return (
      <div className="space-y-5">
        <section className={cardClass}>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Hasil cek kemampuan awal — non-diagnostik
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            {suggestion.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{result.summary}</p>
          <p className="mt-3 rounded-2xl bg-paper px-4 py-3 text-xs leading-relaxed text-muted">
            Hasil ini bukan diagnosis dan tidak menilai kecerdasan atau potensi
            anak. Ia hanya menyarankan titik mulai latihan di rumah.
          </p>

          {result.redFlags.length > 0 ? (
            <div className="mt-4">
              <SafetyNote>
                <strong>Ada hal yang perlu dibicarakan dengan profesional.</strong>{" "}
                Anda menjawab “ya” pada pertanyaan tentang pendengaran, kehilangan
                kemampuan, pemahaman, atau interaksi sosial. Jangan menunggu hasil
                latihan di rumah — hubungi dokter anak atau terapis wicara.
              </SafetyNote>
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/speech-delay/exercises"
              className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper"
            >
              Lihat aktivitas yang disarankan
            </Link>
            <Link
              href="/speech-delay/safety"
              className="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm font-medium"
            >
              Panduan rujukan
            </Link>
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setAnswers(emptyAnswers());
              }}
              className={buttonSecondary}
            >
              Isi ulang cek
            </button>
          </div>
        </section>

        <section className={cardClass}>
          <h3 className="text-base font-semibold">Aktivitas untuk dicoba lebih dulu</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {result.suggestedActivitySlugs.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/speech-delay/exercises/${slug}`}
                  className="text-accent underline underline-offset-4"
                >
                  {slug.replaceAll("-", " ")}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Level adalah saran urutan, bukan syarat. Bila anak tampak siap, Anda
            boleh mencoba level lebih tinggi; bila belum, tetap di level ini tanpa
            rasa gagal.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className={cardClass}>
        <h2 className="text-lg font-semibold tracking-tight">
          Jawab sesuai yang Anda amati
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Tidak perlu menebak. Pilih “Tidak yakin” bila Anda belum pernah melihat
          perilaku tersebut. Jawaban tidak dinilai benar atau salah.
        </p>
      </div>

      <div className="space-y-4">
        {baselineQuestions.map((question, index) => (
          <fieldset key={question.key} className="rounded-3xl border border-line bg-white p-5">
            <legend className="px-1 text-sm font-medium text-ink">
              {index + 1}. {question.question}
            </legend>
            {question.help ? (
              <p className="mt-1 text-xs leading-relaxed text-muted">{question.help}</p>
            ) : null}
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {baselineOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-2 rounded-2xl border px-3 py-2.5 text-sm ${
                    answers[question.key] === option.value
                      ? "border-accent bg-accent/5 text-ink"
                      : "border-line text-muted"
                  }`}
                >
                  <input
                    type="radio"
                    name={question.key}
                    value={option.value}
                    checked={answers[question.key] === option.value}
                    onChange={() => setAnswer(question.key, option.value)}
                    className="accent-[#1F4D3F]"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="sticky bottom-4 flex flex-wrap items-center gap-3 rounded-3xl border border-line bg-white/95 p-4 backdrop-blur">
        <button type="button" onClick={submit} className={buttonPrimary}>
          Lihat saran latihan
        </button>
        <p className="text-xs text-muted">
          Hasil tersimpan di perangkat ini dan bisa dihapus di Pengaturan.
        </p>
      </div>
    </div>
  );
}
