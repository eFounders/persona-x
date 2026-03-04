import { deflateSync, inflateSync, strToU8, strFromU8 } from "fflate";
import { AnalysisResult } from "@/types/persona";

export function encodeResult(result: AnalysisResult): string {
  const json = JSON.stringify(result);
  const compressed = deflateSync(strToU8(json), { level: 9 });
  return btoa(String.fromCharCode(...compressed))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

export function decodeResult(encoded: string): AnalysisResult {
  const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  const json = strFromU8(inflateSync(bytes));
  return JSON.parse(json) as AnalysisResult;
}
