import { NextRequest, NextResponse } from "next/server";
import { analyzeNotes } from "@/lib/prompt";

// Use pdf-parse v1 core directly to avoid test-file loading issues in serverless
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse/lib/pdf-parse.js") as (
  buffer: Buffer
) => Promise<{ text: string }>;

const MAX_CHARS = 20_000;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const entries = formData.getAll("pdfs");

    if (entries.length === 0) {
      return NextResponse.json(
        { error: "Aucun fichier reçu." },
        { status: 400 }
      );
    }

    const texts: string[] = [];

    for (const entry of entries) {
      if (!(entry instanceof File)) continue;

      const buffer = Buffer.from(await entry.arrayBuffer());
      const parsed = await pdfParse(buffer);
      const text = parsed.text.trim();

      if (text.length > 0) {
        texts.push(`=== ${entry.name} ===\n${text}`);
      }
    }

    if (texts.length === 0) {
      return NextResponse.json(
        {
          error:
            "Aucun texte extrait. Vérifie que tes PDFs contiennent du texte (pas des images scannées).",
        },
        { status: 400 }
      );
    }

    const combined = texts.join("\n\n").trim();

    if (combined.length < 50) {
      return NextResponse.json(
        { error: "Contenu trop court. Les PDFs semblent vides ou illisibles." },
        { status: 400 }
      );
    }

    const finalText =
      combined.length > MAX_CHARS ? combined.slice(0, MAX_CHARS) : combined;

    const result = await analyzeNotes(finalText);
    return NextResponse.json({ result }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("[/api/analyze]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
