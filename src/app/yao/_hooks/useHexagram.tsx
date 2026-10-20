import { useState } from "react";

export interface HexagramState {
  hexagramNow: string;
  hexagramFuture: string;
  results: string[];
  isAnimating: boolean;
  showPreparation: boolean;
  manualValues: string[];
}

const emptyManual = () => Array(6).fill("") as string[];

export default function useHexagram() {
  // 共用状态
  const [hexagramNow, setHexagramNow] = useState<string>("");
  const [hexagramFuture, setHexagramFuture] = useState<string>("");

  // 赛博起卦相关状态
  const [results, setResults] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPreparation, setShowPreparation] = useState(true);

  // 手动起卦相关状态
  const [manualValues, setManualValues] = useState<string[]>(emptyManual);

  // 模拟投掷一次硬币
  const throwCoins = (): string => {
    // 模拟三枚硬币的正反面
    const coins = Array(3)
      .fill(0)
      .map(() => (Math.random() < 0.5 ? "正" : "反"));
    const positiveCount = coins.filter((c) => c === "正").length;

    // 根据正面数量返回结果
    switch (positiveCount) {
      case 3:
        return "9"; // 三正，老阳
      case 2:
        return "8"; // 两正一反，少阳
      case 1:
        return "7"; // 两反一正，少阴
      case 0:
        return "6"; // 三反，老阴
      default:
        return "";
    }
  };

  // 处理自动投掷
  const handleAutoThrow = async () => {
    if (isAnimating) return;
    setShowPreparation(false);
    setIsAnimating(true);
    setResults([]);
    const newResults: string[] = [];

    // 模拟六次投掷，每次间隔 0.6s
    for (let i = 0; i < 6; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const result = throwCoins();
      newResults.push(result);
      setResults([...newResults]);
    }

    // 生成卦象
    generateHexagram(newResults);
    setIsAnimating(false);
  };

  // 处理选择变化 (手动起卦)
  const handleSelectChange = (index: number, value: string) => {
    setManualValues((prev) => {
      const next = prev.length === 6 ? [...prev] : emptyManual();
      next[index] = value;
      return next;
    });
  };

  // 处理手动起卦生成
  const handleManualGenerate = () => {
    if (manualValues.length !== 6 || manualValues.some((v) => !v)) {
      return;
    }
    generateHexagram(manualValues);
  };

  // 生成卦象 (共用函数)
  const generateHexagram = (values: string[]) => {
    let now = "";
    let future = "";
    values.forEach((value) => {
      if (value === "6") {
        // 老阴
        now += "0";
        future += "1";
      } else if (value === "7") {
        // 少阴
        now += "0";
        future += "0";
      } else if (value === "8") {
        // 少阳
        now += "1";
        future += "1";
      } else if (value === "9") {
        // 老阳
        now += "1";
        future += "0";
      }
    });

    setHexagramNow(now);
    setHexagramFuture(future);
  };

  // 重置函数
  const resetDivination = () => {
    setResults([]);
    setManualValues(emptyManual());
    setHexagramNow("");
    setHexagramFuture("");
    setShowPreparation(true);
    setIsAnimating(false);
  };

  return {
    hexagramNow,
    hexagramFuture,
    results,
    isAnimating,
    showPreparation,
    manualValues,
    handleAutoThrow,
    handleSelectChange,
    handleManualGenerate,
    resetDivination,
  };
}
