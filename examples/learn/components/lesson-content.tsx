"use client";

import type { Lesson } from "@/lib/types";
import { CheckCircle2, Clock, Award } from "lucide-react";

interface LessonContentProps {
  lesson: Lesson;
  children?: React.ReactNode;
}

export function LessonContent({ lesson, children }: LessonContentProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="capitalize">{lesson.module}</span>
            <span>•</span>
            <span>Lesson {lesson.order}</span>
          </div>
          <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight lg:text-4xl">
            {lesson.title}
          </h1>
          <p className="text-pretty text-lg text-muted-foreground">
            {lesson.description}
          </p>
        </div>

        {/* Meta info */}
        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{lesson.duration} min</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{lesson.xp} XP</span>
          </div>
          {lesson.concepts.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {lesson.concepts.map((concept) => (
                <span
                  key={concept}
                  className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {concept}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {children}
        </div>

        {/* Challenge section */}
        {lesson.challenges.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold">Challenges</h2>
            {lesson.challenges.map((challenge, idx) => (
              <div
                key={challenge.id}
                className="rounded-lg border bg-card p-6"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-semibold">{challenge.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
