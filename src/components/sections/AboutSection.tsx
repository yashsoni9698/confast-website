"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FadeUp, WordFade, Parallax } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

const pillars = [
  {
    n: "01",
    title: "Formulated, not blended",
    body: "Polymer-modified systems developed in-house and batch-tested against IS 15477 and EN 12004 before release.",
  },
  {
    n: "02",
    title: "Specified with you",
    body: "Substrate assessment, product selection and written recommendations from our technical team — before the first bag opens.",
  },
  {
    n: "03",
    title: "Supported on site",
    body: "Applicator training, site visits and quality checks through installation, not just a data sheet and a phone number.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="bg-[#F7F6F3]">
      <div className="band shell">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          {/* visual */}
          <Parallax distance={70}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] bg-[#F2F1EE]">
              <Image
                src="/images/brochure/page-03.jpg"
                alt="CONFAST product range from the company brochure"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-top"
              />
            </div>
          </Parallax>

          {/* copy */}
          <div className="lg:pt-6">
            <SectionHead
              eyebrow="About Us"
              title="Chemistry built"
              accent="for the site."
            />

            <WordFade
              className="lede mt-6 max-w-xl text-[#1A1A18]"
              text="CONFAST Chemicals manufactures the adhesives, grouts, mortars and polymers that hold modern buildings together. Every product is engineered for the realities of an Indian construction site — heat, dust, tight schedules and substrates that are rarely perfect."
            />

            <FadeUp delay={0.12} className="mt-10 flex flex-wrap gap-3">
              <Link href="/about" className="btn btn-solid">
                Our story
              </Link>
              <Link href="/services" className="btn btn-line">
                What we support
              </Link>
            </FadeUp>

            {/* pillars */}
            <div className="mt-14">
              <div className="hairline" />
              <FadeUp stagger={0.1}>
                {pillars.map((p) => (
                  <div
                    key={p.n}
                    className="flex gap-6 border-b border-[#1A1A18]/10 py-7"
                  >
                    <p className="numeral eyebrow pt-1.5 text-[#F39100]">{p.n}</p>
                    <div>
                      <h3 className="display display-sm text-[#1A1A18]">
                        {p.title}
                      </h3>
                      <p className="body-sm mt-2 text-muted">{p.body}</p>
                    </div>
                  </div>
                ))}
              </FadeUp>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
