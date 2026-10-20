"use client";
import BirthForm from "./_components/BirthForm";
import FortuneAnalysis from "./_components/FortuneAnalysis";
import { useCompletion } from "@ai-sdk/react";
import { useAIConfig } from "@/hooks/useAIConfig";
import { PageHeader } from "@/components/design/PageHeader";

export default function FortunePage() {
  const { config: aiConfig } = useAIConfig();
  const { completion, isLoading, complete, error } = useCompletion({
    api: "/api/openai",
    onError: (err) => {
      console.error(err.message);
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

      await complete(prompt, { body: { aiConfig } });
    } catch (err) {
      console.error("获取解析结果时出错：", err);
    }
  };

  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-6xl px-5 pb-24 md:px-8"
    >
      <PageHeader
        index="叁"
        title="命理分析"
        en="BAZI / 四柱推命"
        meta="年 · 月 · 日 · 时"
        subtitle="以出生时刻立四柱，观五行生克与十神配置，推演禀赋、性情与运势的长期结构。"
      />

      <div className="grid gap-14 pt-10 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16 lg:pt-12">
        <BirthForm onSubmit={handleFormSubmit} isLoading={isLoading} />

        <div className="min-w-0">
          <FortuneAnalysis result={completion} isLoading={isLoading} />
          {error ? (
            <p className="mt-6 text-[0.8rem] text-destructive">
              推演中断：{error.message}
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
