import type { Achievement, Progress } from "./types";

export const achievementDefinitions: Omit<Achievement, "unlockedAt">[] = [
  {
    id: "first-spec",
    title: "First Spec",
    description: "Complete your first lesson",
    icon: "🎯",
  },
  {
    id: "foundations-complete",
    title: "Foundation Builder",
    description: "Complete all Foundation lessons",
    icon: "🏗️",
  },
  {
    id: "week-streak",
    title: "Week Warrior",
    description: "Maintain a 7-day learning streak",
    icon: "🔥",
  },
  {
    id: "quick-learner",
    title: "Quick Learner",
    description: "Complete 3 lessons in one day",
    icon: "⚡",
  },
  {
    id: "xp-hunter",
    title: "XP Hunter",
    description: "Earn 500 total XP",
    icon: "💎",
  },
];

export function checkAchievements(progress: Progress): Achievement[] {
  const newAchievements: Achievement[] = [];
  const unlockedIds = progress.achievements.map((a) => a.id);

  // First Spec
  if (
    !unlockedIds.includes("first-spec") &&
    progress.completedLessons.length >= 1
  ) {
    newAchievements.push({
      ...achievementDefinitions.find((a) => a.id === "first-spec")!,
      unlockedAt: new Date().toISOString(),
    });
  }

  // Foundation Builder
  const foundationLessons = ["01-hello-spec", "02-props-children", "03-state-binding"];
  if (
    !unlockedIds.includes("foundations-complete") &&
    foundationLessons.every((id) => progress.completedLessons.includes(id))
  ) {
    newAchievements.push({
      ...achievementDefinitions.find((a) => a.id === "foundations-complete")!,
      unlockedAt: new Date().toISOString(),
    });
  }

  // Week Streak
  if (!unlockedIds.includes("week-streak") && progress.streak >= 7) {
    newAchievements.push({
      ...achievementDefinitions.find((a) => a.id === "week-streak")!,
      unlockedAt: new Date().toISOString(),
    });
  }

  // XP Hunter
  if (!unlockedIds.includes("xp-hunter") && progress.xp >= 500) {
    newAchievements.push({
      ...achievementDefinitions.find((a) => a.id === "xp-hunter")!,
      unlockedAt: new Date().toISOString(),
    });
  }

  return newAchievements;
}
