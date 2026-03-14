import { FORTUNE_PROMPT } from "@/lib/prompts";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

// 环境变量配置
const apiKey = process.env.ZHIPU_API_KEY as string;
const apiUrl = process.env.ZHIPU_API_URL || "https://open.bigmodel.cn/api/paas/v4";
// 默认模型改用更稳定的 glm-4-flash，因为 glm-4.7-flash 可能会触发 1302 速率限制
const model = process.env.ZHIPU_MODEL || "glm-4-flash";

// 最大响应时长 (秒)
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!apiKey) {
      console.error("ZHIPU_API_KEY is missing from environment variables.");
      return NextResponse.json(
        { error: "API Key (ZHIPU_API_KEY) is missing. Please check your .env file." },
        { status: 400 },
      );
    }

    const openai = createOpenAI({
      baseURL: apiUrl,
      apiKey: apiKey,
    });

    const result = streamText({
      model: openai(model),
      system: FORTUNE_PROMPT,
      prompt,
      // 降低默认 maxTokens 以提高兼容性，用户可在 .env 中配置模型
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
