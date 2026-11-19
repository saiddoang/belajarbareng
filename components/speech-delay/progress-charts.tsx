import type { WeeklyPractice, DomainCount } from "@/lib/speech-delay/progress";
import { DOMAIN_LABELS } from "@/lib/speech-delay/types";
import { EmptyState } from "./ui";

export function WeeklyPracticeChart({ data }: { data: WeeklyPractice[] }) {
  const max = Math.max(1, ...data.map((item) => item.count));
  const total = data.reduce((sum, item) => sum + item.count, 0);

  if (total === 0) {
    return (
      <EmptyState
        title="Belum ada sesi latihan tercatat"
        description="Grafik ini hanya menampilkan sesi yang benar-benar Anda simpan. Setelah satu sesi tersimpan, batang pertama akan muncul."
      />
    );
  }

  return (
    <figure>
      <div
        className="flex items-end gap-2"
        role="img"
        aria-label={`Sesi latihan per pekan, total ${total} sesi dalam ${data.length} pekan terakhir.`}
      >
        {data.map((item) => {
          const height = Math.round((item.count / max) * 100);
          return (
            <div key={item.weekStart} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-[11px] text-muted">{item.count}</span>
              <div
                className="w-full rounded-t-xl bg-accent/80"
                style={{ height: `${Math.max(item.count === 0 ? 2 : 10, height)}%` }}
                title={`${item.label}: ${item.count} sesi`}
              />
              <span className="text-[10px] leading-tight text-muted">{item.label}</span>
            </div>
          );
        })}
      </div>
      <figcaption className="mt-3 text-xs text-muted">
        Jumlah sesi latihan yang disimpan per pekan. Ini menghitung partisipasi
        kegiatan, bukan kemajuan bicara.
      </figcaption>
      <table className="sr-only">
        <caption>Sesi per pekan</caption>
        <tbody>
          {data.map((item) => (
            <tr key={item.weekStart}>
              <th scope="row">{item.label}</th>
              <td>{item.count} sesi</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

export function DomainChart({ data }: { data: DomainCount[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-muted">
        Area komunikasi akan muncul setelah ada sesi tersimpan.
      </p>
    );
  }

  const max = Math.max(...data.map((item) => item.count));

  return (
    <ul className="space-y-3">
      {data.map((item) => (
        <li key={item.domain}>
          <div className="flex items-center justify-between text-xs text-muted">
            <span>{DOMAIN_LABELS[item.domain]}</span>
            <span>{item.count} sesi</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-line">
            <div
              className="h-2 rounded-full bg-accent"
              style={{ width: `${Math.round((item.count / max) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
