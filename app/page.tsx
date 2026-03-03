"use client";

import { useState } from "react";
import { AppView, AnalysisResult } from "@/types/persona";
import InputPanel from "@/components/InputPanel";
import ResultsPanel from "@/components/ResultsPanel";

export default function Home() {
  const [view, setView] = useState<AppView>("input");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(files: File[]) {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("pdfs", f));

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      setResult(data.result);
      setView("results");
    } catch {
      setError("Erreur réseau. Vérifie ta connexion et réessaie.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setView("input");
    setResult(null);
    setError(null);
  }

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-default)" }}>
      {error && (
        <div className="mx-auto max-w-2xl px-4 pt-6">
          <div
            className="rounded-lg border px-4 py-3 text-sm font-medium"
            style={{
              background: "var(--bg-error)",
              borderColor: "var(--border-error)",
              color: "var(--fg-error)",
            }}
          >
            {error}
          </div>
        </div>
      )}

      {view === "input" ? (
        <InputPanel onSubmit={handleSubmit} isLoading={isLoading} />
      ) : (
        result && <ResultsPanel result={result} onReset={handleReset} />
      )}
    </main>
  );
}
