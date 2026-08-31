"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { lockScroll } from "@/lib/lenis";
import { Logo } from "@/components/ui/Logo";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const productLinks = [
  {
    label: "Block Fix",
    href: "/products/block-fix",
    image: "/images/products/block-fix.png",
    note: "Block mounting mortar",
  },
  {
    label: "TileSet 11",
    href: "/products/tileset-11",
    image: "/images/products/tileset-11.png",
    note: "Type 1 tile adhesive",
  },
  {
    label: "TileSet 22",
    href: "/products/tileset-22",
    image: "/images/products/tileset-22.png",
    note: "Type 2 tile adhesive",
  },
  {
    label: "TileSet 33",
    href: "/products/tileset-33",
    image: "/images/products/tileset-33.png",
    note: "Flexible tile adhesive",
  },
  {
    label: "TileSet 44",
    href: "/products/tileset-44",
    image: "/images/products/tileset-44.png",
    note: "S1 super-flex adhesive",
  },
  {
    label: "Epoxy 77",
    href: "/products/epoxy-77",
    image: "/images/products/epoxy-77.png",
    note: "Epoxy tile grout",
  },
  {
    label: "SBR Latex+",
    href: "/products/sbr-latex-plus",
    image: "/images/products/sbr-latex-plus.png",
    note: "Bonding & waterproofing",
  },
];

/* Kept as a named export — inner pages and the footer import Wordmark */
export function Wordmark({ tone = "ink" }: { tone?: "ink" | "invert" }) {
  return <Logo tone={tone} />;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const lastY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  /* Hide on scroll down, reveal on scroll up. Throttled to one read per
     frame so the listener never lands in the middle of a paint. */
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 420 && y > lastY.current + 4);
      lastY.current = y;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* Close the overlay whenever the route changes (covers browser back/forward).
     Adjusting state during render is the recommended pattern here — an effect
     would trigger a second render pass. */
  const [shownPath, setShownPath] = useState(pathname);
  if (shownPath !== pathname) {
    setShownPath(pathname);
    setOpen(false);
    setMega(false);
  }

  /* Freeze the page through Lenis while the overlay is open. Setting
     `body { overflow: hidden }` on its own does not stop Lenis, which is why
     the page used to keep scrolling behind the menu. */
  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  /* Escape closes whatever is open, and focus goes back where it came from */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (mega) setMega(false);
      if (open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, mega]);

  /* Overlay entrance */
  useEffect(() => {
    if (!open || !menuRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        menuRef.current!.querySelectorAll("[data-menu-item]"),
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, stagger: 0.05, ease: "expo.out", delay: 0.12 }
      );
      gsap.fromTo(
        menuRef.current!.querySelectorAll("[data-menu-aside]"),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.06, ease: "expo.out", delay: 0.32 }
      );
    }, menuRef);
    return () => ctx.revert();
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  /* The mega-menu was hover-only, so it was unreachable by keyboard.
     Focus entering the group opens it; focus leaving closes it. */
  const onMegaFocus = useCallback(() => setMega(true), []);
  const onMegaBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) setMega(false);
  }, []);

  /* Every page opens on a dark surface, so the transparent bar runs white
     and only flips to ink once the glass panel appears. */
  const invert = !scrolled && !open;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-[transform,background,padding,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled ? "glass py-3.5" : "bg-transparent py-6",
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="shell flex items-center gap-6">
          <Link
            href="/"
            aria-label="CONFAST home"
            className="relative z-10 -ml-6 sm:-ml-8 md:-ml-12 lg:-ml-16"
          >
            <Logo tone={invert ? "invert" : "ink"} />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="ml-auto hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const isProducts = item.href === "/products";
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`));

              return (
                <div
                  key={item.href}
                  ref={isProducts ? megaRef : undefined}
                  className={isProducts ? "relative" : undefined}
                  onMouseEnter={isProducts ? () => setMega(true) : undefined}
                  onMouseLeave={isProducts ? () => setMega(false) : undefined}
                  onFocus={isProducts ? onMegaFocus : undefined}
                  onBlur={isProducts ? onMegaBlur : undefined}
                >
                  <Link
                    href={item.href}
                    aria-expanded={isProducts ? mega : undefined}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "link-underline flex items-center gap-1.5 text-base tracking-[-0.012em] transition-colors duration-500",
                      isActive
                        ? "text-[#F39100]"
                        : invert
                          ? "text-white/85 hover:text-white"
                          : "text-muted hover:text-[#1A1A18]"
                    )}
                  >
                    {item.label}
                    {isProducts && (
                      <span
                        aria-hidden
                        className={cn(
                          "text-[0.6rem] transition-transform duration-500",
                          mega && "rotate-180"
                        )}
                      >
                        ▾
                      </span>
                    )}
                  </Link>

                  {/* ── products mega-menu ── */}
                  {isProducts && (
                    <div
                      className={cn(
                        "absolute top-full left-1/2 z-50 w-[min(90vw,44rem)] -translate-x-1/2 pt-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        mega
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-2 opacity-0"
                      )}
                    >
                      <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_28px_80px_rgba(26,26,24,0.2)]">
                        <div className="grid grid-cols-2 gap-1 p-4">
                          {productLinks.map((p) => (
                            <Link
                              key={p.href}
                              href={p.href}
                              tabIndex={mega ? undefined : -1}
                              onClick={() => setMega(false)}
                              className="group flex items-center gap-3.5 rounded-2xl p-2.5 transition-colors duration-300 hover:bg-[#F7F6F3]"
                            >
                              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#F2F1EE]">
                                <Image
                                  src={p.image}
                                  alt=""
                                  fill
                                  sizes="48px"
                                  className="object-contain p-1.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                                />
                              </span>
                              <span>
                                <span className="block text-base tracking-[-0.012em] text-[#1A1A18] transition-colors duration-300 group-hover:text-[#F39100]">
                                  {p.label}
                                </span>
                                <span className="caption block text-muted">
                                  {p.note}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>

                        <div className="flex items-center justify-between gap-4 border-t border-[#1A1A18]/10 bg-[#F7F6F3] px-6 py-4">
                          <p className="caption text-muted">
                            Technical data sheets for every product
                          </p>
                          <Link
                            href="/products"
                            tabIndex={mega ? undefined : -1}
                            onClick={() => setMega(false)}
                            className="action"
                          >
                            View all
                            <span aria-hidden className="action-chev">
                              &rsaquo;
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-8">
            {/* CTA — kept visible from tablet up instead of being buried in
                the menu on every screen below 1024px */}
            <Link
              href="/quote"
              className={cn(
                "hidden shrink-0 rounded-full px-5 py-2.5 text-base font-semibold tracking-[-0.012em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 sm:inline-flex",
                invert
                  ? "bg-white text-[#1A1A18] hover:bg-[#F39100] hover:text-white"
                  : "bg-[#1A1A18] text-white hover:bg-[#F39100]"
              )}
            >
              Get a quote
            </Link>

            {/* Menu toggle — mobile / tablet only */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-menu"
              className="relative z-[70] -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span
                className={cn(
                  "block h-[1.5px] w-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  open
                    ? "translate-y-[3.25px] rotate-45 bg-white"
                    : invert
                      ? "bg-white"
                      : "bg-[#1A1A18]"
                )}
              />
              <span
                className={cn(
                  "block h-[1.5px] w-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  open
                    ? "-translate-y-[3.25px] -rotate-45 bg-white"
                    : invert
                      ? "bg-white"
                      : "bg-[#1A1A18]"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════ INDEX OVERLAY ══════════
          `inert` keeps the closed overlay out of the tab order and off the
          accessibility tree. Previously every link inside it stayed focusable
          behind an invisible panel. */}
      <div
        id="site-menu"
        ref={menuRef}
        className={cn(
          "on-ink fixed inset-0 z-[60] bg-[#101010] transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        style={{
          clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
        }}
        inert={!open}
      >
        <div className="blueprint-invert absolute inset-0 opacity-60" />

        <div className="shell relative flex h-full flex-col justify-between overflow-y-auto pt-28 pb-10">
          <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
            {/* Primary index */}
            <nav aria-label="Site index">
              <p data-menu-aside className="eyebrow mb-8 text-dim-invert">
                Index
              </p>
              <ul>
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <Link
                      href={item.href}
                      onClick={close}
                      data-menu-item
                      className="group flex items-baseline gap-5 py-2.5 sm:py-3"
                    >
                      <span className="eyebrow w-6 text-[#F39100]/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "display text-[2rem] transition-colors duration-500 sm:text-[2.75rem] lg:text-[3.25rem]",
                          pathname === item.href
                            ? "text-[#F39100]"
                            : "text-white group-hover:text-[#F39100]"
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Product index + contact */}
            <div className="lg:pt-16">
              <p data-menu-aside className="eyebrow mb-6 text-dim-invert">
                Product Range
              </p>
              <ul data-menu-aside className="mb-12 grid grid-cols-2 gap-x-6 gap-y-3">
                {productLinks.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      onClick={close}
                      className="body-sm text-muted-invert transition-colors duration-300 hover:text-white"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p data-menu-aside className="eyebrow mb-5 text-dim-invert">
                Get in Touch
              </p>
              <div data-menu-aside className="space-y-3">
                <a
                  href="tel:+917392949294"
                  className="block text-lg text-white transition-colors hover:text-[#F39100]"
                >
                  +91 73 9294 9294
                </a>
                <a
                  href="mailto:info@confastchemicals.com"
                  className="body-sm block text-muted-invert transition-colors hover:text-white"
                >
                  info@confastchemicals.com
                </a>
                <Link
                  href="/quote"
                  onClick={close}
                  className="btn btn-orange mt-4 w-full sm:w-auto"
                >
                  Get a quote
                </Link>
              </div>
            </div>
          </div>

          <div data-menu-aside className="pt-10">
            <div className="hairline-invert mb-6" />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="eyebrow text-dim-invert">
                Manufacturer of Construction Chemicals
              </p>
              <div className="flex items-center gap-6">
                {["Facebook", "Instagram", "LinkedIn"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    aria-label={s}
                    className="eyebrow text-dim-invert transition-colors hover:text-[#F39100]"
                  >
                    {s.slice(0, 2)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
