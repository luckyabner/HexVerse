import React from "react";
import { Badge } from "@/components/ui/badge";
import { DivinationResult as DivinationResultType } from "../_lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DivinationResultProps {
  result: DivinationResultType;
}

export function DivinationResult({ result }: DivinationResultProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">卦象结果</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="my-4 flex justify-center gap-4">
          {[result.divination1, result.divination2, result.divination3].map(
            (div, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="border-primary/30 bg-primary/5 border-2 px-4 py-2 text-lg font-medium"
              >
                {div}
              </Badge>
            ),
          )}
        </div>

        <div className="mt-6 space-y-4">
          {[
            { div: result.divination1, exp: result.explain1 },
            { div: result.divination2, exp: result.explain2 },
            { div: result.divination3, exp: result.explain3 },
          ].map((item, index) => (
            <div key={index} className="bg-primary/5 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <span className="text-primary min-w-[60px] font-medium">
                  {item.div}:
                </span>
                <span className="text-muted-foreground">{item.exp}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
