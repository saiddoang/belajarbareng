import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActivityRunner } from "@/components/speech-delay/activity-runner";
import { EvidenceDrawer, SourceList } from "@/components/speech-delay/source-list";
import { activities, getActivity } from "@/lib/speech-delay/activities";
import { DOMAIN_LABELS, EVIDENCE_LABELS } from "@/lib/speech-delay/types";
import {
  Badge,
  Breadcrumbs,
  Disclaimer,
  buttonSecondary,
} from "@/components/speech-delay/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return activities.map((activity) => ({ slug: activity.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const activity = getActivity(slug);
  if (!activity) return {};
  return {
    title: `${activity.title} — Ruang Wicara`,
    description: activity.objective,
  };
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activity = getActivity(slug);
  if (!activity) notFound();

  const evidence = EVIDENCE_LABELS[activity.evidenceLabel];

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: "Latihan", href: "/speech-delay/exercises" },
          { label: activity.title },
        ]}
      />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent">Level {activity.level}</Badge>
            <Badge>{DOMAIN_LABELS[activity.domain]}</Badge>
            <Badge tone="soft">{activity.duration}</Badge>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {activity.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">{activity.objective}</p>
        </div>
        <Link href="/speech-delay/exercises" className={buttonSecondary}>
          Semua aktivitas
        </Link>
      </div>

      <div className="mt-8">
        <ActivityRunner activity={activity} />
      </div>

      <div className="mt-8 space-y-4">
        <EvidenceDrawer
          label={evidence.label}
          note={`${evidence.note} Keterangan ini menjelaskan strategi yang dipakai, bukan menilai permainan contohnya sebagai protokol terapi.`}
          sourceIds={activity.sourceIds}
        />
        <SourceList ids={activity.sourceIds} title="Rujukan strategi" compact />
      </div>

      <Disclaimer className="mt-8" />
    </div>
  );
}
