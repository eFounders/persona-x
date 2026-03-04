import { Cpu, Frown, Activity, Quote } from "lucide-react";
import { Archetype } from "@/types/persona";
import EmpathyMapCard from "./EmpathyMapCard";

interface ArchetypeCardProps {
  archetype: Archetype;
  index: number;
}

const ACCENT_COLORS = ["#6237f0", "#0F766E", "#B45309", "#0369A1"];

export default function ArchetypeCard({ archetype, index }: ArchetypeCardProps) {
  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const initials = archetype.label
    .replace(/^L[ae']?\s*/i, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="card overflow-hidden"
      style={{ borderLeft: `4px solid ${accentColor}` }}
    >
      {/* Header */}
      <div className="flex items-start gap-4 p-6 border-b" style={{ borderColor: "var(--border-default)" }}>
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white text-sm font-black"
          style={{ background: accentColor }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-xl font-bold mb-1"
            style={{ color: "var(--fg-default)", fontFamily: "var(--font-pt-serif), Georgia, serif" }}
          >
            {archetype.label}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--fg-secondary)" }}>
            {archetype.behavioral_description}
          </p>
        </div>
      </div>

      {/* Body — 2 colonnes */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <InfoSection
          icon={Cpu}
          label="Rapport à la tech"
          text={archetype.tech_relationship}
          accentColor={accentColor}
        />
        <InfoSection
          icon={Frown}
          label="Frustration principale"
          text={archetype.main_frustration}
          accentColor={accentColor}
          border
        />
      </div>

      {/* Verbatims */}
      {archetype.verbatims.length > 0 && (
        <div className="px-6 py-5 border-t" style={{ borderColor: "var(--border-default)" }}>
          <div className="flex items-center gap-1.5 mb-3">
            <Activity size={14} strokeWidth={2.5} style={{ color: accentColor }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--fg-tertiary)" }}
            >
              Verbatims clés
            </span>
          </div>
          <div className="space-y-2">
            {archetype.verbatims.map((v, i) => (
              <blockquote
                key={i}
                className="flex items-start gap-2 text-sm italic"
                style={{ color: "var(--fg-secondary)" }}
              >
                <Quote size={14} strokeWidth={2} className="mt-0.5 shrink-0" style={{ color: accentColor }} />
                {v}
              </blockquote>
            ))}
          </div>
        </div>
      )}

      {/* Empathy Map */}
      <div className="px-6 pb-6 pt-2 border-t" style={{ borderColor: "var(--border-default)" }}>
        <div className="flex items-center gap-1.5 mb-4 pt-4">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--fg-tertiary)" }}
          >
            Empathy Map
          </span>
        </div>
        <EmpathyMapCard data={archetype.empathy_map} />
      </div>
    </div>
  );
}

function InfoSection({
  icon: Icon,
  label,
  text,
  accentColor,
  border = false,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  label: string;
  text: string;
  accentColor: string;
  border?: boolean;
}) {
  return (
    <div
      className={`p-5 ${border ? "border-t sm:border-t-0 sm:border-l" : ""}`}
      style={{ borderColor: "var(--border-default)" }}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <Icon size={14} strokeWidth={2.5} style={{ color: accentColor }} />
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--fg-tertiary)" }}
        >
          {label}
        </span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--fg-default)" }}>
        {text}
      </p>
    </div>
  );
}
