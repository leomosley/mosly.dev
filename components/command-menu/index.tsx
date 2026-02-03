"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { env } from "@/lib/env";
import { SerializableBlog } from "@/lib/blog";
import { useAI } from "@/hooks/use-ai";
import { AiChatDialog } from "@/components/command-menu/ai-chat-dialog";
import {
  AiCommandGroup,
  NavigationCommandGroup,
  BlogPostsCommandGroup,
  ExternalLinksCommandGroup,
} from "@/components/command-menu/command-groups";
import {
  navigationPages,
  getExternalLinks,
} from "@/components/command-menu/config";

export function CommandMenu({ blogs }: { blogs: SerializableBlog[] }) {
  const router = useRouter();
  const {
    isInitialized,
    messages,
    isLoading,
    sendMessage: aiSendMessage,
    clearMessages,
  } = useAI();
  const [open, setOpen] = React.useState(false);
  const [aiMode, setAiMode] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const url = env.NEXT_PUBLIC_VERCEL_URL
    ? "https://" + env.NEXT_PUBLIC_VERCEL_URL
    : "http://localhost:3000";

  const externalLinks = React.useMemo(() => getExternalLinks(url), [url]);

  const handleNavigate = (path: string) => {
    router.push(path);
    setOpen(false);
    resetAiMode();
  };

  const handleOpenLink = (href: string) => {
    window.open(href, "_blank");
    setOpen(false);
    resetAiMode();
  };

  const resetAiMode = () => {
    setAiMode(false);
    clearMessages();
    setInputValue("");
  };

  const startAiChat = () => {
    setAiMode(true);
  };

  if (aiMode) {
    return (
      <AiChatDialog
        open={open}
        onOpenChange={setOpen}
        isInitialized={isInitialized}
        messages={messages}
        isLoading={isLoading}
        onSendMessage={aiSendMessage}
        onBack={resetAiMode}
        onClearMessages={clearMessages}
      />
    );
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Command Menu</DialogTitle>

      {/* Custom Search Input with oversized styling */}
      <div className="border-border/50 from-background to-muted/10 border-b bg-linear-to-b">
        <CommandInput
          placeholder="Search or jump to..."
          value={inputValue}
          onValueChange={setInputValue}
          className="placeholder:text-muted-foreground/60 h-16 font-mono text-base placeholder:tracking-wide"
        />
      </div>

      <CommandList className="max-h-125 p-2">
        <CommandEmpty>
          <div className="py-12 text-center">
            <p className="text-muted-foreground/80 font-serif text-base">
              No results found
            </p>
            <p className="text-muted-foreground/50 mt-2 font-mono text-xs tracking-wide">
              Try a different search term
            </p>
          </div>
        </CommandEmpty>

        {/* AI Group */}
        <AiCommandGroup
          isInitialized={isInitialized}
          onStartChat={startAiChat}
        />

        {/* Pages Group */}
        <NavigationCommandGroup
          pages={navigationPages}
          onNavigate={handleNavigate}
        />

        {/* Blog Posts Group */}
        <BlogPostsCommandGroup blogs={blogs} onNavigate={handleNavigate} />

        {/* Links Group */}
        <ExternalLinksCommandGroup
          links={externalLinks}
          onOpenLink={handleOpenLink}
        />
      </CommandList>

      {/* Footer with keyboard hint */}
      <div className="border-border/30 from-muted/10 border-t bg-linear-to-t to-transparent px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <kbd className="bg-muted/50 border-border/50 text-muted-foreground rounded border px-2 py-1 font-mono text-[10px] tracking-widest">
              ↑↓
            </kbd>
            <span className="text-muted-foreground/60 font-mono text-[10px] tracking-wide">
              Navigate
            </span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="bg-muted/50 border-border/50 text-muted-foreground rounded border px-2 py-1 font-mono text-[10px] tracking-widest">
              ⏎
            </kbd>
            <span className="text-muted-foreground/60 font-mono text-[10px] tracking-wide">
              Select
            </span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="bg-muted/50 border-border/50 text-muted-foreground rounded border px-2 py-1 font-mono text-[10px] tracking-widest">
              ESC
            </kbd>
            <span className="text-muted-foreground/60 font-mono text-[10px] tracking-wide">
              Close
            </span>
          </div>
        </div>
      </div>
    </CommandDialog>
  );
}
