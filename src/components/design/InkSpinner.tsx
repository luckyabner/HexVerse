import { cn } from "@/lib/utils";

export function InkSpinner({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("animate-spin", className)}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="14 43"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
