"use client";

import React from "react";
import { FadeUp, Counter } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

/* ⚠ PLACEHOLDER FIGURES
   Replace these with CONFAST's audited numbers before launch.
   `to` drives the count-up, `suffix` is appended verbatim. */
const stats = [
  { to: 250, suffix: "+", label: "Clients served", note: "Builders, contractors & architects" },
  { to: 180, suffix: "K", label: "KG delivered / month", note: "Across the full product range" },
  { to: 45, suffix: "", label: "Employees", note: "Chemists, engineers & field staff" },
  { to: 60, suffix: "+", label: "Dealers & distributors", note: "Pan-India channel network" },
  { to: 100, suffix: "+", label: "Projects supported", note: "Specification to handover" },
  { to: 5, suffix: "+", label: "States covered", note: "And expanding each year" },
];

export function StatsSection() {
  return (
    <section id="numbers" className="bg-white">
      <div className="band shell">
        <SectionHead
          align="center"
          eyebrow="By the Numbers"
          title="Scale you can"
          accent="build on."
          lede="Consistent monthly output, a growing dealer network and a technical team that scales with your project."
        />

        {/* grid */}
        <FadeUp
          stagger={0.08}
          className="head-gap grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stats.map((s) => (
            <div key={s.label} className="card-apple group p-8 lg:p-10">
              <Counter
                to={s.to}
                suffix={s.suffix}
                className="numeral display block text-[3rem] leading-none text-[#F39100] sm:text-[3.75rem]"
              />

              <p className="display display-sm mt-6 text-[#1A1A18]">{s.label}</p>
              <p className="body-sm mt-2 text-muted">{s.note}</p>
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
