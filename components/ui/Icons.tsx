import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

export function FacebookIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M15 8.5h2V5.5h-2c-2.2 0-4 1.8-4 4V11H9v3h2v6h3v-6h2.2l.8-3H14V9.5c0-.6.4-1 1-1z"
        fill="currentColor"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.6" cy="7.4" r="1" fill="currentColor" />
    </svg>
  );
}

export function LinkedInIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="8" cy="8.2" r="1.1" fill="currentColor" />
      <path
        d="M8 11v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M11.5 17v-3.4c0-1.2.9-2.1 2-2.1s1.9.9 1.9 2.1V17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Componente dinámico para renderizar iconos sociales por nombre ("Facebook", "Instagram", "LinkedIn")
 */
export function SocialIcon({ name, className = "h-5 w-5", ...props }: { name: string } & IconProps) {
  switch (name.toLowerCase()) {
    case "facebook":
      return <FacebookIcon className={className} {...props} />;
    case "instagram":
      return <InstagramIcon className={className} {...props} />;
    case "linkedin":
      return <LinkedInIcon className={className} {...props} />;
    default:
      return null;
  }
}
