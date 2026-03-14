import { useState } from "react";
import { DivinationResult } from "../_lib/types";
import { useCompletion } from "@ai-sdk/react";
import { LIUSHEN_EXPLANATIONS } from "../_lib/constants";
import { useAIConfig } from "@/hooks/useAIConfig";

export function useAIAnalysis() {
  const [userQuestion, setUserQuestion] = useState("");
  const { config: aiConfig } = useAIConfig();

  const { completion, setCompletion, isLoading, complete } = useCompletion({
    api: "/api/openai",
    onError: (error) => {
      console.error(error.message);
    },
  });

  const sendMsg = async (result: DivinationResult | null) => {
    if (!userQuestion.trim()) {
      alert("请先输入你的问题");
      return;
    }

    if (!result) {
      alert("请先起卦");
      return;
    }

    const prompt = `
你是一个精通小六壬的占卜专家。请分析用户的卦象并回答其问题：
六壬解释：${JSON.stringify(LIUSHEN_EXPLANATIONS)}
卦象信息：${JSON.stringify(result)}
用户问题：${userQuestion}

请根据上述小六壬卦象，提供以下分析：
1. 卦象的整体吉凶判断及基本含义
2. 针对用户具体问题的详细解析（包括可能的结果、时间指示、方位指示等）
3. 根据卦象给予的具体行动建议或指导

回答要求：
- 使用"我"和"你"的口吻进行回答
- 运用小六壬专业术语（如五行、方位、临神等）增强专业性
- 保持分析精准、简洁、实用
- 避免模糊或空泛的表述
- 内容限制在300字以内

请直接开始你的分析，不需要重复问题或卦象信息。
`;

    try {
      await complete(prompt, { body: { aiConfig } });
    } catch (error) {
      console.error("AI分析失败:", error);
      setCompletion("AI分析出现错误，请稍后再试。");
    }
  };

  const resetAIAnalysis = () => {
    setCompletion("");
    setUserQuestion("");
  };

  return {
    userQuestion,
    setUserQuestion,
    completion,
    isLoading,
    sendMsg,
    resetAIAnalysis,
  };
}
