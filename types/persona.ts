export interface EmpathyMap {
  thinks: string[];
  feels: string[];
  says: string[];
  does: string[];
  pains: string[];
  gains: string[];
}

export interface Archetype {
  label: string;
  behavioral_description: string;
  tech_relationship: string;
  main_frustration: string;
  verbatims: string[];
  empathy_map: EmpathyMap;
}

export interface Jtbd {
  when: string;
  i_want_to: string;
  so_that: string;
  context: string;
  archetypes: string[];
  interviewee_count: number;
}

export interface AnalysisResult {
  archetypes: Archetype[];
  jtbds: Jtbd[];
}

export type AppView = "input" | "results" | "history";
export type ResultsTab = "archetypes" | "empathy" | "jtbd";

export interface HistoryEntry {
  id: string;
  date: string; // ISO 8601
  fileNames: string[];
  result: AnalysisResult;
}
