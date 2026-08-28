"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal, FadeUp } from "@/components/ui/Reveal";
import { getLenis } from "@/lib/lenis";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const products = productsData as Product[];

/* Screens tall enough to hold a full product presentation get one viewport
   of scroll per product, plus a dwell either side of each transition. */
const VH_PER_PRODUCT = 90;
const HOLD = 0.55;
const CROSS = 0.45;

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Short label for the timeline rail — "TileSet 44", "Epoxy 77" … */
function shortName(name: string) {
  return name.replace("Confast ", "");
}

/** Three facts a specifier scans for, pulled straight from the product data. */
function facts(product: Product) {
  const classification = product.technicalSpecs.find(
    (s) => s.parameter === "Classification" || s.parameter === "Type"
  );
  return [
    classification ? classification.value : product.type,
    product.coverage,
    product.packSize.join(" · "),
  ];
}

export function ProductStory() {
  const [active, setActive] = useState(0);

  /* The pinned presentation is an enhancement: it only switches on for wide
     viewports where motion is welcome. Everything else — small screens, no
     JS, prefers-reduced-motion — keeps the plain stacked layout, which is
     fully readable on its own. */
  const pinned = useMediaQuery(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  /* ── Pinned, scrub-driven presentation ── */
  useIsoLayoutEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", stage);
    if (!panels.length) return;

    const ctx = gsap.context(() => {
      if (!pinned) {
        /* Stacked reading order — a soft entrance per panel, nothing more. */
        panels.forEach((panel) => {
          gsap.fromTo(
            panel.querySelectorAll("[data-line], [data-media]"),
            { y: 26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              stagger: 0.06,
              ease: "expo.out",
              scrollTrigger: { trigger: panel, start: "top 82%", once: true },
            }
          );
        });
        return;
      }

      /* Resting states */
      panels.forEach((panel, i) => {
        const media = panel.querySelector("[data-media]");
        const lines = panel.querySelectorAll("[data-line]");
        if (i === 0) {
          gsap.set(panel, { autoAlpha: 1 });
          gsap.set(media, { xPercent: 0, scale: 1 });
          gsap.set(lines, { y: 0, autoAlpha: 1 });
        } else {
          gsap.set(panel, { autoAlpha: 0 });
          gsap.set(media, { xPercent: 16, scale: 0.9 });
          gsap.set(lines, { y: 26, autoAlpha: 0 });
        }
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
        },
      });

      for (let i = 1; i < panels.length; i++) {
        const prev = panels[i - 1];
        const cur = panels[i];

        tl.to({}, { duration: HOLD });
        const at = tl.duration();

        tl.to(prev, { autoAlpha: 0, duration: CROSS * 0.55 }, at)
          .to(
            prev.querySelector("[data-media]"),
            { xPercent: -16, scale: 0.9, duration: CROSS },
            at
          )
          .to(
            prev.querySelectorAll("[data-line]"),
            { y: -20, autoAlpha: 0, duration: CROSS * 0.5, stagger: 0.03 },
            at
          )
          .to(cur, { autoAlpha: 1, duration: CROSS * 0.55 }, at + CROSS * 0.22)
          .to(
            cur.querySelector("[data-media]"),
            { xPercent: 0, scale: 1, duration: CROSS, ease: "power3.out" },
            at + CROSS * 0.18
          )
          .to(
            cur.querySelectorAll("[data-line]"),
            {
              y: 0,
              autoAlpha: 1,
              duration: CROSS * 0.6,
              stagger: 0.05,
              ease: "power3.out",
            },
            at + CROSS * 0.3
          );
      }
      tl.to({}, { duration: HOLD });

      ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const next = Math.round(self.progress * (panels.length - 1));
          setActive((prev) => (prev === next ? prev : next));
        },
      });
    }, track);

    return () => ctx.revert();
  }, [pinned]);

  /* Jumping to a product on the rail scrolls to its segment of the track */
  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track || !pinned) return;
    const distance = track.offsetHeight - window.innerHeight;
    const target =
      track.offsetTop + (distance * index) / Math.max(products.length - 1, 1);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section id="products" className="clip-x relative bg-[#0E0E0D] text-white">
      <div className="blueprint-invert absolute inset-0 opacity-40" />

      {/* ═══════ intro ═══════ */}
      <div className="shell relative pt-24 pb-4 sm:pt-32 lg:pt-40 lg:pb-10">
        <div className="max-w-3xl">
          <FadeUp y={12}>
            <div className="flex items-center gap-3">
              <span className="tick" />
              <p className="eyebrow text-[#F39100]">Product Range</p>
            </div>
          </FadeUp>

          <h2 className="display display-lg mt-6 max-w-[24ch] text-white">
            <Reveal>
              <span>
                Seven systems.
                <span className="text-[#F39100]"> One standard.</span>
              </span>
            </Reveal>
          </h2>

          <FadeUp delay={0.1}>
            <p className="lede mt-6 max-w-xl text-muted-invert">
              Polymer-modified, batch-tested and published with a full technical
              data sheet. Scroll through the range, one system at a time.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ═══════ scroll track ═══════ */}
      <div
        ref={trackRef}
        className="relative"
        style={pinned ? { height: `${products.length * VH_PER_PRODUCT}vh` } : undefined}
      >
        <div
          ref={stageRef}
          className={cn(
            "relative",
            pinned && "sticky top-0 flex h-screen items-center overflow-hidden"
          )}
        >
          <div className={cn("relative w-full", pinned && "h-full")}>
            {products.map((product, i) => (
              <article
                key={product.id}
                data-panel
                aria-hidden={pinned && i !== active ? true : undefined}
                className={cn(
                  "shell",
                  pinned
                    ? "absolute inset-0 flex items-center"
                    : "border-t border-white/10 py-16 first:border-t-0 sm:py-20"
                )}
              >
                <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16 xl:gap-24">
                  {/* ── pack shot ── */}
                  <div
                    data-media
                    className="order-1 will-change-transform lg:order-2"
                  >
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-[1.75rem] bg-[#F7F6F3] sm:aspect-square lg:aspect-[4/5]">
                      <Image
                        src={product.heroImage || product.image}
                        alt={`${shortName(product.name)} — ${product.tagline}`}
                        fill
                        sizes="(max-width: 1024px) 90vw, 44vw"
                        priority={i === 0}
                        loading={i === 0 ? undefined : "lazy"}
                        className="object-contain p-10 sm:p-14 lg:p-16"
                      />
                      {product.badge && (
                        <span className="badge-orange absolute left-5 top-5">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ── copy ── */}
                  <div className="order-2 lg:order-1">
                    <p
                      data-line
                      className="eyebrow text-[#F39100]"
                    >
                      {String(i + 1).padStart(2, "0")} — {product.category}
                    </p>

                    <h3
                      data-line
                      className="display display-lg mt-5 text-white"
                    >
                      {shortName(product.name)}
                    </h3>

                    <p
                      data-line
                      className="display-sm mt-4 max-w-md text-[#F39100]"
                    >
                      {product.tagline}
                    </p>

                    <p
                      data-line
                      className="body-copy mt-6 max-w-lg text-muted-invert"
                    >
                      {product.shortDescription}
                    </p>

                    <dl
                      data-line
                      className="mt-9 grid max-w-lg gap-5 border-t border-white/12 pt-6 sm:grid-cols-3"
                    >
                      {[
                        { label: "Standard", value: facts(product)[0] },
                        { label: "Coverage", value: facts(product)[1] },
                        { label: "Pack", value: facts(product)[2] },
                      ].map((f) => (
                        <div key={f.label}>
                          <dt className="eyebrow text-dim-invert">{f.label}</dt>
                          <dd className="body-sm mt-2 text-white">{f.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div data-line className="mt-10 flex flex-wrap gap-3">
                      <Link
                        href={`/products/${product.id}`}
                        className="btn btn-orange"
                      >
                        View specifications
                      </Link>
                      <Link href="/quote" className="btn btn-line-invert">
                        Request a quote
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ── timeline rail (pinned view only) ── */}
          {pinned && (
            <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10">
              <div className="shell pointer-events-auto">
                <div className="flex items-end justify-between gap-8">
                  <p className="numeral eyebrow text-dim-invert">
                    <span className="text-[#F39100]">
                      {String(active + 1).padStart(2, "0")}
                    </span>
                    <span className="mx-1.5 opacity-50">/</span>
                    {String(products.length).padStart(2, "0")}
                  </p>

                  <nav
                    aria-label="Product range timeline"
                    className="flex flex-1 items-end justify-end gap-1.5"
                  >
                    {products.map((p, i) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={i === active ? "true" : undefined}
                        className="group flex flex-col items-start gap-2.5 px-1 pt-3"
                      >
                        <span
                          className={cn(
                            "caption hidden whitespace-nowrap transition-colors duration-500 xl:block",
                            i === active
                              ? "text-white"
                              : "text-dim-invert group-hover:text-white"
                          )}
                        >
                          {shortName(p.name)}
                        </span>
                        <span
                          className={cn(
                            "block h-[2px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            i === active
                              ? "w-16 bg-[#F39100]"
                              : "w-8 bg-white/25 group-hover:bg-white/60"
                          )}
                        />
                        <span className="sr-only">
                          Go to {shortName(p.name)}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══════ closing action ═══════ */}
      <div className="shell relative pb-24 pt-14 sm:pb-32 lg:pb-40">
        <div className="hairline-invert" />
        <FadeUp
          delay={0.05}
          className="mt-10 flex flex-wrap items-center justify-between gap-6"
        >
          <p className="body-copy max-w-md text-muted-invert">
            Every product ships with a technical data sheet, coverage figures and
            application guidance.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-line-invert">
              Compare the full range
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
