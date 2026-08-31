"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────
   ProductGallery — Amazon-style layout: a vertical
   column of selectable thumbnails on the LEFT and a
   large active image on the RIGHT.

   At most 4 thumbnails are visible at once; when there
   are more, up/down arrows page the column. On small
   screens the thumbnails drop below the main image as a
   horizontal strip with left/right arrows.

   Client component: it holds the "which image is
   active" selection in state. Rendering it inside
   the server-rendered detail page keeps the rest
   of the page static.
──────────────────────────────────────────── */
export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  /* De-dupe while preserving order so a product whose main image also
     appears first in the gallery array doesn't render a repeat thumbnail. */
  const gallery = Array.from(new Set(images.filter(Boolean)));
  const [active, setActive] = useState(0);
  const vStripRef = useRef<HTMLDivElement>(null);
  const hStripRef = useRef<HTMLDivElement>(null);

  /* Show at most 4 thumbnails at once; when there are more, arrow
     buttons page the strip by roughly one screenful. */
  const hasOverflow = gallery.length > 4;

  const scrollStrip = (
    ref: React.RefObject<HTMLDivElement | null>,
    axis: "x" | "y",
    dir: 1 | -1
  ) => {
    const strip = ref.current;
    if (!strip) return;
    if (axis === "y") {
      strip.scrollBy({ top: dir * strip.clientHeight, behavior: "smooth" });
    } else {
      strip.scrollBy({ left: dir * strip.clientWidth, behavior: "smooth" });
    }
  };

  if (gallery.length === 0) return null;

  const activeSrc = gallery[Math.min(active, gallery.length - 1)];

  const thumb = (src: string, i: number, className: string) => (
    <button
      key={src}
      type="button"
      onClick={() => setActive(i)}
      aria-label={`View image ${i + 1} of ${gallery.length}`}
      aria-current={i === active}
      className={cn(
        "relative aspect-square shrink-0 overflow-hidden rounded-xl bg-[#F7F6F3] transition-all duration-300",
        className,
        i === active
          ? "ring-2 ring-[#F39100] ring-offset-2 ring-offset-[#101010]"
          : "opacity-60 hover:opacity-100"
      )}
    >
      <Image
        src={src}
        alt={`${alt} — thumbnail ${i + 1}`}
        fill
        sizes="(max-width: 1024px) 25vw, 8vw"
        className="object-contain p-2.5"
      />
    </button>
  );

  return (
    <div>
      {/* ══ Desktop / tablet: vertical thumbs left, main image right ══ */}
      <div className="hidden gap-4 sm:flex">
        {gallery.length > 1 && (
          <div className="relative flex w-24 shrink-0 flex-col lg:w-28">
            {/* Up arrow */}
            {hasOverflow && (
              <button
                type="button"
                onClick={() => scrollStrip(vStripRef, "y", -1)}
                aria-label="Previous thumbnails"
                className="mb-2 flex items-center justify-center rounded-full bg-white/90 py-1.5 text-[#101010] shadow ring-1 ring-black/5 transition hover:bg-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {/* Vertical scrollable strip — exactly 4 thumbnails tall */}
            <div
              ref={vStripRef}
              className={cn(
                "flex flex-col gap-3 overflow-y-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                // 4 square thumbs + 3 gaps of 0.75rem
                hasOverflow &&
                  "max-h-[calc(4*(6rem)+3*0.75rem)] lg:max-h-[calc(4*(7rem)+3*0.75rem)]"
              )}
            >
              {gallery.map((src, i) => thumb(src, i, "w-full"))}
            </div>

            {/* Down arrow */}
            {hasOverflow && (
              <button
                type="button"
                onClick={() => scrollStrip(vStripRef, "y", 1)}
                aria-label="Next thumbnails"
                className="mt-2 flex items-center justify-center rounded-full bg-white/90 py-1.5 text-[#101010] shadow ring-1 ring-black/5 transition hover:bg-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Active image */}
        <div className="relative aspect-[3/4] flex-1 overflow-hidden rounded-[1.75rem] bg-[#F7F6F3]">
          <Image
            key={activeSrc}
            src={activeSrc}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-contain p-10 sm:p-16"
          />
        </div>
      </div>

      {/* ══ Mobile: main image, then horizontal strip below ══ */}
      <div className="sm:hidden">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-[#F7F6F3]">
          <Image
            src={activeSrc}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-contain p-10"
          />
        </div>

        {gallery.length > 1 && (
          <div className="relative mt-4">
            <div
              ref={hStripRef}
              className="flex gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {gallery.map((src, i) =>
                thumb(src, i, "basis-[calc((100%-3*0.75rem)/4)]")
              )}
            </div>

            {hasOverflow && (
              <>
                <button
                  type="button"
                  onClick={() => scrollStrip(hStripRef, "x", -1)}
                  aria-label="Previous thumbnails"
                  className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#101010] shadow-md ring-1 ring-black/5 backdrop-blur transition hover:bg-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollStrip(hStripRef, "x", 1)}
                  aria-label="Next thumbnails"
                  className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#101010] shadow-md ring-1 ring-black/5 backdrop-blur transition hover:bg-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
