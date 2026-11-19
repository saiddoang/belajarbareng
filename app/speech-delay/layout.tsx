import type { Metadata } from "next";
import type { ReactNode } from "react";
import { HubShell } from "@/components/speech-delay/hub-shell";
import { SpeechStoreProvider } from "@/lib/speech-delay/store";

export const metadata: Metadata = {
  title: "Ruang Wicara — Stimulasi Komunikasi di Rumah",
  description:
    "Pendamping orang tua untuk latihan stimulasi komunikasi di rumah: 30 aktivitas bermain, milestone CDC 2–5 tahun, catatan pengamatan, dan laporan persiapan konsultasi. Bukan alat diagnosis.",
  robots: { index: true, follow: true },
};

export default function SpeechDelayLayout({ children }: { children: ReactNode }) {
  return (
    <SpeechStoreProvider>
      <HubShell>{children}</HubShell>
    </SpeechStoreProvider>
  );
}
