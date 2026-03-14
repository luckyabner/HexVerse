"use client";
import React from "react";
import BirthForm from "./_components/BirthForm";
import FortuneAnalysis from "./_components/FortuneAnalysis";
import { useCompletion } from "@ai-sdk/react";
import { useAIConfig } from "@/hooks/useAIConfig";

export default function FortunePage() {
  const { config: aiConfig } = useAIConfig();
  const { completion, isLoading, complete } = useCompletion({
    api: "/api/openai",
    onError: (error) => {
      console.error(error.message);
    },
  });

  const handleFormSubmit = async (formData: FormData) => {
    try {
      // 从表单数据中提取值
      const birthDate = formData.get("birthDate") as string;
      const birthTime = formData.get("birthTime") as string;
      const gender = formData.get("gender") as string;
      const birthPlace = formData.get("birthPlace") as string;

      // 构建提示词
      const prompt = `出生信息如下：
        出生日期：${birthDate}
        出生时间（北京时间）：${birthTime}
        性别：${gender}
        出生地：${birthPlace}
        
        请根据以上信息，计算出此人的生辰八字，包括年柱、月柱、日柱和时柱，分析五行强弱，纳音属性，并给出个性特点、事业、财运、姻缘等方面的详细命理分析。
        请以markdown格式输出（不要用代码块包裹），并分段落组织内容。
      `;

      // 调用 complete 函数
      await complete(prompt, { body: { aiConfig } });
    } catch (err) {
      console.error("获取解析结果时出错：", err);
    }
  };

  return (
    <main id="main-content" className="container mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* 标题区域 */}
      <div className="text-center space-y-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          <span className="text-primary">命理</span>
          <span>分析</span>
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          揭示先天禀赋与人生轨迹
        </p>
      </div>

      {/* 内容区域 */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
        <BirthForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        <FortuneAnalysis result={completion} isLoading={isLoading} />
      </div>
    </main>
  );
}
