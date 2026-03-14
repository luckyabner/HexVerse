"use client";
import React from "react";
import { Hexagram } from "../_lib/types";
import ReactMarkdown from "react-markdown";
import { useAIAnalysis } from "../_hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface AiExplainProps {
  hexagramNow: Hexagram;
  hexagramFuture: Hexagram;
}

const AIExplain: React.FC<AiExplainProps> = ({
  hexagramNow,
  hexagramFuture,
}) => {
  const {
    userQuestion,
    setUserQuestion,
    completion,
    isLoading,
    handleAiExplain,
  } = useAIAnalysis(hexagramNow, hexagramFuture);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">AI解析</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          className="h-24 w-full resize-none"
          placeholder="请输入您想问的问题，让AI帮您解析六爻卦象的意义..."
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          disabled={isLoading}
        />

        <Button
          className="w-full"
          onClick={handleAiExplain}
          disabled={isLoading}
          variant={isLoading ? "outline" : "default"}
        >
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
              正在解析...
            </>
          ) : (
            "获取AI解析"
          )}
        </Button>

        {/* AI解析结果 */}
        {completion && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium">解析结果</h3>
            <div className="bg-primary/5 prose prose-slate max-w-none rounded-lg p-4">
              <ReactMarkdown>{completion}</ReactMarkdown>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIExplain;
