import Link from "next/link";
import { Badge } from "./ui";
import { Illustration } from "./illustration";
import type { Activity } from "@/lib/speech-delay/types";
import { DOMAIN_LABELS, EVIDENCE_LABELS } from "@/lib/speech-delay/types";

export function ActivityCard({ activity }: { activity: Activity }) {
  const evidence = EVIDENCE_LABELS[activity.evidenceLabel];

  return (
    <Link
      href={`/speech-delay/exercises/${activity.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-line bg-white p-5 transition hover:border-accent/40 hover:shadow-[0_10px_30px_-20px_rgba(20,19,15,0.4)]"
    >
      <div className="flex items-start justify-between gap-3">
        <Illustration
          kind={activity.illustration}
          label={`Ilustrasi ${activity.title}`}
          className="h-16 w-16"
        />
        <Badge tone="accent">L{activity.level}</Badge>
      </div>

      <p className="mt-4 text-xs text-muted">{DOMAIN_LABELS[activity.domain]}</p>
      <h3 className="mt-1 text-base font-semibold leading-snug tracking-tight text-ink group-hover:text-accent">
        {activity.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
        {activity.objective}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-muted">
        <span className="rounded-full bg-paper px-2.5 py-1">
          {activity.duration}
        </span>
        <span className="rounded-full bg-paper px-2.5 py-1">
          {evidence.label}
        </span>
      </div>
    </Link>
  );
}
