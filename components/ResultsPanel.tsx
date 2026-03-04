"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AnalysisResult, ResultsTab } from "@/types/persona";
import ArchetypeCard from "./PersonaCard";
import JtbdCard from "./JtbdCard";

interface ResultsPanelProps {
  result: AnalysisResult;
  onReset: () => void;
}

const TABS: { id: ResultsTab; label: string; count?: (r: AnalysisResult) => number }[] = [
  { id: "archetypes", label: "Archetypes",     count: (r) => r.archetypes.length },
  { id: "jtbd",       label: "Jobs To Be Done", count: (r) => r.jtbds.length },
];

export default function ResultsPanel({ result, onReset }: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<ResultsTab>("archetypes");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: "var(--fg-secondary)" }}
        >
          <ArrowLeft size={16} />
          Nouvelle analyse
        </button>
        <h1
          className="text-2xl font-black tracking-tight"
          style={{ color: "var(--fg-default)", fontFamily: "var(--font-pt-serif), Georgia, serif" }}
        >
          PersonaX
        </h1>
      </div>

      {/* Tab nav */}
      <div
        className="flex gap-0 border-b mb-8"
        style={{ borderColor: "var(--border-default)" }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = tab.count?.(result);
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-5 py-3 text-sm font-semibold transition-colors"
              style={{
                color: isActive ? "var(--fg-accent-02)" : "var(--fg-tertiary)",
                borderBottom: isActive
                  ? "2.5px solid var(--border-accent)"
                  : "2.5px solid transparent",
              }}
            >
              {tab.label}
              {count !== undefined && (
                <span className="ml-1.5 text-xs font-bold">
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Archetypes tab */}
      {activeTab === "archetypes" && (
        <section>
          <SectionHeader
            title="Behavioral Archetypes"
            description={`${result.archetypes.length} archétype${result.archetypes.length > 1 ? "s" : ""} identifié${result.archetypes.length > 1 ? "s" : ""} · 100% comportemental · ancré dans les verbatims`}
          />
          <div className="space-y-8">
            {result.archetypes.map((archetype, i) => (
              <ArchetypeCard key={i} archetype={archetype} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* JTBD tab */}
      {activeTab === "jtbd" && (
        <section>
          <SectionHeader
            title="Jobs To Be Done"
            description={`${result.jtbds.length} jobs identifiés — rattachés aux archetypes et au nombre d'interviewés concernés.`}
          />
          <div className="space-y-4">
            {result.jtbds.map((jtbd, i) => (
              <JtbdCard key={i} jtbd={jtbd} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <h2
        className="text-2xl font-bold mb-1"
        style={{ color: "var(--fg-default)", fontFamily: "var(--font-pt-serif), Georgia, serif" }}
      >
        {title}
      </h2>
      <p className="text-sm" style={{ color: "var(--fg-tertiary)" }}>
        {description}
      </p>
    </div>
  );
}
