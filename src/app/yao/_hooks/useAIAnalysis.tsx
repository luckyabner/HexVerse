import { useCompletion } from "@ai-sdk/react";
import { useState } from "react";
import { Hexagram } from "../_lib/types";
import { useAIConfig } from "@/hooks/useAIConfig";

export default function useAIAnalysis(
  hexagramNow: Hexagram,
  hexagramFuture: Hexagram,
) {
  const [userQuestion, setUserQuestion] = useState("");
  const { config: aiConfig } = useAIConfig();

  const { completion, isLoading, complete } = useCompletion({
    api: "/api/openai",
    onError: (error) => {
      console.error(error.message);
    },
  });

  const generatePrompt = (question: string) => {
    return `
      你是我的解卦师，你精通易经，帮我解卦，我用金钱法算卦，
      得出本卦是${hexagramNow.卦名}（代表当下），它的卦辞为${hexagramNow.卦辞}，彖辞为${hexagramNow.彖辞}，爻辞为${hexagramNow.爻辞}；
      变卦是${hexagramFuture.卦名}（代表未来），它的卦辞为${hexagramFuture.卦辞}，彖辞为${hexagramFuture.彖辞}，爻辞为${hexagramFuture.爻辞}。
      我的问题是：${question}。
      今天是${new Date().toLocaleDateString("zh-CN")}。
      请针对我的问题，以卦辞、彖辞、爻辞为依据，给出详细的解答（直接使用markdown格式，不要使用代码块包裹整个回答），且严格按照以下格式：
      1.本卦逐字解释。
      2.解读当下形势。
      3.变卦逐字解释。
      4.预测未来走势。
      5.针对问题的具体建议。
    `;
  };

  const handleAiExplain = async () => {
    if (!userQuestion.trim()) {
      alert("请输入你的问题");
      return;
    }

    try {
      await complete(generatePrompt(userQuestion), { body: { aiConfig } });
    } catch (err) {
      console.error("AI解析出错:", err);
    }
  };

  return {
    userQuestion,
    setUserQuestion,
    completion,
    isLoading,
    handleAiExplain,
  };
}
