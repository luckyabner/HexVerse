import { Button } from "@/components/ui/button";
import PreparationArea from "./PreparationArea";
import ThrowResults from "./ThrowResult";

interface AutoDivinationProps {
  isAnimating: boolean;
  showPreparation: boolean;
  results: string[];
  onThrow: () => void;
}

export default function AutoDivination({
  isAnimating,
  showPreparation,
  results,
  onThrow,
}: AutoDivinationProps) {
  return (
    <div className="space-y-6">
      {/* 准备区域 */}
      {showPreparation && <PreparationArea />}

      {/* 投掷按钮 */}
      <div className="flex justify-center pt-4">
        <Button
          className="px-8 py-6 text-lg"
          size="lg"
          onClick={onThrow}
          disabled={isAnimating}
        >
          {isAnimating ? (
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
              正在投掷...
            </>
          ) : (
            <>
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              开始自动起卦
            </>
          )}
        </Button>
      </div>

      {/* 结果显示 */}
      <ThrowResults results={results} />
    </div>
  );
}
