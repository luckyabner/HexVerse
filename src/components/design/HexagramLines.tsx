import { cn } from "@/lib/utils";

interface YaoLineProps {
  yang: boolean;
  width?: number;
  thickness?: number;
  moving?: boolean;
  animate?: boolean;
  delay?: number;
  dim?: boolean;
  className?: string;
}

/**
 * 单爻：阳爻为一线，阴爻为断线。
 * 动爻以朱砂色标记。
 */
export function YaoLine({
  yang,
  width = 128,
  thickness = 7,
  moving = false,
  animate = true,
  delay = 0,
  dim = false,
  className,
}: YaoLineProps) {
  const gap = Math.round(width * 0.16);
  const segment = (width - gap) / 2;
  const color = moving ? "var(--vermilion)" : "currentColor";
  const anim = animate ? "ink-line" : "";
  const style = {
    "--d": `${delay}ms`,
    transformBox: "fill-box",
    transformOrigin: "left center",
  } as React.CSSProperties;

  return (
    <svg
      width={width}
      height={thickness}
      viewBox={`0 0 ${width} ${thickness}`}
      aria-hidden="true"
      className={cn("overflow-visible", dim && "opacity-25", className)}
    >
      {yang ? (
        <rect
          className={anim}
          style={style}
          x={0}
          y={0}
          width={width}
          height={thickness}
          fill={color}
        />
      ) : (
        <g className={anim} style={style}>
          <rect x={0} y={0} width={segment} height={thickness} fill={color} />
          <rect
            x={segment + gap}
            y={0}
            width={segment}
            height={thickness}
            fill={color}
          />
        </g>
      )}
    </svg>
  );
}

interface HexagramLinesProps {
  /** 自初爻至上爻，如 "101101" */
  code: string;
  width?: number;
  thickness?: number;
  gap?: number;
  moving?: number[];
  animate?: boolean;
  className?: string;
}

export function HexagramLines({
  code,
  width = 128,
  thickness = 7,
  gap = 10,
  moving,
  animate = true,
  className,
}: HexagramLinesProps) {
  const lines = code.split("");
  return (
    <div
      className={cn("flex flex-col-reverse items-start", className)}
      style={{ gap }}
      role="img"
      aria-label={`卦象 ${code}`}
    >
      {lines.map((digit, index) => (
        <YaoLine
          key={index}
          yang={digit === "1"}
          width={width}
          thickness={thickness}
          moving={moving?.includes(index)}
          animate={animate}
          delay={index * 90}
        />
      ))}
    </div>
  );
}
