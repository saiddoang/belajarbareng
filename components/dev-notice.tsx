import type { ReactNode } from "react";

export function DevNotice({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-6">
      <p className="rounded-lg border border-dashed border-line bg-white/60 px-4 py-3 text-sm leading-relaxed text-muted">
        {children}
      </p>
    </div>
  );
}
