"use client";

import { useState, type ReactNode } from "react";
import type { Lesson, Achievement } from "@/lib/types";
import { SplitPane } from "./split-pane";
import { LessonContent } from "./lesson-content";
import { CodeEditor } from "./code-editor";
import { SpecPreview } from "./spec-preview";
import { AchievementBadge } from "./achievement-badge";
import { Button } from "@json-render/shadcn";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import type { Spec } from "@json-render/core";
import { checkAchievements } from "@/lib/achievements";
import { getProgress, unlockAchievement } from "@/lib/progress/storage";
import ConfettiExplosion from "react-confetti-explosion";

interface LessonViewerProps {
  lesson: Lesson;
  lessonContent?: ReactNode;
  onNext?: () => void;
  onPrevious?: () => void;
  onComplete?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export function LessonViewer({
  lesson,
  lessonContent,
  onNext,
  onPrevious,
  onComplete,
  hasNext = false,
  hasPrevious = false,
}: LessonViewerProps) {
  const [currentSpec, setCurrentSpec] = useState<Spec>(lesson.starterSpec);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  const handleReset = () => {
    setCurrentSpec(lesson.starterSpec);
    setIsCompleted(false);
  };

  const handleSpecChange = (spec: Spec) => {
    setCurrentSpec(spec);
    
    // Check if all challenges are completed
    if (lesson.challenges.length > 0) {
      const allPassed = lesson.challenges.every((challenge) =>
        challenge.validation.every((rule) => {
          try {
            return rule.check(spec);
          } catch {
            return false;
          }
        })
      );
      
      if (allPassed && !isCompleted) {
        setIsCompleted(true);
        setShowConfetti(true);
        onComplete?.();
        
        // Check for new achievements
        const currentProgress = getProgress();
        const achievements = checkAchievements(currentProgress);
        if (achievements.length > 0) {
          achievements.forEach(unlockAchievement);
          setNewAchievements(achievements);
        }
      }
    }
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Confetti */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <ConfettiExplosion
            force={0.8}
            duration={3000}
            particleCount={150}
            width={1600}
            onComplete={() => setShowConfetti(false)}
          />
        </div>
      )}

      {/* Achievement notifications */}
      {newAchievements.map((achievement, idx) => (
        <AchievementBadge
          key={achievement.id}
          achievement={achievement}
          onClose={() =>
            setNewAchievements((prev) => prev.filter((a) => a.id !== achievement.id))
          }
        />
      ))}

      {/* Top navigation */}
      <div className="flex items-center justify-between border-b bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrevious}
            disabled={!hasPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onNext}
            disabled={!hasNext}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          
          {isCompleted && (
            <div className="rounded-full bg-success px-3 py-1 text-sm font-medium text-success-foreground">
              Completed! +{lesson.xp} XP
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <SplitPane
          left={
            <LessonContent lesson={lesson}>
              {lessonContent}
            </LessonContent>
          }
          right={
            <div className="flex h-full flex-col">
              <div className="flex-1 overflow-hidden">
                <SplitPane
                  left={
                    <CodeEditor
                      initialSpec={lesson.starterSpec}
                      onChange={handleSpecChange}
                    />
                  }
                  right={<SpecPreview spec={currentSpec} />}
                  defaultSplit={50}
                />
              </div>
            </div>
          }
          defaultSplit={40}
        />
      </div>
    </div>
  );
}
