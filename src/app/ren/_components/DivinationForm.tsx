"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ManualNums } from "../_lib/types";

interface DivinationFormProps {
  manualNums: ManualNums;
  setManualNums: React.Dispatch<React.SetStateAction<ManualNums>>;
  setNumsByTime: () => void;
  setNumsManually: () => void;
}

const SHICHEN = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

function shichenOf(hour: number) {
  const index = Math.floor(((hour + 1) % 24) / 2);
  return {
    name: SHICHEN[index],
    range: `${(index * 2 + 23) % 24} — ${(index * 2 + 1) % 24}`,
  };
}

export function DivinationForm({
  manualNums,
  setManualNums,
  setNumsByTime,
  setNumsManually,
}: DivinationFormProps) {
  const [clock, setClock] = useState<{ time: string; shichen: string; range: string } | null>(
    null,
  );

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const beijing = new Date(
        now.getTime() + (now.getTimezoneOffset() + 480) * 60000,
      );
      const hour = beijing.getHours();
      const shichen = shichenOf(hour);
      setClock({
        time: `${String(hour).padStart(2, "0")}:${String(beijing.getMinutes()).padStart(2, "0")}`,
        shichen: shichen.name,
        range: shichen.range,
      });
    };

    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);

  const handleNumChange = (field: keyof ManualNums, value: string) => {
    const parsed = parseInt(value, 10);
    const bounded = Number.isNaN(parsed) ? null : Math.min(99, Math.max(0, parsed));
    setManualNums((prev) => ({
      ...prev,
      [field]: bounded,
    }));
  };

  const isManualComplete =
    manualNums.num1 !== null &&
    manualNums.num2 !== null &&
    manualNums.num3 !== null;

  const fields: { key: keyof ManualNums; label: string }[] = [
    { key: "num1", label: "第一数" },
    { key: "num2", label: "第二数" },
    { key: "num3", label: "第三数" },
  ];

  return (
    <div>
      {/* 以时起课 */}
      <div className="flex flex-col gap-6 border-y border-border py-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="label text-muted-foreground/55">
            此刻 · 北京时间 · {clock ? `${clock.shichen}时` : "—"}
          </div>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="numeral text-[2.6rem] leading-none tracking-tight">
              {clock ? clock.time : "--:--"}
            </span>
            <span className="label text-muted-foreground/50">
              {clock ? clock.range : ""}
            </span>
          </div>
        </div>

        <Button size="lg" onClick={setNumsByTime} className="h-12 px-7">
          以此刻起课
        </Button>
      </div>

      {/* 三数成局 */}
      <div className="mt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="display text-[1.15rem]">三数成局</h3>
          <p className="label text-muted-foreground/45">1 — 99</p>
        </div>
        <p className="mt-2 text-[0.82rem] leading-relaxed text-muted-foreground">
          心中默念所问，随口报出三个数字。可以是日期、时刻，或任何此刻浮现的数。
        </p>

        <div className="mt-6 grid grid-cols-3 gap-px bg-border">
          {fields.map((field, index) => (
            <div
              key={field.key}
              className="bg-background px-3 py-4 transition-colors focus-within:bg-accent/30 sm:px-5 sm:py-5"
            >
              <div className="flex items-baseline justify-between gap-2">
                <label
                  htmlFor={`ren-${field.key}`}
                  className="label text-muted-foreground/50"
                >
                  {field.label}
                </label>
                <span className="label text-[0.6rem] text-muted-foreground/25">
                  {["壹", "贰", "叁"][index]}
                </span>
              </div>
              <input
                id={`ren-${field.key}`}
                type="number"
                inputMode="numeric"
                min={1}
                max={99}
                placeholder="—"
                value={manualNums[field.key] ?? ""}
                onChange={(event) => handleNumChange(field.key, event.target.value)}
                className="numeral mt-3 w-full bg-transparent text-center text-[2.2rem] leading-none outline-none placeholder:text-muted-foreground/25 sm:text-[2.6rem]"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={setNumsManually}
            disabled={!isManualComplete}
            className="h-12 px-7"
          >
            三数成局
          </Button>
          <p className="label text-muted-foreground/45">
            {isManualComplete ? "三数已具 · 可以成局" : "请先报出三个数"}
          </p>
        </div>
      </div>
    </div>
  );
}
