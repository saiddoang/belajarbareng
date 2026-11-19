import type { Metadata } from "next";
import { Dashboard } from "@/components/speech-delay/dashboard";

export const metadata: Metadata = {
  title: "Beranda — Ruang Wicara",
  description:
    "Pendamping harian latihan stimulasi komunikasi di rumah untuk anak usia 2 tahun ke atas. Non-diagnostik.",
};

export default function SpeechDelayHomePage() {
  return <Dashboard />;
}
