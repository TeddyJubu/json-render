import type { Progress, Achievement } from "../types";

const STORAGE_KEY = "json-render-learn-progress";

const defaultProgress: Progress = {
  completedLessons: [],
  currentLesson: null,
  streak: 0,
  lastActivityDate: new Date().toISOString(),
  xp: 0,
  achievements: [],
};

export function getProgress(): Progress {
  if (typeof window === "undefined") return defaultProgress;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultProgress;
    return JSON.parse(stored);
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: Progress): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to save progress:", error);
  }
}

export function completeLesson(lessonId: string, xpGained: number): Progress {
  const progress = getProgress();
  
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    progress.xp += xpGained;
    progress.lastActivityDate = new Date().toISOString();
    
    // Update streak
    const lastActivity = new Date(progress.lastActivityDate);
    const today = new Date();
    const daysSinceLastActivity = Math.floor(
      (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceLastActivity === 1) {
      progress.streak += 1;
    } else if (daysSinceLastActivity > 1) {
      progress.streak = 1;
    }
    
    saveProgress(progress);
  }
  
  return progress;
}

export function unlockAchievement(achievement: Achievement): Progress {
  const progress = getProgress();
  
  const existing = progress.achievements.find((a) => a.id === achievement.id);
  if (!existing) {
    progress.achievements.push({
      ...achievement,
      unlockedAt: new Date().toISOString(),
    });
    saveProgress(progress);
  }
  
  return progress;
}

export function setCurrentLesson(lessonId: string): void {
  const progress = getProgress();
  progress.currentLesson = lessonId;
  saveProgress(progress);
}
