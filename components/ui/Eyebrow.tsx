import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Eyebrow({ children, className, ...props }: EyebrowProps) {
  return (
    <p 
      className={cn("text-[11px] font-light uppercase tracking-[0.32em] text-accent drop-shadow-lg sm:text-[12.5px]", className)}
      {...props}
    >
      {children}
    </p>
  );
}
