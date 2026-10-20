"use client";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function ToggleTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else if (
      !savedTheme &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    return (
      <button
        className="flex h-8 w-8 cursor-pointer items-center justify-center"
        aria-label="切换主题"
      >
        <span className="sr-only">切换主题</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex h-8 cursor-pointer items-center gap-1.5 border border-transparent px-1.5 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
      aria-label={theme === "light" ? "切换到夜间模式" : "切换到日间模式"}
      aria-pressed={theme === "dark"}
      title={theme === "light" ? "日间 / 夜间" : "夜间 / 日间"}
    >
      {theme === "light" ? (
        <Sun className="h-4 w-4" strokeWidth={1.5} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.5} />
      )}
      <span className="label hidden text-[0.6rem] sm:inline">{theme === "light" ? "日" : "夜"}</span>
    </button>
  );
}
