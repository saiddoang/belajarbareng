"use client";

import { useMemo, useState } from "react";
import { ActivityCard } from "./activity-card";
import { EmptyState, buttonSecondary, inputClass } from "./ui";
import { filterActivities } from "@/lib/speech-delay/activities";
import { DOMAIN_LABELS } from "@/lib/speech-delay/types";
import type { CommunicationDomain } from "@/lib/speech-delay/types";

const domains = Object.keys(DOMAIN_LABELS) as CommunicationDomain[];

export function ActivityBrowser() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<number | "all">("all");
  const [domain, setDomain] = useState<CommunicationDomain | "all">("all");

  const results = useMemo(
    () => filterActivities({ query, level, domain }),
    [query, level, domain],
  );

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <label htmlFor="cari-aktivitas" className="mb-1 block text-sm font-medium">
            Cari aktivitas
          </label>
          <input
            id="cari-aktivitas"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Misalnya: buku, meminta, dua kata"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="filter-level" className="mb-1 block text-sm font-medium">
            Level fungsional
          </label>
          <select
            id="filter-level"
            value={String(level)}
            onChange={(event) =>
              setLevel(
                event.target.value === "all" ? "all" : Number(event.target.value),
              )
            }
            className={inputClass}
          >
            <option value="all">Semua level</option>
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <option key={item} value={item}>
                Level {item}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="filter-domain" className="mb-1 block text-sm font-medium">
            Area komunikasi
          </label>
          <select
            id="filter-domain"
            value={domain}
            onChange={(event) =>
              setDomain(event.target.value as CommunicationDomain | "all")
            }
            className={inputClass}
          >
            <option value="all">Semua area</option>
            {domains.map((item) => (
              <option key={item} value={item}>
                {DOMAIN_LABELS[item]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-muted">
          {results.length} aktivitas ditemukan.
        </p>
        {query || level !== "all" || domain !== "all" ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setLevel("all");
              setDomain("all");
            }}
            className={buttonSecondary}
          >
            Hapus filter
          </button>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="Tidak ada aktivitas yang cocok"
            description="Coba kata kunci yang lebih sederhana, atau hapus filter level dan area komunikasi."
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}
