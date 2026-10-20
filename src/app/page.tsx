import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HexagramLines } from "@/components/design/HexagramLines";
import { HexagramPlate } from "@/components/design/HexagramPlate";
import { Seal } from "@/components/design/Seal";

export default function Home() {
  return (
    <main id="main-content">
      {/* ── 引言 ───────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="grid items-center gap-14 pt-14 pb-16 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:pt-24 md:pb-24">
          <div>
            <div className="rise flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-vermilion" />
              <span className="label text-vermilion">
                周易 · 六爻 · 六壬 · 八字
              </span>
            </div>

            <h1
              className="display rise mt-8 text-[clamp(3.4rem,10vw,7rem)] leading-[0.92] tracking-[0.01em]"
              style={{ "--d": "90ms" } as React.CSSProperties}
            >
              观象
              <br />
              <span className="text-vermilion">知几</span>
            </h1>

            <p
              className="rise mt-8 max-w-md text-[0.95rem] leading-[1.9] text-muted-foreground"
              style={{ "--d": "180ms" } as React.CSSProperties}
            >
              HexVerse 把古老的推演法度与 AI 的语义解析放在同一张纸上。
              你提出问题，卦象给出结构，模型给出注解。
            </p>

            <div
              className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
              style={{ "--d": "270ms" } as React.CSSProperties}
            >
              <Link
                href="/yao"
                className="group inline-flex items-center gap-3 bg-primary px-6 py-3.5 text-[0.9rem] text-primary-foreground transition-colors hover:bg-primary/88"
              >
                开始起卦
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>
              <a
                href="#methods"
                className="label border-b border-border pb-1 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                三种法门 ↓
              </a>
            </div>
          </div>

          <div
            className="rise flex justify-center md:justify-end"
            style={{ "--d": "360ms" } as React.CSSProperties}
          >
            <HexagramPlate />
          </div>
        </div>
      </section>

      {/* ── 三种法门 ───────────────────────────────────────── */}
      <section
        id="methods"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 md:px-8"
      >
        <div className="flex items-center gap-3 border-t border-border pt-6">
          <span className="label text-vermilion">01 — 03</span>
          <span className="label text-muted-foreground">三种法门</span>
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
        </div>

        <div>
          {methods.map((method, index) => (
            <Link
              key={method.href}
              href={method.href}
              className="group relative grid grid-cols-[2rem_1fr] items-start gap-x-4 border-b border-border py-9 transition-colors hover:bg-accent/40 md:grid-cols-[3rem_1fr_auto] md:gap-x-8 md:py-12"
            >
              <span className="numeral pt-2 text-[0.7rem] text-muted-foreground/60 transition-colors group-hover:text-vermilion">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="max-w-xl">
                <h2 className="display flex items-baseline gap-3 text-[1.9rem] leading-none transition-transform duration-300 group-hover:translate-x-1 md:text-[2.4rem]">
                  {method.title}
                  <span className="label text-muted-foreground/50">
                    {method.en}
                  </span>
                </h2>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-muted-foreground">
                  {method.description}
                </p>
                <p className="label mt-5 text-muted-foreground/55">
                  {method.meta}
                </p>
              </div>

              <div className="hidden items-center gap-8 self-center md:flex">
                <div className="text-foreground/60 transition-colors group-hover:text-foreground">
                  {method.glyph}
                </div>
                <ArrowUpRight
                  className="h-5 w-5 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-vermilion"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 结语 ───────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-20 md:px-8 md:pt-28">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <blockquote className="classic max-w-2xl text-[clamp(1.15rem,2.4vw,1.75rem)]">
            <p>
              「君子居则观其象而玩其辞，
              <br className="hidden md:block" />
              动则观其变而玩其占。」
            </p>
            <footer className="label mt-6 text-muted-foreground/60">
              《周易 · 系辞上传》
            </footer>
          </blockquote>
          <Seal className="self-start md:self-end" />
        </div>
      </section>
    </main>
  );
}

const methods = [
  {
    title: "六爻起卦",
    en: "LIU YAO",
    description:
      "金钱课六掷成卦，本卦示当下，变卦示去向。动爻处即转折处。",
    meta: "三枚铜钱 · 六次投掷 · 六十四卦",
    href: "/yao",
    glyph: <HexagramLines code="101101" width={44} thickness={3} gap={4} animate={false} />,
  },
  {
    title: "小六壬",
    en: "XIAO LIU REN",
    description:
      "以时起课，或以三数成局。六神轮转，快而直接，宜断眼前事。",
    meta: "六神 · 三宫 · 时辰起课",
    href: "/ren",
    glyph: (
      <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
        <circle
          cx="22"
          cy="22"
          r="19"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 5"
        />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <circle
            key={angle}
            cx={22 + 12 * Math.cos((angle * Math.PI) / 180)}
            cy={22 + 12 * Math.sin((angle * Math.PI) / 180)}
            r="2.4"
            fill="currentColor"
          />
        ))}
        <circle cx="22" cy="22" r="1.6" fill="var(--vermilion)" />
      </svg>
    ),
  },
  {
    title: "命理分析",
    en: "BAZI",
    description:
      "四柱八字，五行生克。由出生时刻推演禀赋、性情与运势的长期结构。",
    meta: "年柱 · 月柱 · 日柱 · 时柱",
    href: "/fortune",
    glyph: (
      <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
        {[0, 1, 2, 3].map((index) => (
          <rect
            key={index}
            x={4 + index * 10}
            y={8}
            width="4"
            height={28}
            fill="currentColor"
            opacity={index === 2 ? 1 : 0.4}
          />
        ))}
      </svg>
    ),
  },
];
