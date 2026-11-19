"use client";

import { useEffect } from "react";

/**
 * The site root layout owns a single <html lang="en"> because the portfolio is
 * English-only. This module is Indonesian, so the attribute is corrected on the
 * client as soon as it mounts. Documented in SPEECH_DELAY_QA_REPORT.md.
 */
export function LangSync() {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.lang;
    root.lang = "id";
    return () => {
      root.lang = previous;
    };
  }, []);

  return null;
}
