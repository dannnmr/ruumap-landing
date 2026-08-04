"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteContent } from "@/content/site";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const { heading, primaryCta, backgroundImage } = siteContent.closingCTA;

export default function ClosingCTA() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!imgRef.current || !wrapRef.current) return;

      gsap.to(imgRef.current, {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: wrapRef }
  );

  return (
    <section
      id="contacto"
      className="relative flex h-[70vh] scroll-mt-24 items-center justify-center overflow-hidden sm:h-[80vh]"
    >
      <div ref={wrapRef} data-parallax-wrap className="absolute inset-0">
        <div ref={imgRef} data-parallax-img className="absolute inset-x-0 -top-[15%] h-[130%]">
          <Image
            src={backgroundImage.src}
            alt={backgroundImage.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-background/55" />
      <div className="relative px-5 text-center sm:px-16">
        <h2 className="mx-auto mb-10 max-w-[760px] font-display text-[clamp(34px,6vw,64px)] font-bold leading-[1.05] tracking-tight text-white drop-shadow-lg sm:mb-12">
          {heading}
        </h2>
        <Button
          href={primaryCta.href}
          variant="primary"
          className="rounded-full px-9 py-4 text-sm sm:px-11 sm:py-[18px] sm:text-[15px]"
        >
          {primaryCta.label}
        </Button>
      </div>
    </section>
  );
}
