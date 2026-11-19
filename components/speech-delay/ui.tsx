import Link from "next/link";
import type { ReactNode } from "react";
import type { ObservationStatus } from "@/lib/speech-delay/types";
import { STATUS_LABELS } from "@/lib/speech-delay/types";

export const cardClass = "rounded-3xl border border-line bg-white p-6 sm:p-7";
export const buttonPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";
export const buttonSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-ink transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50";
export const buttonQuiet =
  "inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:text-ink";
export const inputClass =
  "w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-accent";
export const labelClass = "block text-sm font-medium text-ink";

export function SectionTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "warn" | "soft";
}) {
  const tones: Record<string, string> = {
    neutral: "border-line bg-paper text-muted",
    accent: "border-accent/20 bg-accent/10 text-accent",
    warn: "border-amber-300 bg-amber-50 text-amber-900",
    soft: "border-line bg-white text-ink",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

const statusTone: Record<ObservationStatus, string> = {
  not_observed: "border-line bg-paper text-muted",
  not_yet: "border-orange-200 bg-orange-50 text-orange-900",
  emerging: "border-sky-200 bg-sky-50 text-sky-900",
  consistent: "border-emerald-200 bg-emerald-50 text-emerald-900",
};

export function StatusPill({ status }: { status: ObservationStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium ${statusTone[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-line bg-white/60 p-8 text-center">
      <p className="text-base font-medium text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted">
        {description}
      </p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
        <li>
          <Link href="/speech-delay" className="hover:text-ink">
            Hub
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SafetyNote({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm leading-relaxed text-amber-950">
      {children}
    </div>
  );
}

export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-muted ${className}`}>
      Konten edukasi — bukan pengganti pemeriksaan profesional. Modul ini
      mendukung latihan stimulasi komunikasi di rumah dan tidak menegakkan
      diagnosis.
    </p>
  );
}

export function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">{value}</p>
      {hint ? <p className="mt-1 text-xs leading-relaxed text-muted">{hint}</p> : null}
    </div>
  );
}
