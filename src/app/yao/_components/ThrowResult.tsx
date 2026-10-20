import { YaoLine } from "@/components/design/HexagramLines";
import { yaoValue } from "@/lib/hexagram";
import { cn } from "@/lib/utils";

interface ThrowResultsProps {
  results: string[];
  isAnimating: boolean;
}

const POSITIONS = ["初", "二", "三", "四", "五", "上"];

/** 六爻构建过程：自下而上逐步成卦 */
export default function ThrowResults({ results, isAnimating }: ThrowResultsProps) {
  return (
    <div className="mt-8" aria-live="polite">
      <div className="flex items-center justify-between">
        <span className="label text-muted-foreground">成卦 · 自下而上</span>
        <span className="label text-muted-foreground/50">上爻</span>
      </div>

      <div className="mt-4 border-t border-border">
        {[5, 4, 3, 2, 1, 0].map((position) => {
          const value = results[position];
          const meta = value ? yaoValue(value) : null;
          const justThrown =
            isAnimating && !!meta && position === results.length - 1;

          return (
            <div
              key={position}
              className={cn(
                "grid grid-cols-[1.5rem_1fr_auto] items-center gap-4 border-b border-border py-3 transition-colors duration-500 md:grid-cols-[2rem_1fr_auto]",
                justThrown && "bg-vermilion/[0.05]",
              )}
            >
              <span className="label text-muted-foreground/45">
                {POSITIONS[position]}
              </span>

              <div className="flex items-center">
                {meta ? (
                  <YaoLine
                    yang={meta.yang}
                    width={112}
                    thickness={6}
                    moving={meta.moving}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="block h-[6px] w-[112px] border-t border-dashed border-foreground/15"
                  />
                )}
              </div>

              <span
                className={cn(
                  "label text-right text-[0.6rem]",
                  meta?.moving
                    ? "text-vermilion"
                    : "text-muted-foreground/55",
                )}
              >
                {meta ? `${meta.name} · ${meta.num}` : "—"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
