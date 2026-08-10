import type { SocialLink } from "@/content/developers";
import { cn } from "@/lib/utils";
import { SocialIcon } from "@/components/ui/Icons";

export function SocialLinks({
  social,
  theme = "light",
  className,
}: {
  social: SocialLink[];
  theme?: "dark" | "light";
  className?: string;
}) {
  const iconWrapper =
    theme === "light"
      ? "text-[oklch(20%_0_0)] hover:text-black/60"
      : "bg-white text-black hover:bg-white/40 hover:text-white rounded-[6px]";

  return (
    <div className={cn("flex gap-3 sm:justify-end", className)}>
      {social.map((item) => (
        <a
          key={item.label}
          href={item.href}
          aria-label={item.label}
          className={cn(
            "flex h-7 w-7 items-center justify-center transition-colors duration-300",
            iconWrapper
          )}
        >
          <SocialIcon name={item.label} className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}

