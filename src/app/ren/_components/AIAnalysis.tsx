import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DivinationResult } from "../_lib/types";

interface AIAnalysisProps {
  result: DivinationResult;
  userQuestion: string;
  setUserQuestion: (question: string) => void;
  completion: string;
  isLoading: boolean;
  sendMsg: (result: DivinationResult) => Promise<void>;
}

export function AIAnalysis({
  result,
  userQuestion,
  setUserQuestion,
  completion,
  isLoading,
  sendMsg,
}: AIAnalysisProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">AI分析卦象</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="输入你刚才想的问题，让AI帮您解析卦象的含义..."
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          className="bg-background/70 h-20 resize-none"
        />

        {!completion ? (
          <Button
            onClick={() => sendMsg(result)}
            disabled={isLoading}
            className="w-full"
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
                分析中...
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
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 9v3l1.5 1.5"></path>
                </svg>
                分析卦象
              </>
            )}
          </Button>
        ) : (
          <div className="bg-primary/5 mt-4 rounded-lg p-4">
            <h4 className="text-primary mb-2 font-medium">AI解析结果</h4>
            <div className="text-muted-foreground whitespace-pre-wrap">
              {completion}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
