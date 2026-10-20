import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-muted-foreground/50 flex field-sizing-content min-h-16 w-full resize-none rounded-none border-0 border-b border-input bg-transparent px-0 py-2 text-base leading-relaxed outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-foreground aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
