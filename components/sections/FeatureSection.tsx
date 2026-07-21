"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type FeatureSectionProps = {
  index: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  reverse?: boolean;
};

/**
 * Parallax de imagen con useGSAP, equivalente a [data-parallax-wrap] /
 * [data-parallax-img] de la maqueta: yPercent -14, scrub.
 */
export default function FeatureSection({
  index,
  title,
  description,
  image,
  alt,
  reverse = false,
}: FeatureSectionProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!imgRef.current || !wrapRef.current) return;

      gsap.to(imgRef.current, {
        yPercent: -14,
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
      className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10
                 px-5 py-20 sm:px-10 sm:py-28 md:grid-cols-2 md:gap-16 lg:gap-20 lg:px-16 lg:py-[150px]"
    >
      <div
        ref={wrapRef}
        data-parallax-wrap
        className={`relative aspect-[4/3] overflow-hidden rounded-xl ${
          reverse ? "order-1 md:order-2" : "order-1"
        }`}
      >
        <div ref={imgRef} data-parallax-img className="absolute inset-x-0 -top-[10%] h-[120%]">
          <Image src={image} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
      <div className={reverse ? "order-2 md:order-1" : "order-2"}>
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-accent sm:mb-4 sm:text-[12.5px]">
          {index}
        </p>
        <h3 className="mb-4 font-display text-[26px] font-extrabold tracking-tight text-white sm:mb-[18px] sm:text-[34px]">
          {title}
        </h3>
        <p className="max-w-[460px] font-sans text-[15px] font-medium leading-relaxed text-gray-100 sm:text-[16.5px]">
          {description}
        </p>
      </div>
    </section>
  );
}
