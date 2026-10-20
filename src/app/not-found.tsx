import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Seal } from "@/components/design/Seal";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col justify-center px-5 py-20 md:px-8 md:py-28"
    >
      <div className="flex items-center gap-3">
        <span className="label text-vermilion">四〇四</span>
        <span className="label text-muted-foreground">此页不在卦中</span>
        <span aria-hidden="true" className="h-px w-16 bg-border" />
      </div>

      <h1 className="display mt-7 text-[clamp(2.6rem,7vw,4.75rem)] leading-[1.05]">
        象外无物
      </h1>

      <p className="mt-6 max-w-md text-[0.9rem] leading-relaxed text-muted-foreground">
        你所寻的页面并未落在六十四卦之间。回到起点，重新问一次。
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 bg-primary px-6 py-3.5 text-[0.9rem] text-primary-foreground transition-colors hover:bg-primary/85"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
            strokeWidth={1.5}
          />
          返回首页
        </Link>
        <Link
          href="/yao"
          className="label border-b border-border pb-1 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          直接起卦
        </Link>
      </div>

      <Seal className="mt-16" />
    </main>
  );
}
