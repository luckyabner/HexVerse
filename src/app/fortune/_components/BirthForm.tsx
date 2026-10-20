"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { InkSpinner } from "@/components/design/InkSpinner";
import { cn } from "@/lib/utils";

const birthTimes = [
  { name: "子", range: "23 — 01", value: "23~1" },
  { name: "丑", range: "01 — 03", value: "1~3" },
  { name: "寅", range: "03 — 05", value: "3~5" },
  { name: "卯", range: "05 — 07", value: "5~7" },
  { name: "辰", range: "07 — 09", value: "7~9" },
  { name: "巳", range: "09 — 11", value: "9~11" },
  { name: "午", range: "11 — 13", value: "11~13" },
  { name: "未", range: "13 — 15", value: "13~15" },
  { name: "申", range: "15 — 17", value: "15~17" },
  { name: "酉", range: "17 — 19", value: "17~19" },
  { name: "戌", range: "19 — 21", value: "19~21" },
  { name: "亥", range: "21 — 23", value: "21~23" },
];

interface BirthFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading?: boolean;
}

function FieldLabel({
  htmlFor,
  children,
  hint,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <label htmlFor={htmlFor} className="label text-muted-foreground">
        {children}
      </label>
      {hint ? (
        <span className="label text-[0.6rem] text-muted-foreground/50">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

const inputClass =
  "mt-2 w-full border-b border-border bg-transparent py-2.5 text-[0.95rem] outline-none transition-colors placeholder:text-muted-foreground/45 focus:border-foreground [color-scheme:light] dark:[color-scheme:dark]";

export default function BirthForm({
  onSubmit,
  isLoading = false,
}: BirthFormProps) {
  const [birthTime, setBirthTime] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!birthTime || !gender) {
      setError("请选择出生时辰与性别。");
      return;
    }
    setError("");
    onSubmit(new FormData(e.currentTarget));
  };

  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-border pb-3">
        <span className="label text-muted-foreground">生辰信息</span>
        <span className="label text-muted-foreground/45">四柱</span>
      </div>

      <form onSubmit={handleSubmit} className="mt-7 space-y-8">
        <div>
          <FieldLabel htmlFor="birthDate" hint="公历">
            出生日期
          </FieldLabel>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            required
            className={inputClass}
          />
        </div>

        <div>
          <FieldLabel htmlFor="birthPlace" hint="精确到城市">
            出生地
          </FieldLabel>
          <input
            id="birthPlace"
            name="birthPlace"
            required
            placeholder="如：杭州市"
            className={inputClass}
          />
        </div>

        <div>
          <FieldLabel hint="十二时辰">出生时辰</FieldLabel>
          <div
            role="radiogroup"
            aria-label="出生时辰"
            className="mt-3 grid grid-cols-4 gap-px bg-border"
          >
            {birthTimes.map((time) => {
              const active = birthTime === time.value;
              return (
                <button
                  key={time.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    setBirthTime(time.value);
                    setError("");
                  }}
                  className={cn(
                    "flex cursor-pointer flex-col items-center gap-1 px-1 py-2.5 transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <span
                    className="text-[0.95rem]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {time.name}
                  </span>
                  <span
                    className={cn(
                      "numeral text-[0.6rem] tracking-tight",
                      active ? "opacity-55" : "opacity-45",
                    )}
                  >
                    {time.range}
                  </span>
                </button>
              );
            })}
          </div>
          <input type="hidden" name="birthTime" value={birthTime} />
          <p className="label mt-3 text-[0.6rem] text-muted-foreground/45">
            时辰以北京时间为准，误差会改变时柱
          </p>
        </div>

        <div>
          <FieldLabel>性别</FieldLabel>
          <div
            role="radiogroup"
            aria-label="性别"
            className="mt-3 grid grid-cols-2 gap-px bg-border"
          >
            {["男", "女"].map((option) => {
              const active = gender === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    setGender(option);
                    setError("");
                  }}
                  className={cn(
                    "cursor-pointer py-2.5 text-[0.9rem] transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <input type="hidden" name="gender" value={gender} />
        </div>

        {error ? (
          <p className="text-[0.8rem] text-destructive">{error}</p>
        ) : null}

        <div className="space-y-3 pt-1">
          <Button
            type="submit"
            size="lg"
            className="h-12 w-full text-[0.92rem]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <InkSpinner />
                正在推演
              </>
            ) : (
              "推演命盘"
            )}
          </Button>
          <p className="label text-[0.6rem] text-muted-foreground/45">
            信息仅用于本次推演，不做留存
          </p>
        </div>
      </form>
    </div>
  );
}
