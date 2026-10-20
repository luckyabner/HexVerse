import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index?: string;
  children: React.ReactNode;
  rule?: boolean;
  className?: string;
}

export function SectionLabel({
  index,
  children,
  rule = true,
  className,
}: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {index ? <span className="label text-vermilion">{index}</span> : null}
      <span className="label text-muted-foreground">{children}</span>
      {rule ? (
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      ) : null}
    </div>
  );
}
