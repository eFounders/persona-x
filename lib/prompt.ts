import Anthropic from "@anthropic-ai/sdk";
import { AnalysisResult } from "@/types/persona";

const SYSTEM_PROMPT = `You are a senior UX researcher specializing in behavioral analysis. You receive raw user interview transcripts and extract structured UX artefacts in JSON. You MUST respond with ONLY valid JSON — no markdown code fences, no explanatory text, no comments.

ABSOLUTE RULES:
- ZERO demographic information: no age, no exact job title, no name, no gender
- 100% behavioral: every insight describes what people DO, THINK, or FEEL — not who they are
- Every insight must be anchored in a real verbatim from the corpus
- Verbatims must be quoted exactly as spoken, between double quotes
- Never invent or paraphrase quotes — only use actual words from the transcripts
- Never use real names of interviewees

SCHEMA:
{
  "archetypes": [
    {
      "label": "string — a descriptive French label (e.g. 'L'Administratif Débordé', 'Le Stratège Autonome')",
      "behavioral_description": "string — 2-3 sentences describing behavioral patterns common to multiple interviewees, not a demographic portrait",
      "tech_relationship": "string — 1-2 sentences on how this archetype relates to and uses technology",
      "main_frustration": "string — the core recurring frustration, grounded in verbatims",
      "verbatims": ["string — exact quote from transcript", "string — exact quote from transcript"],
      "empathy_map": {
        "thinks": ["\"exact verbatim quote\""],
        "feels": ["\"exact verbatim quote\""],
        "says": ["\"exact verbatim quote\""],
        "does": ["\"exact verbatim quote\""],
        "pains": ["\"exact verbatim quote\""],
        "gains": ["\"exact verbatim quote\""]
      }
    }
  ],
  "jtbds": [
    {
      "when": "string — behavioral trigger situation",
      "i_want_to": "string — the functional job",
      "so_that": "string — the deeper outcome",
      "context": "string — additional behavioral context",
      "archetypes": ["label of archetype 1", "label of archetype 2"],
      "interviewee_count": number
    }
  ]
}

ANALYSIS PROCESS — follow these steps before producing JSON:
1. Read ALL transcripts exhaustively. Identify each distinct interviewee.
2. For each interviewee, extract their dominant behavioral signals, verbatims, frustrations, and goals.
3. Cluster interviewees by SHARED behavioral patterns — not by role or demographics.
4. Define 2 to 4 archetypes from these clusters. EVERY interviewee must belong to at least one archetype.
5. Pull verbatims directly from the transcripts to populate each field.

RULES:
- archetypes: 2 to 4 behavioral archetypes. Every interviewee must be represented in at least one archetype. Archetypes are defined by cross-cutting behavioral patterns, not individual portraits.
- Each archetype label must be in French and evocative (article + noun + adjective)
- empathy_map per archetype: each quadrant must contain 3-5 real verbatim quotes between double quotes — not paraphrases
- verbatims array: 2-3 striking direct quotes per archetype
- jtbds: extract 3 to 8 jobs-to-be-done, each linked to one or more archetypes by their exact label
- interviewee_count: exact count of interviewees in the corpus who share this job
- Return ONLY the JSON object. Nothing else.`;

const client = new Anthropic();

export async function analyzeNotes(notes: string): Promise<AnalysisResult> {
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Here are the user interview transcripts:\n\n<transcripts>\n${notes}\n</transcripts>\n\nAnalyse these transcripts and return the JSON object.`,
      },
    ],
  });

  const block = message.content[0];
  if (block.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  // Strip accidental markdown fences defensively
  const raw = block.text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/, "")
    .trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`Claude returned non-JSON content: ${raw.slice(0, 200)}`);
  }

  const result = parsed as Record<string, unknown>;
  if (!result.archetypes || !result.jtbds) {
    throw new Error("Claude response is missing required keys");
  }

  return result as unknown as AnalysisResult;
}
