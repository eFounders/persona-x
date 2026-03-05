import { Archetype } from "@/types/persona";
import EmpathyPersonaCard from "./EmpathyPersonaCard";

interface ArchetypeCardProps {
  archetype: Archetype;
  index: number;
}

export default function ArchetypeCard({ archetype }: ArchetypeCardProps) {
  const initials = archetype.label
    .replace(/^L[ae']?\s*/i, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{
        background: "var(--bg-default)",
        border: "1px solid var(--border-default)",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="flex items-start gap-4 p-6"
        style={{ borderBottom: "1px solid var(--border-default)" }}
      >
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
          style={{
            background: "var(--bg-accent-01)",
            color: "white",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-xl font-bold mb-1"
            style={{
              color: "var(--fg-default)",
              fontFamily: "var(--font-pt-serif), Georgia, serif",
            }}
          >
            {archetype.label}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--fg-secondary)" }}
          >
            {archetype.behavioral_description}
          </p>
        </div>
      </div>

      {/* Empathy Persona */}
      {archetype.empathy_persona && (
        <div className="p-6">
          <EmpathyPersonaCard data={archetype.empathy_persona} />
        </div>
      )}
    </div>
  );
}
