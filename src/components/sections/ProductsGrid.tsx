"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const products = productsData as Product[];
const GAP = 24; // gap between cards in px
const VISIBLE_CARDS = 4;

export function ProductsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const sliderAreaRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile and calculate card width
  useEffect(() => {
    const calculateWidth = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile && sliderAreaRef.current) {
        const containerWidth = sliderAreaRef.current.offsetWidth;
        const totalGap = GAP * (VISIBLE_CARDS - 1);
        const width = (containerWidth - totalGap) / VISIBLE_CARDS;
        setCardWidth(Math.floor(width));
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, []);

  // GSAP horizontal scroll — desktop only
  useEffect(() => {
    if (isMobile || !cardWidth) return;

    const section = sectionRef.current;
    const pinEl = pinRef.current;
    const track = trackRef.current;
    if (!section || !pinEl || !track) return;

    const getScrollDistance = () => {
      return track.scrollWidth - (sliderAreaRef.current?.offsetWidth || window.innerWidth);
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          // Pin the INNER wrapper, not the outer <section>. When GSAP pins an
          // element it wraps it in a ".pin-spacer" <div> (this happens for
          // every pinType — pinType only controls fixed vs. transform
          // positioning, not the wrapping). If we pinned the <section>, that
          // reparenting would move the section out of the node React rendered
          // it into, so on route navigation React's removeChild would target
          // the wrong parent and throw "The node to be removed is not a child
          // of this node". Pinning an inner div keeps the pin-spacer inside
          // the <section>, which stays a stable child of React's tree.
          pin: pinEl,
          pinType: "transform",
          scrub: 1,
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      tl.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
      });
    }, section);

    return () => {
      // Revert synchronously so GSAP restores the DOM to its original
      // structure BEFORE React unmounts this subtree on navigation.
      ctx.revert();
    };
  }, [cardWidth, isMobile]);

  /* ── Mobile: vertical scrollable grid ── */
  if (isMobile) {
    return (
      <section id="products" className="bg-[#F0F0F0]">
        <div className="px-5 py-14 sm:px-8 md:px-12">
          {/* Header */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F39100]">
              Collection
            </p>
            <h2 className="mt-2 font-[family-name:var(--sf-display)] text-[1.75rem] font-bold leading-[1.1] tracking-[-0.025em] text-[#1A1A18]">
              Our products
            </h2>
          </div>

          {/* Mobile grid — 2 columns with horizontal scroll fallback on very small screens */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              >
                {/* Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#F7F6F3]">
                  {product.badge && (
                    <span className="absolute right-2 top-2 z-10 rounded-full bg-[#F39100] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-white">
                      {product.badge}
                    </span>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="50vw"
                    className="object-contain p-4"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col px-3 pb-3.5 pt-3">
                  <h3 className="text-[13px] font-semibold leading-snug tracking-[-0.01em] text-[#1A1A18]">
                    {product.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[10.5px] leading-[1.5] text-[#1A1A18]/50">
                    {product.tagline}
                  </p>
                  <div className="flex-1" />
                  <Link
                    href={`/products/${product.id}`}
                    className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-full bg-[#F39100] py-2 text-[11px] font-semibold text-white active:bg-[#EF7800]"
                  >
                    View More
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 7h12M8 2l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── Desktop: pinned horizontal scroll ── */
  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative bg-[#F0F0F0]"
    >
      <div ref={pinRef} className="relative h-screen overflow-hidden">
      <div className="flex h-full flex-col px-5 py-12 sm:px-8 sm:py-14 md:px-12 lg:px-16 xl:px-20">
        {/* ── Header ── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F39100]">
              Collection
            </p>
            <h2 className="mt-2 font-[family-name:var(--sf-display)] text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[#1A1A18]">
              Our products
            </h2>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-medium text-[#1A1A18]/40">
              Scroll to explore
            </span>
            <div className="h-[3px] w-24 overflow-hidden rounded-full bg-black/10">
              <div
                ref={progressRef}
                className="h-full rounded-full bg-[#F39100] transition-[width] duration-100 ease-out"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        </div>

        {/* ── Slider Area ── */}
        <div ref={sliderAreaRef} className="relative mt-8 flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="absolute inset-y-0 left-0 flex items-stretch"
            style={{ width: "max-content", gap: `${GAP}px` }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="group flex h-full flex-shrink-0 flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_12px_40px_rgba(243,145,0,0.12)]"
                style={{ width: cardWidth ? `${cardWidth}px` : "25%" }}
              >
                {/* Image Area */}
                <div className="relative mx-3.5 mt-3.5 flex-1 overflow-hidden rounded-[1.25rem] bg-[#F7F6F3]">
                  {product.badge && (
                    <span className="absolute right-3 top-3 z-10 rounded-full bg-[#F39100] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white">
                      {product.badge}
                    </span>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="25vw"
                    className="object-contain p-5 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="px-5 pb-5 pt-4">
                  <h3 className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-[#1A1A18]">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-[1.55] text-[#1A1A18]/50">
                    {product.tagline} — {product.coverage}
                  </p>
                  <Link
                    href={`/products/${product.id}`}
                    className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#F39100] py-2 text-[11.5px] font-semibold tracking-[0.01em] text-white transition-all duration-300 hover:bg-[#EF7800] hover:shadow-[0_4px_14px_rgba(243,145,0,0.35)]"
                  >
                    View More
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 7h12M8 2l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
