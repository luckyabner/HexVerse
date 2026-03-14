import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ManualNums } from "../_lib/types";
import { Card } from "@/components/ui/card";

interface DivinationFormProps {
  manualNums: ManualNums;
  setManualNums: React.Dispatch<React.SetStateAction<ManualNums>>;
  setNumsByTime: () => void;
  setNumsManually: () => void;
}

export function DivinationForm({
  manualNums,
  setManualNums,
  setNumsByTime,
  setNumsManually,
}: DivinationFormProps) {
  const handleNumChange = (field: keyof ManualNums, value: string) => {
    const parsedValue = parseInt(value) || null;
    setManualNums((prev) => ({
      ...prev,
      [field]: parsedValue,
    }));
  };

  // 检查是否所有数字都已填写
  const isManualComplete =
    manualNums.num1 != null &&
    manualNums.num2 != null &&
    manualNums.num3 != null;

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <div className="p-5">
          <h3 className="mb-3 text-lg font-medium">使用当下时辰起卦</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            根据当前的时间自动计算卦象，适合需要即时答案的情况。
          </p>
          <Button onClick={setNumsByTime} className="w-full" size="lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            时辰起卦
          </Button>
        </div>
      </Card>

      <Card className="bg-card border-border">
        <div className="p-5">
          <h3 className="mb-3 text-lg font-medium">手动输入数字起卦</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            请输入三个1-99之间的数字，用于起卦。可以是个人偏好的数字、随机数字或有特殊含义的数字。
          </p>
          <div className="mb-5 flex flex-wrap gap-3">
            {[
              { key: "num1", label: "第一个数" },
              { key: "num2", label: "第二个数" },
              { key: "num3", label: "第三个数" },
            ].map((item) => (
              <div key={item.key} className="space-y-1">
                <label
                  htmlFor={item.key}
                  className="text-muted-foreground text-xs"
                >
                  {item.label}
                </label>
                <Input
                  id={item.key}
                  type="number"
                  min="1"
                  max="99"
                  placeholder="1-99"
                  value={manualNums[item.key as keyof ManualNums] || ""}
                  onChange={(e) =>
                    handleNumChange(
                      item.key as keyof ManualNums,
                      e.target.value,
                    )
                  }
                  className="bg-background/80 w-24"
                />
              </div>
            ))}
          </div>
          <Button
            onClick={setNumsManually}
            variant="outline"
            className="w-full"
            disabled={!isManualComplete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M17 11l-5-5-5 5M17 18l-5-5-5 5" />
            </svg>
            手动起卦
          </Button>
        </div>
      </Card>
    </div>
  );
}
