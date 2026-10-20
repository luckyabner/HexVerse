import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[2px] text-sm font-medium tracking-[0.02em] transition-colors duration-200 outline-none select-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:ring-2 focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default:
          "cursor-pointer bg-primary text-primary-foreground hover:bg-primary/85 active:bg-primary/90",
        outline:
          "cursor-pointer border border-foreground/20 bg-transparent text-foreground hover:border-foreground/40 hover:bg-foreground/[0.04]",
        secondary:
          "cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "cursor-pointer text-foreground hover:bg-foreground/[0.05]",
        destructive:
          "cursor-pointer bg-destructive text-white hover:bg-destructive/90",
        link: "cursor-pointer text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-2.5 text-[0.8rem] has-[>svg]:px-2",
        lg: "h-11 px-6 has-[>svg]:px-5",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
