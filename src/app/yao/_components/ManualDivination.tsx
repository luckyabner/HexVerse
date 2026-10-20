import { Button } from "@/components/ui/button";
import { yaoName, YAO_VALUES } from "@/lib/hexagram";
import { cn } from "@/lib/utils";

interface ManualDivinationProps {
  manualValues: string[];
  onSelectChange: (index: number, value: string) => void;
  onGenerate: () => void;
}

const VALUES = ["6", "7", "8", "9"] as const;
const POSITIONS = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"];

export default function ManualDivination({
  manualValues,
  onSelectChange,
  onGenerate,
}: ManualDivinationProps) {
  const complete = manualValues.length === 6 && manualValues.every(Boolean);

  return (
    <div>
      <p className="mt-4 text-[0.85rem] leading-relaxed text-muted-foreground">
        依序记录六次投掷。自下而上，第一次投掷为初爻。
      </p>

      <div className="mt-6 border-t border-border">
        {[5, 4, 3, 2, 1, 0].map((position) => {
          const selected = manualValues[position] || "";
          const meta = selected ? YAO_VALUES[selected] : null;

          return (
            <div
              key={position}
              className="grid grid-cols-[2.75rem_1fr] items-center gap-4 border-b border-border py-3 md:grid-cols-[4.5rem_1fr] md:gap-6 md:py-3.5"
            >
              <div>
                <div className="text-[0.8rem]">{POSITIONS[position]}</div>
                <div className="label mt-1 text-[0.6rem] text-muted-foreground/50">
                  {meta ? yaoName(position, meta.yang) : "未定"}
                </div>
              </div>

              <div
                role="radiogroup"
                aria-label={POSITIONS[position]}
                className="grid grid-cols-4 gap-px bg-border"
              >
                {VALUES.map((value) => {
                  const option = YAO_VALUES[value];
                  const isActive = selected === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => onSelectChange(position, value)}
                      className={cn(
                        "flex cursor-pointer flex-col items-center gap-1 px-1 py-2 transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      <span className="flex items-baseline gap-1.5">
                        <span className="text-[0.8rem]">{option.name}</span>
                        <span
                          className={cn(
                            "numeral text-[0.6rem]",
                            isActive ? "opacity-55" : "opacity-35",
                          )}
                        >
                          {value}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "label text-[0.6rem] tracking-[0.1em]",
                          isActive ? "opacity-45" : "opacity-35",
                        )}
                      >
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          size="lg"
          onClick={onGenerate}
          disabled={!complete}
          className="h-12 px-8 text-[0.92rem]"
        >
          成卦
        </Button>
        <p className="label text-muted-foreground/45">
          {complete ? "六爻已定 · 可以成卦" : "尚有爻位未定"}
        </p>
      </div>
    </div>
  );
}
