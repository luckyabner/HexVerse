"use client";
import React from "react";
import explains from "../_lib/explains.json";
import Hexagram from "./Hexagram";
import { SectionLabel } from "@/components/design/SectionLabel";
import { movingLines, yaoName } from "@/lib/hexagram";
import type { Hexagram as HexagramType } from "../_lib/types";
import { cn } from "@/lib/utils";

interface ExplainProps {
  hexagramNow: string;
  hexagramFuture: string;
}

function TextBlock({ label, text }: { label: string; text?: string }) {
  if (!text) return null;
  return (
    <div className="grid gap-2 md:grid-cols-[3.5rem_1fr] md:gap-6">
      <div className="label pt-[0.45rem] text-muted-foreground/60">{label}</div>
      <p className="classic text-[1.02rem] leading-[2.05]">{text}</p>
    </div>
  );
}

function Reading({
  tag,
  hexagram,
  moving,
}: {
  tag: string;
  hexagram: HexagramType | undefined;
  moving: boolean;
}) {
  if (!hexagram) return null;
  return (
    <article>
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <span
          className={cn(
            "label",
            moving ? "text-muted-foreground/55" : "text-vermilion",
          )}
        >
          {tag}
        </span>
        <h2 className="display text-[1.9rem] leading-none md:text-[2.15rem]">
          {hexagram.卦名}
        </h2>
        <span className="numeral text-[0.7rem] text-muted-foreground/50">
          第 {hexagram.序号} 卦
        </span>
      </header>

      <div className="mt-7 space-y-6">
        <TextBlock label="卦辞" text={hexagram.卦辞} />
        <TextBlock label="彖辞" text={hexagram.彖辞} />
        <TextBlock label="象辞" text={hexagram.象辞} />
      </div>
    </article>
  );
}

const Explain: React.FC<ExplainProps> = ({ hexagramNow, hexagramFuture }) => {
  if (!hexagramNow || !hexagramFuture) return null;

  const nowExplain = explains[hexagramNow as keyof typeof explains] as
    | HexagramType
    | undefined;
  const futureExplain = explains[hexagramFuture as keyof typeof explains] as
    | HexagramType
    | undefined;

  const moving = movingLines(hexagramNow, hexagramFuture);
  const movingYao = moving.map((index) => {
    const name = yaoName(index, hexagramNow[index] === "1");
    return { name, text: nowExplain?.爻辞?.[name] };
  });

  return (
    <section>
      <SectionLabel index="卦成">卦象</SectionLabel>

      <div className="mt-8 grid gap-10 md:grid-cols-[15rem_1fr] md:gap-14">
        {/* 卦象图示 */}
        <div className="self-start border border-border p-6 md:sticky md:top-24">
          <div className="flex items-center justify-between">
            <span className="label text-muted-foreground/60">本卦</span>
            <span className="label text-muted-foreground/45">NOW</span>
          </div>
          <div className="mt-6 flex justify-center">
            <Hexagram code={hexagramNow} moving={moving} />
          </div>
          <div className="mt-6 text-center">
            <div className="display text-[1.35rem] leading-none">
              {nowExplain?.卦名 ?? "—"}
            </div>
            <div className="label mt-2 text-muted-foreground/45">
              第 {nowExplain?.序号 ?? "—"} 卦
            </div>
          </div>

          <div className="my-7 flex items-center gap-2">
            <span className="h-px flex-1 bg-border" />
            <span className="label text-[0.6rem] text-muted-foreground/45">
              之
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="flex items-center justify-between">
            <span className="label text-muted-foreground/60">变卦</span>
            <span className="label text-muted-foreground/45">THEN</span>
          </div>
          <div className="mt-6 flex justify-center">
            <Hexagram code={hexagramFuture} />
          </div>
          <div className="mt-6 text-center">
            <div className="display text-[1.35rem] leading-none">
              {futureExplain?.卦名 ?? "—"}
            </div>
            <div className="label mt-2 text-muted-foreground/45">
              第 {futureExplain?.序号 ?? "—"} 卦
            </div>
          </div>

          <div className="mt-7 border-t border-dashed border-border pt-4">
            <div
              className={cn(
                "label text-center",
                moving.length ? "text-vermilion" : "text-muted-foreground/50",
              )}
            >
              {moving.length
                ? `动爻 ${movingYao.map((item) => item.name).join(" · ")}`
                : "六爻安静 · 无动爻"}
            </div>
          </div>
        </div>

        {/* 卦辞 */}
        <div className="space-y-12">
          <Reading tag="本卦 · 当下" hexagram={nowExplain} moving={false} />

          <div aria-hidden="true" className="flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="label text-[0.6rem] text-muted-foreground/50">
              变
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Reading tag="变卦 · 去向" hexagram={futureExplain} moving />

          {movingYao.length > 0 && (
            <div className="border-l border-vermilion/40 pl-5 md:pl-6">
              <div className="label text-vermilion">动爻 · 转折处</div>

              {movingYao.some((item) => item.text) ? (
                <div className="mt-4 space-y-4">
                  {movingYao.map((item) => (
                    <div key={item.name}>
                      <div className="text-[0.82rem] text-muted-foreground">
                        {item.name}
                      </div>
                      {item.text ? (
                        <p className="classic mt-1 text-[1rem] leading-[2]">
                          {item.text}
                        </p>
                      ) : (
                        <p className="label mt-1.5 text-[0.6rem] text-muted-foreground/50">
                          此爻爻辞未收录
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="classic mt-3 text-[0.95rem] leading-[2] text-muted-foreground/70">
                  {movingYao.map((item) => item.name).join("、")}
                  <span className="mx-2 text-muted-foreground/30">|</span>
                  此卦爻辞未收录，以卦辞、象辞参看。
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Explain;
