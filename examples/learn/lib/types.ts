import type { Spec } from "@json-render/core";

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  module: "foundations" | "intermediate" | "advanced";
  order: number;
  duration: number;
  xp: number;
  description: string;
  concepts: string[];
  prerequisites: string[];
  starterSpec: Spec;
  targetSpec?: Spec;
  challenges: Challenge[];
  hints: string[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  validation: ValidationRule[];
}

export interface ValidationRule {
  check: (spec: Spec) => boolean;
  errorMessage: string;
  hint?: string;
}

export interface Progress {
  completedLessons: string[];
  currentLesson: string | null;
  streak: number;
  lastActivityDate: string;
  xp: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
}
