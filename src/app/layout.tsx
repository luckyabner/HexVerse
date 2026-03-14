import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "HexVerse - AI与传统周易智慧的结合",
  description: "融合传统周易智慧与现代AI分析，提供六爻起卦、小六壬占卜与命理分析服务",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`bg-background font-mono antialiased selection:bg-[hsl(320,65%,52%,20%)] relative min-h-screen`}
      >
        {/* Skip link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          跳到主要内容
        </a>

        {/* Global clean background */}
        <div className="fixed inset-0 -z-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/[0.03] via-background to-background"></div>
        <NavBar />
        {children}
        <footer className="border-border/40 text-muted-foreground mt-12 border-t py-8 text-center text-sm md:mt-16 md:py-12">
          <div className="container mx-auto">
            <p>
              &copy; {new Date().getFullYear()} HexVerse -
              探索古老智慧的现代平台
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
