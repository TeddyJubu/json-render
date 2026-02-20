"use client";

import { Award, Flame, Zap } from "lucide-react";
import type { Progress } from "@/lib/types";

interface ProgressTrackerProps {
  progress: Progress;
  compact?: boolean;
}

export function ProgressTracker({
  progress,
  compact = false,
}: ProgressTrackerProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <Award className="h-4 w-4 text-primary" />
          <span className="font-medium">{progress.xp}</span>
          <span className="text-muted-foreground">XP</span>
        </div>
        {progress.streak > 0 && (
          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="font-medium">{progress.streak}</span>
            <span className="text-muted-foreground">day streak</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="mb-4 font-semibold">Your Progress</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">{progress.xp} XP</div>
              <div className="text-xs text-muted-foreground">Total earned</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
              <Flame className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <div className="font-medium">{progress.streak} days</div>
              <div className="text-xs text-muted-foreground">Current streak</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
              <Zap className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <div className="font-medium">
                {progress.completedLessons.length} lessons
              </div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {progress.achievements.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h4 className="mb-2 text-sm font-medium">Recent Achievements</h4>
          <div className="space-y-2">
            {progress.achievements.slice(-3).reverse().map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-2 rounded-md bg-muted/50 p-2"
              >
                <span className="text-lg">{achievement.icon}</span>
                <div className="flex-1 text-xs">
                  <div className="font-medium">{achievement.title}</div>
                  <div className="text-muted-foreground">
                    {achievement.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
