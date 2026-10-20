import { cn } from "@/lib/utils";

interface PageHeaderProps {
  index: string;
  title: string;
  en: string;
  subtitle: string;
  meta?: string;
  className?: string;
}

export function PageHeader({
  index,
  title,
  en,
  subtitle,
  meta,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("rise border-b border-border pt-2 pb-8 md:pb-10", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="label text-vermilion">卷 {index}</span>
        {meta ? (
          <span className="label hidden text-muted-foreground/70 sm:inline">
            {meta}
          </span>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
        <h1 className="display text-[clamp(2.4rem,6.5vw,4.25rem)] leading-[1.02]">
          {title}
        </h1>
        <span className="label mb-2 text-muted-foreground/50">{en}</span>
      </div>

      <p className="mt-5 max-w-2xl text-[0.9rem] leading-relaxed text-muted-foreground">
        {subtitle}
      </p>
    </header>
  );
}
