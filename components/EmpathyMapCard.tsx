import { Brain, Heart, MessageSquare, Footprints, AlertCircle, Star } from "lucide-react";
import { EmpathyMap } from "@/types/persona";

interface EmpathyMapCardProps {
  data: EmpathyMap;
}

const quadrants = [
  { key: "thinks" as const, label: "Thinks", icon: Brain,         bg: "var(--hl-purple)" },
  { key: "feels"  as const, label: "Feels",  icon: Heart,         bg: "var(--hl-pink)"   },
  { key: "says"   as const, label: "Says",   icon: MessageSquare, bg: "var(--hl-green)"  },
  { key: "does"   as const, label: "Does",   icon: Footprints,    bg: "var(--hl-blue)"   },
  { key: "pains"  as const, label: "Pains",  icon: AlertCircle,   bg: "var(--hl-red)"    },
  { key: "gains"  as const, label: "Gains",  icon: Star,          bg: "var(--hl-cyan)"   },
];

export default function EmpathyMapCard({ data }: EmpathyMapCardProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {quadrants.map(({ key, label, icon: Icon, bg }) => (
        <div
          key={key}
          className="rounded-lg p-4"
          style={{ background: bg, border: "1px solid var(--border-default)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Icon size={14} strokeWidth={2.5} style={{ color: "var(--fg-default)" }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--fg-default)" }}
            >
              {label}
            </span>
          </div>
          <ul className="space-y-2">
            {data[key].map((item, i) => (
              <li key={i} className="text-xs leading-relaxed italic" style={{ color: "var(--fg-secondary)" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
