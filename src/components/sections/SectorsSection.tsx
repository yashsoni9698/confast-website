"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FadeUp } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/utils";

/* Photo-led sector explorer — the pattern major contractors use to let a
   visitor self-identify ("I'm building a hospital") before reading anything.
   Placeholder photography from Unsplash; swap for CONFAST site photography
   once the graphic designer supplies it. */
type Sector = {
  id: string;
  label: string;
  heading: string;
  body: string;
  image: string;
  products: { label: string; href: string }[];
  facts: { label: string; value: string }[];
};

const sectors: Sector[] = [
  {
    id: "residential",
    label: "Residential",
    heading: "Homes that hold up to daily life",
    body: "Bathrooms, kitchens and balconies take the hardest wear in any home. Our adhesives and grouts are specified for wet areas and thermal movement, so joints stay sound long after handover.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80&fit=crop",
    products: [
      { label: "TileSet 22", href: "/products/tileset-22" },
      { label: "Block Fix", href: "/products/block-fix" },
      { label: "SBR Latex+", href: "/products/sbr-latex-plus" },
    ],
    facts: [
      { label: "Typical scope", value: "Masonry, wet areas, façades" },
      { label: "Key requirement", value: "Water resistance & flexibility" },
    ],
  },
  {
    id: "commercial",
    label: "Commercial",
    heading: "Lobbies and floors under constant traffic",
    body: "Offices and retail demand large-format tile over long, uninterrupted floor plates. We specify for deflection, footfall and the tight programme that commercial fit-outs run to.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80&fit=crop",
    products: [
      { label: "TileSet 33", href: "/products/tileset-33" },
      { label: "TileSet 44", href: "/products/tileset-44" },
      { label: "Epoxy 77", href: "/products/epoxy-77" },
    ],
    facts: [
      { label: "Typical scope", value: "Lobbies, corridors, retail floors" },
      { label: "Key requirement", value: "High footfall durability" },
    ],
  },
  {
    id: "hospitality",
    label: "Hospitality",
    heading: "Finishes guests judge on sight",
    body: "Hotels and resorts combine premium finishes with permanently wet zones — pools, spas and bathrooms. Colour-stable epoxy joints keep those surfaces looking new under chemical exposure.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80&fit=crop",
    products: [
      { label: "Epoxy 77", href: "/products/epoxy-77" },
      { label: "TileSet 44", href: "/products/tileset-44" },
      { label: "SBR Latex+", href: "/products/sbr-latex-plus" },
    ],
    facts: [
      { label: "Typical scope", value: "Pools, spas, guest bathrooms" },
      { label: "Key requirement", value: "Chemical & stain resistance" },
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    heading: "Surfaces that can be cleaned to standard",
    body: "Operating theatres, ICUs and sterile corridors need joints with no porosity to harbour bacteria. Epoxy grouting delivers a washable, non-absorbent surface that survives repeated disinfection.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80&fit=crop",
    products: [
      { label: "Epoxy 77", href: "/products/epoxy-77" },
      { label: "TileSet 44", href: "/products/tileset-44" },
    ],
    facts: [
      { label: "Typical scope", value: "Theatres, ICUs, sterile zones" },
      { label: "Key requirement", value: "Hygienic, non-porous joints" },
    ],
  },
  {
    id: "industrial",
    label: "Industrial",
    heading: "Floors exposed to process chemicals",
    body: "Manufacturing and pharmaceutical plants put flooring under thermal cycling and chemical attack. We specify systems rated for the actual exposure, not the general case.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80&fit=crop",
    products: [
      { label: "Epoxy 77", href: "/products/epoxy-77" },
      { label: "TileSet 33", href: "/products/tileset-33" },
    ],
    facts: [
      { label: "Typical scope", value: "Process floors, plant rooms" },
      { label: "Key requirement", value: "Chemical & thermal resistance" },
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    heading: "Repair and bonding at civil scale",
    body: "Bridges, metro works and civic structures need reliable bonding of new concrete to old, plus waterproofing that stays serviceable for decades under load and weather.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80&fit=crop",
    products: [
      { label: "SBR Latex+", href: "/products/sbr-latex-plus" },
      { label: "Block Fix", href: "/products/block-fix" },
    ],
    facts: [
      { label: "Typical scope", value: "Structural repair, waterproofing" },
      { label: "Key requirement", value: "Long-term bond & durability" },
    ],
  },
];

export function SectorsSection() {
  const [active, setActive] = useState(0);
  const tablistRef = useRef<HTMLDivElement>(null);
  const sector = sectors[active];

  /* A `role="tablist"` has to answer arrow keys, Home and End — without that
     the ARIA roles promise keyboard behaviour the component does not have. */
  const onTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    let next = active;
    if (event.key === "ArrowRight") next = (active + 1) % sectors.length;
    if (event.key === "ArrowLeft") next = (active - 1 + sectors.length) % sectors.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = sectors.length - 1;

    setActive(next);
    const tabs = tablistRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[next]?.focus();
  };

  return (
    <section id="sectors" className="bg-white">
      <div className="band shell">
        <SectionHead
          eyebrow="Where It's Used"
          title="Specified across"
          accent="every sector we serve."
          lede="Different buildings fail in different ways. Choose a sector to see what we specify there and why."
        />

        {/* ── sector tabs ──
            The right-edge fade is the only cue that the row scrolls on a
            phone, since the scrollbar is hidden. */}
        <FadeUp
          delay={0.1}
          className="relative mt-12 after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-12 after:bg-gradient-to-l after:from-white after:to-transparent lg:after:hidden"
        >
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Sectors"
            onKeyDown={onTabKeyDown}
            className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {sectors.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                id={`sector-tab-${s.id}`}
                aria-selected={i === active}
                aria-controls={`sector-panel-${s.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "shrink-0 rounded-full border px-5 py-2.5 text-base transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  i === active
                    ? "border-[#1A1A18] bg-[#1A1A18] text-white"
                    : "border-[#1A1A18]/15 text-muted hover:border-[#1A1A18]/40 hover:text-[#1A1A18]"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* ── active panel ── */}
        <div
          role="tabpanel"
          id={`sector-panel-${sector.id}`}
          aria-labelledby={`sector-tab-${sector.id}`}
          className="mt-8 grid overflow-hidden rounded-[1.25rem] bg-[#F7F6F3] lg:mt-10 lg:grid-cols-2 lg:rounded-[1.5rem]"
        >
          {/* photo */}
          <div className="relative aspect-[16/11] w-full overflow-hidden lg:aspect-auto lg:min-h-[30rem]">
            {sectors.map((s, i) => (
              <Image
                key={s.id}
                src={s.image}
                alt={s.heading}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={i === 0}
                className={cn(
                  "object-cover transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  i === active ? "opacity-100" : "opacity-0"
                )}
              />
            ))}

            <span className="absolute left-5 top-5 rounded-full bg-[#1A1A18]/80 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="eyebrow text-white">{sector.label}</span>
            </span>
          </div>

          {/* copy */}
          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
            <h3 className="display display-md text-[#1A1A18]">{sector.heading}</h3>

            <p className="body-copy mt-5 max-w-lg text-muted">{sector.body}</p>

            {/* facts */}
            <dl className="mt-9 grid gap-6 sm:grid-cols-2">
              {sector.facts.map((f) => (
                <div key={f.label} className="border-t border-[#1A1A18]/12 pt-4">
                  <dt className="eyebrow text-muted">{f.label}</dt>
                  <dd className="body-sm mt-2 text-[#1A1A18]">{f.value}</dd>
                </div>
              ))}
            </dl>

            {/* products used */}
            <div className="mt-9">
              <p className="eyebrow text-muted">Products specified</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {sector.products.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="rounded-full border border-[#1A1A18]/15 px-4 py-2 text-sm text-[#1A1A18] transition-colors duration-400 hover:border-[#F39100] hover:bg-[#F39100] hover:text-white"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/projects"
              className="action mt-10 w-fit"
            >
              See {sector.label.toLowerCase()} projects
              <span aria-hidden className="action-chev">
                &rsaquo;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
