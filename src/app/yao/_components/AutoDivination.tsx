import { Button } from "@/components/ui/button";
import { InkSpinner } from "@/components/design/InkSpinner";
import ThrowResults from "./ThrowResult";
import { cn } from "@/lib/utils";

interface AutoDivinationProps {
  isAnimating: boolean;
  results: string[];
  onThrow: () => void;
}

function Coin({ index, active }: { index: number; active: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full border border-foreground/25",
        active && "coin-flick",
      )}
      style={
        active
          ? ({ "--d": `${index * 90}ms` } as React.CSSProperties)
          : undefined
      }
    >
      <span className="h-2.5 w-2.5 border border-foreground/35" />
    </div>
  );
}

export default function AutoDivination({
  isAnimating,
  results,
  onThrow,
}: AutoDivinationProps) {
  return (
    <div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-6 border-y border-border py-6">
        <div className="flex items-center gap-4">
          <div className="flex gap-3" style={{ perspective: "600px" }}>
            {[0, 1, 2].map((index) => (
              <Coin key={index} index={index} active={isAnimating} />
            ))}
          </div>
          <span className="label text-muted-foreground/50">
            {isAnimating ? "铜钱翻转中" : "三枚铜钱"}
          </span>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="numeral text-2xl leading-none">{results.length}</span>
          <span className="label text-muted-foreground/45">/ 6 掷</span>
        </div>
      </div>

      <ThrowResults results={results} isAnimating={isAnimating} />

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          size="lg"
          onClick={onThrow}
          disabled={isAnimating}
          className="h-12 px-8 text-[0.92rem]"
        >
          {isAnimating ? (
            <>
              <InkSpinner />
              正在起卦
            </>
          ) : (
            "起卦 · 掷三枚铜钱"
          )}
        </Button>
        <p className="label text-muted-foreground/45">
          心念专一 · 六掷成卦
        </p>
      </div>
    </div>
  );
}
