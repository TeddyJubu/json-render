"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";

interface SplitPaneProps {
  left: ReactNode;
  right: ReactNode;
  defaultSplit?: number;
  minLeftWidth?: number;
  minRightWidth?: number;
}

export function SplitPane({
  left,
  right,
  defaultSplit = 50,
  minLeftWidth = 300,
  minRightWidth = 300,
}: SplitPaneProps) {
  const [leftWidth, setLeftWidth] = useState(defaultSplit);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const newLeftWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      const minLeftPercent = (minLeftWidth / containerRect.width) * 100;
      const minRightPercent = (minRightWidth / containerRect.width) * 100;

      if (
        newLeftWidth >= minLeftPercent &&
        newLeftWidth <= 100 - minRightPercent
      ) {
        setLeftWidth(newLeftWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, minLeftWidth, minRightWidth]);

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full select-none overflow-hidden"
    >
      <div
        className="h-full overflow-auto"
        style={{ width: `${leftWidth}%` }}
      >
        {left}
      </div>

      <div
        className="group relative w-1 cursor-col-resize bg-border hover:bg-primary/50"
        onMouseDown={() => setIsDragging(true)}
      >
        <div className="absolute inset-y-0 -left-1 -right-1" />
      </div>

      <div
        className="h-full overflow-auto"
        style={{ width: `${100 - leftWidth}%` }}
      >
        {right}
      </div>
    </div>
  );
}
