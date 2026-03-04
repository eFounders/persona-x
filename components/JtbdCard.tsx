import { Users } from "lucide-react";
import { Jtbd } from "@/types/persona";

interface JtbdCardProps {
  jtbd: Jtbd;
  index: number;
}

export default function JtbdCard({ jtbd, index }: JtbdCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-start gap-4">
        <span
          className="shrink-0 text-xs font-black tabular-nums w-6 text-center pt-0.5"
          style={{ color: "var(--fg-tertiary)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="space-y-3 flex-1 min-w-0">
          {/* Sentence */}
          <p className="text-sm leading-relaxed" style={{ color: "var(--fg-default)" }}>
            <Chip bg="var(--hl-purple)">When</Chip>{" "}
            {jtbd.when},{" "}
            <Chip bg="var(--hl-blue)">I want to</Chip>{" "}
            {jtbd.i_want_to},{" "}
            <Chip bg="var(--hl-cyan)">so that</Chip>{" "}
            {jtbd.so_that}.
          </p>

          {/* Context */}
          {jtbd.context && (
            <p className="text-xs" style={{ color: "var(--fg-tertiary)" }}>
              <span className="font-semibold uppercase tracking-widest mr-1 text-xs">
                Contexte:
              </span>
              {jtbd.context}
            </p>
          )}

          {/* Footer: archetypes + count */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
            <div className="flex flex-wrap gap-1.5">
              {jtbd.archetypes.map((a) => (
                <span
                  key={a}
                  className="rounded-md px-2 py-0.5 text-xs font-medium"
                  style={{
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border-secondary)",
                    color: "var(--fg-accent-02)",
                  }}
                >
                  {a}
                </span>
              ))}
            </div>
            {jtbd.interviewee_count > 0 && (
              <span
                className="flex items-center gap-1 text-xs font-medium shrink-0"
                style={{ color: "var(--fg-tertiary)" }}
              >
                <Users size={12} />
                {jtbd.interviewee_count} interviewé{jtbd.interviewee_count > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ children, bg }: { children: React.ReactNode; bg: string }) {
  return (
    <span
      className="inline-block rounded-sm px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide"
      style={{ background: bg, color: "var(--fg-default)" }}
    >
      {children}
    </span>
  );
}
