"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { LessonViewer } from "@/components/lesson-viewer";
import {
  getLessonBySlug,
  getNextLesson,
  getPreviousLesson,
} from "@/lib/lessons";
import { completeLesson, setCurrentLesson } from "@/lib/progress/storage";
import { useEffect } from "react";

export default function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const lesson = getLessonBySlug(resolvedParams.slug);
  
  useEffect(() => {
    if (lesson) {
      setCurrentLesson(lesson.id);
    }
  }, [lesson]);

  if (!lesson) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold">Lesson not found</h1>
          <p className="text-muted-foreground">
            The lesson you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const nextLesson = getNextLesson(lesson.slug);
  const previousLesson = getPreviousLesson(lesson.slug);

  const handleComplete = () => {
    completeLesson(lesson.id, lesson.xp);
  };

  const handleNext = () => {
    if (nextLesson) {
      router.push(`/lesson/${nextLesson.slug}`);
    }
  };

  const handlePrevious = () => {
    if (previousLesson) {
      router.push(`/lesson/${previousLesson.slug}`);
    }
  };

  const ContentComponent = lesson.ContentComponent;

  return (
    <LessonViewer
      lesson={lesson}
      lessonContent={<ContentComponent />}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onComplete={handleComplete}
      hasNext={!!nextLesson}
      hasPrevious={!!previousLesson}
    />
  );
}
