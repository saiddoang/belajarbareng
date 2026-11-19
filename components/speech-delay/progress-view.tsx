"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { activities } from "@/lib/speech-delay/activities";
import { milestonesForAge } from "@/lib/speech-delay/milestones";
import {
  domainBreakdown,
  goalMovementPercent,
  goalStatusCounts,
  observationStatusCounts,
  sessionsByWeek,
  uniqueDaysPracticed,
} from "@/lib/speech-delay/progress";
import { useSpeechStore } from "@/lib/speech-delay/store";
import { STATUS_LABELS } from "@/lib/speech-delay/types";
import type { ObservationStatus } from "@/lib/speech-delay/types";
import { DomainChart, WeeklyPracticeChart } from "./progress-charts";
import {
  Disclaimer,
  EmptyState,
  Stat,
  buttonPrimary,
  cardClass,
} from "./ui";

const statusOrder: ObservationStatus[] = [
  "consistent",
  "emerging",
  "not_yet",
  "not_observed",
];

export function ProgressView() {
  const { ready, state, activeChild } = useSpeechStore();
  const [weeks, setWeeks] = useState(8);

  const childSessions = useMemo(
    () =>
      activeChild
        ? state.sessions.filter((item) => item.childId === activeChild.id)
        : [],
    [activeChild, state.sessions],
  );

  const childGoals = useMemo(
    () => (activeChild ? state.goals.filter((item) => item.childId === activeChild.id) : []),
    [activeChild, state.goals],
  );

  const childObservations = useMemo(
    () =>
      activeChild
        ? state.observations.filter((item) => item.childId === activeChild.id)
        : [],
    [activeChild, state.observations],
  );

  const weekly = useMemo(() => sessionsByWeek(childSessions, weeks), [childSessions, weeks]);
  const domains = useMemo(() => domainBreakdown(childSessions, activities), [childSessions]);
  const goalCounts = useMemo(() => goalStatusCounts(childGoals), [childGoals]);
  const ageMilestones = useMemo(
    () => (activeChild ? milestonesForAge(activeChild.ageMonths) : []),
    [activeChild],
  );
  const milestoneCounts = useMemo(
    () =>
      observationStatusCounts(
        childObservations,
        ageMilestones.map((item) => item.id),
      ),
    [childObservations, ageMilestones],
  );

  if (!ready) {
    return <p className="text-sm text-muted">Memuat data perangkat…</p>;
  }

  if (!activeChild) {
    return (
      <EmptyState
        title="Belum ada profil anak"
        description="Grafik dan ringkasan hanya bisa dibuat setelah ada profil dan catatan latihan yang Anda simpan sendiri."
        action={
          <Link href="/speech-delay/onboarding" className={buttonPrimary}>
            Buat profil anak
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Sesi latihan"
          value={childSessions.length}
          hint={`${uniqueDaysPracticed(childSessions)} hari berbeda`}
        />
        <Stat
          label="Goal bergerak"
          value={`${goalMovementPercent(childGoals)}%`}
          hint={`${goalCounts.emerging} mulai muncul · ${goalCounts.consistent} konsisten`}
        />
        <Stat
          label="Milestone konsisten"
          value={milestoneCounts.consistent}
          hint={`dari ${ageMilestones.length} item sesuai usia`}
        />
        <Stat
          label="Area dilatih"
          value={domains.length}
          hint="Area komunikasi dengan sesi tersimpan"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className={cardClass}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold">Sesi per pekan</h2>
            <label className="flex items-center gap-2 text-xs text-muted">
              Tampilkan
              <select
                value={weeks}
                onChange={(event) => setWeeks(Number(event.target.value))}
                className="rounded-full border border-line bg-white px-2 py-1 text-xs text-ink"
              >
                <option value={6}>6 pekan</option>
                <option value={8}>8 pekan</option>
                <option value={12}>12 pekan</option>
              </select>
            </label>
          </div>
          <div className="mt-4">
            <WeeklyPracticeChart data={weekly} />
          </div>
        </section>

        <section className={cardClass}>
          <h2 className="text-base font-semibold">Area komunikasi yang dilatih</h2>
          <p className="mt-1 text-xs text-muted">
            Menghitung sesi tersimpan, bukan kemampuan anak.
          </p>
          <div className="mt-4">
            <DomainChart data={domains} />
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className={cardClass}>
          <h2 className="text-base font-semibold">Status goal keluarga</h2>
          {childGoals.length === 0 ? (
            <p className="mt-2 text-sm text-muted">
              Belum ada goal. Goal Anda susun sendiri di bagian di bawah halaman ini.
            </p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {statusOrder.map((status) => (
                <li key={status} className="flex items-center justify-between">
                  <span className="text-muted">{STATUS_LABELS[status]}</span>
                  <span className="font-medium text-ink">{goalCounts[status]}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Status goal adalah catatan pengamatan orang tua atas kriteria yang Anda
            tulis sendiri, bukan hasil tes.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-base font-semibold">Milestone sesuai usia</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {statusOrder.map((status) => (
              <li key={status} className="flex items-center justify-between">
                <span className="text-muted">{STATUS_LABELS[status]}</span>
                <span className="font-medium text-ink">{milestoneCounts[status]}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/speech-delay/milestones"
            className="mt-4 inline-block text-xs font-medium text-accent underline underline-offset-4"
          >
            Buka checklist milestone
          </Link>
        </section>
      </div>

      <Disclaimer />
    </div>
  );
}
