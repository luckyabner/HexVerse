"use client";

import Link from "next/link";
import React from "react";
import ToggleTheme from "./ToggleTheme";
import AIConfigModal from "./AIConfigModal";

export default function NavBar() {
  return (
    <header className="border-border bg-background/95 sticky top-0 z-50 w-full border-b py-4 shadow-md backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-primary">Hex</span>
          <span>Verse</span>
        </Link>

        <div className="flex items-center gap-2">
          <AIConfigModal />
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}
