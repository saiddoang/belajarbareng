"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { activityById } from "@/lib/speech-delay/activities";
import { milestoneById } from "@/lib/speech-delay/milestones";
import { formatShortDate } from "@/lib/speech-delay/progress";
import { useSpeechStore } from "@/lib/speech-delay/store";
import {
  DOMAIN_LABELS,
  STATUS_LABELS,
} from "@/lib/speech-delay/types";
import { CONTENT_DISCLAIMER } from "@/lib/speech-delay/sources";
import {
  Disclaimer,
  EmptyState,
  buttonPrimary,
  buttonSecondary,
  cardClass,
} from "./ui";

type Range = "30" | "90" | "all";

const rangeLabels: Record<Range, string> = {
  "30": "30 hari terakhir",
  "90": "90 hari terakhir",
  all: "Seluruh riwayat",
};

/**
 * Everything below is assembled from what the caregiver saved on this device.
 * There is no scoring, no percentile, and no interpretation — the report is a
 * conversation aid for a real appointment.
 */
export function ReportView() {
  const { ready, state, activeChild } = useSpeechStore();
  const [range, setRange] = useState<Range>("90");

  const childSessions = useMemo(() => {
    if (!activeChild) return [];
    const all = state.sessions
      .filter((item) => item.childId === activeChild.id)
      .sort((a, b) => b.completedAt.localeCompare(a.completedAt));
    if (range === "all") return all;
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - Number(range));
    return all.filter((session) => new Date(session.completedAt) >= threshold);
  }, [activeChild, state.sessions, range]);

  if (!ready) {
    return <p className="text-sm text-muted">Memuat data perangkat…</p>;
  }

  if (!activeChild) {
    return (
      <EmptyState
        title="Belum ada profil anak"
        description="Laporan disusun dari catatan yang Anda simpan untuk satu anak. Buat profil singkat lebih dulu."
        action={
          <Link href="/speech-delay/onboarding" className={buttonPrimary}>
            Buat profil anak
          </Link>
        }
      />
    );
  }

  const goals = state.goals.filter((goal) => goal.childId === activeChild.id);
  const observations = state.observations
    .filter((item) => item.childId === activeChild.id)
    .sort((a, b) => b.observedAt.localeCompare(a.observedAt));
  const reflections = state.reflections
    .filter((item) => item.childId === activeChild.id)
    .sort((a, b) => b.weekOf.localeCompare(a.weekOf));
  const reviews = state.goalReviews
    .filter((item) => item.childId === activeChild.id)
    .sort((a, b) => b.monthOf.localeCompare(a.monthOf));
  const baseline =
    [...state.baselines]
      .filter((item) => item.childId === activeChild.id)
      .sort((a, b) => b.completedAt.localeCompare(a.completedAt))[0] ?? null;

  const triedSlugs = new Set<string>();
  for (const session of childSessions) {
    const activity = activityById.get(session.activityId);
    if (activity) triedSlugs.add(activity.slug);
  }

  const questions = [
    "Apakah pendengaran anak perlu diperiksa lebih dahulu?",
    "Apakah kemampuan memahami instruksi sesuai untuk usianya?",
    "Apakah ada tanda yang perlu dinilai oleh terapis wicara?",
    "Bagaimana kami melanjutkan latihan di rumah tanpa tekanan?",
    "Apakah ada layanan tumbuh kembang yang bisa kami akses di daerah kami?",
  ];
  if (baseline?.redFlags.length) {
    questions.unshift(
      "Kami menandai kekhawatiran pada pendengaran, kehilangan kemampuan, pemahaman, atau interaksi sosial. Apa langkah pertama yang disarankan?",
    );
  }

  return (
    <div className="space-y-6">
      <div className="no-print flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => window.print()} className={buttonPrimary}>
          Cetak / simpan sebagai PDF
        </button>
        <Link href="/speech-delay/progress" className={buttonSecondary}>
          Kembali ke perkembangan
        </Link>
        <label className="flex items-center gap-2 text-sm text-muted">
          Rentang
          <select
            value={range}
            onChange={(event) => setRange(event.target.value as Range)}
            className="rounded-full border border-line bg-white px-3 py-2 text-sm text-ink"
          >
            <option value="30">30 hari terakhir</option>
            <option value="90">90 hari terakhir</option>
            <option value="all">Seluruh riwayat</option>
          </select>
        </label>
      </div>

      <p className="no-print text-xs leading-relaxed text-muted">
        Halaman ini dirancang untuk dicetak atau disimpan sebagai PDF lewat dialog
        cetak peramban. Tidak ada berkas yang dikirim ke server.
      </p>

      <article className="report-sheet space-y-6 bg-white">
        <header className="border-b border-line pb-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            Persiapan konsultasi · Ruang Wicara
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Ringkasan observasi komunikasi
          </h1>
          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted">Nama panggilan</dt>
              <dd className="text-ink">{activeChild.nickname}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Usia</dt>
              <dd className="text-ink">
                {Math.floor(activeChild.ageMonths / 12)} tahun{" "}
                {activeChild.ageMonths % 12} bulan
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Bahasa di rumah</dt>
              <dd className="text-ink">{activeChild.homeLanguages.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Periode laporan</dt>
              <dd className="text-ink">{rangeLabels[range]}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Tanggal dibuat</dt>
              <dd className="text-ink">{formatShortDate(new Date().toISOString().slice(0, 10))}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Sesi dalam periode</dt>
              <dd className="text-ink">
                {childSessions.length} sesi · {triedSlugs.size} aktivitas berbeda
              </dd>
            </div>
          </dl>
        </header>

        <section>
          <h2 className="text-base font-semibold">Catatan latihan</h2>
          {childSessions.length === 0 ? (
            <p className="mt-2 text-sm text-muted">
              Belum ada sesi pada periode ini.
            </p>
          ) : (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-line text-muted">
                    <th scope="col" className="py-2 pr-3 font-medium">Tanggal</th>
                    <th scope="col" className="py-2 pr-3 font-medium">Aktivitas</th>
                    <th scope="col" className="py-2 pr-3 font-medium">Area</th>
                    <th scope="col" className="py-2 pr-3 font-medium">Respons</th>
                    <th scope="col" className="py-2 font-medium">Catatan</th>
                  </tr>
                </thead>
                <tbody>
                  {childSessions.map((session) => {
                    const activity = activityById.get(session.activityId);
                    return (
                      <tr key={session.id} className="border-b border-line/70 align-top">
                        <td className="py-2 pr-3 whitespace-nowrap">
                          {formatShortDate(session.completedAt.slice(0, 10))}
                        </td>
                        <td className="py-2 pr-3">{activity?.title ?? "Aktivitas"}</td>
                        <td className="py-2 pr-3">
                          {activity ? DOMAIN_LABELS[activity.domain] : "—"}
                        </td>
                        <td className="py-2 pr-3">{STATUS_LABELS[session.response]}</td>
                        <td className="py-2">{session.note ?? "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-base font-semibold">Goal yang disusun keluarga</h2>
          <p className="mt-1 text-xs text-muted">
            Goal di bawah ini adalah target latihan buatan keluarga, bukan
            milestone resmi dan bukan kriteria klinis.
          </p>
          {goals.length === 0 ? (
            <p className="mt-2 text-sm text-muted">Belum ada goal.</p>
          ) : (
            <ul className="mt-3 space-y-3 text-sm">
              {goals.map((goal) => (
                <li key={goal.id} className="rounded-2xl bg-paper p-3">
                  <p className="font-medium text-ink">
                    {goal.title} · {STATUS_LABELS[goal.status]}
                  </p>
                  <p className="mt-1 text-xs text-muted">Titik awal: {goal.baseline}</p>
                  <p className="text-xs text-muted">Kriteria: {goal.criterion}</p>
                  <p className="text-xs text-muted">
                    Terlihat di {goal.situations} situasi · diperbarui{" "}
                    {formatShortDate(goal.updatedAt.slice(0, 10))}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="text-base font-semibold">Observasi milestone</h2>
          {observations.length === 0 ? (
            <p className="mt-2 text-sm text-muted">
              Belum ada milestone yang dicatat.
            </p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {observations.map((item) => {
                const milestone = milestoneById.get(item.skillId);
                return (
                  <li key={item.id} className="rounded-2xl bg-paper p-3">
                    <p className="text-ink">
                      {milestone ? milestone.text : item.skillId}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {STATUS_LABELS[item.status]} · diamati{" "}
                      {formatShortDate(item.observedAt)}
                      {milestone ? ` · ${milestone.ageLabel}` : ""}
                    </p>
                    {item.note ? (
                      <p className="text-xs text-muted">Catatan: {item.note}</p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {(reflections.length > 0 || reviews.length > 0) && (
          <section>
            <h2 className="text-base font-semibold">Refleksi keluarga</h2>
            <ul className="mt-3 space-y-2 text-xs text-muted">
              {reflections.slice(0, 6).map((item) => (
                <li key={item.id}>
                  <span className="text-ink">Pekan {item.weekOf}:</span>{" "}
                  {[item.wins, item.concerns, item.nextWeek]
                    .filter(Boolean)
                    .join(" · ") || "—"}
                </li>
              ))}
              {reviews.slice(0, 4).map((item) => (
                <li key={item.id}>
                  <span className="text-ink">Tinjauan {item.monthOf} ({item.decision}):</span>{" "}
                  {item.summary || "—"}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-base font-semibold">Pertanyaan untuk profesional</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted">
            {questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>
        </section>

        {baseline ? (
          <section>
            <h2 className="text-base font-semibold">Catatan cek kemampuan awal</h2>
            <p className="mt-2 text-sm text-muted">
              Diisi {formatShortDate(baseline.completedAt.slice(0, 10))} · saran titik
              mulai level {baseline.level}. Hasil ini non-diagnostik dan hanya
              menyarankan urutan latihan di rumah.
            </p>
            {baseline.redFlags.length > 0 ? (
              <p className="mt-2 rounded-2xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-950">
                Keluarga menandai kekhawatiran dan meminta evaluasi profesional.
              </p>
            ) : null}
          </section>
        ) : null}

        <footer className="border-t border-line pt-4">
          <p className="text-xs leading-relaxed text-muted">{CONTENT_DISCLAIMER}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Batasan: laporan ini berisi catatan pengamatan orang tua, bukan
            pemeriksaan klinis. Tidak ada skor, persentil, atau kesimpulan
            diagnostik. Jumlah sesi menggambarkan partisipasi kegiatan, bukan
            kemajuan bicara. Data disimpan di peramban perangkat ini dan dapat
            dihapus di halaman Pengaturan.
          </p>
        </footer>
      </article>

      <div className={cardClass}>
        <p className="text-sm text-muted">
          Bawa laporan ini apa adanya. Bila ada kehilangan kemampuan atau
          kekhawatiran pendengaran, jangan menunggu jadwal berikutnya.
        </p>
        <Disclaimer className="mt-2" />
      </div>
    </div>
  );
}
