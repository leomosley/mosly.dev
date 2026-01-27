"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaSitemap,
  FaRss,
} from "react-icons/fa6";
import { Home, FileText, Sparkles, Send, Loader2 } from "lucide-react";
import { GITHUB_LINK, LINKEDIN_LINK, TWITTER_LINK } from "@/lib/constants";
import { env } from "@/lib/env";
import { SerializableBlog } from "@/lib/blog";
import { useAI } from "@/hooks/use-ai";
import { DialogTitle } from "./ui/dialog";

interface CommandMenuProps {
  blogs: SerializableBlog[];
}

export function CommandMenu({ blogs }: CommandMenuProps) {
  const router = useRouter();
  const {
    isInitialized,
    messages,
    isLoading,
    init,
    unload,
    sendMessage: aiSendMessage,
    clearMessages,
  } = useAI();
  const [open, setOpen] = React.useState(false);
  const [aiMode, setAiMode] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const chatEndRef = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const url = env.NEXT_PUBLIC_VERCEL_URL
    ? "https://" + env.NEXT_PUBLIC_VERCEL_URL
    : "http://localhost:3000";

  const pages = [
    { name: "Home", path: "/", icon: <Home /> },
    { name: "Blog", path: "/blog", icon: <FileText /> },
  ];

  const links = [
    { name: "GitHub", href: GITHUB_LINK, icon: <FaGithub /> },
    { name: "LinkedIn", href: LINKEDIN_LINK, icon: <FaLinkedin /> },
    { name: "Twitter/X", href: TWITTER_LINK, icon: <FaXTwitter /> },
    { name: "Sitemap", href: `${url}/sitemap.xml`, icon: <FaSitemap /> },
    { name: "RSS Feed", href: `${url}/feed.xml`, icon: <FaRss /> },
  ];

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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const message = inputValue;
    setInputValue("");
    await aiSendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (aiMode && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (aiMode) {
    return (
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">AI Chat</DialogTitle>
        <div className="flex flex-col h-[500px]">
          <div className="flex items-center border-b px-4 py-3">
            <Sparkles className="mr-2 h-5 w-5" />
            <span className="font-semibold">AI Chat</span>
            <button
              onClick={resetAiMode}
              className="ml-auto text-sm text-muted-foreground hover:text-foreground"
            >
              Back
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!isInitialized && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span className="text-sm text-muted-foreground">
                  Loading AI model...
                </span>
              </div>
            )}

            {isInitialized && messages.length === 0 && (
              <div className="text-center py-8 text-sm text-muted-foreground">
                <p>Ask me anything about Leo!</p>
                <p className="text-xs mt-2">
                  Try: &quot;What projects has Leo worked on?&quot;
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {isLoading &&
              messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}

            <div ref={chatEndRef} />
          </div>

          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isInitialized
                    ? "Type your message..."
                    : "Initializing AI model..."
                }
                disabled={!isInitialized || isLoading}
                className="flex-1 bg-transparent outline-hidden text-sm disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!isInitialized || isLoading || !inputValue.trim()}
                className="p-2 rounded-md hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </CommandDialog>
    );
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Command Menu</DialogTitle>
      <CommandInput
        placeholder="Type a command or search..."
        value={inputValue}
        onValueChange={setInputValue}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Pages">
          {pages.map((page) => (
            <CommandItem
              key={page.path}
              onSelect={() => handleNavigate(page.path)}
            >
              {page.icon}
              <span>{page.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        {blogs.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Blog Posts">
              {blogs.map((blog) => (
                <CommandItem
                  key={blog.data.filename}
                  onSelect={() =>
                    handleNavigate(`/blog/${blog.data.filename.slice(0, -3)}`)
                  }
                >
                  <FileText />
                  <span>{blog.data.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        <CommandSeparator />
        <CommandGroup heading="Links">
          {links.map((link) => (
            <CommandItem
              key={link.href}
              onSelect={() => handleOpenLink(link.href)}
            >
              {link.icon}
              <span>{link.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="AI">
          <CommandItem onSelect={startAiChat} disabled={!isInitialized}>
            <Sparkles />
            <span>
              {isInitialized ? "Start AI Chat" : "Loading AI model..."}
            </span>
          </CommandItem>
          {!isInitialized && (
            <CommandItem
              onSelect={() => {
                init();
                setOpen(false);
              }}
            >
              <Loader2 className="h-4 w-4" />
              <span>Load AI Model</span>
            </CommandItem>
          )}
          {isInitialized && (
            <CommandItem
              onSelect={async () => {
                await unload();
                setOpen(false);
              }}
            >
              <Loader2 className="h-4 w-4" />
              <span>Unload AI Model</span>
            </CommandItem>
          )}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
