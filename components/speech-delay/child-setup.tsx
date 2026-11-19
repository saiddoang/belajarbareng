"use client";

import { useState } from "react";
import { buttonPrimary, inputClass, labelClass } from "./ui";
import { useSpeechStore } from "@/lib/speech-delay/store";

const languageOptions = ["Indonesia", "Inggris", "Daerah", "Lainnya"];

export function ChildSetup({
  mode = "create",
  onDone,
}: {
  mode?: "create" | "edit";
  onDone?: (childId: string) => void;
}) {
  const { ready, activeChild, addChild, updateChild } = useSpeechStore();
  const [nickname, setNickname] = useState(
    mode === "edit" ? (activeChild?.nickname ?? "") : "",
  );
  const [years, setYears] = useState(
    mode === "edit" && activeChild ? Math.floor(activeChild.ageMonths / 12) : 2,
  );
  const [months, setMonths] = useState(
    mode === "edit" && activeChild ? activeChild.ageMonths % 12 : 0,
  );
  const [languages, setLanguages] = useState<string[]>(
    mode === "edit" && activeChild ? activeChild.homeLanguages : ["Indonesia"],
  );
  const [note, setNote] = useState(
    mode === "edit" ? (activeChild?.caregiverNote ?? "") : "",
  );
  const [error, setError] = useState<string | null>(null);

  if (!ready) {
    return <p className="text-sm text-muted">Memuat…</p>;
  }

  const toggleLanguage = (language: string) => {
    setLanguages((previous) =>
      previous.includes(language)
        ? previous.filter((item) => item !== language)
        : [...previous, language],
    );
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const ageMonths = years * 12 + months;

    if (!nickname.trim()) {
      setError("Isi nama panggilan anak (boleh nama samaran).");
      return;
    }
    if (!Number.isInteger(ageMonths) || ageMonths < 24 || months < 0 || months > 11) {
      setError(
        "Modul ini untuk anak usia 2 tahun ke atas. Isi tahun dan bulan yang sesuai.",
      );
      return;
    }
    if (languages.length === 0) {
      setError("Pilih setidaknya satu bahasa yang dipakai di rumah.");
      return;
    }

    setError(null);

    if (mode === "edit" && activeChild) {
      updateChild(activeChild.id, {
        nickname: nickname.trim(),
        ageMonths,
        homeLanguages: languages,
        caregiverNote: note.trim() || undefined,
      });
      onDone?.(activeChild.id);
      return;
    }

    const child = addChild({
      nickname,
      ageMonths,
      homeLanguages: languages,
      caregiverNote: note,
    });
    onDone?.(child.id);
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label htmlFor="nama-panggilan" className={labelClass}>
          Nama panggilan anak
        </label>
        <p className="mt-1 text-xs text-muted">
          Cukup nama panggilan. Jangan tulis nama lengkap atau tanggal lahir.
        </p>
        <input
          id="nama-panggilan"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          maxLength={40}
          className={`mt-2 ${inputClass}`}
          placeholder="Misalnya: Alya"
          autoComplete="off"
        />
      </div>

      <fieldset>
        <legend className={labelClass}>Usia saat ini</legend>
        <div className="mt-2 flex gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="number"
              min={2}
              value={years}
              onChange={(event) => setYears(Number(event.target.value))}
              className="w-20 rounded-2xl border border-line px-3 py-2 text-sm"
              aria-label="Tahun"
            />
            tahun
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="number"
              min={0}
              max={11}
              value={months}
              onChange={(event) => setMonths(Number(event.target.value))}
              className="w-20 rounded-2xl border border-line px-3 py-2 text-sm"
              aria-label="Bulan"
            />
            bulan
          </label>
        </div>
        <p className="mt-2 text-xs text-muted">
          Usia hanya dipakai untuk menampilkan panduan milestone, bukan untuk
          memilih level latihan.
        </p>
      </fieldset>

      <fieldset>
        <legend className={labelClass}>Bahasa di rumah</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {languageOptions.map((language) => (
            <label
              key={language}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm ${
                languages.includes(language)
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-line text-muted"
              }`}
            >
              <input
                type="checkbox"
                checked={languages.includes(language)}
                onChange={() => toggleLanguage(language)}
                className="sr-only"
              />
              {language}
            </label>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">
          Kemampuan di semua bahasa dihitung bersama. Dua bahasa tidak dianggap
          penyebab keterlambatan.
        </p>
      </fieldset>

      <div>
        <label htmlFor="catatan-pengasuh" className={labelClass}>
          Catatan pengasuh (opsional)
        </label>
        <textarea
          id="catatan-pengasuh"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={2}
          maxLength={300}
          placeholder="Hal yang ingin Anda ingat, misalnya: suka buku dan mobil."
          className={`mt-2 ${inputClass}`}
        />
      </div>

      {error ? (
        <p role="alert" className="text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <button type="submit" className={buttonPrimary}>
        {mode === "edit" ? "Simpan perubahan" : "Simpan profil di perangkat ini"}
      </button>
    </form>
  );
}
