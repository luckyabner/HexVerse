import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Seal } from "@/components/design/Seal";

export const metadata: Metadata = {
  title: "HexVerse — 周易与 AI 的推演台",
  description:
    "以《周易》的法度推演，以 AI 的语义注解。六爻起卦、小六壬、八字命理。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          // 在首帧前应用主题，避免深色模式白屏闪烁
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <Script
          src="https://umami.luckyabner.top/script.js"
          data-website-id="d48a87de-eed3-4ea2-91b5-3dedbc73917f"
          strategy="afterInteractive"
        />
      </head>
      <body className="relative min-h-screen antialiased">
        <a
          href="#main-content"
          className="label sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70] focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          跳到主要内容
        </a>

        <NavBar />

        {children}

        <footer className="mt-24 border-t border-border">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8 md:py-12">
            <div className="flex items-center gap-4">
              <Seal />
              <div>
                <div className="display text-lg leading-none">HexVerse</div>
                <div className="label mt-2 text-muted-foreground/60">
                  周易 · 六爻 · 六壬 · 八字
                </div>
              </div>
            </div>

            <div className="label space-y-2 leading-relaxed text-muted-foreground/50 md:text-right">
              <p>© {new Date().getFullYear()} HexVerse</p>
              <p>
                卦象为参考 · 决断在人心
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
