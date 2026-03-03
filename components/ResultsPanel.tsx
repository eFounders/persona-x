"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AnalysisResult, ResultsTab } from "@/types/persona";
import EmpathyMapCard from "./EmpathyMapCard";
import PersonaCard from "./PersonaCard";
import JtbdCard from "./JtbdCard";

interface ResultsPanelProps {
  result: AnalysisResult;
  onReset: () => void;
}

const TABS: { id: ResultsTab; label: string; count?: (r: AnalysisResult) => number }[] = [
  { id: "empathy", label: "Empathy Map" },
  { id: "personas", label: "Personas", count: (r) => r.personas.length },
  { id: "jtbd", label: "Jobs To Be Done", count: (r) => r.jtbds.length },
];

export default function ResultsPanel({ result, onReset }: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<ResultsTab>("empathy");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: "var(--color-muted)" }}
        >
          <ArrowLeft size={16} />
          Nouvelle analyse
        </button>
        <h1
          className="text-2xl font-black tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          PersonaX
        </h1>
      </div>

      {/* Tab nav */}
      <div
        className="flex gap-0 border-b mb-8"
        style={{ borderColor: "var(--color-border)" }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = tab.count?.(result);
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-5 py-3 text-sm font-semibold transition-colors relative"
              style={{
                color: isActive ? "var(--color-accent)" : "var(--color-muted)",
                borderBottom: isActive
                  ? "2.5px solid var(--color-accent)"
                  : "2.5px solid transparent",
              }}
            >
              {tab.label}
              {count !== undefined && (
                <span
                  className="ml-1.5 text-xs font-bold"
                  style={{ color: isActive ? "var(--color-accent)" : "var(--color-muted)" }}
                >
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === "empathy" && (
        <section>
          <SectionHeader
            title="Empathy Map"
            description="Ce que l'utilisateur pense, ressent, dit et fait — ses pains et gains."
          />
          <EmpathyMapCard data={result.empathy_map} />
        </section>
      )}

      {activeTab === "personas" && (
        <section>
          <SectionHeader
            title="Behavioral Personas"
            description={`${result.personas.length} archétype${result.personas.length > 1 ? "s" : ""} identifié${result.personas.length > 1 ? "s" : ""} dans vos interviews.`}
          />
          <div className="space-y-6">
            {result.personas.map((persona, i) => (
              <PersonaCard key={i} persona={persona} index={i} />
            ))}
          </div>
        </section>
      )}

      {activeTab === "jtbd" && (
        <section>
          <SectionHeader
            title="Jobs To Be Done"
            description={`${result.jtbds.length} jobs identifiés — ce que vos utilisateurs cherchent vraiment à accomplir.`}
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
      <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--color-text)" }}>
        {title}
      </h2>
      <p className="text-sm" style={{ color: "var(--color-muted)" }}>
        {description}
      </p>
    </div>
  );
}
