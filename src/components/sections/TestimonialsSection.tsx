"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    text: "TileSet 44 changed how we handle large-format tiles. The bond strength is there, and we have had zero callbacks on the projects where we used it.",
    name: "Rajesh Kumar",
    role: "Site Engineer, Kumar Constructions",
    place: "Mumbai",
  },
  {
    text: "Epoxy 77 gives a finish our clients notice. The colour range is genuinely useful, and it has held up in commercial kitchens for two years now.",
    name: "Priya Sharma",
    role: "Interior Architect, Sharma Design Studio",
    place: "Pune",
  },
  {
    text: "I have used SBR Latex+ on terrace and basement waterproofing for over two years. Consistent product, and their technical team actually picks up the phone.",
    name: "Mohammed Ali",
    role: "Waterproofing Contractor, Ali Waterproofing Works",
    place: "Hyderabad",
  },
  {
    text: "Block Fix made our AAC masonry faster and cleaner. The masons took to it immediately and we have switched across every site.",
    name: "Suresh Patel",
    role: "Civil Contractor, Patel Builders",
    place: "Ahmedabad",
  },
];

const ROTATE_MS = 8000;

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  /* WCAG 2.2.2: anything that auto-updates needs a way to stop it. The
     carousel also pauses whenever a pointer or keyboard focus is inside it. */
  const [playing, setPlaying] = useState(true);
  const [paused, setPaused] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const lock = useRef(false);

  const go = useCallback((next: number) => {
    if (lock.current) return;
    const target = (next + testimonials.length) % testimonials.length;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIndex(target);
      return;
    }

    lock.current = true;
    gsap.to(bodyRef.current, {
      opacity: 0,
      y: -14,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setIndex(target);
        gsap.fromTo(
          bodyRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "expo.out",
            onComplete: () => {
              lock.current = false;
            },
          }
        );
      },
    });
  }, []);

  useEffect(() => {
    if (!playing || paused) return;
    const id = setTimeout(() => go(index + 1), ROTATE_MS);
    return () => clearTimeout(id);
  }, [index, go, playing, paused]);

  const t = testimonials[index];

  return (
    <section className="bg-white">
      <div
        className="band shell"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="flex items-center gap-3">
          <span className="tick" />
          <p className="eyebrow text-muted">Client Reviews</p>
        </div>

        <div
          className="head-gap grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20"
          role="group"
          aria-roledescription="carousel"
          aria-label="Client reviews"
        >
          <div ref={bodyRef} aria-live="polite" aria-atomic="true">
            <blockquote className="display max-w-[26ch] text-[1.75rem] leading-[1.18] text-[#1A1A18] sm:max-w-[28ch] sm:text-[2.5rem] lg:text-[3rem]">
              &ldquo;{t.text}&rdquo;
            </blockquote>

            <div className="mt-10 flex items-center gap-5">
              <span className="h-px w-10 bg-[#F39100]" />
              <div>
                <p className="text-base font-semibold text-[#1A1A18]">{t.name}</p>
                <p className="body-sm mt-1 text-muted">
                  {t.role} · {t.place}
                </p>
              </div>
            </div>
          </div>

          {/* controls */}
          <div className="flex items-end gap-8 lg:flex-col lg:items-end lg:justify-between">
            <p className="numeral eyebrow text-muted">
              <span className="text-[#F39100]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mx-1.5 opacity-50">/</span>
              {String(testimonials.length).padStart(2, "0")}
            </p>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setPlaying((v) => !v)}
                aria-label={playing ? "Pause reviews" : "Play reviews"}
                aria-pressed={!playing}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1A1A18]/15 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#F39100] hover:bg-[#F39100] hover:text-white"
              >
                {playing ? (
                  <Pause size={15} strokeWidth={2} aria-hidden />
                ) : (
                  <Play size={15} strokeWidth={2} aria-hidden />
                )}
              </button>
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous review"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1A1A18]/15 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#F39100] hover:bg-[#F39100] hover:text-white"
              >
                <span aria-hidden className="block text-lg leading-none">
                  &larr;
                </span>
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next review"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1A1A18]/15 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#F39100] hover:bg-[#F39100] hover:text-white"
              >
                <span aria-hidden className="block text-lg leading-none">
                  &rarr;
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* progress dots */}
        <div className="mt-16 flex gap-2">
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => go(i)}
              aria-label={`Review ${i + 1} of ${testimonials.length}`}
              aria-current={i === index ? "true" : undefined}
              className="py-3"
            >
              <span
                className={cn(
                  "block h-[2px] transition-all duration-700",
                  i === index
                    ? "w-14 bg-[#F39100]"
                    : "w-6 bg-[#1A1A18]/20 hover:bg-[#1A1A18]/50"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
