import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-24">
      {/* 英雄区域 */}
      <section className="mb-20 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
          <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
            Hex
          </span>
          <span>Verse</span>
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
          融合传统周易智慧与现代AI分析，为您提供直观、精准的占卜与命理服务。
        </p>
      </section>

      {/* 功能卡片网格 */}
      <section className="mx-auto max-w-5xl">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <Link href={feature.href} key={index} className="group outline-none">
              <div className="border-border bg-card/50 hover:border-primary/50 relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 shadow-sm transition-all duration-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary">
                {/* 悬浮渐变背景 */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                
                <div className="bg-primary/10 text-primary mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                
                <h3 className="mb-3 text-2xl font-semibold tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="text-primary mt-auto flex items-center font-medium opacity-80 transition-opacity group-hover:opacity-100">
                  立即体验 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
