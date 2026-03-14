import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main id="main-content" className="container mx-auto px-4 py-12 md:py-24">
      {/* 英雄区域 */}
      <section className="mb-12 text-center md:mb-20">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight md:mb-6 md:text-7xl">
          <span className="text-primary">Hex</span>
          <span>Verse</span>
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-base md:text-xl">
          融合传统周易智慧与现代AI分析，为您提供直观、精准的占卜与命理服务。
        </p>
      </section>

      {/* 功能卡片网格 */}
      <section className="mx-auto max-w-5xl">
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {features.map((feature, index) => (
            <Link href={feature.href} key={index} className="group outline-none">
              <div className="border-border bg-card/50 hover:border-primary/40 relative flex h-full flex-col overflow-hidden rounded-xl border p-5 transition-colors focus-visible:ring-2 focus-visible:ring-primary md:rounded-2xl md:p-8">
                <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-200 group-hover:bg-primary/15 md:mb-6 md:h-14 md:w-14 md:rounded-xl">
                  {feature.icon}
                </div>

                <h3 className="mb-2 text-xl font-medium tracking-tight md:mb-3 md:text-2xl">{feature.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow leading-relaxed md:mb-8">
                  {feature.description}
                </p>

                <div className="text-primary mt-auto flex items-center text-sm font-medium opacity-70 transition-opacity group-hover:opacity-100">
                  立即体验 <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 md:ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

// 特色内容及跳转链接
const features = [
  {
    title: "六爻起卦",
    description: "基于《周易》的经典卦象演算，提供赛博投掷与手动排盘，预测事物发展趋势。",
    href: "/yao",
    icon: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22V2M4 10h16M4 14h16M4 18h16M4 6h16" />
      </svg>
    ),
  },
  {
    title: "小六壬",
    description: "传统简便快捷的占筮方式，通过数字推演，快速获得日常事务与紧急决策的指引。",
    href: "/ren",
    icon: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "命理分析",
    description: "结合AI深度解析您的生辰八字，全面解读先天禀赋、事业财运与人生轨迹。",
    href: "/fortune",
    icon: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 14 4-4" />
        <path d="M3.34 19a10 10 0 1 1 17.32 0" />
      </svg>
    ),
  },
];
