"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { ai, type LLMMessage } from "@/lib/ai";
import { MODEL } from "@/lib/config";
import { env } from "@/lib/env";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function useAI() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Check if AI is already initialized on mount and poll for initialization
  useEffect(() => {
    const client = ai();

    // Check immediately
    if (client.isReady()) {
      setIsInitialized(true);
      return;
    }

    // Poll every 500ms to detect when model finishes loading
    const interval = setInterval(() => {
      if (client.isReady()) {
        setIsInitialized(true);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Initialize AI with optional toast (for manual triggers)
  const init = useCallback(async (toastId?: string | number) => {
    try {
      const client = ai();

      // If already initialized, just update state
      if (client.isReady()) {
        setIsInitialized(true);
        return;
      }

      await client.init(MODEL, (report) => {
        const progress = Math.round(report.progress * 100);
        toast.loading(`Loading AI model... ${progress}%`, {
          id: toastId,
          description: report.text,
        });
      });

      toast.success("AI model loaded successfully!", {
        id: toastId,
        duration: 2000,
      });

      setIsInitialized(true);
    } catch (error) {
      console.error("Failed to initialize AI:", error);
      toast.error("Failed to load AI model", {
        id: toastId,
        description: "You can try again later from the Command Menu",
      });
    }
  }, []);

  // Unload AI model
  const unload = useCallback(async () => {
    try {
      const client = ai();
      await client.unload();
      setIsInitialized(false);
      setMessages([]);
      toast.success("AI model unloaded", {
        duration: 2000,
      });
    } catch (error) {
      console.error("Failed to unload AI:", error);
      toast.error("Failed to unload AI model");
    }
  }, []);

  // Send a message and get streaming response
  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!userMessage.trim() || isLoading || !isInitialized) return;

      setIsLoading(true);

      // Add user message
      const newMessages: ChatMessage[] = [
        ...messages,
        { role: "user", content: userMessage.trim() },
      ];
      setMessages(newMessages);

      try {
        const client = ai();
        const context = await client.loadContext();

        const llmMessages: LLMMessage[] = [
          {
            role: "system",
            content: `You are a helpful assistant on ${env.NEXT_PUBLIC_FIRST_NAME}'s portfolio website. Here is context about ${env.NEXT_PUBLIC_FIRST_NAME}:\n\n${context}\n\nProvide concise, helpful responses about ${env.NEXT_PUBLIC_FIRST_NAME}'s work, projects, and experience.`,
          },
          ...newMessages.map((msg) => ({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          })),
        ];

        let assistantResponse = "";

        for await (const chunk of client.chat(llmMessages, {
          temperature: 0.7,
          maxTokens: 500,
        })) {
          assistantResponse += chunk;
          // Update the last message in real-time
          setMessages([
            ...newMessages,
            { role: "assistant", content: assistantResponse },
          ]);
        }
      } catch (error) {
        console.error("Chat error:", error);
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: "Sorry, I encountered an error. Please try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, isInitialized],
  );

  // Clear chat history
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    isInitialized,
    messages,
    isLoading,
    init,
    unload,
    sendMessage,
    clearMessages,
  };
}
