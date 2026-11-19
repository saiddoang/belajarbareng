import type { Metadata } from "next";
import Link from "next/link";
import { activities } from "@/lib/speech-delay/activities";
import { ageBands, programLevels } from "@/lib/speech-delay/programs";
import { starterWeek } from "@/lib/speech-delay/weekly-plan";
import {
  Badge,
  Breadcrumbs,
  Disclaimer,
  SafetyNote,
  SectionTitle,
  cardClass,
} from "@/components/speech-delay/ui";

export const metadata: Metadata = {
  title: "Program bertingkat — Ruang Wicara",
  description:
    "Enam level latihan komunikasi (L0–L5) yang dipilih berdasarkan kemampuan yang terlihat, bukan usia saja, plus contoh rutinitas 7 hari.",
};

export default function ProgramsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Program" }]} />

      <SectionTitle
        eyebrow="Program bertingkat"
        title="Level ditentukan oleh kemampuan komunikasi, bukan usia"
        description="Anak usia 4 tahun dengan kemampuan pra-verbal tetap aman memulai di L0. Level adalah urutan saran, bukan syarat, dan tidak ada level yang wajib diselesaikan."
      />

      <div className="mt-6 rounded-3xl border border-line bg-white p-5">
        <h2 className="text-sm font-semibold">Rentang usia untuk melihat aktivitas</h2>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Rentang ini hanya membantu Anda menyaring daftar. Penentuan latihan
          mengikuti kemampuan yang terlihat pada anak.
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {ageBands.map((band) => (
            <li key={band.label}>
              <Badge tone="soft">{band.label}</Badge>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 space-y-4">
        {programLevels.map((program) => {
          const levelActivities = program.activitySlugs
            .map((slug) => activities.find((activity) => activity.slug === slug))
            .filter((activity): activity is NonNullable<typeof activity> => Boolean(activity));

          return (
            <section key={program.level} className={cardClass}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">{program.name}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{program.focus}</p>
                </div>
                <Badge tone="accent">Level {program.level}</Badge>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted">{program.whoFor}</p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Contoh goal yang bisa diamati
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted">
                    {program.exampleGoals.map((goal) => (
                      <li key={goal}>• {goal}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Aktivitas di level ini
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    {levelActivities.map((activity) => (
                      <li key={activity.id}>
                        <Link
                          href={`/speech-delay/exercises/${activity.slug}`}
                          className="text-accent underline underline-offset-4"
                        >
                          {activity.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {program.caution ? (
                <p className="mt-4 text-xs leading-relaxed text-muted">{program.caution}</p>
              ) : null}
            </section>
          );
        })}
      </div>

      <section className="mt-10">
        <SectionTitle
          eyebrow="Contoh rutinitas"
          title="Rencana 7 hari untuk memulai"
          description="Contoh saja. Sesuaikan dengan perhatian anak, minatnya, dan arahan profesional. Tidak ada jumlah sesi yang diwajibkan."
        />
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {starterWeek.map((day) => (
            <li key={day.day} className="rounded-3xl border border-line bg-white p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                Hari {day.day} · {day.moment}
              </p>
              <h3 className="mt-1 text-sm font-semibold text-ink">{day.title}</h3>
              <ul className="mt-2 space-y-1 text-xs">
                {day.slugs.map((slug) => {
                  const activity = activities.find((item) => item.slug === slug);
                  return activity ? (
                    <li key={slug}>
                      <Link
                        href={`/speech-delay/exercises/${slug}`}
                        className="text-accent underline underline-offset-4"
                      >
                        {activity.title}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
              <p className="mt-2 text-xs leading-relaxed text-muted">{day.note}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-8">
        <SafetyNote>
          Level aplikasi tidak menggantikan penilaian terapis wicara untuk kejelasan
          ucapan, pemahaman, atau interaksi sosial. Bila ada kekhawatiran, mintalah
          evaluasi.
        </SafetyNote>
      </div>
      <Disclaimer className="mt-6" />
    </div>
  );
}
