"use client";

import { memo, useState, useEffect } from "react";

export function EasterEggClient({ frames }: { frames: string[][] }) {
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrameIndex((prevIndex) => (prevIndex + 1) % frames.length);
    }, 100);

    return () => clearInterval(interval);
  }, [frames.length]);

  return (
    <div className="items-start">
      <div className="font-mono text-xs whitespace-pre">
        {frames[currentFrameIndex].join("\n")}
      </div>
    </div>
  );
}

export default memo(EasterEggClient);
