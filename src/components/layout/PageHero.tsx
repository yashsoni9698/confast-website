import React from "react";
import Link from "next/link";
import { Reveal, FadeUp } from "@/components/ui/Reveal";

/* ────────────────────────────────────────────
   PageHero — the masthead shared by every
   inner page. Ink surface, blueprint texture,
   breadcrumb, masked display heading.
──────────────────────────────────────────── */
export function PageHero({
  eyebrow,
  title,
  accent,
  lede,
  crumbs = [],
  align = "left",
}: {
  eyebrow: string;
  title: string;
  /** Second line, rendered in brand orange */
  accent?: string;
  lede?: string;
  crumbs?: { label: string; href?: string }[];
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <section className="relative overflow-hidden bg-[#101010] pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-28">
      <div className="blueprint-invert absolute inset-0 opacity-50" />

      {/* corner wash */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(243,145,0,0.16) 0%, transparent 68%)",
        }}
      />

      <div className="shell relative">
        {/* breadcrumb */}
        {crumbs.length > 0 && (
          <FadeUp y={14}>
            <nav
              aria-label="Breadcrumb"
              className={
                centered
                  ? "flex flex-wrap items-center justify-center gap-2.5"
                  : "flex flex-wrap items-center gap-2.5"
              }
            >
              {crumbs.map((c, i) => (
                <React.Fragment key={c.label}>
                  {i > 0 && <span className="text-white/60">/</span>}
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="eyebrow text-white/65 transition-colors hover:text-[#F39100]"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className="eyebrow text-white/80">{c.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </FadeUp>
        )}

        <div className={centered ? "mx-auto max-w-3xl text-center" : ""}>
          <FadeUp y={14} delay={0.05}>
            <div
              className={
                centered
                  ? "mt-10 flex items-center justify-center gap-3"
                  : "mt-10 flex items-center gap-3"
              }
            >
              <span className="tick" />
              <p className="eyebrow text-white/70">{eyebrow}</p>
            </div>
          </FadeUp>

          <h1 className="display display-lg mt-6 text-white">
            <Reveal>{title}</Reveal>
            {accent && (
              <Reveal delay={0.08}>
                <span className="text-[#F39100]">{accent}</span>
              </Reveal>
            )}
          </h1>

          {lede && (
            <FadeUp delay={0.16}>
              <p
                className={
                  centered
                    ? "lede mx-auto mt-8 max-w-2xl text-white/75"
                    : "lede mt-8 max-w-2xl text-white/75"
                }
              >
                {lede}
              </p>
            </FadeUp>
          )}
        </div>
      </div>
    </section>
  );
}
