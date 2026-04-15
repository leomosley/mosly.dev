"use client";

import { CreateMLCEngine, MLCEngine } from "@mlc-ai/web-llm";
import { MODEL } from "./config";
import { env } from "./env";

export type LLMMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type LLMConfig = {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  onProgress?: (report: { text: string; progress: number }) => void;
};

export class WebLLMClient {
  private engine: MLCEngine | null = null;
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  async init(
    model: string = MODEL,
    onProgress?: (report: { text: string; progress: number }) => void,
  ): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = (async () => {
      this.engine = await CreateMLCEngine(model, {
        initProgressCallback: onProgress,
      });
      this.isInitialized = true;
    })();

    return this.initPromise;
  }

  isReady(): boolean {
    return this.isInitialized && this.engine !== null;
  }

  async *chat(
    messages: LLMMessage[],
    config?: LLMConfig,
  ): AsyncGenerator<string, void, unknown> {
    if (!this.engine) {
      throw new Error("LLM engine not initialized. Call initialize() first.");
    }

    const completion = await this.engine.chat.completions.create({
      messages,
      temperature: config?.temperature ?? 0.7,
      max_tokens: config?.maxTokens,
      stream: true,
    });

    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        yield content;
      }
    }
  }

  async chatComplete(
    messages: LLMMessage[],
    config?: LLMConfig,
  ): Promise<string> {
    if (!this.engine) {
      throw new Error("LLM engine not initialized. Call initialize() first.");
    }

    const completion = await this.engine.chat.completions.create({
      messages,
      temperature: config?.temperature ?? 0.7,
      max_tokens: config?.maxTokens,
      stream: false,
    });

    return completion.choices[0]?.message?.content ?? "";
  }

  async loadContext(): Promise<string> {
    try {
      const response = await fetch("/CONTEXT.md");
      if (!response.ok) {
        throw new Error("Failed to load context");
      }
      return await response.text();
    } catch (error) {
      console.error("Error loading context:", error);
      return "";
    }
  }

  async *chatWithContext(
    userMessage: string,
    config?: LLMConfig,
  ): AsyncGenerator<string, void, unknown> {
    const context = await this.loadContext();

    const messages: LLMMessage[] = [
      {
        role: "system",
        content: `You are a helpful assistant. Here is context about ${env.NEXT_PUBLIC_FIRST_NAME} and their website:\n\n${context}`,
      },
      {
        role: "user",
        content: userMessage,
      },
    ];

    yield* this.chat(messages, config);
  }

  async resetChat(): Promise<void> {
    if (!this.engine) {
      throw new Error("LLM engine not initialized.");
    }
    await this.engine.resetChat();
  }

  async getRuntimeStats(): Promise<string> {
    if (!this.engine) {
      throw new Error("LLM engine not initialized.");
    }
    return await this.engine.runtimeStatsText();
  }

  async unload(): Promise<void> {
    if (this.engine) {
      await this.engine.resetChat();
      this.engine = null;
      this.isInitialized = false;
      this.initPromise = null;
    }
  }
}

let clientInstance: WebLLMClient | null = null;

export function ai(): WebLLMClient {
  if (!clientInstance) {
    clientInstance = new WebLLMClient();
  }
  return clientInstance;
}
