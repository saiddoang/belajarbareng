"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Audio prompt built on the browser's own speech synthesis.
 *
 * It is labelled as synthetic speech, never as a therapist or a recording. If
 * the browser exposes no Indonesian voice, the honest limitation is shown and
 * the transcript remains the primary channel.
 */
export function AudioPrompt({
  text,
  label = "Dengarkan contoh ucapan",
}: {
  text: string;
  label?: string;
}) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [hasIndonesianVoice, setHasIndonesianVoice] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [rate, setRate] = useState(1);
  const [muted, setMuted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    setSupported(true);

    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return;
      setHasIndonesianVoice(
        voices.some((voice) => voice.lang.toLowerCase().startsWith("id")),
      );
    };

    checkVoices();
    window.speechSynthesis.addEventListener("voiceschanged", checkVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", checkVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = () => {
    if (!supported) return;
    if (muted) {
      setMessage("Suara sedang dibisukan. Transkrip tetap bisa dibaca.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    utterance.rate = rate;
    const indonesian = window.speechSynthesis
      .getVoices()
      .find((voice) => voice.lang.toLowerCase().startsWith("id"));
    if (indonesian) utterance.voice = indonesian;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => {
      setSpeaking(false);
      setMessage(
        "Peramban gagal memutar suara. Baca transkrip di bawah sebagai gantinya.",
      );
    };
    utteranceRef.current = utterance;
    setMessage(null);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {label}
      </p>

      {supported === false ? (
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Peramban ini tidak mendukung pemutaran suara. Gunakan transkrip di
          bawah; bacakan sendiri saat bermain bersama anak.
        </p>
      ) : (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={speaking ? stop : speak}
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-paper"
            aria-label={speaking ? "Hentikan suara" : "Putar contoh ucapan"}
          >
            {speaking ? "Hentikan" : "Putar suara"}
          </button>
          <button
            type="button"
            onClick={() => setMuted((value) => !value)}
            aria-pressed={muted}
            className="rounded-full border border-line px-4 py-2 text-sm text-ink"
          >
            {muted ? "Nyalakan suara" : "Bisukan"}
          </button>
          <label className="flex items-center gap-2 text-xs text-muted">
            Kecepatan
            <select
              value={rate}
              onChange={(event) => setRate(Number(event.target.value))}
              className="rounded-full border border-line bg-white px-2 py-1 text-xs text-ink"
            >
              <option value={0.8}>Pelan</option>
              <option value={1}>Normal</option>
              <option value={1.15}>Cepat</option>
            </select>
          </label>
        </div>
      )}

      <p className="mt-3 rounded-xl bg-paper px-3 py-2 text-sm leading-relaxed text-ink">
        <span className="font-medium">Transkrip: </span>“{text}”
      </p>
      <p className="mt-2 text-[11px] leading-relaxed text-muted">
        Suara sintetis dari peramban, bukan rekaman terapis.
        {hasIndonesianVoice
          ? " Suara Bahasa Indonesia tersedia di perangkat ini."
          : " Perangkat ini tidak memiliki suara Bahasa Indonesia; pengucapan bisa berbeda."}
      </p>
      {message ? (
        <p role="status" className="mt-2 text-xs text-amber-900">
          {message}
        </p>
      ) : null}
    </div>
  );
}
