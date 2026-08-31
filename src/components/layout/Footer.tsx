import React from "react";
import Link from "next/link";
import { Wordmark } from "@/components/layout/Header";

const columns = [
  {
    title: "Products",
    links: [
      { label: "Block Fix", href: "/products/block-fix" },
      { label: "TileSet 11", href: "/products/tileset-11" },
      { label: "TileSet 22", href: "/products/tileset-22" },
      { label: "TileSet 33", href: "/products/tileset-33" },
      { label: "TileSet 44", href: "/products/tileset-44" },
      { label: "Epoxy 77", href: "/products/epoxy-77" },
      { label: "SBR Latex+", href: "/products/sbr-latex-plus" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Services", href: "/services" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact", href: "/contact" },
      { label: "Request Quote", href: "/quote" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#101010] text-white">
      <div className="blueprint-invert absolute inset-0 opacity-40" />

      <div className="shell relative">
        {/* top */}
        <div className="grid gap-10 border-b border-white/10 py-14 sm:gap-14 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-12 lg:py-24">
          <div>
            <Link href="/" aria-label="CONFAST home">
              <Wordmark tone="invert" />
            </Link>
            <p className="eyebrow mt-4 text-[#F39100]">Chemicals Pvt. Ltd.</p>
            <p className="mt-7 max-w-xs text-sm font-normal leading-relaxed text-white/70">
              Manufacturer of high-performance construction chemicals —
              engineered, batch-tested and supported on site across India.
            </p>

            <div className="mt-8 flex gap-5">
              {["Facebook", "Instagram", "LinkedIn", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="eyebrow text-white/65 transition-colors hover:text-[#F39100]"
                >
                  {s.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title}>
              <p className="eyebrow text-white/60">{col.title}</p>
              <ul className="mt-7 space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm font-normal text-white/75 transition-colors duration-300 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="eyebrow text-white/60">Get in touch</p>
            <div className="mt-7 space-y-5">
              <a
                href="tel:+917392949294"
                className="block text-lg font-normal transition-colors hover:text-[#F39100]"
              >
                +91 73 9294 9294
              </a>
              <a
                href="mailto:info@confastchemicals.com"
                className="block text-sm font-normal text-white/75 transition-colors hover:text-white"
              >
                info@confastchemicals.com
              </a>
              <p className="text-sm font-normal leading-relaxed text-white/65">
                Behind Ultratech RMC Plant,
                <br />
                Near Hindustan Spun Pipe, NH48,
                <br />
                Narsanda, Nadiad 387345
              </p>
              <p className="text-sm font-normal text-white/65">
                www.confastchemicals.com
              </p>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="eyebrow text-white/60">Business hours</p>
              <p className="mt-3 text-sm font-normal text-white/75">
                Mon – Sat · 9:00 – 18:00
                <br />
                Sun · Closed
              </p>
            </div>
          </div>
        </div>

        {/* oversized wordmark */}
        <div className="border-b border-white/10 py-8 sm:py-12 lg:py-16">
          <p className="display select-none text-[12vw] leading-[0.85] tracking-[-0.04em] text-white/[0.07] sm:text-[15vw]">
            CONFAST
          </p>
        </div>

        {/* bottom */}
        <div className="flex flex-col items-start justify-between gap-5 py-8 sm:flex-row sm:items-center">
          <p className="eyebrow text-white/60">
            © {new Date().getFullYear()} CONFAST Chemicals Pvt. Ltd.
          </p>
          <div className="flex flex-wrap items-center gap-7">
            <Link href="/privacy" className="eyebrow text-white/60 transition-colors hover:text-white/75">
              Privacy
            </Link>
            <Link href="/terms" className="eyebrow text-white/60 transition-colors hover:text-white/75">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="eyebrow text-white/60 transition-colors hover:text-white/75">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
