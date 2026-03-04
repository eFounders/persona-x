"use client";

import { useEffect, useState } from "react";
import { AnalysisResult } from "@/types/persona";
import { decodeResult } from "@/lib/share";
import ResultsPanel from "@/components/ResultsPanel";

export default function SharePage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) {
      setError(true);
      return;
    }
    try {
      setResult(decodeResult(hash));
    } catch {
      setError(true);
    }
  }, []);

  if (error) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg-default)" }}
      >
        <div className="text-center px-4">
          <p
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--fg-default)" }}
          >
            Lien invalide ou expiré.
          </p>
          <a
            href="/"
            className="text-sm"
            style={{ color: "var(--fg-accent-02)" }}
          >
            Faire une nouvelle analyse →
          </a>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg-default)" }}
      >
        <p className="text-sm" style={{ color: "var(--fg-tertiary)" }}>
          Chargement…
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-default)" }}>
      <ResultsPanel result={result} onReset={() => (window.location.href = "/")} shareMode />
    </main>
  );
}
