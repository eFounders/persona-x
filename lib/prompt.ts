import Anthropic from "@anthropic-ai/sdk";
import { AnalysisResult } from "@/types/persona";

const SYSTEM_PROMPT = `You are a UX research analyst. You receive raw user interview notes and output structured UX artefacts in JSON. You MUST respond with ONLY valid JSON — no markdown code fences, no explanatory text, no comments. The JSON must exactly match the schema below.

SCHEMA:
{
  "empathy_map": {
    "thinks": ["string"],
    "feels":  ["string"],
    "says":   ["string"],
    "does":   ["string"],
    "pains":  ["string"],
    "gains":  ["string"]
  },
  "personas": [
    {
      "name":          "string",
      "role":          "string",
      "age":           number,
      "bio":           "string",
      "goals":         ["string"],
      "frustrations":  ["string"],
      "behaviors":     ["string"],
      "quote":         "string"
    }
  ],
  "jtbds": [
    {
      "when":       "string",
      "i_want_to":  "string",
      "so_that":    "string",
      "context":    "string"
    }
  ]
}

RULES:
- personas: identify 1 to 3 distinct user archetypes from the notes. Each array item is one persona. Do not merge distinct archetypes.
- jtbds: extract 3 to 6 distinct jobs-to-be-done.
- Each array field (thinks, goals, etc.) should have 3 to 6 items.
- All strings must be concise: 1 sentence or short phrase, not paragraphs.
- bio must be 2-3 sentences maximum.
- quote must be a direct or representative verbatim-style quote from the user.
- If the notes are too short or ambiguous, make reasonable inferences grounded in the text.
- Return ONLY the JSON object. Nothing else.`;

const client = new Anthropic();

export async function analyzeNotes(notes: string): Promise<AnalysisResult> {
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8096,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Here are the user interview notes:\n\n<notes>\n${notes}\n</notes>\n\nAnalyse these notes and return the JSON object.`,
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
  if (!result.empathy_map || !result.personas || !result.jtbds) {
    throw new Error("Claude response is missing required keys");
  }

  return result as unknown as AnalysisResult;
}
