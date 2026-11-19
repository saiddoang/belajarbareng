"use client";

import Link from "next/link";
import { useState } from "react";
import { AudioPrompt } from "./audio-prompt";
import { DemoPlayer } from "./demo-player";
import { SafetyNote } from "./ui";
import { useSpeechStore } from "@/lib/speech-delay/store";
import { EVIDENCE_LABELS, STATUS_LABELS } from "@/lib/speech-delay/types";
import type { Activity, ObservationStatus } from "@/lib/speech-delay/types";

type Phase = "persiapan" | "bermain" | "catat";

const phases: { key: Phase; label: string }[] = [
  { key: "persiapan", label: "1. Persiapan" },
  { key: "bermain", label: "2. Bermain bersama" },
  { key: "catat", label: "3. Catat pengamatan" },
];

export function ActivityRunner({ activity }: { activity: Activity }) {
  const { ready, activeChild, logSession } = useSpeechStore();
  const [phase, setPhase] = useState<Phase>("persiapan");
  const [doneSteps, setDoneSteps] = useState<number[]>([]);
  const [response, setResponse] = useState<ObservationStatus>("emerging");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const toggleStep = (index: number) => {
    setDoneSteps((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index],
    );
  };

  if (!ready) {
    return (
      <div className="rounded-3xl border border-line bg-white p-6 text-sm text-muted">
        Memuat data perangkat…
      </div>
    );
  }

  if (!activeChild) {
    return (
      <div className="rounded-3xl border border-line bg-white p-6">
        <p className="text-base font-medium text-ink">
          Profil anak diperlukan untuk mencatat latihan
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Buat profil singkat (nama panggilan dan usia) agar catatan tersimpan di
          perangkat ini.
        </p>
        <Link
          href="/speech-delay/onboarding"
          className="mt-4 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper"
        >
          Buat profil anak
        </Link>
      </div>
    );
  }

  const evidence = EVIDENCE_LABELS[activity.evidenceLabel];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Tahap kegiatan">
        {phases.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={phase === item.key}
            onClick={() => setPhase(item.key)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              phase === item.key
                ? "bg-accent text-paper"
                : "border border-line bg-white text-muted hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {phase === "persiapan" ? (
        <div className="grid gap-5 lg:grid-cols-2">
          <section className="rounded-3xl border border-line bg-white p-6">
            <h2 className="text-lg font-semibold tracking-tight">Siapkan</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{activity.setup}</p>

            <h3 className="mt-5 text-sm font-medium">Bahan</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {activity.materials.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>

            <h3 className="mt-5 text-sm font-medium">Prasyarat lembut</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {activity.prerequisites.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>

            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-muted">Durasi</dt>
                <dd className="text-ink">{activity.duration}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Tingkat</dt>
                <dd className="text-ink">{activity.difficulty.replace("_", " ")}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs text-muted">Rujukan usia (untuk melihat, bukan syarat)</dt>
                <dd className="text-ink">{activity.ageReference}</dd>
              </div>
            </dl>
          </section>

          <section className="space-y-5">
            <div className="rounded-3xl border border-line bg-white p-6">
              <h2 className="text-lg font-semibold tracking-tight">Tujuan yang bisa diamati</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {activity.objective}
              </p>
              <div className="mt-4">
                <AudioPrompt text={activity.parentSteps[0]} label="Contoh langkah pertama" />
              </div>
            </div>
            <SafetyNote>
              Ikuti minat anak. Bila anak menolak atau distress, berhenti. Latihan
              komunikasi tidak boleh menjadi paksaan.
            </SafetyNote>
          </section>
        </div>
      ) : null}

      {phase === "bermain" ? (
        <div className="grid gap-5 lg:grid-cols-2">
          <section className="rounded-3xl border border-line bg-white p-6">
            <h2 className="text-lg font-semibold tracking-tight">Langkah bermain</h2>
            <p className="mt-1 text-xs text-muted">
              Centang yang sudah dilakukan. Tidak wajib semua.
            </p>
            <ul className="mt-4 space-y-3">
              {activity.parentSteps.map((step, index) => (
                <li key={step}>
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
                    <input
                      type="checkbox"
                      checked={doneSteps.includes(index)}
                      onChange={() => toggleStep(index)}
                      className="mt-0.5 h-4 w-4 accent-[#1F4D3F]"
                    />
                    <span className={doneSteps.includes(index) ? "text-muted line-through" : "text-ink"}>
                      {step}
                    </span>
                  </label>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-sm font-medium">Contoh dialog</h3>
            <ul className="mt-2 space-y-2 text-sm italic leading-relaxed text-muted">
              {activity.dialogExamples.map((example) => (
                <li key={example}>“{example}”</li>
              ))}
            </ul>

            <div className="mt-6">
              <AudioPrompt text={activity.dialogExamples[0]} label="Dengarkan contoh dialog" />
            </div>
          </section>

          <div className="space-y-5">
            <DemoPlayer
              steps={activity.parentSteps}
              illustration={activity.illustration}
              label={`Ilustrasi ${activity.title}`}
            />

            <section className="rounded-2xl border border-line bg-white p-5">
              <h3 className="text-sm font-medium">Apa yang diperhatikan</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {activity.observations.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-line bg-white p-5">
              <h3 className="text-sm font-medium">Bila anak tidak tertarik</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {activity.tipsDisengaged}
              </p>
              <h3 className="mt-4 text-sm font-medium">Alternatif tanpa tekanan</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {activity.lowPressureAlternative}
              </p>
            </section>
          </div>
        </div>
      ) : null}

      {phase === "catat" ? (
        <div className="grid gap-5 lg:grid-cols-2">
          <section className="rounded-3xl border border-line bg-white p-6">
            <h2 className="text-lg font-semibold tracking-tight">
              Bagaimana respons {activeChild.nickname}?
            </h2>
            <p className="mt-1 text-xs text-muted">
              Ini catatan pengamatan, bukan penilaian kemampuan bicara.
            </p>

            <div className="mt-4 space-y-2">
              {(["not_yet", "emerging", "consistent"] as ObservationStatus[]).map(
                (status) => (
                  <label
                    key={status}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 text-sm ${
                      response === status ? "border-accent bg-accent/5" : "border-line"
                    }`}
                  >
                    <input
                      type="radio"
                      name="respons"
                      value={status}
                      checked={response === status}
                      onChange={() => setResponse(status)}
                      className="mt-1 accent-[#1F4D3F]"
                    />
                    <span>
                      <span className="block font-medium text-ink">
                        {STATUS_LABELS[status]}
                      </span>
                      <span className="block text-xs text-muted">
                        {status === "not_yet" && "Belum terlihat hari ini."}
                        {status === "emerging" && "Muncul sebentar atau dengan bantuan."}
                        {status === "consistent" && "Muncul beberapa kali tanpa diminta."}
                      </span>
                    </span>
                  </label>
                ),
              )}
            </div>

            <label htmlFor="catatan-latihan" className="mt-4 block text-sm font-medium">
              Catatan (opsional)
            </label>
            <textarea
              id="catatan-latihan"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={3}
              maxLength={500}
              placeholder="Contoh: anak menunjuk buku dan bilang 'ini'."
              className="mt-1 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm"
            />

            <button
              type="button"
              onClick={() => {
                logSession({ activityId: activity.id, response, note });
                setSaved(true);
              }}
              className="mt-4 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper"
            >
              Simpan ke perkembangan
            </button>

            {saved ? (
              <p role="status" className="mt-3 rounded-2xl bg-accent/10 px-4 py-3 text-sm text-accent">
                Tersimpan di perangkat ini. Lanjutkan dengan aktivitas berikutnya
                atau ulangi kapan saja.
              </p>
            ) : null}
          </section>

          <section className="space-y-5">
            <div className="rounded-2xl border border-line bg-white p-5">
              <h3 className="text-sm font-medium">Kesempatan berikutnya</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Ulangi kegiatan yang sama di waktu berbeda sebelum menambah
                tantangan. Variasi situasi lebih berguna daripada menambah jumlah
                pengulangan dalam satu sesi.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-5">
              <h3 className="text-sm font-medium">Bila tidak ada kemajuan</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Tidak ada patokan jumlah pekan yang harus dilewati sebelum
                meminta bantuan. Jika Anda tetap khawatir, atau ada kehilangan
                kemampuan, bicarakan dengan dokter atau terapis wicara.
              </p>
              <Link
                href="/speech-delay/safety"
                className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-4"
              >
                Panduan rujukan
              </Link>
            </div>

            <div className="rounded-2xl border border-line bg-white p-5">
              <h3 className="text-sm font-medium">Dasar penelitian</h3>
              <p className="mt-1 text-xs text-muted">{evidence.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{evidence.note}</p>
              <Link
                href={`/speech-delay/exercises/${activity.slug}#dasar-penelitian`}
                className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-4"
              >
                Lihat rujukan aktivitas ini
              </Link>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
