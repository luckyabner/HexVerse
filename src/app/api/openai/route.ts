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

// Helper function to categorize and format errors
function formatError(error: unknown): { message: string; status: number } {
  const err = error as Error & { status?: number; cause?: { code?: string } };

  // Network errors
  if (err.cause?.code === "ECONNREFUSED" || err.message.includes("fetch failed")) {
    return { message: "无法连接到AI服务，请检查网络连接后重试。", status: 503 };
  }

  // Rate limiting
  if (err.message.includes("rate_limit") || err.message.includes("429")) {
    return { message: "请求过于频繁，请稍后再试。", status: 429 };
  }

  // Authentication errors
  if (err.message.includes("401") || err.message.includes("authentication") || err.message.includes("API key")) {
    return { message: "API密钥无效或已过期，请检查配置。", status: 401 };
  }

  // Permission errors
  if (err.message.includes("403") || err.message.includes("permission")) {
    return { message: "没有权限访问该资源，请检查API权限。", status: 403 };
  }

  // Not found
  if (err.message.includes("404") || err.message.includes("model not found")) {
    return { message: "指定的AI模型不存在，请检查模型名称。", status: 404 };
  }

  // Bad request
  if (err.message.includes("400") || err.message.includes("bad request")) {
    return { message: "请求参数有误，请稍后重试。", status: 400 };
  }

  // Server errors
  if (err.message.includes("500") || err.message.includes("internal server error")) {
    return { message: "AI服务暂时不可用，请稍后再试。", status: 500 };
  }

  // Default
  return { message: err.message || "发生未知错误，请稍后重试。", status: 500 };
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, aiConfig } = await request.json();
    let modelInstance: any;

    // Validate prompt
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "请提供有效的查询内容。" },
        { status: 400 },
      );
    }

    // Limit prompt length to prevent abuse
    if (prompt.length > 10000) {
      return NextResponse.json(
        { error: "查询内容过长，请简化后重试。" },
        { status: 400 },
      );
    }

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
  } catch (error) {
    console.error("API Route Error:", error);
    const { message, status } = formatError(error);
    return NextResponse.json(
      { error: message },
      { status },
    );
  }
}
