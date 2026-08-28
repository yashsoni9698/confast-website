"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Seamless marquee. The track holds two identical runs and shifts by -50%,
 * so the loop is invisible.
 */
export function Marquee({
  items,
  tone = "ink",
  slow = false,
  className,
}: {
  items: string[];
  tone?: "ink" | "invert" | "orange";
  slow?: boolean;
  className?: string;
}) {
  const run = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span
            className={cn(
              "display whitespace-nowrap px-6 text-[1.6rem] sm:px-9 sm:text-[2.4rem] lg:text-[3rem]",
              tone === "invert" && "text-white/85",
              tone === "ink" && "text-[#1A1A18]",
              tone === "orange" && "text-white"
            )}
          >
            {item}
          </span>
          <span
            className={cn(
              "h-1.5 w-1.5 shrink-0 rounded-full",
              tone === "orange" ? "bg-white/50" : "bg-[#F39100]"
            )}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative flex overflow-hidden py-6 sm:py-8",
        tone === "orange" && "bg-[#F39100]",
        className
      )}
      aria-hidden
    >
      <div className={cn("flex w-max", slow ? "drift-slow" : "drift")}>
        {run}
        {run}
      </div>
    </div>
  );
}
