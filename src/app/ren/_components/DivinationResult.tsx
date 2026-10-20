import { DivinationResult as DivinationResultType } from "../_lib/types";
import { getLiuShenExplanation } from "../_lib/constants";
import type { LiuShen } from "../_lib/constants";
import { SectionLabel } from "@/components/design/SectionLabel";
import { cn } from "@/lib/utils";

interface DivinationResultProps {
  result: DivinationResultType;
  nums?: { num1: number; num2: number; num3: number };
}

const PALACES = [
  { key: "divination1", explain: "explain1", label: "初宫", note: "事之起" },
  { key: "divination2", explain: "explain2", label: "中宫", note: "事之承" },
  { key: "divination3", explain: "explain3", label: "末宫", note: "事之果" },
] as const;

export function DivinationResult({ result, nums }: DivinationResultProps) {
  return (
    <section>
      <SectionLabel index="课成">卦象结果</SectionLabel>

      {nums ? (
        <p className="label mt-4 text-muted-foreground/45">
          课数 · {nums.num1} / {nums.num2} / {nums.num3}
        </p>
      ) : null}

      <div className="mt-8 grid gap-px bg-border md:grid-cols-3">
        {PALACES.map((palace, index) => {
          const name = result[palace.key];
          const explain = result[palace.explain];
          const meta = getLiuShenExplanation(name as LiuShen);
          const primary = index === PALACES.length - 1;

          return (
            <div
              key={palace.key}
              className={cn(
                "bg-background px-5 py-6 md:px-6 md:py-7",
              )}
              style={
                primary
                  ? {
                      background:
                        "color-mix(in oklch, var(--vermilion) 2.5%, var(--background))",
                      boxShadow: "inset 0 1px 0 0 var(--vermilion)",
                    }
                  : undefined
              }
            >
              <div className="flex items-baseline justify-between">
                <span className="label text-muted-foreground/50">
                  {palace.label} · {palace.note}
                </span>
                {primary ? (
                  <span className="label text-vermilion">主</span>
                ) : null}
              </div>

              <div
                className={cn(
                  "display mt-7 text-[2.1rem] leading-none",
                  primary && "text-vermilion",
                )}
              >
                {name}
              </div>

              <div className="label mt-4 text-muted-foreground/50">
                五行 {meta?.wuxing ?? "—"}
                {meta?.direction ? ` · ${meta.direction}` : ""}
                {meta?.animal ? ` · 临${meta.animal}` : ""}
              </div>

              <p className="mt-4 text-[0.85rem] leading-relaxed text-muted-foreground">
                {explain}
              </p>
            </div>
          );
        })}
      </div>

      <p className="classic mt-8 border-l border-vermilion/50 pl-5 text-[1rem] leading-[2]">
        断曰：{result.divination3}。{result.explain3}
      </p>
    </section>
  );
}
