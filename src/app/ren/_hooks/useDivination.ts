import { useState, useEffect } from "react";
import { calculateDivination, generateDivinationText } from "../_lib/constants";
import { DivinationNums, ManualNums, DivinationResult } from "../_lib/types";

export function useDivination() {
  const [result, setResult] = useState<DivinationResult | null>(null);
  const [nums, setNums] = useState<DivinationNums>({
    num1: 0,
    num2: 0,
    num3: 0,
  });
  const [manualNums, setManualNums] = useState<ManualNums>({
    num1: null,
    num2: null,
    num3: null,
  });

  const setNumsByTime = () => {
    const now = new Date();
    // 获取北京时间
    const beijingTime = new Date(
      now.getTime() + (now.getTimezoneOffset() + 480) * 60000,
    );
    const hour = beijingTime.getHours();
    const minute = beijingTime.getMinutes();
    const minuteTens = Math.floor(minute / 10);
    const minuteOnes = minute % 10;

    setNums({
      num1: hour,
      num2: minuteTens,
      num3: minuteOnes,
    });
  };

  const setNumsManually = () => {
    if (
      manualNums.num1 === null ||
      manualNums.num2 === null ||
      manualNums.num3 === null
    ) {
      return;
    }
    setNums({
      num1: manualNums.num1,
      num2: manualNums.num2,
      num3: manualNums.num3,
    });
  };

  const resetDivination = () => {
    setResult(null);
    setNums({ num1: 0, num2: 0, num3: 0 });
  };

  useEffect(() => {
    if (nums.num1 !== 0 || nums.num2 !== 0 || nums.num3 !== 0) {
      const divination = calculateDivination(nums.num1, nums.num2, nums.num3);
      const divinationText = generateDivinationText(
        divination.divination1,
        divination.divination2,
        divination.divination3,
      );

      setResult({
        ...divination,
        ...divinationText,
      });
    }
  }, [nums]);

  return {
    result,
    nums,
    manualNums,
    setManualNums,
    setNumsByTime,
    setNumsManually,
    resetDivination,
  };
}
