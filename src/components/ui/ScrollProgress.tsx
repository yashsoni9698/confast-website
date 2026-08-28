"use client";

import { useEffect, useRef } from "react";

/**
 * Reading-progress rail pinned to the top of the viewport.
 *
 * Driven by rAF off a passive scroll listener and applied as a single
 * `transform: scaleX()` so it never triggers layout — the cheapest way to
 * animate a progress bar at 60fps.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const max =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.transform = `scaleX(${p})`;
      bar.style.opacity = p > 0.005 ? "1" : "0";
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="scroll-rail" aria-hidden>
      <span
        ref={barRef}
        style={{
          transform: "scaleX(0)",
          opacity: 0,
          transition: "opacity 0.4s var(--ease-premium)",
        }}
      />
    </div>
  );
}
