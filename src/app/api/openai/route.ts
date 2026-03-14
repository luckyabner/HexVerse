import { FORTUNE_PROMPT } from "@/lib/prompts";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

// 环境变量配置 (默认 GLM)
const defaultApiKey = process.env.ZHIPU_API_KEY as string;
const defaultApiUrl = process.env.ZHIPU_API_URL || "https://open.bigmodel.cn/api/paas/v4";
const defaultModel = process.env.ZHIPU_MODEL || "glm-4-flash";

// 最大响应时长 (秒)
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { prompt, aiConfig } = await request.json();
    let modelInstance: any;

    // 解析前端传递的配置
    const provider = aiConfig?.provider || "default";

    if (provider === "default") {
      if (!defaultApiKey) {
        console.error("ZHIPU_API_KEY is missing from environment variables.");
        return NextResponse.json(
          { error: "API Key (ZHIPU_API_KEY) is missing. Please check your .env file." },
          { status: 400 },
        );
      }
      const openai = createOpenAI({
        baseURL: defaultApiUrl,
        apiKey: defaultApiKey,
      });
      modelInstance = openai(defaultModel);
    } else if (provider === "claude") {
      if (!aiConfig.apiKey) {
        return NextResponse.json({ error: "Claude API Key is missing." }, { status: 400 });
      }
      const anthropic = createAnthropic({
        baseURL: aiConfig.baseUrl || undefined, // undefined时使用官方默认
        apiKey: aiConfig.apiKey,
      });
      modelInstance = anthropic(aiConfig.model || "claude-3-5-sonnet-20240620");
    } else {
      // openai or custom
      if (!aiConfig.apiKey) {
        return NextResponse.json({ error: "API Key is missing for custom configuration." }, { status: 400 });
      }
      const openai = createOpenAI({
        baseURL: aiConfig.baseUrl || "https://api.openai.com/v1",
        apiKey: aiConfig.apiKey,
      });
      modelInstance = openai(aiConfig.model || "gpt-4o-mini");
    }

    const result = streamText({
      model: modelInstance,
      system: FORTUNE_PROMPT,
      prompt,
      maxTokens: 4096,
      onError({ error }) {
        console.error("Stream error details:", error);
      },
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 },
    );
  }
}
