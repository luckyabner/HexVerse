"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useHexagram } from "./_hooks";
import { AutoDivination, Explain, ManualDivination } from "./_components";

export default function DivinationPage() {
  const {
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
  } = useHexagram();

  const shouldShowReset =
    hexagramNow || results.length > 0 || manualValues.some((v) => v);

  return (
    <main id="main-content" className="container mx-auto max-w-4xl px-4 py-8 md:py-12 space-y-8">
      {/* 标题区域 */}
      <div className="text-center space-y-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          <span className="text-primary">六爻</span>
          <span>起卦</span>
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          推演六爻卦象，洞察事物发展趋势
        </p>
      </div>

      <div className="space-y-8">
        {/* 主要内容区 - 选项卡 */}
        <Card className="bg-card border-border">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold">选择起卦方式</CardTitle>
            <CardDescription>
              根据您的喜好选择赛博投掷或手动排盘
            </CardDescription>
          </CardHeader>
          <CardContent className="max-w-2xl mx-auto">
            <Tabs defaultValue="auto" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-2">
                <TabsTrigger value="auto">赛博起卦</TabsTrigger>
                <TabsTrigger value="manual">手动起卦</TabsTrigger>
              </TabsList>

              {/* 赛博起卦内容 */}
              <TabsContent value="auto" className="focus-visible:outline-none">
                <AutoDivination
                  isAnimating={isAnimating}
                  showPreparation={showPreparation}
                  results={results}
                  onThrow={handleAutoThrow}
                />
              </TabsContent>

              {/* 手动起卦内容 */}
              <TabsContent
                value="manual"
                className="focus-visible:outline-none"
              >
                <ManualDivination
                  manualValues={manualValues}
                  onSelectChange={handleSelectChange}
                  onGenerate={handleManualGenerate}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* 重置按钮 */}
        {shouldShowReset && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={resetDivination}
              className="border-primary/30 hover:bg-primary/10"
            >
              重新起卦
            </Button>
          </div>
        )}

        {/* 卦辞显示区域 */}
        {hexagramNow && (
          <div className="pt-4">
            <Explain hexagramNow={hexagramNow} hexagramFuture={hexagramFuture} />
          </div>
        )}
      </div>
    </main>
  );
}
