"use client";

import { useEffect, useState } from "react";
import type { IllustrationKey } from "@/lib/speech-delay/types";
import { Illustration } from "./illustration";

/**
 * Step-by-step animated illustration. It is explicitly not a video recording:
 * the artwork is local SVG and the steps are the activity's own instructions.
 */
export function DemoPlayer({
  steps,
  illustration,
  label,
  title = "Ilustrasi langkah kegiatan",
}: {
  steps: string[];
  illustration: IllustrationKey;
  label: string;
  title?: string;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    if (!playing || reducedMotion) return;
    if (index >= steps.length - 1) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => setIndex((value) => value + 1), 4200);
    return () => window.clearTimeout(timer);
  }, [playing, index, steps.length, reducedMotion]);

  const current = steps[index] ?? "";

  return (
    <section
      aria-label={title}
      className="rounded-2xl border border-line bg-white p-4 sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          {title}
        </p>
        <span className="rounded-full border border-line px-3 py-1 text-[10px] text-muted">
          Ilustrasi animasi — bukan rekaman video
        </span>
      </div>

      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div
          className="shrink-0 rounded-2xl bg-paper p-3"
          data-playing={playing && !reducedMotion}
        >
          <Illustration
            kind={illustration}
            label={label}
            className={`h-28 w-28 sm:h-32 sm:w-32 ${
              playing && !reducedMotion ? "motion-safe:animate-pulse" : ""
            }`}
          />
        </div>

        <div className="min-h-20 flex-1">
          <p className="text-xs text-muted">
            Langkah {index + 1} dari {steps.length}
          </p>
          <p aria-live="polite" className="mt-1 text-sm leading-relaxed text-ink">
            {current}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (index >= steps.length - 1) setIndex(0);
                setPlaying((value) => !value);
              }}
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-paper"
              aria-label={playing ? "Jeda ilustrasi" : "Mainkan ilustrasi"}
            >
              {playing ? "Jeda" : index >= steps.length - 1 ? "Ulangi" : "Mainkan"}
            </button>
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                setIndex((value) => Math.max(0, value - 1));
              }}
              disabled={index === 0}
              className="rounded-full border border-line px-3 py-2 text-sm text-ink disabled:opacity-40"
            >
              Sebelumnya
            </button>
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                setIndex((value) => Math.min(steps.length - 1, value + 1));
              }}
              disabled={index === steps.length - 1}
              className="rounded-full border border-line px-3 py-2 text-sm text-ink disabled:opacity-40"
            >
              Berikutnya
            </button>
          </div>

          <div className="mt-3 flex gap-1" aria-hidden="true">
            {steps.map((step, stepIndex) => (
              <span
                key={step}
                className={`h-1.5 flex-1 rounded-full ${
                  stepIndex <= index ? "bg-accent" : "bg-line"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <details className="mt-4 rounded-xl bg-paper px-3 py-2">
        <summary className="cursor-pointer text-xs font-medium text-ink">
          Transkrip lengkap semua langkah
        </summary>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs leading-relaxed text-muted">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </details>
      {reducedMotion ? (
        <p className="mt-2 text-[11px] text-muted">
          Animasi otomatis dimatikan karena pengaturan “kurangi gerakan” aktif.
          Gunakan tombol Sebelumnya/Berikutnya.
        </p>
      ) : null}
    </section>
  );
}
