"use client";

import Link from "next/link";
import { useMemo } from "react";
import { activities, activityById } from "@/lib/speech-delay/activities";
import { levelSuggestions } from "@/lib/speech-delay/baseline";
import {
  formatShortDate,
  goalMovementPercent,
  sessionsByWeek,
  uniqueDaysPracticed,
} from "@/lib/speech-delay/progress";
import { useSpeechStore } from "@/lib/speech-delay/store";
import { milestonesForAge } from "@/lib/speech-delay/milestones";
import { DOMAIN_LABELS, STATUS_LABELS } from "@/lib/speech-delay/types";
import { ActivityCard } from "./activity-card";
import { WeeklyPracticeChart } from "./progress-charts";
import {
  Badge,
  Disclaimer,
  EmptyState,
  SafetyNote,
  Stat,
  buttonPrimary,
  buttonSecondary,
  cardClass,
} from "./ui";

export function Dashboard() {
  const { ready, state, activeChild, children } = useSpeechStore();

  const baseline = useMemo(() => {
    if (!activeChild) return null;
    return (
      [...state.baselines]
        .filter((item) => item.childId === activeChild.id)
        .sort((a, b) => b.completedAt.localeCompare(a.completedAt))[0] ?? null
    );
  }, [activeChild, state.baselines]);

  const childSessions = useMemo(
    () =>
      activeChild
        ? state.sessions.filter((item) => item.childId === activeChild.id)
        : [],
    [activeChild, state.sessions],
  );

  const childGoals = useMemo(
    () => (activeChild ? state.goals.filter((g) => g.childId === activeChild.id) : []),
    [activeChild, state.goals],
  );

  const weekly = useMemo(() => sessionsByWeek(childSessions, 6), [childSessions]);

  const suggested = useMemo(() => {
    if (!baseline) return activities.slice(0, 3);
    return baseline.suggestedActivitySlugs
      .map((slug) => activities.find((activity) => activity.slug === slug))
      .filter((activity): activity is NonNullable<typeof activity> => Boolean(activity))
      .slice(0, 3);
  }, [baseline]);

  const lastSession = useMemo(() => {
    const sorted = [...childSessions].sort((a, b) =>
      b.completedAt.localeCompare(a.completedAt),
    );
    const latest = sorted[0];
    if (!latest) return null;
    return { session: latest, activity: activityById.get(latest.activityId) };
  }, [childSessions]);

  const observedMilestones = useMemo(() => {
    if (!activeChild) return [];
    return state.observations
      .filter((item) => item.childId === activeChild.id)
      .sort((a, b) => b.observedAt.localeCompare(a.observedAt));
  }, [activeChild, state.observations]);

  if (!ready) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-sm text-muted">Memuat data perangkat…</p>
      </div>
    );
  }

  /* ---------------------------- no child yet ---------------------------- */
  if (!activeChild) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Ruang Wicara · stimulasi komunikasi di rumah
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          Pendamping harian untuk mendukung komunikasi anak.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          Modul ini membantu Anda memilih kegiatan bermain yang sesuai dengan
          kemampuan komunikasi anak saat ini, mencatat pengamatan, dan menyiapkan
          pertanyaan untuk dokter atau terapis wicara. Bukan alat diagnosis, bukan
          pengganti pemeriksaan.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/speech-delay/onboarding" className={buttonPrimary}>
            Kenali kemampuan awal
          </Link>
          <Link href="/speech-delay/education" className={buttonSecondary}>
            Mulai dari edukasi
          </Link>
        </div>

        <ol className="mt-8 grid gap-3 rounded-3xl border border-line bg-white p-5 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Buat profil anak",
              body: "Nama panggilan dan usia. Cukup 30 detik, data tinggal di perangkat ini.",
              href: "/speech-delay/onboarding",
            },
            {
              step: "2",
              title: "Isi cek kemampuan awal",
              body: "12 pertanyaan singkat untuk memilih titik mulai latihan.",
              href: "/speech-delay/onboarding",
            },
            {
              step: "3",
              title: "Coba satu latihan",
              body: "5 menit bermain, lalu catat apa yang terlihat.",
              href: "/speech-delay/exercises",
            },
          ].map((item) => (
            <li key={item.step}>
              <Link
                href={item.href}
                className="flex h-full gap-3 rounded-2xl p-2 transition hover:bg-paper"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                  {item.step}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">
                    {item.body}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Kenali speech delay",
              body: "Perbedaan bicara, bahasa, dan komunikasi; variasi normal vs tanda yang perlu diperiksa.",
              href: "/speech-delay/education",
            },
            {
              title: "Mulai latihan",
              body: "30 aktivitas bermain dengan langkah, contoh dialog, dan catatan pengamatan.",
              href: "/speech-delay/exercises",
            },
            {
              title: "Milestone usia",
              body: "Checklist CDC 2 tahun–5 tahun, terpisah dari goal pribadi Anda.",
              href: "/speech-delay/milestones",
            },
            {
              title: "Pantau perkembangan",
              body: "Sesi latihan, area yang dilatih, dan status goal — dari data yang Anda simpan.",
              href: "/speech-delay/progress",
            },
            {
              title: "Kapan perlu bantuan",
              body: "Tanda yang tidak boleh ditunggu, dan persiapan sebelum konsultasi.",
              href: "/speech-delay/safety",
            },
            {
              title: "Program bertingkat",
              body: "Level 0–5 berdasarkan kemampuan komunikasi yang terlihat, bukan usia saja.",
              href: "/speech-delay/programs",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-3xl border border-line bg-white p-5 transition hover:border-accent/40"
            >
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className={cardClass}>
            <h2 className="text-lg font-semibold tracking-tight">Batasan yang perlu diketahui</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
              <li>
                • Modul ini tidak mendiagnosis autisme, apraxia, gangguan pendengaran,
                atau gangguan bahasa perkembangan.
              </li>
              <li>
                • Tidak ada janji “sampai sembuh” atau perkiraan waktu mulai berbicara.
              </li>
              <li>
                • Tidak ada penilaian otomatis dari rekaman suara; skor semacam itu
                belum tervalidasi secara klinis.
              </li>
              <li>
                • Latihan menekankan interaksi nyata orang tua–anak, bukan waktu layar
                yang panjang.
              </li>
            </ul>
            <Disclaimer className="mt-4" />
          </div>
          <div className="space-y-4">
            <SafetyNote>
              Bila anak kehilangan kemampuan, ada kekhawatiran pendengaran, atau Anda
              merasa ada yang tidak sesuai, jangan menunggu. Hubungi dokter anak atau
              terapis wicara.
            </SafetyNote>
            {children.length > 0 ? (
              <p className="text-sm text-muted">
                Ada {children.length} profil di perangkat ini. Pilih profil aktif di{" "}
                <Link href="/speech-delay/settings" className="text-accent underline underline-offset-4">
                  Pengaturan
                </Link>
                .
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  /* --------------------------- personalized ---------------------------- */
  const suggestion = levelSuggestions[baseline?.level ?? 0];
  const ageMilestones = milestonesForAge(activeChild.ageMonths);
  const consistentMilestones = observedMilestones.filter(
    (item) => item.status === "consistent",
  ).length;
  const observedIds = new Set(observedMilestones.map((item) => item.skillId));
  const untouchedMilestones = ageMilestones.filter(
    (item) => !observedIds.has(item.id),
  ).length;
  const latestReflection = [...state.reflections]
    .filter((item) => item.childId === activeChild.id)
    .sort((a, b) => b.weekOf.localeCompare(a.weekOf))[0];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Beranda · {activeChild.nickname}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Selamat datang kembali.
          </h1>
          <p className="mt-2 text-sm text-muted">
            {Math.floor(activeChild.ageMonths / 12)} tahun{" "}
            {activeChild.ageMonths % 12} bulan · bahasa di rumah:{" "}
            {activeChild.homeLanguages.join(", ")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/speech-delay/exercises" className={buttonPrimary}>
            Pilih latihan hari ini
          </Link>
          <Link href="/speech-delay/report" className={buttonSecondary}>
            Laporan konsultasi
          </Link>
        </div>
      </div>

      {baseline?.redFlags.length ? (
        <div className="mt-6">
          <SafetyNote>
            <strong>Tindak lanjut profesional disarankan.</strong> Jawaban Anda pada
            cek kemampuan awal menandai hal yang perlu dibicarakan dengan dokter atau
            terapis wicara. Latihan di rumah boleh tetap berjalan, tetapi jangan
            menunda pemeriksaan.{" "}
            <Link href="/speech-delay/safety" className="underline underline-offset-4">
              Lihat panduan
            </Link>
          </SafetyNote>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Sesi tercatat"
          value={childSessions.length}
          hint={`${uniqueDaysPracticed(childSessions)} hari berbeda`}
        />
        <Stat
          label="Goal berjalan"
          value={childGoals.length}
          hint={`${goalMovementPercent(childGoals)}% mulai terlihat atau konsisten`}
        />
        <Stat
          label="Milestone diamati"
          value={`${observedMilestones.length}/${ageMilestones.length}`}
          hint={`${consistentMilestones} konsisten · ${untouchedMilestones} belum diamati`}
        />
        <Stat
          label="Cek awal terakhir"
          value={baseline ? `L${baseline.level}` : "—"}
          hint={
            baseline
              ? formatShortDate(baseline.completedAt.slice(0, 10))
              : "Belum mengisi cek kemampuan awal"
          }
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section>
          <div className="flex items-end justify-between gap-3">
            <h2 className="text-xl font-semibold tracking-tight">
              Saran bermain hari ini
            </h2>
            <Link
              href="/speech-delay/exercises"
              className="text-xs text-accent underline underline-offset-4"
            >
              Semua aktivitas
            </Link>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            {baseline
              ? `Disarankan untuk ${suggestion.title.toLowerCase()}. Ini saran, bukan kewajiban.`
              : "Belum ada cek kemampuan awal, jadi ini saran umum untuk titik mulai."}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {suggested.slice(0, 2).map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>

          <div className={`${cardClass} mt-6`}>
            <div className="flex items-end justify-between gap-3">
              <h2 className="text-lg font-semibold tracking-tight">
                Tren latihan
              </h2>
              <Link
                href="/speech-delay/progress"
                className="text-xs text-accent underline underline-offset-4"
              >
                Detail
              </Link>
            </div>
            <div className="mt-4">
              <WeeklyPracticeChart data={weekly} />
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <section className={cardClass}>
            <h2 className="text-sm font-semibold">Cekpoint berikutnya</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {latestReflection
                ? `Refleksi terakhir dicatat untuk pekan ${latestReflection.weekOf}.`
                : "Belum ada refleksi. Isi satu refleksi singkat untuk menutup pekan ini."}
            </p>
            <Link
              href="/speech-delay/progress#refleksi"
              className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-4"
            >
              Tulis refleksi
            </Link>
          </section>

          <section className={cardClass}>
            <h2 className="text-sm font-semibold">Status terakhir</h2>
            {lastSession?.activity ? (
              <>
                <p className="mt-2 text-sm text-ink">{lastSession.activity.title}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge tone="accent">{DOMAIN_LABELS[lastSession.activity.domain]}</Badge>
                  <Badge>{STATUS_LABELS[lastSession.session.response]}</Badge>
                </div>
                <p className="mt-2 text-xs text-muted">
                  {formatShortDate(lastSession.session.completedAt.slice(0, 10))}
                </p>
              </>
            ) : (
              <p className="mt-2 text-sm text-muted">
                Belum ada sesi. Satu kegiatan 5 menit cukup untuk memulai.
              </p>
            )}
          </section>

          <section className={cardClass}>
            <h2 className="text-sm font-semibold">Pengingat aman</h2>
            <ul className="mt-2 space-y-2 text-xs leading-relaxed text-muted">
              <li>• Ikuti minat anak; berhenti bila anak menolak.</li>
              <li>• Jangan memaksa anak mengulang kata.</li>
              <li>
                • Bila ada kehilangan kemampuan atau kekhawatiran pendengaran,
                hubungi dokter lebih dahulu.
              </li>
            </ul>
            <Link
              href="/speech-delay/safety"
              className="mt-3 inline-block text-xs text-accent underline underline-offset-4"
            >
              Panduan rujukan
            </Link>
          </section>

          {baseline ? (
            <section className={cardClass}>
              <h2 className="text-sm font-semibold">Ringkasan cek awal</h2>
              <p className="mt-2 text-sm text-ink">{suggestion.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {baseline.summary}
              </p>
              <Link
                href="/speech-delay/onboarding"
                className="mt-3 inline-block text-xs text-accent underline underline-offset-4"
              >
                Isi ulang cek
              </Link>
            </section>
          ) : (
            <EmptyState
              title="Belum ada cek awal"
              description="Cek non-diagnostik ini membantu memilih titik mulai latihan."
              action={
                <Link href="/speech-delay/onboarding" className={buttonPrimary}>
                  Kenali kemampuan awal
                </Link>
              }
            />
          )}
        </aside>
      </div>

      <Disclaimer className="mt-10" />
    </div>
  );
}
