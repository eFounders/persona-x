"use client";

import { useState, useEffect, useCallback } from "react";
import { HistoryEntry, AnalysisResult } from "@/types/persona";

const STORAGE_KEY = "personax_history";
const MAX_ENTRIES = 10;

function isValidEntry(e: unknown): e is HistoryEntry {
  if (!e || typeof e !== "object") return false;
  const entry = e as Record<string, unknown>;
  const result = entry.result as Record<string, unknown> | undefined;
  if (
    typeof entry.id !== "string" ||
    typeof entry.date !== "string" ||
    !Array.isArray(entry.fileNames) ||
    result == null ||
    !Array.isArray(result.archetypes) ||
    !Array.isArray(result.jtbds)
  ) return false;
  // Reject old entries that use empathy_map instead of empathy_persona
  const archetypes = result.archetypes as Record<string, unknown>[];
  if (archetypes.length > 0 && "empathy_map" in archetypes[0]) return false;
  return true;
}

function loadFromStorage(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown[];
    return Array.isArray(parsed) ? parsed.filter(isValidEntry) : [];
  } catch {
    return [];
  }
}

function saveToStorage(entries: HistoryEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function useHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setEntries(loadFromStorage());
  }, []);

  const addEntry = useCallback((fileNames: string[], result: AnalysisResult) => {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      fileNames,
      result,
    };
    setEntries((prev) => {
      const updated = [entry, ...prev].slice(0, MAX_ENTRIES);
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      saveToStorage(updated);
      return updated;
    });
  }, []);

  return { entries, addEntry, deleteEntry };
}
