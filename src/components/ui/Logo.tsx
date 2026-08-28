import React from "react";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────
   LogoMark — vector rebuild of the CONFAST
   chevron so it stays crisp on any surface.
   (The bundled logomark.png is a flat scan
   crop with no transparency.)
──────────────────────────────────────────── */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 56"
      fill="none"
      aria-hidden="true"
      className={cn("text-[#F39100]", className)}
    >
      {/* outer chevron */}
      <path
        d="M36 2 L70 44 L55.5 44 L36 20 L16.5 44 L2 44 Z"
        fill="currentColor"
      />
      {/* inner chevron */}
      <path
        d="M36 30 L47 44 L36 44 L25 44 Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

/* ────────────────────────────────────────────
   Logo — mark plus wordmark lockup.
──────────────────────────────────────────── */
export function Logo({
  tone = "ink",
  size = "sm",
  className,
}: {
  tone?: "ink" | "invert";
  size?: "sm" | "lg";
  className?: string;
}) {
  const lg = size === "lg";

  return (
    <span
      className={cn(
        "flex items-center leading-none",
        lg ? "gap-4" : "gap-2.5 sm:gap-3",
        className
      )}
    >
      <LogoMark className={lg ? "h-9 w-auto sm:h-11" : "h-5 w-auto sm:h-[1.4rem]"} />
      <span className="flex items-baseline gap-[0.3rem]">
        <span
          className={cn(
            "font-medium transition-colors duration-500",
            lg
              ? "text-[1.6rem] tracking-[0.3em] sm:text-[2rem]"
              : "text-[1.05rem] tracking-[0.2em] sm:text-[1.15rem]",
            tone === "invert" ? "text-white" : "text-[#1A1A18]"
          )}
        >
          CONFAST
        </span>
        <span
          className={cn(
            "-translate-y-1.5 text-[0.5rem] font-normal tracking-[0.1em] transition-colors duration-500",
            tone === "invert" ? "text-white/45" : "text-[#868786]"
          )}
        >
          TM
        </span>
      </span>
    </span>
  );
}
