"use client";

import * as React from "react";
import { CommandDialog } from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { Sparkles, Send, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AiChatDialog({
  open,
  onOpenChange,
  isInitialized,
  messages,
  isLoading,
  onSendMessage,
  onBack,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isInitialized: boolean;
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => Promise<void>;
  onBack: () => void;
}) {
  const [inputValue, setInputValue] = React.useState("");
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const message = inputValue;
    setInputValue("");
    await onSendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle className="sr-only">AI Chat</DialogTitle>
      <div className="bg-background flex h-150 flex-col">
        {/* Header */}
        <div className="border-border/50 from-muted/20 flex items-center justify-between border-b bg-linear-to-b to-transparent px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Sparkles className="text-accent h-5 w-5" />
              <div className="bg-accent/20 absolute inset-0 blur-xl" />
            </div>
            <span className="font-serif text-lg font-medium tracking-tight">
              AI Assistant
            </span>
          </div>
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground font-mono text-xs tracking-wider uppercase transition-colors"
          >
            ← Back
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          {!isInitialized && (
            <div className="flex flex-col items-center justify-center gap-4 py-16">
              <div className="relative">
                <Loader2 className="text-accent h-8 w-8 animate-spin" />
                <div className="bg-accent/20 absolute inset-0 animate-pulse blur-2xl" />
              </div>
              <span className="text-muted-foreground font-mono text-sm tracking-wide">
                Initializing model...
              </span>
            </div>
          )}

          {isInitialized && messages.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="relative mb-2">
                <Sparkles className="text-accent/60 h-12 w-12" />
                <div className="bg-accent/10 absolute inset-0 blur-3xl" />
              </div>
              <p className="text-foreground/90 font-serif text-xl">
                Ask me anything about Leo
              </p>
              <p className="text-muted-foreground max-w-xs font-mono text-xs tracking-wide">
                Try: "What projects has Leo worked on?" or "Tell me about Leo's
                experience"
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-4 duration-500`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                  message.role === "user"
                    ? "from-accent to-accent/80 text-accent-foreground shadow-accent/20 bg-linear-to-br shadow-lg"
                    : "bg-muted/50 border-border/50 border backdrop-blur-sm"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 flex justify-start duration-300">
              <div className="bg-muted/50 border-border/50 rounded-2xl border px-5 py-3 backdrop-blur-sm">
                <div className="flex gap-1.5">
                  <div
                    className="bg-muted-foreground/60 h-2 w-2 animate-bounce rounded-full"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="bg-muted-foreground/60 h-2 w-2 animate-bounce rounded-full"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="bg-muted-foreground/60 h-2 w-2 animate-bounce rounded-full"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Footer */}
        <div className="border-border/50 from-muted/10 border-t bg-linear-to-t to-transparent p-4">
          <div className="bg-muted/30 border-border/50 focus-within:border-accent/50 focus-within:bg-muted/50 flex items-center gap-3 rounded-xl border px-4 py-3 backdrop-blur-sm transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isInitialized ? "Type your message..." : "Waiting for model..."
              }
              disabled={!isInitialized || isLoading}
              className="placeholder:text-muted-foreground flex-1 bg-transparent font-sans text-sm outline-none disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={!isInitialized || isLoading || !inputValue.trim()}
              className="bg-accent/10 hover:bg-accent hover:text-accent-foreground rounded-lg p-2 transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-muted-foreground/60 mt-2 text-center font-mono text-[10px] tracking-wide">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </CommandDialog>
  );
}
