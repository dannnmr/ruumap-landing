"use client";

import { siteContent } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { VideoPlayer } from "@/components/ui/VideoPlayer";

const { heading, video, cta } = siteContent.about;

export default function AboutUs() {
  return (
    <section className="bg-background px-5 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-[720px] flex-col items-center">
        <h2 className="mb-12 text-center font-display text-[clamp(28px,4vw,36px)] font-light tracking-tight text-white sm:mb-16">
          {heading}
        </h2>

        <VideoPlayer video={video} className="mb-12 max-w-[800px] sm:mb-16" />

        {/* CTA */}
        <Button href={cta.href} variant="primary">
          {cta.label}
        </Button>
      </div>
    </section>
  );
}
