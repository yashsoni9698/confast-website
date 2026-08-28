"use client";

import React from "react";
import Image from "next/image";
import { FadeUp, Parallax } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

const BROCHURE = "/brochure/confast-brochure.pdf";

const contents = [
  "Full product range with technical data",
  "Coverage, pack sizes and shelf life",
  "Epoxy 77 shade reference",
  "Application guidance per system",
];

export function BrochureSection() {
  return (
    <section id="brochure" className="relative overflow-hidden bg-[#101010]">
      <div className="blueprint-invert absolute inset-0 opacity-50" />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[34rem] w-[34rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(243,145,0,0.16) 0%, transparent 68%)",
        }}
      />

      <div className="band shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
          {/* copy */}
          <div>
            <SectionHead
              tone="invert"
              eyebrow="Brochure"
              title="Download the"
              accent="full catalogue."
              lede="Every product, specification and application in one PDF — the complete CONFAST reference for your project file."
            />

            {/* contents */}
            <FadeUp stagger={0.08} className="mt-12">
              {contents.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-4 border-b border-white/10 py-4"
                >
                  <span className="tick" />
                  <p className="body-copy text-white/80">{c}</p>
                </div>
              ))}
            </FadeUp>

            <FadeUp delay={0.14} className="mt-12 flex flex-wrap items-center gap-4">
              <a href={BROCHURE} download className="btn btn-orange">
                Download brochure
              </a>
              <a
                href={BROCHURE}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-line-invert"
              >
                View online
              </a>
              <p className="caption text-white/65">PDF · 6 MB</p>
            </FadeUp>
          </div>

          {/* cover */}
          <Parallax distance={60}>
            <a
              href={BROCHURE}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the CONFAST brochure"
              className="group block"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.25rem] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.45)] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2">
                <Image
                  src="/images/brochure/cover.jpg"
                  alt="CONFAST Chemicals product brochure cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover object-top"
                />
              </div>
            </a>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
