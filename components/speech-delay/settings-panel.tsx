"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ExportButton } from "./export-button";
import { ChildSetup } from "./child-setup";
import { useSpeechStore } from "@/lib/speech-delay/store";
import {
  SafetyNote,
  buttonPrimary,
  buttonSecondary,
  inputClass,
  labelClass,
} from "./ui";

export function SettingsPanel() {
  const {
    ready,
    state,
    activeChild,
    children,
    setActiveChild,
    removeChild,
    importJson,
    resetAll,
    updateSettings,
    error,
  } = useSpeechStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  if (!ready) return <p className="text-sm text-muted">Memuat…</p>;

  const counts = {
    sessions: state.sessions.length,
    observations: state.observations.length,
    goals: state.goals.length,
    reflections: state.reflections.length + state.goalReviews.length,
    baselines: state.baselines.length,
  };

  const onImport = async (file: File) => {
    const text = await file.text();
    const result = importJson(text);
    setMessage(
      result.ok
        ? "Data berhasil diimpor dan menggantikan data di perangkat ini."
        : (result.error ?? "Impor gagal."),
    );
  };

  return (
    <div className="space-y-6">
      {error ? <SafetyNote>{error}</SafetyNote> : null}
      {message ? (
        <p role="status" className="rounded-2xl bg-accent/10 px-4 py-3 text-sm text-accent">
          {message}
        </p>
      ) : null}

      <section className="rounded-3xl border border-line bg-white p-6">
        <h2 className="text-lg font-semibold tracking-tight">Profil anak</h2>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Data disimpan di peramban perangkat ini (localStorage). Tidak ada
          unggahan ke server, tidak ada akun, dan tidak ada pelacakan pihak ketiga.
        </p>

        {children.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Belum ada profil.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {children.map((child) => (
              <li
                key={child.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-paper px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-ink">
                    {child.nickname}{" "}
                    <span className="text-xs font-normal text-muted">
                      {Math.floor(child.ageMonths / 12)} tahun {child.ageMonths % 12} bulan
                    </span>
                  </p>
                  <p className="text-xs text-muted">
                    Bahasa: {child.homeLanguages.join(", ")}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  {activeChild?.id === child.id ? (
                    <span className="text-accent">aktif</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveChild(child.id)}
                      className="text-accent underline underline-offset-4"
                    >
                      Jadikan aktif
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Hapus profil ${child.nickname} beserta seluruh catatan? Tindakan ini tidak bisa dibatalkan.`,
                        )
                      ) {
                        removeChild(child.id);
                        setMessage(`Profil ${child.nickname} dan catatannya dihapus.`);
                      }
                    }}
                    className="text-red-800 underline underline-offset-4"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/speech-delay/onboarding" className={buttonSecondary}>
            Tambah profil
          </Link>
          {activeChild ? (
            <button
              type="button"
              onClick={() => setShowEdit((value) => !value)}
              className={buttonSecondary}
            >
              {showEdit ? "Tutup edit" : "Edit profil aktif"}
            </button>
          ) : null}
        </div>

        {showEdit && activeChild ? (
          <div className="mt-5 border-t border-line pt-5">
            <ChildSetup mode="edit" onDone={() => setShowEdit(false)} />
          </div>
        ) : null}
      </section>

      <section className="rounded-3xl border border-line bg-white p-6">
        <h2 className="text-lg font-semibold tracking-tight">Preferensi</h2>
        <div className="mt-4 space-y-4">
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={state.settings.audioEnabled}
              onChange={(event) =>
                updateSettings({ audioEnabled: event.target.checked })
              }
              className="mt-1 accent-[#1F4D3F]"
            />
            <span>
              <span className="block font-medium">Sediakan tombol suara</span>
              <span className="block text-xs text-muted">
                Memakai suara sintetis peramban. Bisa dimatikan kapan saja; transkrip
                selalu tersedia.
              </span>
            </span>
          </label>

          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={state.settings.showEnglishSourceText}
              onChange={(event) =>
                updateSettings({ showEnglishSourceText: event.target.checked })
              }
              className="mt-1 accent-[#1F4D3F]"
            />
            <span>
              <span className="block font-medium">
                Tampilkan teks sumber berbahasa Inggris
              </span>
              <span className="block text-xs text-muted">
                Berguna saat berkonsultasi dengan profesional yang membaca literatur
                Inggris.
              </span>
            </span>
          </label>

          <div>
            <label htmlFor="ritme" className={labelClass}>
              Ritme tinjauan yang Anda inginkan
            </label>
            <select
              id="ritme"
              value={state.settings.reviewRhythm}
              onChange={(event) =>
                updateSettings({
                  reviewRhythm: event.target.value as typeof state.settings.reviewRhythm,
                })
              }
              className={`mt-1 max-w-xs ${inputClass}`}
            >
              <option value="mingguan">Mingguan</option>
              <option value="dua_mingguan">Dua mingguan</option>
              <option value="bulanan">Bulanan</option>
            </select>
            <p className="mt-1 text-xs text-muted">
              Ini preferensi pengingat di aplikasi, bukan jadwal terapi.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-line bg-white p-6">
        <h2 className="text-lg font-semibold tracking-tight">Data di perangkat ini</h2>
        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-5">
          {Object.entries(counts).map(([key, value]) => (
            <div key={key} className="rounded-2xl bg-paper p-3">
              <dt className="text-[11px] uppercase tracking-wide text-muted">{key}</dt>
              <dd className="text-lg font-semibold text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex flex-wrap gap-3">
          <ExportButton />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className={buttonSecondary}
          >
            Impor JSON
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void onImport(file);
              event.target.value = "";
            }}
          />
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          Ekspor menghasilkan berkas JSON berisi profil panggilan, catatan latihan,
          observasi, dan goal. Simpan berkas itu di tempat yang Anda percaya; berkas
          tidak dienkripsi.
        </p>

        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50/60 p-4">
          <h3 className="text-sm font-medium text-red-900">Hapus seluruh data</h3>
          <p className="mt-1 text-xs leading-relaxed text-red-900/80">
            Menghapus semua profil dan catatan dari perangkat ini. Tidak ada salinan
            di server, jadi tindakan ini tidak bisa dibatalkan.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <input
              value={confirmText}
              onChange={(event) => setConfirmText(event.target.value)}
              placeholder="Tulis HAPUS"
              aria-label="Ketik HAPUS untuk konfirmasi"
              className="w-40 rounded-full border border-red-300 bg-white px-4 py-2 text-sm"
            />
            <button
              type="button"
              disabled={confirmText.trim().toUpperCase() !== "HAPUS"}
              onClick={() => {
                resetAll();
                setConfirmText("");
                setMessage("Seluruh data di perangkat ini telah dihapus.");
              }}
              className={buttonPrimary}
            >
              Hapus semua data
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
