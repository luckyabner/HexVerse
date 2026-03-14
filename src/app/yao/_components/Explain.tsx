"use client";
import React from "react";
import explains from "../_lib/explains.json";
import AIExplain from "./AIExplain";
import Hexagram from "./Hexagram";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExplainProps {
  hexagramNow: string;
  hexagramFuture: string;
}

const Explain: React.FC<ExplainProps> = ({ hexagramNow, hexagramFuture }) => {
  // 如果没有生成卦象，不显示任何内容
  if (!hexagramNow || !hexagramFuture) {
    return <></>;
  }

  // 从数据中获取卦辞
  const nowExplain = explains[hexagramNow as keyof typeof explains];
  const futureExplain = explains[hexagramFuture as keyof typeof explains];

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">卦象</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 本卦 */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Hexagram code={hexagramNow} />
              <h3 className="text-lg font-medium">
                本卦：{nowExplain?.序号}卦 {nowExplain?.卦名}
              </h3>
            </div>
            <div className="bg-primary/5 space-y-2 rounded-lg p-4">
              <p>
                <span className="font-medium">卦辞：</span>
                {nowExplain?.卦辞}
              </p>
              <p>
                <span className="font-medium">彖辞：</span>
                {nowExplain?.彖辞}
              </p>
              <p>
                <span className="font-medium">象辞：</span>
                {nowExplain?.象辞}
              </p>
            </div>
          </div>

          <div className="bg-border/60 h-px w-full"></div>

          {/* 变卦 */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Hexagram code={hexagramFuture} />
              <h3 className="text-lg font-medium">
                变卦：{futureExplain?.序号}卦 {futureExplain?.卦名}
              </h3>
            </div>
            <div className="bg-primary/5 space-y-2 rounded-lg p-4">
              <p>
                <span className="font-medium">卦辞：</span>
                {futureExplain?.卦辞}
              </p>
              <p>
                <span className="font-medium">彖辞：</span>
                {futureExplain?.彖辞}
              </p>
              <p>
                <span className="font-medium">象辞：</span>
                {futureExplain?.象辞}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <AIExplain hexagramNow={nowExplain} hexagramFuture={futureExplain} />
    </>
  );
};

export default Explain;
