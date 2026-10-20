export const YAO_POSITIONS = ["初", "二", "三", "四", "五", "上"] as const;

/** 爻名：初九 / 六二 / 上六 …（index 0 为初爻） */
export function yaoName(index: number, yang: boolean): string {
  const num = yang ? "九" : "六";
  if (index === 0) return `初${num}`;
  if (index === 5) return `上${num}`;
  return `${num}${YAO_POSITIONS[index]}`;
}

/** 对比本卦与变卦，得出动爻位置（0 为初爻） */
export function movingLines(now: string, future: string): number[] {
  return now
    .split("")
    .map((digit, index) => (digit !== future[index] ? index : -1))
    .filter((index) => index >= 0);
}

export interface YaoValue {
  num: number;
  name: string;
  yang: boolean;
  moving: boolean;
  label: string;
}

export const YAO_VALUES: Record<string, YaoValue> = {
  "6": { num: 6, name: "老阴", yang: false, moving: true, label: "三反" },
  "7": { num: 7, name: "少阴", yang: false, moving: false, label: "两反一正" },
  "8": { num: 8, name: "少阳", yang: true, moving: false, label: "两正一反" },
  "9": { num: 9, name: "老阳", yang: true, moving: true, label: "三正" },
};

export function yaoValue(value: string): YaoValue | null {
  return YAO_VALUES[value] ?? null;
}
