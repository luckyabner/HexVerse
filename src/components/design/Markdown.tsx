import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface MarkdownProps {
  children: string;
  className?: string;
  streaming?: boolean;
}

export function Markdown({ children, className, streaming }: MarkdownProps) {
  return (
    <div className={cn("prose-ink", streaming && "caret", className)}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}
