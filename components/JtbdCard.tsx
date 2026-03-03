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
          style={{ color: "var(--color-muted)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="space-y-3 flex-1">
          {/* Sentence */}
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
            <Chip color="var(--color-thinks)">When</Chip>{" "}
            {jtbd.when},{" "}
            <Chip color="var(--color-does)">I want to</Chip>{" "}
            {jtbd.i_want_to},{" "}
            <Chip color="var(--color-gains)">so that</Chip>{" "}
            {jtbd.so_that}.
          </p>
          {/* Context */}
          {jtbd.context && (
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              <span
                className="font-semibold uppercase tracking-widest mr-1 text-xs"
                style={{ color: "var(--color-muted)" }}
              >
                Context:
              </span>
              {jtbd.context}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Chip({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      className="inline-block rounded-sm px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide"
      style={{ background: color, color: "var(--color-text)" }}
    >
      {children}
    </span>
  );
}
