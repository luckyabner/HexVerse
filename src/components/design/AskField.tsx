"use client";

import { Button } from "@/components/ui/button";
import { InkSpinner } from "./InkSpinner";
import { cn } from "@/lib/utils";

interface AskFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  label?: string;
  hint?: string;
  placeholder?: string;
  cta?: string;
  className?: string;
}

/** 墨线式提问输入：无卡片、无边框，只有一条底线。 */
export function AskField({
  id,
  value,
  onChange,
  onSubmit,
  isLoading = false,
  label = "你的问题",
  hint = "一事一占",
  placeholder = "写下此刻真正想问的事…",
  cta = "求解",
  className,
}: AskFieldProps) {
  return (
    <form
      className={cn("space-y-4", className)}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="label text-muted-foreground">
          {label}
        </label>
        <span className="label text-muted-foreground/45">{hint}</span>
      </div>

      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={2}
        disabled={isLoading}
        className="min-h-[68px] w-full resize-none border-b border-border bg-transparent pb-2 text-[0.95rem] leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/45 focus:border-foreground disabled:opacity-60"
      />

      <div className="flex items-center justify-between gap-4">
        <span className="label text-muted-foreground/50">
          由 AI 依据卦辞推演
        </span>
        <Button
          type="submit"
          size="lg"
          variant={value.trim() ? "default" : "outline"}
          disabled={isLoading || !value.trim()}
          className="min-w-[7.5rem]"
        >
          {isLoading ? (
            <>
              <InkSpinner />
              推演中
            </>
          ) : (
            cta
          )}
        </Button>
      </div>
    </form>
  );
}
