import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { memo } from "react";
import ReactMarkdown from "react-markdown";

interface FortuneAnalysisProps {
  result: string;
  isLoading?: boolean;
}

const FortuneAnalysis = memo(function FortuneAnalysis({
  result,
  isLoading = false,
}: FortuneAnalysisProps) {
  return (
    <Card className="bg-card border-border h-full w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">命理解析</CardTitle>
        <CardDescription>基于传统命理学的个人命盘详解</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[300px]">
        {isLoading && !result && (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="border-primary/30 border-t-primary h-12 w-12 animate-spin rounded-full border-4"></div>
              <p className="text-muted-foreground text-sm">
                正在分析命盘，请稍候...
              </p>
            </div>
          </div>
        )}

        {!result && !isLoading && (
          <div className="flex h-64 flex-col items-center justify-center space-y-4 text-center">
            <div className="text-primary/60 border-primary/20 rounded-full border-2 border-dashed p-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium">请填写生辰八字信息</p>
              <p className="text-muted-foreground mt-1 text-sm">
                在左侧填写您的出生信息，获取详细的命理分析
              </p>
            </div>
          </div>
        )}

        {result && (
          <div className="prose-content text-foreground leading-relaxed space-y-4">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

export default FortuneAnalysis;
