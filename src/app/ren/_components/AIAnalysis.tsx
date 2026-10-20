import { DivinationResult } from "../_lib/types";
import { AskField } from "@/components/design/AskField";
import { Markdown } from "@/components/design/Markdown";
import { InkSpinner } from "@/components/design/InkSpinner";
import { SectionLabel } from "@/components/design/SectionLabel";
import { Button } from "@/components/ui/button";

interface AIAnalysisProps {
  result: DivinationResult;
  userQuestion: string;
  setUserQuestion: (question: string) => void;
  completion: string;
  isLoading: boolean;
  sendMsg: (result: DivinationResult, question: string) => Promise<void>;
  onReset: () => void;
  error?: Error;
}

export function AIAnalysis({
  result,
  userQuestion,
  setUserQuestion,
  completion,
  isLoading,
  sendMsg,
  onReset,
  error,
}: AIAnalysisProps) {
  return (
    <section>
      <SectionLabel index="解">AI 解析</SectionLabel>

      <div className="mt-8 grid gap-10 md:grid-cols-[15rem_1fr] md:gap-14">
        <div className="md:sticky md:top-24 md:self-start">
          <p className="text-[0.85rem] leading-relaxed text-muted-foreground">
            六神已定。把你的问题交给模型，让它把卦象翻译成此刻可用的判断。
          </p>
          <p className="label mt-5 text-muted-foreground/50">
            生成内容仅供参考
          </p>
        </div>

        <div className="min-w-0">
          {!completion && !isLoading && (
            <AskField
              id="ren-question"
              value={userQuestion}
              onChange={setUserQuestion}
              onSubmit={() => sendMsg(result, userQuestion)}
              cta="解课"
              placeholder="你此刻最想问的是什么？"
            />
          )}

          {isLoading && !completion && (
            <div className="flex items-center gap-3 border-y border-border py-10">
              <InkSpinner className="h-4 w-4 text-vermilion" />
              <span className="label text-muted-foreground">
                正在推演六神
              </span>
            </div>
          )}

          {completion && (
            <div className="space-y-6">
              <blockquote className="border-l border-vermilion/50 pl-4">
                <div className="label text-muted-foreground/50">所问</div>
                <p className="classic mt-1.5 text-[0.95rem] leading-relaxed">
                  {userQuestion}
                </p>
              </blockquote>

              <Markdown streaming={isLoading}>{completion}</Markdown>

              {error ? (
                <p className="text-[0.8rem] text-destructive">
                  解析中断：{error.message}
                </p>
              ) : null}

              {!isLoading && (
                <div className="pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onReset}
                    className="label -ml-2 text-muted-foreground hover:text-foreground"
                  >
                    再问一次
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
