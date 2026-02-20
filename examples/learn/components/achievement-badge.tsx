"use client";

import { useEffect, useState } from "react";
import type { Achievement } from "@/lib/types";
import { CheckCircle } from "lucide-react";
import ConfettiExplosion from "react-confetti-explosion";

interface AchievementBadgeProps {
  achievement: Achievement;
  onClose?: () => void;
}

export function AchievementBadge({
  achievement,
  onClose,
}: AchievementBadgeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setShowConfetti(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0"
      }`}
    >
      <div className="relative overflow-hidden rounded-lg border border-success bg-card p-4 shadow-lg">
        {showConfetti && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ConfettiExplosion
              force={0.4}
              duration={2500}
              particleCount={30}
              width={400}
            />
          </div>
        )}
        
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-lg">{achievement.icon}</span>
              <h4 className="font-semibold">Achievement Unlocked!</h4>
            </div>
            <p className="text-sm font-medium">{achievement.title}</p>
            <p className="text-xs text-muted-foreground">
              {achievement.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
