import { lesson01, LessonContent01 } from "./01-hello-spec";
import { lesson02, LessonContent02 } from "./02-props-children";
import { lesson03, LessonContent03 } from "./03-state-binding";
import type { Lesson } from "../types";

export interface LessonWithContent extends Lesson {
  ContentComponent: React.ComponentType;
}

export const lessons: LessonWithContent[] = [
  { ...lesson01, ContentComponent: LessonContent01 },
  { ...lesson02, ContentComponent: LessonContent02 },
  { ...lesson03, ContentComponent: LessonContent03 },
];

export function getLessonBySlug(slug: string): LessonWithContent | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getLessonById(id: string): LessonWithContent | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getNextLesson(
  currentSlug: string
): LessonWithContent | undefined {
  const currentIndex = lessons.findIndex(
    (lesson) => lesson.slug === currentSlug
  );
  if (currentIndex === -1 || currentIndex === lessons.length - 1) {
    return undefined;
  }
  return lessons[currentIndex + 1];
}

export function getPreviousLesson(
  currentSlug: string
): LessonWithContent | undefined {
  const currentIndex = lessons.findIndex(
    (lesson) => lesson.slug === currentSlug
  );
  if (currentIndex <= 0) {
    return undefined;
  }
  return lessons[currentIndex - 1];
}

export const lessonsByModule = {
  foundations: lessons.filter((l) => l.module === "foundations"),
  intermediate: lessons.filter((l) => l.module === "intermediate"),
  advanced: lessons.filter((l) => l.module === "advanced"),
};
