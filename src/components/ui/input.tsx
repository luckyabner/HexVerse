import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground/50 flex h-10 w-full min-w-0 rounded-none border-0 border-b border-input bg-transparent px-0 py-2 text-base outline-none transition-colors selection:bg-vermilion/20 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-foreground aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
