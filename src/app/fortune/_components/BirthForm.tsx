"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const birthTimes = [
  { label: "子时 (23:00-01:00)", value: "23~1" },
  { label: "丑时 (01:00-03:00)", value: "1~3" },
  { label: "寅时 (03:00-05:00)", value: "3~5" },
  { label: "卯时 (05:00-07:00)", value: "5~7" },
  { label: "辰时 (07:00-09:00)", value: "7~9" },
  { label: "巳时 (09:00-11:00)", value: "9~11" },
  { label: "午时 (11:00-13:00)", value: "11~13" },
  { label: "未时 (13:00-15:00)", value: "13~15" },
  { label: "申时 (15:00-17:00)", value: "15~17" },
  { label: "酉时 (17:00-19:00)", value: "17~19" },
  { label: "戌时 (19:00-21:00)", value: "19~21" },
  { label: "亥时 (21:00-23:00)", value: "21~23" },
];

interface BirthFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading?: boolean;
}

export default function BirthForm({
  onSubmit,
  isLoading = false,
}: BirthFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <Card className="bg-card border-border mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">生辰八字</CardTitle>
        <CardDescription>
          请填写准确的出生信息，以获得详细的命理分析
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="grid w-full items-center gap-4">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="birthDate" className="text-sm font-medium">
              出生日期
            </Label>
            <Input
              id="birthDate"
              name="birthDate"
              required
              placeholder="如：1990年1月1日"
              className="bg-background/70"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthTime" className="text-sm font-medium">
              出生时辰
            </Label>
            <Select name="birthTime" required>
              <SelectTrigger id="birthTime" className="bg-background/70">
                <SelectValue placeholder="请选择出生时辰" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]" position="popper">
                {birthTimes.map((time) => (
                  <SelectItem value={time.value} key={time.value}>
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-muted-foreground text-xs">
              时辰准确对命理分析至关重要
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="text-sm font-medium">
              性别
            </Label>
            <Select name="gender" required>
              <SelectTrigger id="gender" className="bg-background/70">
                <SelectValue placeholder="请选择性别" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="男">男</SelectItem>
                <SelectItem value="女">女</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthPlace" className="text-sm font-medium">
              出生地
            </Label>
            <Input
              id="birthPlace"
              required
              name="birthPlace"
              placeholder="如：北京市"
              className="bg-background/70"
            />
            <p className="text-muted-foreground text-xs">
              地域对命局有微妙影响，尽量精确到城市
            </p>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                正在分析命盘...
              </>
            ) : (
              <>
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
                  <path d="M21.2 8.4c.5.38.8.96.8 1.6 0 1.1-.9 2-2 2H18a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h3"></path>
                  <path d="M16 8V5c0-1.1.9-2 2-2h0a2 2 0 0 1 2 2v3"></path>
                  <path d="M12 22v-8.3a2.7 2.7 0 0 0-2.7-2.7H4.7A2.7 2.7 0 0 0 2 13.7V22"></path>
                  <path d="M2 14h3"></path>
                  <path d="M9 14h3"></path>
                  <path d="M9 18h3"></path>
                  <path d="M3 18h2"></path>
                  <path d="M2 22h20"></path>
                </svg>
                开始命盘分析
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
