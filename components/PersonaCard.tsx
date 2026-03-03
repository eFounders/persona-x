import { Target, Frown, Activity, type LucideIcon } from "lucide-react";
import { Persona } from "@/types/persona";

interface PersonaCardProps {
  persona: Persona;
  index: number;
}

const ACCENT_COLORS = ["#5B21B6", "#0F766E", "#B45309", "#0369A1"];

export default function PersonaCard({ persona, index }: PersonaCardProps) {
  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const initials = persona.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="card overflow-hidden"
      style={{ borderLeft: `4px solid ${accentColor}`, boxShadow: "4px 4px 0px var(--color-border)" }}
    >
      {/* Header */}
      <div className="flex items-start gap-4 p-6 border-b" style={{ borderColor: "var(--color-border)" }}>
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm text-white text-sm font-black"
          style={{ background: accentColor }}
        >
          {initials}
        </div>
        <div>
          <h3 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>
            {persona.name}
          </h3>
          <p className="text-sm font-medium" style={{ color: "var(--color-muted)" }}>
            {persona.role} · {persona.age} ans
          </p>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
            {persona.bio}
          </p>
        </div>
      </div>

      {/* Body — 3 colonnes */}
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-3">
        <Section icon={Target} label="Goals" items={persona.goals} accentColor={accentColor} />
        <Section
          icon={Frown}
          label="Frustrations"
          items={persona.frustrations}
          accentColor={accentColor}
          border
        />
        <Section
          icon={Activity}
          label="Behaviors"
          items={persona.behaviors}
          accentColor={accentColor}
          border
        />
      </div>

      {/* Pull-quote */}
      <blockquote
        className="mx-6 mb-6 mt-4 border-l-4 pl-4 italic text-sm"
        style={{ borderColor: accentColor, color: "var(--color-muted)" }}
      >
        &ldquo;{persona.quote}&rdquo;
      </blockquote>
    </div>
  );
}

function Section({
  icon: Icon,
  label,
  items,
  accentColor,
  border = false,
}: {
  icon: LucideIcon;
  label: string;
  items: string[];
  accentColor: string;
  border?: boolean;
}) {
  return (
    <div
      className={`p-5 ${border ? "border-t sm:border-t-0 sm:border-l" : ""}`}
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <Icon size={14} strokeWidth={2.5} style={{ color: accentColor }} />
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-muted)" }}
        >
          {label}
        </span>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-text)" }}>
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: accentColor }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
