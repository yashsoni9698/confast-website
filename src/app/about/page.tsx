import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, FadeUp, WordFade, Parallax, Counter } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "CONFAST Chemicals Pvt. Ltd. — a dedicated manufacturer of polymer-modified construction chemicals, engineered and supported for Indian construction sites.",
};

const values = [
  {
    n: "01",
    title: "Quality without exception",
    body: "Every batch is tested against IS 15477 and EN 12004 before it is released. No release without a passing result.",
  },
  {
    n: "02",
    title: "Chemistry that moves forward",
    body: "Formulations are developed in-house and revised as polymer technology and site practice evolve.",
  },
  {
    n: "03",
    title: "Partnership over transaction",
    body: "We specify alongside the contractor, then stay on the project through application and handover.",
  },
  {
    n: "04",
    title: "Technical depth",
    body: "A team of chemists and civil engineers stands behind every recommendation we put in writing.",
  },
];

const timeline = [
  {
    phase: "Foundation",
    title: "A focused start",
    body: "CONFAST is founded to manufacture construction chemicals that perform on real sites, beginning with a tight range of tile adhesives and mortars.",
  },
  {
    phase: "Expansion",
    title: "Seven engineered systems",
    body: "The range grows to cover masonry, tiling, epoxy grouting and SBR polymer waterproofing — each with a published technical data sheet.",
  },
  {
    phase: "Today",
    title: "Specified across India",
    body: "CONFAST products are used on residential, commercial, hospitality, healthcare and infrastructure projects, backed by on-site technical support.",
  },
];

const standards = [
  { label: "IS 15477", body: "Adhesives for tiles — Indian Standard" },
  { label: "EN 12004", body: "Ceramic tile adhesive — European Standard" },
  { label: "BIS", body: "Compliant formulations across the range" },
  { label: "Low VOC", body: "Reduced-emission product lines" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About CONFAST"
        title="Building the"
        accent="India that lasts."
        lede="CONFAST Chemicals Pvt. Ltd. manufactures the adhesives, grouts, mortars and polymers that hold modern buildings together — engineered for heat, dust, tight schedules and imperfect substrates."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* ══════════ STATEMENT ══════════ */}
      <section className="bg-[#F7F6F3]">
        <div className="band shell">
          <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-24">
            <div className="lg:w-[9rem]">
              <FadeUp>
                <p className="eyebrow text-[#868786]">Our Story</p>
                <div className="mt-4 h-px w-16 bg-[#F39100] lg:mt-6" />
              </FadeUp>
            </div>

            <div>
              <h2 className="display display-md max-w-[22ch] text-[#1A1A18]">
                <Reveal>Products that</Reveal>
                <Reveal delay={0.08}>
                  <span className="text-[#F39100]">actually perform.</span>
                </Reveal>
              </h2>

              <WordFade
                className="lede mt-10 max-w-3xl text-[#1A1A18]"
                text="CONFAST was founded on a single premise: a construction chemical is only as good as its worst day on site. So we formulate for the difficult case — the hot afternoon, the dusty slab, the large-format tile on a wall — and we test every batch before it leaves the plant."
              />

              <FadeUp delay={0.1} className="mt-10 flex flex-wrap gap-3">
                <Link href="/products" className="btn btn-solid">
                  Explore Products
                </Link>
                <Link href="/contact" className="btn btn-line">
                  Talk to Our Team
                </Link>
              </FadeUp>
            </div>
          </div>

          {/* ── timeline ── */}
          <div className="mt-24 lg:mt-36">
            <div className="hairline" />
            <FadeUp stagger={0.12} className="grid md:grid-cols-3">
              {timeline.map((t) => (
                <div
                  key={t.phase}
                  className="border-b border-[#1A1A18]/10 py-10 md:border-b-0 md:border-r md:px-8 md:py-12 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                >
                  <p className="eyebrow text-[#F39100]">{t.phase}</p>
                  <h3 className="display mt-5 text-xl text-[#1A1A18] sm:text-2xl">
                    {t.title}
                  </h3>
                  <p className="mt-4 text-sm font-normal leading-relaxed text-muted">
                    {t.body}
                  </p>
                </div>
              ))}
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════ BROCHURE SPREAD + METRICS ══════════ */}
      <section className="bg-[#F7F6F3] pb-24 lg:pb-36">
        <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Parallax distance={70}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-white">
              <Image
                src="/images/brochure/page-10.jpg"
                alt="CONFAST company brochure spread"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-top"
              />
            </div>
          </Parallax>

          <div>
            <FadeUp>
              <p className="eyebrow text-[#868786]">By the numbers</p>
            </FadeUp>
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-12">
              {[
                { value: 7, suffix: "", label: "Products in range" },
                { value: 100, suffix: "+", label: "Projects supported" },
                { value: 14, suffix: "", label: "Epoxy grout shades" },
                { value: 12, suffix: "", label: "Month shelf life" },
              ].map((m) => (
                <div key={m.label}>
                  <Counter
                    to={m.value}
                    suffix={m.suffix}
                    className="numeral display block text-[3rem] text-[#1A1A18] sm:text-[4rem]"
                  />
                  <div className="mt-3 h-px w-10 bg-[#F39100]" />
                  <p className="eyebrow mt-4 text-[#868786]">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Marquee
        items={["Tile Adhesives", "Epoxy Grouts", "Block Mortars", "SBR Polymers"]}
        tone="orange"
      />

      {/* ══════════ VALUES ══════════ */}
      <section className="bg-[#101010]">
        <div className="band shell">
          <div className="max-w-3xl">
            <FadeUp>
              <div className="flex items-center gap-3">
                <span className="tick" />
                <p className="eyebrow text-white/70">What We Stand For</p>
              </div>
            </FadeUp>
            <h2 className="display display-md mt-7 text-white">
              <Reveal>Four commitments</Reveal>
              <Reveal delay={0.08}>
                <span className="text-[#F39100]">we do not trade away.</span>
              </Reveal>
            </h2>
          </div>

          <FadeUp stagger={0.1} className="mt-16 grid gap-px sm:grid-cols-2">
            {values.map((v) => (
              <div
                key={v.n}
                className="group border-t border-white/10 py-10 sm:px-8 sm:first:pl-0 md:py-14"
              >
                <p className="numeral text-sm font-semibold text-[#F39100]">{v.n}</p>
                <h3 className="display mt-5 text-xl text-white sm:text-2xl">
                  {v.title}
                </h3>
                <p className="mt-4 max-w-md text-sm font-normal leading-relaxed text-white/70">
                  {v.body}
                </p>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ══════════ MISSION / VISION ══════════ */}
      <section className="bg-[#F7F6F3]">
        <div className="band shell">
          <div className="grid gap-px md:grid-cols-2">
            <FadeUp className="rounded-[1.5rem] bg-[#1A1A18] p-10 lg:p-16">
              <p className="eyebrow text-[#F39100]">Our Mission</p>
              <p className="display mt-8 text-2xl leading-snug text-white sm:text-[2rem]">
                To be India&apos;s most trusted construction chemical brand.
              </p>
              <p className="mt-6 text-sm font-normal leading-relaxed text-white/75">
                Delivering products that set the standard for performance, safety
                and sustainability — on small residential jobs and large
                infrastructure alike.
              </p>
            </FadeUp>

            <FadeUp delay={0.1} className="rounded-[1.5rem] bg-[#F39100] p-10 lg:p-16">
              <p className="eyebrow text-white/80">Our Vision</p>
              <p className="display mt-8 text-2xl leading-snug text-white sm:text-[2rem]">
                Structures that last generations.
              </p>
              <p className="mt-6 text-sm font-normal leading-relaxed text-white/80">
                Transforming how India builds through innovative chemistry that is
                environmentally responsible and technically superior.
              </p>
            </FadeUp>
          </div>

          {/* standards */}
          <div className="mt-24">
            <FadeUp>
              <p className="eyebrow text-[#868786]">Standards & Compliance</p>
            </FadeUp>
            <div className="mt-8 hairline" />
            <FadeUp stagger={0.08} className="grid sm:grid-cols-2 lg:grid-cols-4">
              {standards.map((s) => (
                <div
                  key={s.label}
                  className="border-b border-[#1A1A18]/10 py-8 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0"
                >
                  <p className="display text-lg text-[#1A1A18]">{s.label}</p>
                  <p className="mt-3 text-sm font-normal leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              ))}
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
