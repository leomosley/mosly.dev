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

      <CommandInput
        placeholder="Search or jump to..."
        value={inputValue}
        onValueChange={setInputValue}
        className="h-14 text-base"
      />

      <CommandList className="max-h-[420px] p-2 pb-2.5">
        <CommandEmpty>
          <div className="py-10 text-center">
            <p className="text-muted-foreground text-sm">No results found</p>
          </div>
        </CommandEmpty>

        <AiCommandGroup
          isInitialized={isInitialized}
          onStartChat={startAiChat}
        />

        <NavigationCommandGroup
          pages={navigationPages}
          onNavigate={handleNavigate}
        />

        <BlogPostsCommandGroup blogs={blogs} onNavigate={handleNavigate} />

        <ExternalLinksCommandGroup
          links={externalLinks}
          onOpenLink={handleOpenLink}
        />
      </CommandList>
    </CommandDialog>
  );
}
