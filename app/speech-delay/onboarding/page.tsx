import type { Metadata } from "next";
import { OnboardingFlow } from "@/components/speech-delay/onboarding-flow";
import { Breadcrumbs, Disclaimer } from "@/components/speech-delay/ui";

export const metadata: Metadata = {
  title: "Kenali kemampuan awal — Ruang Wicara",
  description:
    "Cek kemampuan awal non-diagnostik untuk memilih titik mulai latihan komunikasi di rumah.",
};

export default function OnboardingPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Kenali kemampuan awal" }]} />
      <OnboardingFlow />
      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  );
}
