"use client";

import { useSpeechStore } from "@/lib/speech-delay/store";
import { buttonSecondary } from "./ui";

export function ExportButton() {
  const { exportJson, activeChild } = useSpeechStore();

  const download = () => {
    const json = exportJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeName = (activeChild?.nickname ?? "anak")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    link.href = url;
    link.download = `ruang-wicara-${safeName || "data"}-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button type="button" onClick={download} className={buttonSecondary}>
      Ekspor JSON
    </button>
  );
}
