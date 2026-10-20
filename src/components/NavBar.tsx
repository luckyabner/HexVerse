"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ToggleTheme from "./ToggleTheme";
import AIConfigModal from "./AIConfigModal";
import { Seal } from "./design/Seal";
import { cn } from "@/lib/utils";

const links = [
  { href: "/yao", label: "六爻" },
  { href: "/ren", label: "小六壬" },
  { href: "/fortune", label: "命理" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-5 md:h-16 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-70"
          aria-label="HexVerse 首页"
        >
          <Seal chars="易" size="sm" className="hidden h-6 w-6 sm:flex" />
          <span className="display text-[1.15rem] leading-none tracking-tight">
            HexVerse
          </span>
        </Link>

        <nav aria-label="主导航" className="flex items-center gap-4 md:gap-7">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex items-center whitespace-nowrap text-[0.8rem] transition-colors md:text-[0.82rem]",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mr-1.5 h-1 w-1 rounded-full transition-colors",
                    active ? "bg-vermilion" : "bg-transparent",
                  )}
                />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <AIConfigModal />
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}
