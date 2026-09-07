"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname, useRouter } from "next/navigation";
import { setLenis } from "@/lib/lenis";

/**
 * Lenis inertial scrolling, wired into GSAP's ticker so ScrollTrigger stays
 * in sync with the smoothed scroll position.
 *
 * Users who ask for reduced motion get native scrolling — Lenis is never
 * started for them, and the instance stays null so callers fall back to
 * plain scroll APIs.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  /* Set right before a cross-page hash navigation (e.g. clicking "Services"
     from "/about"); read by the effect below once the target page mounts. */
  const pendingHashRef = useRef<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const scrollToHash = (id: string) => {
      const target = document.querySelector(id);
      if (!target) return false;
      lenis.scrollTo(target as HTMLElement, { offset: -96 });
      return true;
    };

    /* Landing directly on a hash URL — a hard refresh on "/#services", a
       bookmark, or a link from outside the site — skips our click handler
       entirely. Animate to it the same way instead of leaving the browser's
       instant native jump. */
    if (window.location.hash) {
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToHash(window.location.hash)));
    }

    /* In-page anchors hand off to Lenis, offset for the sticky header.
       Nav links that need to work from every page (e.g. "/#services" in the
       header/footer) carry a path prefix before the hash.
       - Same page: scroll immediately through Lenis.
       - Different page: let Next.js route there (with its own instant
         scroll disabled) and animate once the target page has mounted,
         via the pathname effect below. */
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey) return;
      const anchor = (event.target as HTMLElement)?.closest?.('a[href*="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const id = href.slice(hashIndex);
      if (id === "#") return;
      const pathPart = href.slice(0, hashIndex) || window.location.pathname;

      event.preventDefault();

      if (pathPart === window.location.pathname) {
        scrollToHash(id);
        return;
      }

      pendingHashRef.current = id;
      router.push(href, { scroll: false });
    };
    /* Capture phase — Next.js's <Link> runs its own click handler (via
       React's bubble-phase delegation) and calls preventDefault() itself
       whenever it decides to handle the navigation. That happens before a
       bubble listener on `document` ever gets a turn, so a same-page hash
       link (e.g. clicking "Services" again while already on "/") got
       swallowed by Link and never reached this handler. Listening on the
       capture phase runs us first, every time, regardless of Link. */
    document.addEventListener("click", onClick, { capture: true });

    /* Fonts and lazy images change layout height — re-measure once settled */
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [router]);

  /* Fires after a cross-page hash navigation lands on its target page.
     The section may need a frame or two before it exists/settles into its
     final position, so retry across a few animation frames rather than
     assuming it's there on the first paint. */
  useEffect(() => {
    const id = pendingHashRef.current;
    if (!id) return;
    pendingHashRef.current = null;

    const lenis = lenisRef.current;
    let attempts = 0;
    let frame = 0;
    const tryScroll = () => {
      const target = document.querySelector(id);
      if (target) {
        if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -96 });
        else target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      attempts += 1;
      if (attempts < 30) frame = requestAnimationFrame(tryScroll);
    };
    frame = requestAnimationFrame(tryScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return <>{children}</>;
}
