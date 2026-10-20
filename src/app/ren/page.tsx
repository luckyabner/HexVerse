"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/design/PageHeader";
import { SectionLabel } from "@/components/design/SectionLabel";
import { useDivination, useAIAnalysis } from "./_hooks";
import { AIAnalysis, DivinationForm, DivinationResult } from "./_components";
import Explanation from "./_components/Explanation";
import { LIUSHEN_EXPLANATIONS } from "./_lib/constants";

export default function RenPage() {
  const {
    result,
    nums,
    manualNums,
    setManualNums,
    setNumsByTime,
    setNumsManually,
    resetDivination,
  } = useDivination();

  const { completion, setCompletion, isLoading, sendMsg, error } =
    useAIAnalysis();

  const [question, setQuestion] = useState("");

  const handleReset = () => {
    resetDivination();
    setCompletion("");
    setQuestion("");
  };

  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-6xl px-5 pb-24 md:px-8"
    >
      <PageHeader
        index="贰"
        title="小六壬"
        en="XIAO LIU REN / 三数课"
        meta="大安 · 留连 · 速喜 · 赤口 · 小吉 · 空亡"
        subtitle="以时起课，或以三数成局。六神轮转，快而直接，宜断眼前之事。"
      />

      {!result ? (
        <div className="grid gap-14 pt-10 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-16 md:pt-12">
          <section>
            <SectionLabel index="01">起课</SectionLabel>
            <div className="mt-6">
              <DivinationForm
                manualNums={manualNums}
                setManualNums={setManualNums}
                setNumsByTime={setNumsByTime}
                setNumsManually={setNumsManually}
              />
            </div>
          </section>

          <aside className="md:pt-2">
            <div className="label text-vermilion">六神速览</div>
            <ul className="mt-5 space-y-3.5 border-t border-border pt-5">
              {LIUSHEN_EXPLANATIONS.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline justify-between gap-3"
                >
                  <span className="display text-[1.05rem] leading-none">
                    {item.name}
                  </span>
                  <span className="text-right text-[0.72rem] leading-relaxed text-muted-foreground/55">
                    {item.meanings.split("、").slice(0, 2).join("、")}
                  </span>
                </li>
              ))}
            </ul>
            <p className="classic mt-8 border-t border-border pt-5 text-[0.8rem] leading-[2] text-muted-foreground/65">
              「六壬神课，
              <br />
              取时取数，
              <br />
              一念即应。」
            </p>
          </aside>
        </div>
      ) : (
        <div className="space-y-20 pt-10 md:space-y-24 md:pt-12">
          <DivinationResult result={result} nums={nums} />

          <AIAnalysis
            result={result}
            userQuestion={question}
            setUserQuestion={setQuestion}
            completion={completion}
            isLoading={isLoading}
            sendMsg={sendMsg}
            onReset={() => setCompletion("")}
            error={error}
          />

          <Explanation />

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <p className="label text-muted-foreground/45">
              本次课象仅存于当前会话
            </p>
            <Button variant="outline" onClick={handleReset}>
              重新起课
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
