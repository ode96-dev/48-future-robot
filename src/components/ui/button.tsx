import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-stone-950 text-stone-50 hover:bg-stone-800 shadow-sm",
        outline:
          "border border-stone-800/20 bg-transparent text-stone-900 hover:bg-stone-900/5 hover:border-stone-800/40",
        secondary: "bg-stone-200/80 text-stone-900 hover:bg-stone-300/80",
        ghost: "text-stone-800 hover:bg-stone-900/5",
        glass:
          "bg-stone-900/40 backdrop-blur-md text-stone-100 border border-white/20 hover:bg-stone-900/60 shadow-lg",
        link: "text-stone-950 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base tracking-wide",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
