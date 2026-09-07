"use client";

import React from "react";

/* ────────────────────────────────────────────
   ChemParticles — a handful of fine motes
   drifting slowly upward through a dark band.

   The motif reads as aggregate or pigment
   settling through a mixed compound — a quiet
   nod to the product category (construction
   chemicals) rather than a generic "particles"
   effect. Pure CSS (`particle-rise` keyframe in
   globals.css): no JS animation loop, no layout
   cost, and it is already covered by the site's
   global `prefers-reduced-motion` rule.

   Intended for dark/ink surfaces only — the dot
   colour is fixed to brand orange at low opacity,
   which only reads correctly against `#101010`
   family backgrounds.
──────────────────────────────────────────── */
const MOTES: { left: string; size: number; delay: string; duration: string }[] = [
  { left: "6%", size: 3, delay: "0s", duration: "16s" },
  { left: "20%", size: 2, delay: "3.2s", duration: "13s" },
  { left: "37%", size: 4, delay: "6.4s", duration: "19s" },
  { left: "55%", size: 2, delay: "1.6s", duration: "14s" },
  { left: "71%", size: 3, delay: "4.8s", duration: "17s" },
  { left: "88%", size: 2, delay: "8.2s", duration: "15s" },
];

export function ChemParticles({
  className = "",
  count = 6,
}: {
  className?: string;
  /** How many motes to render (max 6) — fewer for smaller/busier bands. */
  count?: number;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {MOTES.slice(0, count).map((m, i) => (
        <span
          key={i}
          className="particle-rise absolute rounded-full bg-[#F39100]/40 blur-[0.5px]"
          style={{
            left: m.left,
            bottom: 0,
            width: m.size,
            height: m.size,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </div>
  );
}
