export interface EmpathyMap {
  thinks: string[];
  feels: string[];
  says: string[];
  does: string[];
  pains: string[];
  gains: string[];
}

export interface Persona {
  name: string;
  role: string;
  age: number;
  bio: string;
  goals: string[];
  frustrations: string[];
  behaviors: string[];
  quote: string;
}

export interface Jtbd {
  when: string;
  i_want_to: string;
  so_that: string;
  context: string;
}

export interface AnalysisResult {
  empathy_map: EmpathyMap;
  personas: Persona[];
  jtbds: Jtbd[];
}

export type AppView = "input" | "results";
export type ResultsTab = "empathy" | "personas" | "jtbd";
