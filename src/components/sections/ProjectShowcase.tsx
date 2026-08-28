"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* 20+ project photos for the slider */
const photos = [
  { id: 1, src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80&fit=crop", alt: "Construction site with steel reinforcement" },
  { id: 2, src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&fit=crop", alt: "High-rise building under construction" },
  { id: 3, src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&fit=crop", alt: "Modern architecture project" },
  { id: 4, src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80&fit=crop", alt: "Interior design project" },
  { id: 5, src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80&fit=crop", alt: "Commercial office space" },
  { id: 6, src: "https://images.unsplash.com/photo-1590650046871-92c887180603?w=800&q=80&fit=crop", alt: "Tile flooring installation" },
  { id: 7, src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80&fit=crop", alt: "Swimming pool construction" },
  { id: 8, src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fit=crop", alt: "Glass facade building" },
  { id: 9, src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fit=crop", alt: "Residential apartment complex" },
  { id: 10, src: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fit=crop", alt: "Hospital building exterior" },
  { id: 11, src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80&fit=crop", alt: "Industrial warehouse construction" },
  { id: 12, src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80&fit=crop", alt: "Modern office interior" },
  { id: 13, src: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&q=80&fit=crop", alt: "Conference room design" },
  { id: 14, src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop", alt: "Luxury villa exterior" },
  { id: 15, src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fit=crop", alt: "Modern home interior" },
  { id: 16, src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&fit=crop", alt: "Contemporary architecture" },
  { id: 17, src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fit=crop", alt: "Waterfront property" },
  { id: 18, src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fit=crop", alt: "Patio and outdoor space" },
  { id: 19, src: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80&fit=crop", alt: "Kitchen renovation" },
  { id: 20, src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fit=crop", alt: "Bathroom tiling project" },
  { id: 21, src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fit=crop", alt: "Living room interior" },
  { id: 22, src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fit=crop", alt: "Exterior facade work" },
];

/* Slider position calculation (circular) */
function getSliderStyle(index: number, current: number, total: number) {
  let diff = index - current;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;

  if (Math.abs(diff) > 2) {
    const side = diff > 0 ? 1 : -1;
    return { x: side * 750, scale: 0.5, rotate: side * 12, opacity: 0, zIndex: 0 };
  }

  const configs: Record<number, { x: number; scale: number; rotate: number; opacity: number; zIndex: number }> = {
    [-2]: { x: -520, scale: 0.7, rotate: -8, opacity: 0.6, zIndex: 1 },
    [-1]: { x: -280, scale: 0.85, rotate: -4, opacity: 0.85, zIndex: 2 },
    [0]: { x: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 3 },
    [1]: { x: 280, scale: 0.85, rotate: 4, opacity: 0.85, zIndex: 2 },
    [2]: { x: 520, scale: 0.7, rotate: 8, opacity: 0.6, zIndex: 1 },
  };

  return configs[diff];
}

/* Grid position calculation — x,y from center */
function getGridPosition(index: number, cols: number, cellW: number, cellH: number, gap: number, totalItems: number) {
  const rows = Math.ceil(totalItems / cols);
  const row = Math.floor(index / cols);
  const col = index % cols;

  /* Items in last row might be fewer — center them */
  const itemsInRow = row === rows - 1 ? totalItems - row * cols : cols;
  const rowW = itemsInRow * cellW + (itemsInRow - 1) * gap;
  const gridH = rows * cellH + (rows - 1) * gap;

  const colInRow = row === rows - 1 ? index - row * cols : col;
  const x = colInRow * (cellW + gap) - rowW / 2 + cellW / 2;
  const y = row * (cellH + gap) - gridH / 2 + cellH / 2;

  return { x, y };
}

export function ProjectShowcase() {
  const [current, setCurrent] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [cols, setCols] = useState(5);
  const [cellW, setCellW] = useState(220);
  const [gapSize, setGapSize] = useState(14);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      /* Mirror the .shell column: max-width 1200px minus the responsive
         side padding, so the grid fills the same centred column as every
         other section instead of its own width. */
      const pad = w >= 1024 ? 128 : w >= 768 ? 96 : w >= 480 ? 64 : 48;
      const containerW = Math.min(w, 1200) - pad;
      if (w < 640) {
        setCols(2);
        setGapSize(10);
        setCellW(Math.floor((containerW - 10) / 2));
      } else if (w < 1024) {
        setCols(3);
        setGapSize(12);
        setCellW(Math.floor((containerW - 24) / 3));
      } else {
        /* 5 columns on desktop */
        setCols(5);
        setGapSize(14);
        setCellW(Math.floor((containerW - 56) / 5));
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % photos.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + photos.length) % photos.length);
  }, []);

  const cellH = Math.round(cellW * 1.25);
  const gap = gapSize;

  const rows = Math.ceil(photos.length / cols);
  const gridTotalH = rows * cellH + (rows - 1) * gap;

  /* Slider card size */
  const sliderW = 520;
  const sliderH = 680;

  return (
    <section id="projects" className="relative overflow-hidden bg-[#F7F6F3]">
      {/* ── Blueprint grid background (same as Services) ── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
        <svg
          className="h-full w-full animate-[gridDrift_20s_linear_infinite]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <pattern
              id="projects-grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <line x1="80" y1="0" x2="80" y2="80" stroke="#1A1A18" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="0" y1="80" x2="80" y2="80" stroke="#1A1A18" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="76" y1="80" x2="80" y2="80" stroke="#1A1A18" strokeWidth="0.8" />
              <line x1="80" y1="76" x2="80" y2="80" stroke="#1A1A18" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="200%" height="200%" fill="url(#projects-grid)" />
        </svg>
      </div>

      {/* Animated orange pulse lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <span className="absolute top-[12%] left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-[#F39100]/20 to-transparent animate-[pulseH1_18s_ease-in-out_infinite]" />
        <span className="absolute top-[28%] right-0 h-[2px] w-[45%] bg-gradient-to-l from-transparent via-[#F39100]/25 to-transparent animate-[pulseH2_22s_ease-in-out_2s_infinite]" />
        <span className="absolute top-[50%] left-0 h-[2px] w-[55%] bg-gradient-to-r from-transparent via-[#F39100]/18 to-transparent animate-[pulseH1_20s_ease-in-out_5s_infinite]" />
        <span className="absolute top-[72%] right-0 h-[2px] w-[50%] bg-gradient-to-l from-transparent via-[#F39100]/22 to-transparent animate-[pulseH2_24s_ease-in-out_infinite]" />
        <span className="absolute top-[88%] left-0 h-[2px] w-[38%] bg-gradient-to-r from-transparent via-[#F39100]/20 to-transparent animate-[pulseH1_16s_ease-in-out_3s_infinite]" />

        <span className="absolute top-0 left-[15%] h-[50%] w-[2px] bg-gradient-to-b from-transparent via-[#F39100]/20 to-transparent animate-[pulseV1_20s_ease-in-out_1s_infinite]" />
        <span className="absolute bottom-0 left-[40%] h-[45%] w-[2px] bg-gradient-to-t from-transparent via-[#F39100]/18 to-transparent animate-[pulseV2_18s_ease-in-out_3s_infinite]" />
        <span className="absolute top-0 left-[65%] h-[48%] w-[2px] bg-gradient-to-b from-transparent via-[#F39100]/22 to-transparent animate-[pulseV1_23s_ease-in-out_6s_infinite]" />
        <span className="absolute bottom-0 left-[85%] h-[40%] w-[2px] bg-gradient-to-t from-transparent via-[#F39100]/20 to-transparent animate-[pulseV2_17s_ease-in-out_7s_infinite]" />
      </div>

      {/* Keyframes for background animation */}
      <style jsx>{`
        @keyframes gridDrift {
          from { transform: translate(0, 0); }
          to { transform: translate(-80px, -80px); }
        }
        /* % of the (overflow-hidden) container — see ServicesSection note.
           Using vw/vh here referenced the viewport incl. the scrollbar and
           produced a horizontal scroll that shifted centered content left. */
        @keyframes pulseH1 {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(250%); }
        }
        @keyframes pulseH2 {
          0%, 100% { transform: translateX(100%); }
          50% { transform: translateX(-250%); }
        }
        @keyframes pulseV1 {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(220%); }
        }
        @keyframes pulseV2 {
          0%, 100% { transform: translateY(100%); }
          50% { transform: translateY(-220%); }
        }
      `}</style>

      <div className="band shell relative">
        {/* ── Heading ── */}
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="What We've Built"
            title="Projects that"
            accent="prove the specification."
          />

          <FadeUp delay={0.12}>
            <button
              onClick={() => setShowAll((v) => !v)}
              className="btn btn-line"
            >
              {showAll ? "Slider View" : "View All"}
            </button>
          </FadeUp>
        </div>

        {/* ── Content area — single container, cards animate between states ── */}
        <div className="head-gap" ref={containerRef}>
          <motion.div
            className="relative mx-auto w-full"
            animate={{
              height: showAll ? gridTotalH + 80 : 780,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 28 }}
            style={{ overflow: showAll ? "visible" : "hidden" }}
          >
            {photos.map((photo, index) => {
              const sliderStyle = getSliderStyle(index, current, photos.length);
              const gridPos = getGridPosition(index, cols, cellW, cellH, gap, photos.length);

              return (
                <motion.div
                  key={photo.id}
                  className="absolute overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl cursor-pointer"
                  animate={
                    showAll
                      ? {
                          x: gridPos.x,
                          y: gridPos.y + gridTotalH / 2 + 40,
                          width: cellW,
                          height: cellH,
                          scale: 1,
                          rotate: 0,
                          opacity: 1,
                          zIndex: 1,
                          top: 0,
                          marginLeft: -(cellW / 2),
                          marginTop: 0,
                        }
                      : {
                          x: sliderStyle.x,
                          y: 0,
                          width: sliderW,
                          height: sliderH,
                          scale: sliderStyle.scale,
                          rotate: sliderStyle.rotate,
                          opacity: sliderStyle.opacity,
                          zIndex: sliderStyle.zIndex,
                          top: "50%",
                          marginLeft: -(sliderW / 2),
                          marginTop: -(sliderH / 2),
                        }
                  }
                  transition={
                    showAll
                      ? {
                          type: "spring",
                          stiffness: 120,
                          damping: 14,
                          mass: 1.2,
                          delay: index * 0.035,
                        }
                      : {
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                          mass: 1.1,
                          delay: (photos.length - index) * 0.025,
                        }
                  }
                  style={{
                    left: "50%",
                    transformOrigin: "center center",
                  }}
                  onClick={() => {
                    if (!showAll && index !== current) setCurrent(index);
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover pointer-events-none"
                  />
                  {showAll && (
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 hover:bg-black/20" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── Slider controls (only visible in slider mode) ── */}
          <motion.div
            animate={{ opacity: showAll ? 0 : 1, y: showAll ? 20 : 0 }}
            transition={{ duration: 0.3 }}
            className={showAll ? "pointer-events-none" : ""}
          >
            <div className="flex items-center justify-center gap-5 mt-6">
              <button
                onClick={goPrev}
                aria-label="Previous project"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-[#1A1A18]/20 bg-white text-[#1A1A18] transition-all hover:border-[#F39100] hover:text-[#F39100] hover:shadow-lg active:scale-90"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={goNext}
                aria-label="Next project"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-[#1A1A18]/20 bg-white text-[#1A1A18] transition-all hover:border-[#F39100] hover:text-[#F39100] hover:shadow-lg active:scale-90"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 mt-8">
              {photos.map((photo, i) => (
                <button
                  key={photo.id}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-[#F39100]"
                      : "w-2.5 bg-[#1A1A18]/20 hover:bg-[#1A1A18]/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
