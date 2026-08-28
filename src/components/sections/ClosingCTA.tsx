"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FadeUp, Reveal } from "@/components/ui/Reveal";

/* The closing band every major contractor site ends on: one photograph,
   one question, two clear paths — start a project, or join us. */
export function ClosingCTA() {
  return (
    <section className="relative overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=2200&q=85&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0B0B0A]/78" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0A]/85 via-[#0B0B0A]/55 to-[#0B0B0A]/80" />
      </div>

      <div className="band shell relative">
        <div className="max-w-3xl">
          <FadeUp y={12}>
            <p className="eyebrow text-[#F39100]">Ready to Work Together?</p>
          </FadeUp>

          <h2 className="display display-lg mt-4 max-w-[22ch] text-white">
            <Reveal>
              <span>
                Bring us in at specification stage — before the first bag opens.
              </span>
            </Reveal>
          </h2>

          <FadeUp delay={0.12}>
            <p className="lede mt-6 max-w-xl text-white/80">
              Consultation and site assessment cost nothing and prevent the
              expensive kind of surprise. Tell us what you are building.
            </p>
          </FadeUp>

          <FadeUp delay={0.18} className="mt-10 flex flex-wrap gap-3">
            <Link href="/quote" className="btn btn-orange">
              Start a project
            </Link>
            <Link href="/contact" className="btn btn-line-invert">
              Talk to a technical engineer
            </Link>
          </FadeUp>
        </div>

        {/* quick-contact strip */}
        <FadeUp
          delay={0.2}
          stagger={0.08}
          className="mt-16 grid gap-8 border-t border-white/20 pt-10 sm:grid-cols-2 sm:gap-px"
        >
          {[
            { label: "Technical desk", value: "+91 XXXX XXXXXX", href: "tel:+91XXXXXXXXXX" },
            {
              label: "Email",
              value: "info@confastchemicals.com",
              href: "mailto:info@confastchemicals.com",
            },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="group block sm:px-6 sm:first:pl-0"
            >
              <p className="eyebrow text-white/70">{c.label}</p>
              <p className="display display-sm mt-3 text-white transition-colors duration-500 group-hover:text-[#F39100]">
                {c.value}
              </p>
            </a>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
