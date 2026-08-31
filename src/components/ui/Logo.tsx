import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import logoWhite from "@/../public/images/brand/logoWhite.png";

/* ────────────────────────────────────────────
   LogoMark — the standalone CONFAST logo image.
   Uses logoWhite everywhere for now. The static
   import supplies the intrinsic width/height, so
   setting a height in CSS (with w-auto) keeps the
   aspect ratio correct and avoids layout shift.
──────────────────────────────────────────── */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src={logoWhite}
      alt="CONFAST"
      priority
      sizes="(max-width: 640px) 160px, 220px"
      className={cn("w-auto", className)}
    />
  );
}

/* ────────────────────────────────────────────
   Logo — brand lockup. Renders the logoWhite
   image at the requested size. The `tone` prop
   is accepted for API compatibility but both
   tones currently use the white logo.
──────────────────────────────────────────── */
export function Logo({
  size = "sm",
  className,
}: {
  tone?: "ink" | "invert";
  size?: "sm" | "lg";
  className?: string;
}) {
  const lg = size === "lg";

  return (
    <span className={cn("flex items-center leading-none", className)}>
      <LogoMark
        className={
          lg
            ? "h-[6.75rem] sm:h-[8.25rem]"
            : "h-[4.875rem] sm:h-[5.46rem]"
        }
      />
    </span>
  );
}
