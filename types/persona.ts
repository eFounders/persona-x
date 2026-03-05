export interface EmotionEntry {
  emotion: string;
  verbatim: string;
}

export interface EmpathyPersona {
  jtbd: string;
  preferences: string[];
  emotions_positive: EmotionEntry[];
  emotions_negative: EmotionEntry[];
  context: string;
  alternatives: string[];
  hmw: string[];
}

export interface Archetype {
  label: string;
  behavioral_description: string;
  tech_relationship: string;
  main_frustration: string;
  verbatims: string[];
  empathy_persona: EmpathyPersona;
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
export type ResultsTab = "archetypes" | "jtbd";

export interface HistoryEntry {
  id: string;
  date: string; // ISO 8601
  fileNames: string[];
  result: AnalysisResult;
}
