import { memo } from "react";
import { Markdown } from "@/components/design/Markdown";
import { InkSpinner } from "@/components/design/InkSpinner";

interface FortuneAnalysisProps {
  result: string;
  isLoading?: boolean;
}

const PILLARS = ["年柱", "月柱", "日柱", "时柱"];

const FortuneAnalysis = memo(function FortuneAnalysis({
  result,
  isLoading = false,
}: FortuneAnalysisProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-border pb-3">
        <span className="label text-muted-foreground">命盘</span>
        <span className="label text-muted-foreground/45">
          {result ? "已成" : isLoading ? "推演中" : "待填"}
        </span>
      </div>

      {/* 四柱占位 */}
      <div className="mt-7 grid grid-cols-4 gap-px bg-border">
        {PILLARS.map((pillar) => (
          <div key={pillar} className="bg-background px-2 py-5 text-center">
            <div className="label text-[0.6rem] text-muted-foreground/50">
              {pillar}
            </div>
            <div className="display mt-3 text-[1.5rem] leading-none text-muted-foreground/20">
              —
            </div>
          </div>
        ))}
      </div>

      {!result && !isLoading && (
        <div className="mt-10">
          <p className="classic text-[1.05rem] leading-[2]">
            四柱未立，命盘未成。
          </p>
          <p className="mt-3 max-w-md text-[0.85rem] leading-relaxed text-muted-foreground">
            在左侧填写出生的年、月、日、时与地点。四柱一定，五行强弱、十神格局与运势走向便可推演。
          </p>

          <div className="mt-9 grid gap-px bg-border sm:grid-cols-2">
            {[
              "四柱 · 五行强弱",
              "十神 · 性情禀赋",
              "大运 · 流年走势",
              "事业 · 财运 · 姻缘",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-baseline gap-3 bg-background px-4 py-3"
              >
                <span className="numeral text-[0.6rem] text-muted-foreground/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.82rem] text-muted-foreground">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {isLoading && !result && (
        <div className="mt-10 flex items-center gap-3 border-t border-border pt-6">
          <InkSpinner className="h-4 w-4 text-vermilion" />
          <span className="label text-muted-foreground">
            排四柱 · 定五行 · 取用神
          </span>
        </div>
      )}

      {result && (
        <div className="mt-10 border-t border-border pt-8">
          <Markdown streaming={isLoading}>{result}</Markdown>
        </div>
      )}
    </div>
  );
});

export default FortuneAnalysis;
