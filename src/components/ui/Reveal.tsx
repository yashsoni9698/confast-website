"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* Runs before the browser paints on the client, which is what stops the
   "content flashes in, then jumps to opacity 0 and animates" flicker the
   audit found. Falls back to useEffect during SSR. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* ────────────────────────────────────────────
   Reveal — slides content up from behind a mask
   as it enters the viewport.

   Renders a <span> by default so it stays valid
   inside <h1>/<h2>, whose content model only
   allows phrasing content.
──────────────────────────────────────────── */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span" | "h1" | "h2" | "h3" | "p" | "li";
}) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const inner = el.firstElementChild;
    if (!inner) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 1.1,
          delay,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref as never} className={cn("reveal-mask", className)}>
      <span className="block">{children}</span>
    </Tag>
  );
}

/* ────────────────────────────────────────────
   FadeUp — softer entrance for body copy, cards
   and list items.
──────────────────────────────────────────── */
export function FadeUp({
  children,
  className,
  delay = 0,
  y = 28,
  stagger,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** When set, direct children animate in sequence */
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el;
      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          stagger: stagger ?? 0,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────
   WordFade — brightens copy word by word as the
   block scrolls through the viewport.
──────────────────────────────────────────── */
export function WordFade({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-word]"),
        { opacity: 0.24 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.6,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 42%",
            scrub: 0.5,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} data-word className="inline-block">
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
}

/* ────────────────────────────────────────────
   Parallax — drifts an element against the
   scroll direction.
──────────────────────────────────────────── */
export function Parallax({
  children,
  className,
  distance = 90,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: distance * -0.5 },
        {
          y: distance * 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────
   Counter — counts up each time the element is
   scrolled into view from above (scrolling down).
   When the user scrolls back up past it, it
   resets so the next downward scroll re-triggers.
   Scrolling up into view (onEnterBack) shows the
   final number immediately — no animation.
──────────────────────────────────────────── */
export function Counter({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const obj = { v: 0 };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        end: "bottom 10%",
        onEnter: () => {
          // Scrolling down into view — animate from 0
          obj.v = 0;
          gsap.to(obj, {
            v: to,
            duration: 1.8,
            ease: "expo.out",
            onUpdate: () => {
              el.textContent = Math.round(obj.v).toString();
            },
          });
        },
        onEnterBack: () => {
          // Scrolling up into view — show final value instantly
          gsap.killTweensOf(obj);
          obj.v = to;
          el.textContent = to.toString();
        },
        onLeaveBack: () => {
          // Left viewport going up — reset so next downward entry animates
          gsap.killTweensOf(obj);
          obj.v = 0;
          el.textContent = "0";
        },
      });
    }, el);
    return () => ctx.revert();
  }, [to]);

  return (
    <span className={className}>
      <span ref={ref}>{to}</span>
      {suffix}
    </span>
  );
}
