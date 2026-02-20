"use client";

import Link from "next/link";
import { lessons, lessonsByModule } from "@/lib/lessons";
import { getProgress } from "@/lib/progress/storage";
import { Button } from "@json-render/shadcn";
import { CheckCircle2, Lock, PlayCircle, Award, Flame, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [progress, setProgress] = useState(getProgress());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProgress(getProgress());
  }, []);

  if (!mounted) {
    return null;
  }

  const completedCount = progress.completedLessons.length;
  const totalCount = lessons.length;
  const progressPercent = (completedCount / totalCount) * 100;

  const isLessonCompleted = (lessonId: string) =>
    progress.completedLessons.includes(lessonId);

  const isLessonUnlocked = (lesson: typeof lessons[0]) => {
    if (lesson.prerequisites.length === 0) return true;
    return lesson.prerequisites.every((prereq) =>
      progress.completedLessons.includes(prereq)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <div className="border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Learn json-render
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
              Master generative UI and json-render through interactive lessons
              and hands-on challenges. Build real UIs while you learn.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href={`/lesson/${lessons[0].slug}`}>
                  <PlayCircle className="h-5 w-5" />
                  Start Learning
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 text-center">
              <div className="mb-2 flex items-center justify-center">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold">{progress.xp}</div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </div>
            <div className="rounded-lg border bg-card p-6 text-center">
              <div className="mb-2 flex items-center justify-center">
                <Flame className="h-5 w-5 text-orange-500" />
              </div>
              <div className="text-2xl font-bold">{progress.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="rounded-lg border bg-card p-6 text-center">
              <div className="mb-2 flex items-center justify-center">
                <Zap className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold">
                {completedCount}/{totalCount}
              </div>
              <div className="text-sm text-muted-foreground">
                Lessons Completed
              </div>
            </div>
          </div>

          {/* Progress bar */}
          {completedCount > 0 && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">Overall Progress</span>
                <span className="text-muted-foreground">
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lesson modules */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Foundations */}
          <section>
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">Foundations</h2>
              <p className="text-muted-foreground">
                Master the basics of json-render and spec structure
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lessonsByModule.foundations.map((lesson) => {
                const completed = isLessonCompleted(lesson.id);
                const unlocked = isLessonUnlocked(lesson);

                return (
                  <Link
                    key={lesson.id}
                    href={`/lesson/${lesson.slug}`}
                    className={
                      unlocked
                        ? "group block"
                        : "pointer-events-none block opacity-50"
                    }
                  >
                    <div className="h-full rounded-lg border bg-card p-6 transition-colors group-hover:border-primary">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {lesson.order}
                        </div>
                        {completed ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : !unlocked ? (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        ) : null}
                      </div>
                      <h3 className="mb-2 font-semibold">{lesson.title}</h3>
                      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                        {lesson.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{lesson.duration} min</span>
                        <span>•</span>
                        <span>{lesson.xp} XP</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Coming soon sections */}
          {lessonsByModule.intermediate.length === 0 && (
            <section className="rounded-lg border border-dashed p-12 text-center">
              <h3 className="mb-2 text-xl font-semibold text-muted-foreground">
                Intermediate Lessons Coming Soon
              </h3>
              <p className="text-sm text-muted-foreground">
                More lessons on forms, validation, and advanced patterns
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
