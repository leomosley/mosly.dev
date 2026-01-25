"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { ai, type LLMMessage } from "@/lib/ai";
import { MODEL } from "@/lib/constants";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function useAI() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasAsked, setHasAsked] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize AI with optional toast
  const init = useCallback(async (toastId?: string | number) => {
    try {
      const client = ai();
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
      setHasAsked(false);
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
            content: `You are a helpful assistant on Leo's portfolio website. Here is context about Leo:\n\n${context}\n\nProvide concise, helpful responses about Leo's work, projects, and experience.`,
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

  // Show initial consent toast
  useEffect(() => {
    if (hasAsked) return;

    const toastId = toast("Enable Local AI?", {
      description: "Load the AI model to chat about Leo's work and projects",
      duration: Infinity,
      position: "bottom-right",
      action: {
        label: "Enable",
        onClick: () => {
          toast.loading("Initializing AI model...", { id: toastId });
          init(toastId);
        },
      },
      cancel: {
        label: "Later",
        onClick: () => {
          toast.dismiss(toastId);
        },
      },
    });

    setHasAsked(true);
  }, [hasAsked, init]);

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
