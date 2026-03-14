"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useDivination, useAIAnalysis } from "./_hooks";
import { AIAnalysis, DivinationForm, DivinationResult } from "./_components";
import Explanation from "./_components/Explanation";

export default function RenPage() {
  const {
    result,
    manualNums,
    setManualNums,
    setNumsByTime,
    setNumsManually,
    resetDivination,
  } = useDivination();

  const {
    userQuestion,
    setUserQuestion,
    completion,
    isLoading,
    sendMsg,
    resetAIAnalysis,
  } = useAIAnalysis();

  const handleReset = () => {
    resetDivination();
    resetAIAnalysis();
  };

  return (
    <main id="main-content" className="container mx-auto max-w-4xl px-4 py-8 md:py-12 space-y-8">
      {/* 标题区域 */}
      <div className="text-center space-y-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          <span className="text-primary">小六壬</span>
          <span>占卜</span>
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          日常事务与紧急决策的快速指引
        </p>
      </div>

      <div className="space-y-8">
        {/* 占卜部分 */}
        <Card className="bg-card border-border">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold">
              选择起卦方式
            </CardTitle>
            <CardDescription>
              选择适合您的起卦方式，立即获得卦象结果
            </CardDescription>
          </CardHeader>

          <CardContent className="max-w-2xl mx-auto">
            {!result ? (
              <DivinationForm
                manualNums={manualNums}
                setManualNums={setManualNums}
                setNumsByTime={setNumsByTime}
                setNumsManually={setNumsManually}
              />
            ) : (
              <div className="space-y-6">
                <DivinationResult result={result} />

                <AIAnalysis
                  result={result}
                  userQuestion={userQuestion}
                  setUserQuestion={setUserQuestion}
                  completion={completion}
                  isLoading={isLoading}
                  sendMsg={sendMsg}
                />

                <div className="mt-6 flex justify-center">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="border-primary/30 hover:bg-primary/10"
                  >
                    重新起卦
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 底部六神释义 - 降低视觉权重 */}
        <div className="pt-8 border-t border-border/50">
          <h3 className="text-lg font-medium text-center mb-6 text-muted-foreground">六神释义参考</h3>
          <Explanation />
        </div>
      </div>
    </main>
  );
}
