import { HexagramLines } from "@/components/design/HexagramLines";

interface HexagramProps {
  /** 三位（单卦）或六位（重卦）的 0/1 字符串，自初爻起 */
  code: string;
  moving?: number[];
  animate?: boolean;
}

/** 卦象线图（自下而上绘制） */
export default function Hexagram({
  code,
  moving,
  animate = true,
}: HexagramProps) {
  if (!/^[01]{3}$|^[01]{6}$/.test(code)) {
    return (
      <span className="label text-destructive">卦象数据有误</span>
    );
  }

  return (
    <HexagramLines
      code={code}
      width={110}
      thickness={6}
      gap={9}
      moving={moving}
      animate={animate}
    />
  );
}
