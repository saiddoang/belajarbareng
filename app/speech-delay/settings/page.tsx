import type { Metadata } from "next";
import { SettingsPanel } from "@/components/speech-delay/settings-panel";
import { Breadcrumbs, SectionTitle } from "@/components/speech-delay/ui";

export const metadata: Metadata = {
  title: "Pengaturan — Ruang Wicara",
  description:
    "Kelola profil anak, preferensi suara, ekspor dan impor data lokal, serta hapus seluruh data dari perangkat ini.",
};

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Pengaturan" }]} />
      <SectionTitle
        eyebrow="Data lokal"
        title="Pengaturan dan data di perangkat ini"
        description="Tidak ada akun dan tidak ada unggahan ke server. Semua data berada di localStorage peramban ini; ekspor berkas JSON bila Anda ingin menyimpan salinan."
      />
      <div className="mt-8">
        <SettingsPanel />
      </div>
    </div>
  );
}
