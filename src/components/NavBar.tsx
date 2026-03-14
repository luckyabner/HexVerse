"use client";

import Link from "next/link";
import React from "react";
import ToggleTheme from "./ToggleTheme";
import AIConfigModal from "./AIConfigModal";

export default function NavBar() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 w-full border-b py-3 shadow-sm md:py-4">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-xl">
          <span className="text-primary">Hex</span>
          <span>Verse</span>
        </Link>

        <div className="flex items-center gap-1 md:gap-2">
          <AIConfigModal />
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}
