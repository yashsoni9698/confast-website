"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FadeUp } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/utils";

/* Slides point at the gallery page; product shots deep-link to the
   product they show. */
const slides = [
  {
    src: "/images/products/tileset-44.png",
    title: "TileSet 44",
    caption: "S1 super-flex adhesive",
    contain: true,
  },
  {
    src: "/images/products/epoxy-77.png",
    title: "Epoxy 77",
    caption: "Three-component epoxy grout",
    contain: true,
  },
  {
    src: "/images/brochure/page-03.jpg",
    title: "Product range",
    caption: "From the company brochure",
    contain: false,
  },
  {
    src: "/images/products/block-fix.png",
    title: "Block Fix",
    caption: "Block mounting mortar",
    contain: true,
  },
  {
    src: "/images/brochure/page-10.jpg",
    title: "Technical spread",
    caption: "Specification reference",
    contain: false,
  },
  {
    src: "/images/products/sbr-latex-plus.png",
    title: "SBR Latex+",
    caption: "Polymer bonding & waterproofing",
    contain: true,
  },
];

export function GallerySection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /* Track scroll position to drive the progress bar and arrow states */
  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setProgress(p);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(max - el.scrollLeft <= 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-slide]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="overflow-hidden bg-white">
      <div className="band">
        {/* heading */}
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
            <SectionHead
              eyebrow="Gallery"
              title="The range,"
              accent="up close."
              lede="Pack shots and brochure spreads across the full product line."
            />

            <FadeUp delay={0.14} className="flex items-center gap-3">
              <Link href="/gallery" className="btn btn-line">
                Open gallery
              </Link>

              {/* arrows */}
              <div className="hidden gap-2 sm:flex">
                <button
                  onClick={() => nudge(-1)}
                  disabled={atStart}
                  aria-label="Previous images"
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full border border-[#1A1A18]/12 transition-all duration-400",
                    atStart
                      ? "opacity-35"
                      : "hover:border-[#F39100] hover:bg-[#F39100] hover:text-white"
                  )}
                >
                  <span aria-hidden className="text-lg leading-none">
                    &lsaquo;
                  </span>
                </button>
                <button
                  onClick={() => nudge(1)}
                  disabled={atEnd}
                  aria-label="Next images"
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full border border-[#1A1A18]/12 transition-all duration-400",
                    atEnd
                      ? "opacity-35"
                      : "hover:border-[#F39100] hover:bg-[#F39100] hover:text-white"
                  )}
                >
                  <span aria-hidden className="text-lg leading-none">
                    &rsaquo;
                  </span>
                </button>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* slider — bleeds past the shell on the right */}
        <div
          ref={trackRef}
          className="head-gap flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:px-10 lg:mt-20 xl:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide) => (
            <Link
              key={slide.src + slide.title}
              href="/gallery"
              data-slide
              aria-label={`${slide.title} — open gallery`}
              className="group w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[26vw]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] bg-[#F2F1EE]">
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 26vw"
                  className={cn(
                    "transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]",
                    slide.contain ? "object-contain p-10" : "object-cover object-top"
                  )}
                />

                {/* caption plate */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A1A18]/75 via-[#1A1A18]/10 to-transparent p-6 pt-16">
                  <p className="display display-sm text-white">{slide.title}</p>
                  <p className="body-sm mt-1 text-white/80">{slide.caption}</p>
                </div>
              </div>
            </Link>
          ))}

          <div className="w-1 shrink-0 sm:w-6" aria-hidden />
        </div>

        {/* progress */}
        <div className="shell mt-8">
          <div className="h-px w-full max-w-md bg-[#1A1A18]/10">
            <div
              className="h-full origin-left bg-[#F39100] transition-transform duration-200"
              style={{ transform: `scaleX(${Math.max(progress, 0.06)})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
