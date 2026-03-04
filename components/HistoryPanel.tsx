"use client";

import { Trash2, ArrowLeft, Clock, FileText } from "lucide-react";
import { HistoryEntry, AnalysisResult } from "@/types/persona";

interface HistoryPanelProps {
  entries: HistoryEntry[];
  onLoad: (result: AnalysisResult) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HistoryPanel({ entries, onLoad, onDelete, onBack }: HistoryPanelProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      {/* Header */}
      <div className="mb-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium mb-6 transition-opacity hover:opacity-70"
          style={{ color: "var(--fg-secondary)" }}
        >
          <ArrowLeft size={16} />
          Retour
        </button>
        <h1
          className="text-3xl font-bold tracking-tight mb-2"
          style={{ color: "var(--fg-default)", fontFamily: "var(--font-pt-serif), Georgia, serif" }}
        >
          Historique
        </h1>
        <p className="text-sm" style={{ color: "var(--fg-tertiary)" }}>
          {entries.length === 0
            ? "Aucune analyse sauvegardée."
            : `${entries.length} analyse${entries.length > 1 ? "s" : ""} sauvegardée${entries.length > 1 ? "s" : ""} · max 10`}
        </p>
      </div>

      {/* Empty state */}
      {entries.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-16 rounded-lg"
          style={{ border: "1px dashed var(--border-default)", background: "var(--bg-secondary)" }}
        >
          <Clock size={32} style={{ color: "var(--fg-tertiary)" }} className="mb-3" />
          <p className="text-sm" style={{ color: "var(--fg-tertiary)" }}>
            Les analyses apparaîtront ici après chaque upload.
          </p>
        </div>
      )}

      {/* Entry list */}
      {entries.length > 0 && (
        <div className="flex flex-col gap-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="card p-4 flex items-start gap-4 group"
              style={{ cursor: "pointer" }}
              onClick={() => onLoad(entry.result)}
            >
              {/* Left: icon */}
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg mt-0.5"
                style={{ background: "var(--bg-subtle)" }}
              >
                <FileText size={16} style={{ color: "var(--fg-accent-02)" }} />
              </div>

              {/* Center: info */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-medium mb-1"
                  style={{ color: "var(--fg-tertiary)", letterSpacing: "0.04em", textTransform: "uppercase" }}
                >
                  {formatDate(entry.date)}
                </p>
                <div className="flex flex-wrap gap-1">
                  {entry.fileNames.map((name) => (
                    <span
                      key={name}
                      className="inline-block max-w-[200px] truncate rounded px-2 py-0.5 text-xs font-medium"
                      style={{
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-secondary)",
                        color: "var(--fg-secondary)",
                      }}
                      title={name}
                    >
                      {name}
                    </span>
                  ))}
                </div>
                <p className="text-xs mt-2" style={{ color: "var(--fg-tertiary)" }}>
                  {entry.result.archetypes.length} archétype{entry.result.archetypes.length > 1 ? "s" : ""} · {entry.result.jtbds.length} JTBD
                </p>
              </div>

              {/* Right: delete */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(entry.id);
                }}
                className="shrink-0 rounded-lg p-2 transition-colors opacity-0 group-hover:opacity-100"
                style={{ color: "var(--fg-tertiary)" }}
                aria-label="Supprimer cette analyse"
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-error)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-tertiary)")}
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
