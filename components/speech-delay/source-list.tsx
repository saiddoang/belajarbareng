import { getSource } from "@/lib/speech-delay/sources";
import { MEDICAL_CONTENT_REVIEWED_AT } from "@/lib/speech-delay/sources";

export function SourceList({
  ids,
  title = "Rujukan",
  compact = false,
}: {
  ids: string[];
  title?: string;
  compact?: boolean;
}) {
  return (
    <section
      aria-label={title}
      className={
        compact
          ? "mt-4 rounded-2xl bg-paper p-4"
          : "mt-6 rounded-3xl border border-line bg-white p-6"
      }
    >
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ol className="mt-3 space-y-3 text-xs leading-relaxed text-muted">
        {ids.map((id) => {
          const source = getSource(id);
          return (
            <li key={id}>
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-ink underline underline-offset-4"
              >
                {source.title}
              </a>
              <p className="mt-0.5">{source.publisher}</p>
              <p className="mt-0.5">
                Diakses {source.accessedAt} · Cakupan: {source.scope}
              </p>
              <details className="mt-1">
                <summary className="cursor-pointer">Kutipan sumber</summary>
                <p className="mt-1 italic">{source.statement}</p>
              </details>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-[11px] text-muted">
        Konten diperiksa ulang terhadap sumber primer pada {MEDICAL_CONTENT_REVIEWED_AT}.
        Belum ditinjau oleh klinisi.
      </p>
    </section>
  );
}

export function EvidenceDrawer({
  label,
  note,
  sourceIds,
}: {
  label: string;
  note: string;
  sourceIds: string[];
}) {
  return (
    <details
      id="dasar-penelitian"
      className="rounded-2xl border border-line bg-white p-5"
    >
      <summary className="cursor-pointer text-sm font-medium text-ink">
        Dasar penelitian
      </summary>
      <p className="mt-2 text-xs font-medium text-accent">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{note}</p>
      <SourceList ids={sourceIds} title="Sumber untuk aktivitas ini" compact />
    </details>
  );
}
