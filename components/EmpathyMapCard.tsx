import { Brain, Heart, MessageSquare, Footprints, AlertCircle, Star } from "lucide-react";
import { EmpathyMap } from "@/types/persona";

interface EmpathyMapCardProps {
  data: EmpathyMap;
}

const quadrants = [
  {
    key: "thinks" as const,
    label: "Thinks",
    icon: Brain,
    bg: "var(--color-thinks)",
  },
  {
    key: "feels" as const,
    label: "Feels",
    icon: Heart,
    bg: "var(--color-feels)",
  },
  {
    key: "says" as const,
    label: "Says",
    icon: MessageSquare,
    bg: "var(--color-says)",
  },
  {
    key: "does" as const,
    label: "Does",
    icon: Footprints,
    bg: "var(--color-does)",
  },
  {
    key: "pains" as const,
    label: "Pains",
    icon: AlertCircle,
    bg: "var(--color-pains)",
  },
  {
    key: "gains" as const,
    label: "Gains",
    icon: Star,
    bg: "var(--color-gains)",
  },
];

export default function EmpathyMapCard({ data }: EmpathyMapCardProps) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {quadrants.map(({ key, label, icon: Icon, bg }) => (
          <div
            key={key}
            className="card p-5"
            style={{ background: bg, border: "1.5px solid var(--color-border)", boxShadow: "4px 4px 0px var(--color-border)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Icon size={16} strokeWidth={2.5} style={{ color: "var(--color-text)" }} />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-text)" }}
              >
                {label}
              </span>
            </div>
            <ul className="space-y-1.5">
              {data[key].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-text)" }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-text)" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
