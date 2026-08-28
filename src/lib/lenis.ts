import type Lenis from "lenis";

/**
 * Single shared reference to the Lenis instance created by <SmoothScroll>.
 *
 * Anything that needs to move or freeze the page (nav overlay, back-to-top,
 * in-page anchors) has to go through Lenis. Calling `window.scrollTo` or
 * setting `body { overflow: hidden }` while Lenis is running fights it and
 * produces the stutter/scroll-behind bugs the audit picked up.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis(): Lenis | null {
  return instance;
}

/** Freeze / unfreeze page scrolling. Falls back to the body when Lenis is off. */
export function lockScroll(locked: boolean) {
  const lenis = getLenis();
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.classList.toggle("lenis-stopped", locked);
  document.body.style.overflow = lenis ? "" : locked ? "hidden" : "";
}

/** Scroll to the top of the page through Lenis when it is available. */
export function scrollToTop() {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.1 });
    return;
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
}
