"use client";

import Link from "next/link";
import { useState } from "react";
import { activities } from "@/lib/speech-delay/activities";
import { useSpeechStore } from "@/lib/speech-delay/store";
import { STATUS_LABELS } from "@/lib/speech-delay/types";
import type { ObservationStatus } from "@/lib/speech-delay/types";
import {
  EmptyState,
  StatusPill,
  buttonPrimary,
  buttonSecondary,
  inputClass,
  labelClass,
} from "./ui";

const statuses: ObservationStatus[] = [
  "not_observed",
  "not_yet",
  "emerging",
  "consistent",
];

export function GoalManager() {
  const { ready, activeChild, state, addGoal, updateGoal, removeGoal } =
    useSpeechStore();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [baseline, setBaseline] = useState("");
  const [criterion, setCriterion] = useState("");
  const [nextIdea, setNextIdea] = useState("");
  const [activitySlug, setActivitySlug] = useState("");
  const [situations, setSituations] = useState(1);
  const [error, setError] = useState<string | null>(null);

  if (!ready) return <p className="text-sm text-muted">Memuat…</p>;

  if (!activeChild) {
    return (
      <EmptyState
        title="Buat profil anak lebih dulu"
        description="Goal disimpan per anak di perangkat ini."
        action={
          <Link href="/speech-delay/onboarding" className={buttonPrimary}>
            Buat profil anak
          </Link>
        }
      />
    );
  }

  const goals = state.goals.filter((goal) => goal.childId === activeChild.id);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !criterion.trim()) {
      setError("Isi judul goal dan kriteria yang bisa diamati.");
      return;
    }
    setError(null);
    addGoal({
      title,
      baseline: baseline.trim() || "Belum diamati sebelum latihan.",
      criterion,
      nextIdea: nextIdea.trim() || "Ulangi di rutinitas lain.",
      activitySlug: activitySlug || undefined,
      status: "not_yet",
      situations,
    });
    setTitle("");
    setBaseline("");
    setCriterion("");
    setNextIdea("");
    setActivitySlug("");
    setSituations(1);
    setShowForm(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {goals.length} goal untuk {activeChild.nickname}. Goal berbeda dari
          milestone resmi: ini target latihan yang Anda susun sendiri.
        </p>
        <button
          type="button"
          onClick={() => setShowForm((value) => !value)}
          className={showForm ? buttonSecondary : buttonPrimary}
        >
          {showForm ? "Tutup formulir" : "Tambah goal"}
        </button>
      </div>

      {showForm ? (
        <form onSubmit={submit} className="space-y-4 rounded-3xl border border-line bg-white p-6">
          <div>
            <label htmlFor="goal-title" className={labelClass}>
              Judul goal
            </label>
            <input
              id="goal-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className={`mt-1 ${inputClass}`}
              placeholder="Misalnya: meminta dengan dua kata saat makan"
              maxLength={120}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="goal-baseline" className={labelClass}>
                Titik awal (baseline)
              </label>
              <textarea
                id="goal-baseline"
                value={baseline}
                onChange={(event) => setBaseline(event.target.value)}
                rows={2}
                className={`mt-1 ${inputClass}`}
                placeholder="Contoh: hanya menunjuk, belum ada kata."
                maxLength={300}
              />
            </div>
            <div>
              <label htmlFor="goal-criterion" className={labelClass}>
                Kriteria yang bisa diamati
              </label>
              <textarea
                id="goal-criterion"
                value={criterion}
                onChange={(event) => setCriterion(event.target.value)}
                rows={2}
                className={`mt-1 ${inputClass}`}
                placeholder="Contoh: memakai “mau + benda” 2 kali saat makan."
                maxLength={300}
              />
            </div>
            <div>
              <label htmlFor="goal-next" className={labelClass}>
                Ide latihan berikutnya
              </label>
              <input
                id="goal-next"
                value={nextIdea}
                onChange={(event) => setNextIdea(event.target.value)}
                className={`mt-1 ${inputClass}`}
                maxLength={200}
              />
            </div>
            <div>
              <label htmlFor="goal-activity" className={labelClass}>
                Aktivitas terkait (opsional)
              </label>
              <select
                id="goal-activity"
                value={activitySlug}
                onChange={(event) => setActivitySlug(event.target.value)}
                className={`mt-1 ${inputClass}`}
              >
                <option value="">Tidak ada</option>
                {activities.map((activity) => (
                  <option key={activity.slug} value={activity.slug}>
                    {activity.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="goal-situations" className={labelClass}>
                Terlihat di berapa situasi berbeda?
              </label>
              <input
                id="goal-situations"
                type="number"
                min={0}
                max={10}
                value={situations}
                onChange={(event) => setSituations(Number(event.target.value))}
                className={`mt-1 ${inputClass}`}
              />
            </div>
          </div>

          {error ? (
            <p role="alert" className="text-sm text-red-800">
              {error}
            </p>
          ) : null}

          <button type="submit" className={buttonPrimary}>
            Simpan goal
          </button>
        </form>
      ) : null}

      {goals.length === 0 ? (
        <EmptyState
          title="Belum ada goal"
          description="Goal membantu Anda mengingat apa yang ingin diamati. Mulai dari satu hal kecil yang terjadi sehari-hari."
        />
      ) : (
        <ul className="space-y-4">
          {goals.map((goal) => (
            <li key={goal.id} className="rounded-3xl border border-line bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold tracking-tight">{goal.title}</h3>
                  <p className="mt-1 text-xs text-muted">
                    Baseline: {goal.baseline}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Kriteria: {goal.criterion}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Terlihat di {goal.situations} situasi · diperbarui{" "}
                    {goal.updatedAt.slice(0, 10)}
                  </p>
                </div>
                <StatusPill status={goal.status} />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <label className="text-xs text-muted">
                  Status
                  <select
                    value={goal.status}
                    onChange={(event) =>
                      updateGoal(goal.id, {
                        status: event.target.value as ObservationStatus,
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-line px-3 py-2 text-sm text-ink"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {STATUS_LABELS[status]}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-xs text-muted">
                  Jumlah situasi
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={goal.situations}
                    onChange={(event) =>
                      updateGoal(goal.id, { situations: Number(event.target.value) })
                    }
                    className="mt-1 w-full rounded-xl border border-line px-3 py-2 text-sm text-ink"
                  />
                </label>
                <label className="text-xs text-muted">
                  Ide berikutnya
                  <input
                    value={goal.nextIdea}
                    onChange={(event) =>
                      updateGoal(goal.id, { nextIdea: event.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-line px-3 py-2 text-sm text-ink"
                    maxLength={200}
                  />
                </label>
              </div>

              <div className="mt-3 flex flex-wrap gap-3 text-xs">
                {goal.activitySlug ? (
                  <Link
                    href={`/speech-delay/exercises/${goal.activitySlug}`}
                    className="text-accent underline underline-offset-4"
                  >
                    Buka aktivitas terkait
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={() => removeGoal(goal.id)}
                  className="text-red-800 underline underline-offset-4"
                >
                  Hapus goal
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
