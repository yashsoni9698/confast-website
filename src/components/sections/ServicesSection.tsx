"use client";

import React from "react";
import Link from "next/link";
import { FadeUp } from "@/components/ui/Reveal";
import {
  MessageSquare,
  MapPin,
  FileText,
  GraduationCap,
  Handshake,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    title: "Technical Consultation",
    icon: MessageSquare,
    body: "Product selection, system specification and substrate compatibility — documented as a written recommendation for your project file.",
  },
  {
    title: "Site Visit & Assessment",
    icon: MapPin,
    body: "Our representatives inspect substrate conditions on site and confirm the application method before work begins.",
  },
  {
    title: "Product Guidance & TDS",
    icon: FileText,
    body: "Technical and safety data sheets, coverage calculators and application guides for every product in the range.",
  },
  {
    title: "Contractor Training",
    icon: GraduationCap,
    body: "Hands-on workshops for tilers, applicators and site engineers, with certification for those who complete them.",
  },
  {
    title: "Dealer & Distributor Support",
    icon: Handshake,
    body: "Counter-staff training, marketing material and end-customer technical backup for channel partners across India.",
  },
  {
    title: "After-Sales Support",
    icon: ShieldCheck,
    body: "Dedicated post-application assistance including troubleshooting, warranty guidance and on-call technical support for every project.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#F9F8F5] py-14 sm:py-20 lg:py-28">
      {/* Blueprint grid background — thin dashed lines like architectural paper */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <svg
          className="h-full w-full animate-[gridDrift_20s_linear_infinite]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <pattern
              id="services-grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              {/* Vertical line */}
              <line
                x1="80" y1="0" x2="80" y2="80"
                stroke="#1A1A18"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
              {/* Horizontal line */}
              <line
                x1="0" y1="80" x2="80" y2="80"
                stroke="#1A1A18"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
              {/* Corner crosses */}
              <line x1="76" y1="80" x2="80" y2="80" stroke="#1A1A18" strokeWidth="0.8" />
              <line x1="80" y1="76" x2="80" y2="80" stroke="#1A1A18" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="200%" height="200%" fill="url(#services-grid)" />
        </svg>
      </div>

      {/* Keyframe for slow grid drift */}
      <style jsx>{`
        @keyframes gridDrift {
          from { transform: translate(0, 0); }
          to { transform: translate(-80px, -80px); }
        }
        /* Sweep values are expressed in % of the (overflow-hidden) container,
           never vw/vh. Referencing the viewport pulled these lines past the
           right edge by the scrollbar width on desktop browsers with a
           classic scrollbar, which forced a horizontal scroll and shifted
           every centered section left. */
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

      {/* Animated orange pulse lines — faint, uneven, passing through (hidden on mobile for performance) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden hidden sm:block" aria-hidden>
        {/* Horizontal lines */}
        <span className="absolute top-[8%] left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-[#F39100]/25 to-transparent animate-[pulseH1_18s_ease-in-out_infinite]" />
        <span className="absolute top-[18%] right-0 h-[2px] w-[45%] bg-gradient-to-l from-transparent via-[#F39100]/30 to-transparent animate-[pulseH2_22s_ease-in-out_2s_infinite]" />
        <span className="absolute top-[30%] left-0 h-[2px] w-[55%] bg-gradient-to-r from-transparent via-[#F39100]/22 to-transparent animate-[pulseH1_20s_ease-in-out_5s_infinite]" />
        <span className="absolute top-[42%] right-0 h-[2px] w-[50%] bg-gradient-to-l from-transparent via-[#F39100]/28 to-transparent animate-[pulseH2_24s_ease-in-out_infinite]" />
        <span className="absolute top-[55%] left-0 h-[2px] w-[38%] bg-gradient-to-r from-transparent via-[#F39100]/26 to-transparent animate-[pulseH1_16s_ease-in-out_3s_infinite]" />
        <span className="absolute top-[67%] right-0 h-[2px] w-[48%] bg-gradient-to-l from-transparent via-[#F39100]/24 to-transparent animate-[pulseH2_19s_ease-in-out_6s_infinite]" />
        <span className="absolute top-[78%] left-0 h-[2px] w-[42%] bg-gradient-to-r from-transparent via-[#F39100]/30 to-transparent animate-[pulseH1_21s_ease-in-out_8s_infinite]" />
        <span className="absolute top-[90%] right-0 h-[2px] w-[35%] bg-gradient-to-l from-transparent via-[#F39100]/22 to-transparent animate-[pulseH2_17s_ease-in-out_4s_infinite]" />

        {/* Vertical lines */}
        <span className="absolute top-0 left-[10%] h-[50%] w-[2px] bg-gradient-to-b from-transparent via-[#F39100]/26 to-transparent animate-[pulseV1_20s_ease-in-out_1s_infinite]" />
        <span className="absolute bottom-0 left-[25%] h-[45%] w-[2px] bg-gradient-to-t from-transparent via-[#F39100]/22 to-transparent animate-[pulseV2_18s_ease-in-out_3s_infinite]" />
        <span className="absolute top-0 left-[38%] h-[48%] w-[2px] bg-gradient-to-b from-transparent via-[#F39100]/28 to-transparent animate-[pulseV1_23s_ease-in-out_6s_infinite]" />
        <span className="absolute bottom-0 left-[52%] h-[42%] w-[2px] bg-gradient-to-t from-transparent via-[#F39100]/25 to-transparent animate-[pulseV2_19s_ease-in-out_2s_infinite]" />
        <span className="absolute top-0 left-[66%] h-[52%] w-[2px] bg-gradient-to-b from-transparent via-[#F39100]/30 to-transparent animate-[pulseV1_22s_ease-in-out_5s_infinite]" />
        <span className="absolute bottom-0 left-[80%] h-[40%] w-[2px] bg-gradient-to-t from-transparent via-[#F39100]/24 to-transparent animate-[pulseV2_17s_ease-in-out_7s_infinite]" />
        <span className="absolute top-0 left-[92%] h-[46%] w-[2px] bg-gradient-to-b from-transparent via-[#F39100]/26 to-transparent animate-[pulseV1_24s_ease-in-out_4s_infinite]" />
      </div>

      <div className="shell relative">
        {/* Section heading */}
        <div className="mb-10 text-center sm:mb-14">
          <p className="eyebrow text-[#F39100]">What We Offer</p>
          <h2 className="display display-lg mt-4 text-[#1A1A18]">Our Services</h2>
        </div>

        {/* 3-column grid */}
        <FadeUp stagger={0.08} className="grid gap-4 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group relative flex flex-col items-start overflow-hidden rounded-xl bg-white px-5 pb-7 pt-7 sm:px-8 sm:pb-9 sm:pt-10 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)] ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(243,145,0,0.12)] hover:ring-[#F39100]/30"
              >
                {/* Top accent bar — visible on hover */}
                <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#F39100] transition-transform duration-300 group-hover:scale-x-100" />

                {/* Icon */}
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F39100]/[0.08] transition-colors duration-300 group-hover:bg-[#F39100]">
                  <Icon
                    size={22}
                    strokeWidth={1.8}
                    className="text-[#F39100] transition-colors duration-300 group-hover:text-white"
                    aria-hidden
                  />
                </span>

                {/* Title */}
                <h3 className="mt-6 text-[1.05rem] font-semibold leading-snug text-[#1A1A18]">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-[0.84rem] leading-relaxed text-[#6B6B6B]">
                  {s.body}
                </p>
              </div>
            );
          })}
        </FadeUp>

        {/* CTA */}
        <FadeUp delay={0.15} className="mt-12 flex justify-center">
          <Link href="/services" className="btn btn-solid">
            All services
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
