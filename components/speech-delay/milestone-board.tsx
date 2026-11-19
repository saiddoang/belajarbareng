"use client";

import Link from "next/link";
import { useState } from "react";
import { useSpeechStore } from "@/lib/speech-delay/store";
import { STATUS_LABELS } from "@/lib/speech-delay/types";
import type { MilestoneItem, ObservationStatus } from "@/lib/speech-delay/types";
import { getSource } from "@/lib/speech-delay/sources";
import { Badge } from "./ui";

const statuses: ObservationStatus[] = [
  "not_observed",
  "not_yet",
  "emerging",
  "consistent",
];

export function MilestoneBoard({ items }: { items: MilestoneItem[] }) {
  const { ready, activeChild, state, setMilestoneObservation } = useSpeechStore();
  const [openNote, setOpenNote] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");

  if (!ready) {
    return <p className="text-sm text-muted">Memuat…</p>;
  }

  if (!activeChild) {
    return (
      <div className="rounded-3xl border border-line bg-white p-6">
        <p className="text-base font-medium">Buat profil anak untuk mencatat milestone</p>
        <p className="mt-2 text-sm text-muted">
          Status milestone disimpan per anak di perangkat ini.
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

  const observationFor = (id: string) =>
    state.observations.find(
      (item) => item.childId === activeChild.id && item.skillId === id,
    );

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const observation = observationFor(item.id);
        const source = getSource(item.sourceId);

        return (
          <article
            key={item.id}
            className="rounded-3xl border border-line bg-white p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{item.ageLabel}</Badge>
                  <Badge tone={item.domain === "language" ? "accent" : "neutral"}>
                    {item.domain === "language" ? "Bahasa/komunikasi" : "Sosial/emosional"}
                  </Badge>
                  {observation ? (
                    <span className="text-[11px] text-muted">
                      Diamati {observation.observedAt}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink">{item.text}</p>
                {item.example ? (
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Contoh: {item.example}
                  </p>
                ) : null}
              </div>
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-accent underline underline-offset-4"
              >
                CDC — sumber asli
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() =>
                    setMilestoneObservation(item.id, status, observation?.note)
                  }
                  aria-pressed={observation?.status === status}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    observation?.status === status
                      ? "border-accent bg-accent text-paper"
                      : "border-line text-muted hover:text-ink"
                  }`}
                >
                  {STATUS_LABELS[status]}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpenNote(openNote === item.id ? null : item.id);
                  setNoteDraft(observation?.note ?? "");
                }}
                className="rounded-full px-3 py-1.5 text-xs text-muted underline underline-offset-4"
              >
                Catatan
              </button>
            </div>

            {openNote === item.id ? (
              <div className="mt-3">
                <label
                  htmlFor={`note-${item.id}`}
                  className="text-xs font-medium text-ink"
                >
                  Catatan pengamatan untuk {item.text.slice(0, 40)}…
                </label>
                <textarea
                  id={`note-${item.id}`}
                  value={noteDraft}
                  onChange={(event) => setNoteDraft(event.target.value)}
                  rows={2}
                  maxLength={200}
                  className="mt-1 w-full rounded-2xl border border-line px-3 py-2 text-sm"
                  placeholder="Contoh: menunjuk gambar kucing saat ditanya, 2 kali."
                />
                <button
                  type="button"
                  onClick={() => {
                    setMilestoneObservation(
                      item.id,
                      observation?.status ?? "not_observed",
                      noteDraft,
                    );
                    setOpenNote(null);
                  }}
                  className="mt-2 rounded-full bg-accent px-4 py-2 text-xs font-medium text-paper"
                >
                  Simpan catatan
                </button>
              </div>
            ) : observation?.note ? (
              <p className="mt-2 rounded-xl bg-paper px-3 py-2 text-xs text-muted">
                Catatan: {observation.note}
              </p>
            ) : null}

            <details className="mt-3">
              <summary className="cursor-pointer text-[11px] text-muted">
                Teks asli CDC
              </summary>
              <p className="mt-1 text-xs italic leading-relaxed text-muted">
                “{item.sourceText}”
              </p>
              <p className="mt-1 text-[11px] text-muted">{source.title}</p>
            </details>
          </article>
        );
      })}
    </div>
  );
}
