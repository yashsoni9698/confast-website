import React from "react";
import { Reveal, FadeUp } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────
   SectionHead — one heading treatment for the
   whole site. Apple leads with a single strong
   headline and one line of secondary copy; the
   accent is a phrase inside the sentence, not a
   separate coloured line.
──────────────────────────────────────────── */
export function SectionHead({
  eyebrow,
  title,
  accent,
  lede,
  align = "left",
  tone = "ink",
  size = "lg",
  className,
}: {
  eyebrow?: string;
  /** Text before the accent phrase */
  title: string;
  /** Highlighted phrase, rendered inline in brand orange */
  accent?: string;
  lede?: string;
  align?: "left" | "center";
  tone?: "ink" | "invert";
  size?: "lg" | "md";
  className?: string;
}) {
  const centered = align === "center";
  const invert = tone === "invert";

  return (
    <div
      className={cn(
        centered && "mx-auto max-w-3xl text-center",
        className
      )}
    >
      {eyebrow && (
        <FadeUp y={12}>
          <p
            className={cn(
              "eyebrow",
              invert ? "text-[#F39100]" : "text-[#F39100]"
            )}
          >
            {eyebrow}
          </p>
        </FadeUp>
      )}

      <h2
        className={cn(
          "display mt-5",
          size === "lg" ? "display-lg" : "display-md",
          invert ? "text-white" : "text-[#1A1A18]",
          centered ? "mx-auto max-w-[24ch]" : "max-w-[26ch]"
        )}
      >
        <Reveal>
          <span>
            {title}
            {accent && <span className="text-[#F39100]"> {accent}</span>}
          </span>
        </Reveal>
      </h2>

      {lede && (
        <FadeUp delay={0.1}>
          <p
            className={cn(
              "lede mt-6 max-w-2xl",
              invert ? "text-muted-invert" : "text-muted",
              centered && "mx-auto"
            )}
          >
            {lede}
          </p>
        </FadeUp>
      )}
    </div>
  );
}
