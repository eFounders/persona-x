import { EmpathyPersona } from "@/types/persona";

interface EmpathyPersonaCardProps {
  data: EmpathyPersona;
}

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 10,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "var(--fg-tertiary)",
  display: "block",
  marginBottom: 8,
};

const BODY_STYLE: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 14,
  color: "var(--fg-secondary)",
};

export default function EmpathyPersonaCard({ data }: EmpathyPersonaCardProps) {
  return (
    <div className="space-y-4">

      {/* JTBD */}
      <div
        style={{
          background: "var(--bg-subtle)",
          borderLeft: "3px solid var(--bg-accent-01)",
          borderRadius: "0 6px 6px 0",
          padding: "14px 16px",
        }}
      >
        <span style={LABEL_STYLE}>Job To Be Done</span>
        <p
          style={{
            fontFamily: "var(--font-pt-serif), Georgia, serif",
            fontSize: 16,
            fontWeight: 700,
            color: "var(--fg-default)",
            lineHeight: 1.5,
          }}
        >
          {data.jtbd}
        </p>
      </div>

      {/* Critères de choix | Alternatives actuelles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          style={{
            background: "var(--bg-subtle)",
            border: "1px solid var(--border-default)",
            borderRadius: 6,
            padding: "14px 16px",
          }}
        >
          <span style={LABEL_STYLE}>Critères de choix</span>
          <ul className="space-y-1.5">
            {data.criteres_de_choix.map((pref, i) => (
              <li key={i} className="flex items-start gap-2" style={BODY_STYLE}>
                <span
                  style={{
                    marginTop: 6,
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--bg-accent-01)",
                    flexShrink: 0,
                    display: "inline-block",
                  }}
                />
                {pref}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            background: "var(--bg-subtle)",
            border: "1px solid var(--border-default)",
            borderRadius: 6,
            padding: "14px 16px",
          }}
        >
          <span style={LABEL_STYLE}>Alternatives actuelles</span>
          <ul className="space-y-1.5">
            {data.alternatives_actuelles.map((alt, i) => (
              <li key={i} className="flex items-start gap-2" style={BODY_STYLE}>
                <span
                  style={{
                    marginTop: 6,
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--fg-tertiary)",
                    flexShrink: 0,
                    display: "inline-block",
                  }}
                />
                {alt}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Émotions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          style={{
            background: "color-mix(in srgb, var(--hl-green) 20%, transparent)",
            border: "1px solid var(--hl-green)",
            borderRadius: 6,
            padding: "14px 16px",
          }}
        >
          <span style={LABEL_STYLE}>Émotions positives</span>
          <div className="space-y-3">
            {data.emotions_positive.map((entry, i) => (
              <div key={i}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--fg-success)",
                  }}
                >
                  {entry.emotion}
                </span>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    fontStyle: "italic",
                    color: "var(--fg-secondary)",
                    marginTop: 2,
                    lineHeight: 1.5,
                  }}
                >
                  {entry.verbatim}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "color-mix(in srgb, var(--hl-red) 20%, transparent)",
            border: "1px solid var(--hl-red)",
            borderRadius: 6,
            padding: "14px 16px",
          }}
        >
          <span style={LABEL_STYLE}>Émotions négatives</span>
          <div className="space-y-3">
            {data.emotions_negative.map((entry, i) => (
              <div key={i}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--fg-error)",
                  }}
                >
                  {entry.emotion}
                </span>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                    fontStyle: "italic",
                    color: "var(--fg-secondary)",
                    marginTop: 2,
                    lineHeight: 1.5,
                  }}
                >
                  {entry.verbatim}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contexte */}
      <div
        style={{
          background: "var(--bg-subtle)",
          border: "1px solid var(--border-default)",
          borderRadius: 6,
          padding: "14px 16px",
        }}
      >
        <span style={LABEL_STYLE}>Contexte & moments clés</span>
        <p style={BODY_STYLE}>{data.contexte}</p>
      </div>

      {/* Opportunités produit */}
      <div>
        <span style={{ ...LABEL_STYLE, marginBottom: 10 }}>Opportunités produit</span>
        <div className="flex flex-wrap gap-2">
          {data.opportunites_produit.map((opp, i) => (
            <span
              key={i}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: "var(--bg-accent-01)",
                background: "color-mix(in srgb, var(--bg-accent-01) 10%, transparent)",
                border: "1px solid var(--bg-accent-01)",
                borderRadius: 20,
                padding: "6px 14px",
                lineHeight: 1.5,
              }}
            >
              {opp}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
