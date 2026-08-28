import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { FadeUp, Reveal, Counter } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "CONFAST construction chemicals in use across residential, commercial, hospitality, healthcare and industrial projects in India.",
};

const projects = [
  {
    id: "premium-villa-complex",
    title: "Premium Villa Complex",
    sector: "Residential",
    location: "Pune, Maharashtra",
    scope: "45 villas",
    products: ["TileSet 44", "Epoxy 77", "Block Fix"],
    body: "Large-format porcelain installed across 45 villas using TileSet 44 for bond strength on low-porosity tile, finished with Epoxy 77 joints.",
  },
  {
    id: "commercial-office-tower",
    title: "Commercial Office Tower",
    sector: "Commercial",
    location: "Mumbai, Maharashtra",
    scope: "20 storeys",
    products: ["TileSet 33", "Block Fix"],
    body: "AAC block masonry throughout the core with Block Fix, and TileSet 33 for high-traffic lobby and corridor flooring.",
  },
  {
    id: "hotel-resort-project",
    title: "5-Star Hotel & Resort",
    sector: "Hospitality",
    location: "Goa",
    scope: "Pools, spa, baths",
    products: ["TileSet 44", "Epoxy 77", "SBR Latex+"],
    body: "Tiling and waterproofing across pools, bathrooms and spa areas — continuously wet zones requiring chemical-resistant joints.",
  },
  {
    id: "industrial-facility",
    title: "Pharmaceutical Facility",
    sector: "Industrial",
    location: "Ahmedabad, Gujarat",
    scope: "Process floors",
    products: ["Epoxy 77", "TileSet 33"],
    body: "Chemical-resistant flooring and wall tiling for a manufacturing facility, grouted with Epoxy 77 for hygienic, washable joints.",
  },
  {
    id: "hospital-complex",
    title: "Multi-Specialty Hospital",
    sector: "Healthcare",
    location: "Hyderabad, Telangana",
    scope: "OT, ICU, sterile",
    products: ["Epoxy 77", "TileSet 44", "SBR Latex+"],
    body: "Clean-room grade tiling and waterproofing for operation theatres, ICUs and sterile corridors under strict hygiene requirements.",
  },
  {
    id: "residential-apartments",
    title: "Apartment Complex",
    sector: "Residential",
    location: "Chennai, Tamil Nadu",
    scope: "200 units",
    products: ["Block Fix", "TileSet 22", "TileSet 33"],
    body: "Full chemical package for a 200-unit development — block masonry, bathroom tiling and kitchen wall tiles across every unit.",
  },
];

const sectors = Array.from(new Set(projects.map((p) => p.sector)));

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Projects"
        title="Specified,"
        accent="then supported."
        lede="A selection of projects where CONFAST systems were specified, applied and signed off — across six sectors and five states."
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />

      {/* ══════════ METRICS ══════════ */}
      <section className="border-b border-[#1A1A18]/10 bg-[#F7F6F3]">
        <div className="shell">
          <FadeUp stagger={0.08} className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { value: 100, suffix: "+", label: "Projects supported" },
              { value: 6, suffix: "", label: "Sectors served" },
              { value: 5, suffix: "+", label: "States covered" },
              { value: 7, suffix: "", label: "Products deployed" },
            ].map((m, i) => (
              <div
                key={m.label}
                className={`border-b border-[#1A1A18]/10 px-4 py-8 sm:px-5 sm:py-10 lg:border-b-0 lg:px-8 lg:py-14 ${
                  i % 2 === 0 ? "border-r border-[#1A1A18]/10" : ""
                } ${i >= 2 ? "lg:border-r" : "lg:border-r"} ${
                  i === 3 ? "border-r-0 lg:border-r-0" : ""
                }`}
              >
                <Counter
                  to={m.value}
                  suffix={m.suffix}
                  className="numeral display block text-[2.5rem] text-[#1A1A18] sm:text-[3.5rem]"
                />
                <div className="mt-3 h-px w-10 bg-[#F39100]" />
                <p className="eyebrow mt-4 text-[#868786]">{m.label}</p>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ══════════ SECTOR INDEX ══════════ */}
      <section className="border-b border-[#1A1A18]/10 bg-[#F7F6F3]">
        <div className="shell py-8">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <p className="eyebrow text-[#868786]">Sectors</p>
            {sectors.map((s) => (
              <span key={s} className="eyebrow text-muted">
                {s}
                <span className="ml-2 text-[#F39100]">
                  {projects.filter((p) => p.sector === s).length}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROJECT LIST ══════════ */}
      <section className="bg-[#F7F6F3]">
        <div className="shell py-16 lg:py-24">
          <FadeUp stagger={0.1}>
            {projects.map((project, i) => (
              <article
                key={project.id}
                className="group grid gap-6 border-b border-[#1A1A18]/10 py-10 lg:grid-cols-[5rem_1.3fr_1fr_auto] lg:gap-12 lg:py-14"
              >
                <p className="numeral eyebrow text-[#F39100]">
                  {String(i + 1).padStart(2, "0")}
                </p>

                <div>
                  <p className="eyebrow text-[#868786]">{project.sector}</p>
                  <h2 className="display mt-4 text-2xl text-[#1A1A18] transition-colors duration-500 group-hover:text-[#F39100] sm:text-[2.25rem]">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-sm font-normal text-muted">
                    {project.location} — {project.scope}
                  </p>
                </div>

                <div>
                  <p className="max-w-md text-sm font-normal leading-relaxed text-muted">
                    {project.body}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
                  {project.products.map((p) => (
                    <span
                      key={p}
                      className="chip"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </FadeUp>
        </div>
      </section>

      <Marquee
        items={["Residential", "Commercial", "Hospitality", "Healthcare", "Industrial"]}
        tone="orange"
      />

      {/* ══════════ CTA ══════════ */}
      <section className="bg-[#101010]">
        <div className="band shell">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-24">
            <h2 className="display display-md text-white">
              <Reveal>Have a project</Reveal>
              <Reveal delay={0.08}>
                <span className="text-[#F39100]">on the board?</span>
              </Reveal>
            </h2>
            <FadeUp delay={0.12}>
              <p className="text-sm font-normal leading-relaxed text-white/70">
                Bring us in at specification stage. We will assess the substrate,
                recommend the system and support the applicator through handover.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/quote" className="btn btn-orange">
                  Start a Conversation
                </Link>
                <Link href="/services" className="btn btn-line-invert">
                  Our Services
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
