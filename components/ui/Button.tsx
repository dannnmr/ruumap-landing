import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary";
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "primary", asChild = false, href, ...props }, ref) => {
    const Component = href ? "a" : "button";

    const baseStyles = "inline-flex items-center justify-center rounded-[10px] text-[13px] font-light transition-all duration-500 hover:scale-105 active:scale-95 sm:text-[13.5px] px-7 py-[13px]";
    
    const variants = {
      primary: "bg-[#D78951] text-background hover:opacity-90",
      secondary: "border border-white/20 text-white hover:border-white/50 hover:bg-white/5",
    };

    return (
      <Component
        ref={ref as any}
        href={href}
        className={cn(baseStyles, variants[variant], className)}
        {...(props as any)}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
