"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { ai } from "@/lib/ai";
import { MODEL } from "@/lib/config";

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
  return (
    <div className="w-52 select-none">
      <div className="mb-2">
        <span className="font-mono text-[10px] normal-case tracking-normal text-muted-foreground truncate">
          {stage}
        </span>
      </div>
      <div className="h-1 w-full bg-border overflow-hidden rounded-full">
        <div
          className="h-full bg-accent origin-left transition-transform duration-300 ease-out"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </div>
  );
}

let toastId: string | number | undefined;
let isLoadingStarted = false;

export function ModelLoader() {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current || isLoadingStarted) return;
    hasInitialized.current = true;
    isLoadingStarted = true;

    async function initializeModel() {
      const client = ai();

      if (client.isReady()) {
        toast.success("Model ready", { duration: 2000 });
        return;
      }

      const cached = await isModelCached();

      let currentProgress = 0;
      let currentStage = "Loading model";

      toastId = toast.custom(
        () => (
          <div className="bg-background border-border rounded-xl border px-3 py-2.5 shadow-md">
            <ModelLoadingToast progress={currentProgress} stage={currentStage} />
          </div>
        ),
        { duration: Infinity, position: "bottom-right" },
      );

      try {
        await client.init(MODEL, (report) => {
          currentProgress = Math.round(report.progress * 100);
          const raw = report.text.replace(/[:\[(\d].*$/, "").trim().toLowerCase();
          currentStage = raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : "Loading model";

          toast.custom(
            () => (
              <div className="bg-background border-border rounded-xl border px-3 py-2.5 shadow-md">
                <ModelLoadingToast progress={currentProgress} stage={currentStage} />
              </div>
            ),
            { id: toastId, duration: Infinity, position: "bottom-right" },
          );
        });

        toast.custom(
          () => (
            <div className="bg-background border-border rounded-xl border px-3 py-2.5 shadow-md">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                <span className="text-xs text-muted-foreground">Model loaded</span>
                <kbd className="bg-muted border-border/60 text-muted-foreground rounded-md border px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
              </div>
            </div>
          ),
          { id: toastId, duration: 3000, position: "bottom-right" },
        );
      } catch (error) {
        console.error("Failed to initialize AI:", error);

        toast.custom(
          () => (
            <div className="bg-background border-destructive rounded-xl border px-3 py-2.5 shadow-md">
              <div className="flex items-center gap-2 w-52">
                <div className="h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                <span className="font-mono text-[10px] normal-case tracking-normal text-muted-foreground">
                  Load failed — retry via menu
                </span>
              </div>
            </div>
          ),
          { id: toastId, duration: 5000, position: "bottom-right" },
        );
      }
    }

    initializeModel();
  }, []);

  return null;
}
