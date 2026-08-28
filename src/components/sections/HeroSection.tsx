"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "@/components/ui/Logo";
import { useReducedMotion } from "@/lib/useMediaQuery";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* Each frame is one application area. Until real CONFAST site footage exists
   the still carries the frame with a slow push-in. To switch a frame to
   video, drop the clip in /public/videos and set `video` — see
   public/videos/README.md.

   Widths are capped at 1920 / q=70: the previous 2600px q=90 requests were
   the single heaviest thing on the page and dominated LCP. */
type Frame = {
  id: string;
  poster: string;
  caption: string;
  video?: string;
};

const FRAMES: Frame[] = [
  {
    id: "tiling",
    poster:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=70&fit=crop",
    caption: "Tile adhesives",
    // video: "/videos/hero-tiling.mp4",
  },
  {
    id: "waterproofing",
    poster:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=70&fit=crop",
    caption: "Waterproofing systems",
    // video: "/videos/hero-waterproofing.mp4",
  },
  {
    id: "epoxy",
    poster:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=70&fit=crop",
    caption: "Epoxy grouts",
    // video: "/videos/hero-epoxy.mp4",
  },
];

const HOLD_MS = 7000;

export function HeroSection() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  /* Media drifts slower than the page; the type eases away on scroll */
  useIsoLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(mediaRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to("[data-hero-content]", {
        opacity: 0,
        y: -44,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "25% top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Slow crossfade between frames — held still for reduced-motion users */
  useEffect(() => {
    if (reduced) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % FRAMES.length), HOLD_MS);
    return () => clearTimeout(id);
  }, [active, reduced]);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && !reduced) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, reduced]);

  return (
    <section
      ref={sectionRef}
      className="on-ink clip-x relative flex min-h-[100svh] flex-col justify-center bg-[#0B0B0A]"
    >
      {/* ───────── backdrop ───────── */}
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        {FRAMES.map((frame, i) => (
          <div
            key={frame.id}
            className="absolute inset-0 overflow-hidden"
            style={{
              opacity: i === active ? 1 : 0,
              transition: "opacity 1.6s cubic-bezier(0.22,1,0.36,1)",
            }}
            aria-hidden
          >
            <div
              className={
                i === active && !reduced ? "kenburns absolute inset-0" : "absolute inset-0"
              }
            >
              <Image
                src={frame.poster}
                alt=""
                fill
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : "auto"}
                sizes="100vw"
                quality={70}
                className="object-cover object-center"
              />
              {frame.video && (
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                  muted
                  loop
                  playsInline
                  preload={i === 0 ? "auto" : "none"}
                  tabIndex={-1}
                >
                  <source src={frame.video} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        ))}

        {/* Cinematic grade — deep and even so the type stays crisp */}
        <div className="absolute inset-0 bg-[#0B0B0A]/64" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0A]/85 via-[#0B0B0A]/25 to-[#0B0B0A]/92" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(11,11,10,0) 30%, rgba(11,11,10,0.72) 100%)",
          }}
        />
      </div>

      {/* ───────── centred composition ───────── */}
      <div
        data-hero-content
        className="shell relative z-10 flex flex-col items-center pt-28 pb-28 text-center sm:pt-32 sm:pb-36 md:pb-32"
      >
        <div className="hero-rise" style={{ animationDelay: "0.1s" }}>
          <Logo tone="invert" size="lg" />
        </div>

        <p
          className="hero-rise eyebrow mt-8 text-white/80"
          style={{ animationDelay: "0.3s" }}
        >
          Construction Chemicals · India
        </p>

        <h1
          className="hero-rise display display-xl mt-6 max-w-[17ch] text-white"
          style={{ animationDelay: "0.45s" }}
        >
          Engineered to hold{" "}
          <span className="italic-accent text-[#F39100]">everything</span> together.
        </h1>

        <p
          className="hero-rise lede mt-7 max-w-xl text-white/75"
          style={{ animationDelay: "0.62s" }}
        >
          Tile adhesives, epoxy grouts, block-fix mortars and waterproofing
          polymers — manufactured to IS 15477 and EN 12004.
        </p>

        {/* Primary conversion path. The hero previously had no call to action
            at all, so the only way forward was to keep scrolling. */}
        <div
          className="hero-rise mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: "0.78s" }}
        >
          <Link href="#products" className="btn btn-orange">
            Explore the range
          </Link>
          <Link href="/quote" className="btn btn-line-invert">
            Request a quote
          </Link>
        </div>
      </div>

      {/* ───────── frame caption + indicators ───────── */}
      <div className="absolute inset-x-0 bottom-0 z-10 pb-7">
        <div className="shell grid grid-cols-3 items-end gap-4">
          <p className="eyebrow hidden text-dim-invert sm:block">
            {FRAMES[active].caption}
          </p>

          <div className="col-span-3 sm:col-span-1" />

          <div className="hidden items-center justify-end gap-2 sm:flex">
            {FRAMES.map((frame, i) => (
              <button
                key={frame.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show ${frame.caption}`}
                aria-current={i === active ? "true" : undefined}
                className="py-3"
              >
                <span
                  className={`block h-[2px] transition-all duration-700 ${
                    i === active ? "w-9 bg-[#F39100]" : "w-4 bg-white/35 hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
