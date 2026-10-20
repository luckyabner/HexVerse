"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/design/PageHeader";
import { SectionLabel } from "@/components/design/SectionLabel";
import { useHexagram } from "./_hooks";
import {
  AIExplain,
  AutoDivination,
  Explain,
  ManualDivination,
  PreparationArea,
} from "./_components";
import explains from "./_lib/explains.json";
import type { Hexagram as HexagramType } from "./_lib/types";
import { cn } from "@/lib/utils";

const METHODS = [
  {
    value: "auto" as const,
    index: "A",
    name: "赛博投掷",
    note: "三枚铜钱，六掷成卦",
  },
  {
    value: "manual" as const,
    index: "B",
    name: "手动排盘",
    note: "已有投掷结果，逐爻录入",
  },
];

export default function DivinationPage() {
  const {
    hexagramNow,
    hexagramFuture,
    results,
    isAnimating,
    manualValues,
    handleAutoThrow,
    handleSelectChange,
    handleManualGenerate,
    resetDivination,
  } = useHexagram();

  const [question, setQuestion] = useState("");
  const [method, setMethod] = useState<"auto" | "manual">("auto");

  const done = Boolean(hexagramNow && hexagramFuture);
  const nowExplain = done
    ? (explains[hexagramNow as keyof typeof explains] as HexagramType)
    : undefined;
  const futureExplain = done
    ? (explains[hexagramFuture as keyof typeof explains] as HexagramType)
    : undefined;

  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-6xl px-5 pb-24 md:px-8"
    >
      <PageHeader
        index="壹"
        title="六爻起卦"
        en="LIU YAO / 金钱课"
        meta="六十四卦 · 三百八十四爻"
        subtitle="以三枚铜钱六掷成卦。本卦示当下，变卦示去向，动爻处即转折处。"
      />

      {!done ? (
        <div className="grid gap-14 pt-10 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-16 md:pt-12">
          <div>
            {/* 01 提问 */}
            <section>
              <SectionLabel index="01">写下你的问题</SectionLabel>

              <div className="mt-6">
                <label htmlFor="question" className="sr-only">
                  你的问题
                </label>
                <textarea
                  id="question"
                  value={question}
                  onChange={(event) =>
                    setQuestion(event.target.value.slice(0, 120))
                  }
                  rows={2}
                  placeholder="例如：这个方向是否值得继续投入？"
                  className="classic min-h-[84px] w-full resize-none border-b border-border bg-transparent pb-3 text-[1.15rem] leading-[1.9] outline-none transition-colors placeholder:text-muted-foreground/45 focus:border-foreground"
                />
                <div className="mt-3 flex items-baseline justify-between">
                  <p className="label text-muted-foreground/45">
                    问题越具体，卦象越清晰
                  </p>
                  <span className="numeral text-[0.65rem] text-muted-foreground/45">
                    {question.length}/120
                  </span>
                </div>
              </div>
            </section>

            {/* 02 起卦方式 */}
            <section className="mt-12">
              <SectionLabel index="02">选择起卦方式</SectionLabel>

              <div className="mt-6 grid gap-px bg-border sm:grid-cols-2">
                {METHODS.map((item) => {
                  const active = method === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setMethod(item.value)}
                      className={cn(
                        "group flex cursor-pointer flex-col items-start gap-2 px-5 py-4 text-left transition-colors",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "bg-background hover:bg-accent",
                      )}
                    >
                      <span className="flex w-full items-baseline justify-between">
                        <span className="text-[0.95rem]">{item.name}</span>
                        <span
                          className={cn(
                            "label text-[0.6rem]",
                            active
                              ? "text-primary-foreground/40"
                              : "text-muted-foreground/45",
                          )}
                        >
                          {item.index}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "text-[0.75rem] leading-relaxed",
                          active
                            ? "text-primary-foreground/65"
                            : "text-muted-foreground/70",
                        )}
                      >
                        {item.note}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8">
                {method === "auto" ? (
                  <AutoDivination
                    isAnimating={isAnimating}
                    results={results}
                    onThrow={handleAutoThrow}
                  />
                ) : (
                  <ManualDivination
                    manualValues={manualValues}
                    onSelectChange={handleSelectChange}
                    onGenerate={handleManualGenerate}
                  />
                )}
              </div>
            </section>
          </div>

          <aside className="md:pt-2">
            <PreparationArea />
          </aside>
        </div>
      ) : (
        <div className="space-y-20 pt-10 md:space-y-24 md:pt-12">
          <Explain hexagramNow={hexagramNow} hexagramFuture={hexagramFuture} />

          {nowExplain && futureExplain ? (
            <AIExplain
              hexagramNow={nowExplain}
              hexagramFuture={futureExplain}
              question={question}
              setQuestion={setQuestion}
            />
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <p className="label text-muted-foreground/45">
              本次卦象仅存于当前会话
            </p>
            <Button variant="outline" onClick={resetDivination}>
              重新起卦
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
