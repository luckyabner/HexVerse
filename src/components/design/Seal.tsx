import { cn } from "@/lib/utils";

interface SealProps {
  chars?: string;
  size?: "sm" | "md";
  className?: string;
}

/** 朱砂印章 */
export function Seal({ chars = "周易", size = "md", className }: SealProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "stamp inline-flex rotate-[-2deg] select-none flex-col items-center justify-center border border-vermilion/60 bg-vermilion/[0.04] leading-none text-vermilion",
        size === "sm" ? "h-7 w-7 text-[0.6rem]" : "h-10 w-10 text-[0.72rem]",
        className,
      )}
      style={{ fontFamily: "var(--font-display)" }}
    >
      {chars.split("").map((char, index) => (
        <span key={index} className="block py-[0.1em]">
          {char}
        </span>
      ))}
    </span>
  );
}
