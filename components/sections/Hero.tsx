"use client";

import { useRef } from "react";
import { siteContent } from "@/content/site";
import { useTextReveal } from "@/hooks/useTextReveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

const {
  eyebrow,
  titleLines,
  subcopy,
  primaryCta,
  secondaryCta,
} = siteContent.hero;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const introRef = useRef<HTMLDivElement>(null);

  useTextReveal({ scopeRef: sectionRef, lineRefs, introRef });

  return (
    <section
      ref={sectionRef}
      data-hero
      className="relative flex h-screen min-h-150 items-center overflow-hidden bg-background"
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/49806/49806-720.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlays: Oscurecer para legibilidad */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative w-full max-w-[900px] px-5 sm:px-10 lg:px-16">
        <Eyebrow className="mb-6">{eyebrow}</Eyebrow>

        <h1
          className="mb-7 font-display font-light leading-[1.05] tracking-tight text-white
                     drop-shadow-lg text-[clamp(42px,7vw,88px)]"
        >
          {titleLines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <span
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className="block will-change-transform"
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div ref={introRef}>
          <p className="mb-9 max-w-[540px] font-sans text-[15px] font-light leading-relaxed text-gray-200 drop-shadow-md sm:text-base">
            {subcopy}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button href={primaryCta.href} variant="primary" className="rounded-[10px] px-8 py-3.5">
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="secondary" className="rounded-[10px] px-8 py-3.5">
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
