"use client";

import { useState } from "react";
import { useSpeechStore } from "@/lib/speech-delay/store";
import { toISODate, startOfWeek } from "@/lib/speech-delay/progress";
import {
  buttonPrimary,
  buttonSecondary,
  inputClass,
  labelClass,
} from "./ui";

/**
 * Review intervals are a product convention to prompt reflection, not a
 * clinically proven therapy schedule. The copy says so.
 */
export function ReflectionForms() {
  const { ready, activeChild, state, addReflection, addGoalReview } =
    useSpeechStore();
  const [weekOf, setWeekOf] = useState(toISODate(startOfWeek(new Date())));
  const [wins, setWins] = useState("");
  const [concerns, setConcerns] = useState("");
  const [nextWeek, setNextWeek] = useState("");
  const [monthOf, setMonthOf] = useState(`${new Date().toISOString().slice(0, 7)}-01`);
  const [monthSummary, setMonthSummary] = useState("");
  const [decision, setDecision] = useState<"lanjut" | "ubah" | "istirahat" | "konsultasi">(
    "lanjut",
  );
  const [tab, setTab] = useState<"mingguan" | "bulanan">("mingguan");
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  if (!ready) return <p className="text-sm text-muted">Memuat…</p>;
  if (!activeChild) {
    return (
      <p className="text-sm text-muted">
        Buat profil anak untuk memakai refleksi berkala.
      </p>
    );
  }

  const reflections = state.reflections
    .filter((item) => item.childId === activeChild.id)
    .sort((a, b) => b.weekOf.localeCompare(a.weekOf));
  const reviews = state.goalReviews
    .filter((item) => item.childId === activeChild.id)
    .sort((a, b) => b.monthOf.localeCompare(a.monthOf));

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTab("mingguan")}
          aria-pressed={tab === "mingguan"}
          className={tab === "mingguan" ? buttonPrimary : buttonSecondary}
        >
          Refleksi mingguan
        </button>
        <button
          type="button"
          onClick={() => setTab("bulanan")}
          aria-pressed={tab === "bulanan"}
          className={tab === "bulanan" ? buttonPrimary : buttonSecondary}
        >
          Tinjauan goal bulanan
        </button>
      </div>

      {tab === "mingguan" ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addReflection({ weekOf, wins, concerns, nextWeek });
            setWins("");
            setConcerns("");
            setNextWeek("");
            setSavedMessage("Refleksi mingguan tersimpan di perangkat ini.");
          }}
          className="space-y-4 rounded-3xl border border-line bg-white p-6"
        >
          <p className="text-xs leading-relaxed text-muted">
            Ritme ini adalah kebiasaan meninjau, bukan jadwal terapi yang terbukti
            secara klinis. Sesuaikan dengan waktu keluarga.
          </p>

          <div>
            <label htmlFor="week-of" className={labelClass}>
              Pekan yang ditinjau
            </label>
            <input
              id="week-of"
              type="date"
              value={weekOf}
              onChange={(event) => setWeekOf(event.target.value)}
              className={`mt-1 ${inputClass}`}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="wins" className={labelClass}>
                Yang berjalan baik
              </label>
              <textarea
                id="wins"
                value={wins}
                onChange={(event) => setWins(event.target.value)}
                rows={3}
                maxLength={400}
                className={`mt-1 ${inputClass}`}
                placeholder="Contoh: anak menatap buku lebih lama."
              />
            </div>
            <div>
              <label htmlFor="concerns" className={labelClass}>
                Kekhawatiran
              </label>
              <textarea
                id="concerns"
                value={concerns}
                onChange={(event) => setConcerns(event.target.value)}
                rows={3}
                maxLength={400}
                className={`mt-1 ${inputClass}`}
                placeholder="Contoh: belum ada dua kata."
              />
            </div>
            <div>
              <label htmlFor="next-week" className={labelClass}>
                Satu hal untuk pekan depan
              </label>
              <textarea
                id="next-week"
                value={nextWeek}
                onChange={(event) => setNextWeek(event.target.value)}
                rows={3}
                maxLength={400}
                className={`mt-1 ${inputClass}`}
                placeholder="Contoh: coba pilihan di waktu makan."
              />
            </div>
          </div>

          <button type="submit" className={buttonPrimary}>
            Simpan refleksi
          </button>
        </form>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addGoalReview({ monthOf, summary: monthSummary, decision });
            setMonthSummary("");
            setSavedMessage("Tinjauan bulanan tersimpan.");
          }}
          className="space-y-4 rounded-3xl border border-line bg-white p-6"
        >
          <div>
            <label htmlFor="month-of" className={labelClass}>
              Bulan yang ditinjau
            </label>
            <input
              id="month-of"
              type="date"
              value={monthOf}
              onChange={(event) => setMonthOf(event.target.value)}
              className={`mt-1 ${inputClass}`}
            />
          </div>
          <div>
            <label htmlFor="month-summary" className={labelClass}>
              Ringkasan
            </label>
            <textarea
              id="month-summary"
              value={monthSummary}
              onChange={(event) => setMonthSummary(event.target.value)}
              rows={3}
              maxLength={500}
              className={`mt-1 ${inputClass}`}
              placeholder="Apa yang berubah, apa yang tetap, dan apa yang ingin ditanyakan ke profesional?"
            />
          </div>
          <div>
            <label htmlFor="month-decision" className={labelClass}>
              Keputusan
            </label>
            <select
              id="month-decision"
              value={decision}
              onChange={(event) =>
                setDecision(event.target.value as typeof decision)
              }
              className={`mt-1 ${inputClass}`}
            >
              <option value="lanjut">Lanjutkan goal yang sama</option>
              <option value="ubah">Ubah kriteria atau aktivitas</option>
              <option value="istirahat">Istirahat dari latihan terjadwal</option>
              <option value="konsultasi">Konsultasi dengan profesional</option>
            </select>
          </div>
          <button type="submit" className={buttonPrimary}>
            Simpan tinjauan
          </button>
        </form>
      )}

      {savedMessage ? (
        <p role="status" className="text-sm text-accent">
          {savedMessage}
        </p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-3xl border border-line bg-white p-5">
          <h3 className="text-sm font-medium">Riwayat refleksi</h3>
          {reflections.length === 0 ? (
            <p className="mt-2 text-xs text-muted">Belum ada refleksi.</p>
          ) : (
            <ul className="mt-3 space-y-3 text-sm">
              {reflections.slice(0, 6).map((item) => (
                <li key={item.id} className="rounded-2xl bg-paper p-3">
                  <p className="text-xs font-medium text-ink">{item.weekOf}</p>
                  {item.wins ? (
                    <p className="mt-1 text-xs text-muted">Baik: {item.wins}</p>
                  ) : null}
                  {item.concerns ? (
                    <p className="mt-1 text-xs text-muted">
                      Khawatir: {item.concerns}
                    </p>
                  ) : null}
                  {item.nextWeek ? (
                    <p className="mt-1 text-xs text-muted">
                      Berikutnya: {item.nextWeek}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-3xl border border-line bg-white p-5">
          <h3 className="text-sm font-medium">Riwayat tinjauan bulanan</h3>
          {reviews.length === 0 ? (
            <p className="mt-2 text-xs text-muted">Belum ada tinjauan.</p>
          ) : (
            <ul className="mt-3 space-y-3 text-sm">
              {reviews.slice(0, 6).map((item) => (
                <li key={item.id} className="rounded-2xl bg-paper p-3">
                  <p className="text-xs font-medium text-ink">
                    {item.monthOf} · {item.decision}
                  </p>
                  {item.summary ? (
                    <p className="mt-1 text-xs text-muted">{item.summary}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
