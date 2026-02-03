"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { ai } from "@/lib/ai";
import { MODEL } from "@/lib/constants";

async function isModelCached(): Promise<boolean> {
  try {
    const caches = await window.caches.keys();
    return caches.some((cache) => cache.includes("webllm"));
  } catch {
    return false;
  }
}

function ModelLoadingToast({
  progress,
  stage,
}: {
  progress: number;
  stage: string;
}) {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressBarRef.current) {
      // Smooth transition with slight overshoot for satisfying feel
      progressBarRef.current.style.transform = `scaleX(${progress / 100})`;
    }
  }, [progress]);

  return (
    <div className="relative w-full min-w-[320px] select-none">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-3 w-3">
            {/* Pulsing dot indicator */}
            <div className="bg-accent absolute inset-0 animate-pulse rounded-full" />
            <div className="bg-accent/80 absolute inset-0 animate-ping rounded-full opacity-75" />
          </div>
          <span
            className="font-mono text-sm font-medium tracking-tight"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            Loading Model
          </span>
        </div>
        <span
          className="text-muted-foreground font-mono text-xs tracking-wider"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {progress}%
        </span>
      </div>

      {/* Progress bar track */}
      <div className="bg-secondary relative h-1.5 overflow-hidden rounded-full">
        {/* Animated shimmer background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)",
            animation: "shimmer 2s infinite",
          }}
        />

        {/* Progress fill */}
        <div
          ref={progressBarRef}
          className="from-accent via-accent/80 to-accent/60 absolute inset-y-0 left-0 w-full origin-left rounded-full bg-linear-to-r transition-transform duration-300 ease-out"
          style={{
            transform: `scaleX(${progress / 100})`,
            boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
          }}
        />

        {/* Traveling highlight */}
        {progress < 100 && (
          <div
            className="absolute inset-y-0 w-12 bg-linear-to-r from-transparent via-white to-transparent opacity-40"
            style={{
              left: `${progress}%`,
              transform: "translateX(-50%)",
              transition: "left 0.3s ease-out",
              filter: "blur(4px)",
            }}
          />
        )}
      </div>

      {/* Stage indicator */}
      <div className="mt-2 flex items-center gap-1.5">
        <div className="flex gap-0.5">
          <div
            className="bg-muted-foreground/60 h-0.5 w-0.5 animate-pulse rounded-full"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="bg-muted-foreground/60 h-0.5 w-0.5 animate-pulse rounded-full"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="bg-muted-foreground/60 h-0.5 w-0.5 animate-pulse rounded-full"
            style={{ animationDelay: "300ms" }}
          />
        </div>
        <span className="text-muted-foreground font-mono text-[10px] tracking-wide uppercase">
          {stage}
        </span>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }
      `}</style>
    </div>
  );
}

let toastId: string | number | undefined;
let isLoadingStarted = false;

export function ModelLoader() {
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only run once on mount
    if (hasInitialized.current || isLoadingStarted) return;
    hasInitialized.current = true;
    isLoadingStarted = true;

    async function initializeModel() {
      const client = ai();

      // Check if already initialized
      if (client.isReady()) {
        toast.success("Model Loaded", {
          description: "Local AI is loaded and available",
          duration: 2000,
        });
        return;
      }

      // Check if cached
      const cached = await isModelCached();

      let currentProgress = 0;
      let currentStage = cached ? "loading from cache" : "downloading model";

      // Show initial toast
      toastId = toast.custom(
        (t) => (
          <div className="bg-background border-border rounded-lg border p-4 shadow-lg">
            <ModelLoadingToast
              progress={currentProgress}
              stage={currentStage}
            />
          </div>
        ),
        {
          duration: Infinity,
          position: "bottom-right",
        },
      );

      try {
        await client.init(MODEL, (report) => {
          currentProgress = Math.round(report.progress * 100);
          currentStage = report.text.toLowerCase().replace("loading ", "");

          // Update the same toast
          toast.custom(
            (t) => (
              <div className="bg-background border-border rounded-lg border p-4 shadow-lg">
                <ModelLoadingToast
                  progress={currentProgress}
                  stage={currentStage}
                />
              </div>
            ),
            {
              id: toastId,
              duration: Infinity,
              position: "bottom-right",
            },
          );
        });

        // Success state with smooth transition
        toast.custom(
          (t) => (
            <div className="bg-background border-border rounded-lg border p-4 shadow-lg">
              <div className="relative w-full min-w-[320px]">
                <div className="flex items-center gap-3">
                  <div className="relative h-3 w-3">
                    <div className="absolute inset-0 rounded-full bg-green-500" />
                    <div
                      className="absolute inset-0 animate-ping rounded-full bg-green-400"
                      style={{ animationIterationCount: "3" }}
                    />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-medium tracking-tight">
                      Model Ready
                    </p>
                    <p className="text-muted-foreground mt-0.5 font-mono text-[10px]">
                      Open menu (⌘+K) to start chatting
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
          {
            id: toastId,
            duration: 3000,
            position: "bottom-right",
          },
        );
      } catch (error) {
        console.error("Failed to initialize AI:", error);

        toast.custom(
          (t) => (
            <div className="bg-background border-destructive rounded-lg border p-4 shadow-lg">
              <div className="relative w-full min-w-[320px]">
                <div className="flex items-center gap-3">
                  <div className="bg-destructive h-3 w-3 rounded-full" />
                  <div>
                    <p className="font-mono text-sm font-medium tracking-tight">
                      Failed to Load Model
                    </p>
                    <p className="text-muted-foreground mt-0.5 font-mono text-[10px]">
                      Try again from the command menu
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
          {
            id: toastId,
            duration: 5000,
            position: "bottom-right",
          },
        );
      }
    }

    initializeModel();
  }, []);

  return null;
}
