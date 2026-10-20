import { cn } from "@/lib/utils";
import { YaoLine } from "./HexagramLines";
import { Seal } from "./Seal";
import { yaoName } from "@/lib/hexagram";

/**
 * 首页卦盘：以一个真实卦象（风山渐）作为装饰性图示。
 * 自下而上为初爻 → 上爻，动爻以朱砂标出。
 */
export function HexagramPlate({ className }: { className?: string }) {
  const code = "001011"; // 下艮上巽 = 风山渐
  const moving = [1, 4];
  const lines = code.split("");

  return (
    <div
      className={cn(
        "corner-frame relative w-full max-w-[420px] border border-border bg-card/40 px-7 py-7 md:px-9 md:py-9",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="turn-slow relative">
          <div className="h-[280px] w-[280px] rounded-full border border-dashed border-vermilion/25" />
          <div className="absolute top-1/2 left-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-vermilion/15" />
        </div>
      </div>

      <div className="relative flex items-baseline justify-between">
        <span className="label text-muted-foreground/60">卦象 · 示例</span>
        <span className="label text-muted-foreground/50">64 →</span>
      </div>

      <div className="relative mx-auto my-14 flex w-fit flex-col-reverse gap-[14px]">
        {lines.map((digit, index) => {
          const yang = digit === "1";
          const isMoving = moving.includes(index);
          return (
            <div key={index} className="flex items-center gap-4">
              <YaoLine
                yang={yang}
                width={150}
                thickness={8}
                moving={isMoving}
                delay={280 + index * 110}
              />
              <span
                className={cn(
                  "label text-[0.6rem]",
                  isMoving ? "text-vermilion" : "text-muted-foreground/45",
                )}
              >
                {yaoName(index, yang)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="relative flex items-end justify-between">
        <div>
          <div className="label text-vermilion">动爻 · 六二 · 九五</div>
          <div className="display mt-2 text-[1.6rem] leading-none">
            风山渐
            <span className="numeral ml-2 align-middle text-[0.7rem] text-muted-foreground">
              53
            </span>
          </div>
        </div>
        <Seal size="sm" />
      </div>
    </div>
  );
}
