import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { FadeUp, Reveal, WordFade } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Technical consultation, site assessment, applicator training and dealer support from CONFAST Chemicals — the support that comes with the product.",
};

const services = [
  {
    n: "01",
    title: "Technical Consultation",
    summary:
      "Product selection and system specification for a defined substrate, tile format and exposure condition.",
    body: "Whether you are specifying an adhesive for a large-format porcelain facade or a waterproofing build-up for a basement raft, we work through the variables with you and put the recommendation in writing.",
    includes: [
      "One-to-one consultation with a technical engineer",
      "Product selection and system specification",
      "Substrate assessment and compatibility check",
      "Written technical recommendation",
    ],
  },
  {
    n: "02",
    title: "Site Visit & Assessment",
    summary:
      "On-site inspection before application, and quality checks during it.",
    body: "Our technical representatives visit the site to assess substrate condition, moisture, levels and surface preparation. Catching a problem before the first bag opens is considerably cheaper than remediation.",
    includes: [
      "On-site substrate assessment",
      "Application method recommendation",
      "Quality control during installation",
      "Post-application inspection",
    ],
  },
  {
    n: "03",
    title: "Product Guidance & TDS",
    summary:
      "Full documentation for every product in the range, on request.",
    body: "Every CONFAST product ships with a technical data sheet, application guide and safety data sheet. Our team will walk through dosage, coverage and mixing ratios for your specific quantities.",
    includes: [
      "Technical Data Sheets (TDS)",
      "Step-by-step application guides",
      "Safety Data Sheets (SDS)",
      "Dosage and coverage calculations",
    ],
  },
  {
    n: "04",
    title: "Dealer & Distributor Support",
    summary:
      "A structured programme for partners carrying the CONFAST range.",
    body: "Dealers and distributors get product training for counter staff, point-of-sale material, technical backup for their own customers, and partner pricing.",
    includes: [
      "Product training for dealer staff",
      "Marketing and point-of-sale material",
      "Technical support for end customers",
      "Partner pricing structure",
    ],
  },
  {
    n: "05",
    title: "Contractor Training",
    summary:
      "Hands-on application workshops for tilers, applicators and site engineers.",
    body: "Most product failures are application failures. We run practical sessions covering mixing, open time, trowel selection, coverage and joint detailing, then certify the applicators who complete them.",
    includes: [
      "Hands-on application workshops",
      "Product performance demonstrations",
      "Certification for trained applicators",
      "Refresher programmes",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Beyond the bag."
        accent="Total support."
        lede="A construction chemical is a system, not a product. CONFAST supports specification, application and handover — from the first substrate reading to the final joint."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      {/* ══════════ STATEMENT ══════════ */}
      <section className="bg-[#F7F6F3]">
        <div className="shell py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-24">
            <div className="lg:w-[9rem]">
              <FadeUp>
                <p className="eyebrow text-[#868786]">Approach</p>
                <div className="mt-4 h-px w-16 bg-[#F39100] lg:mt-6" />
              </FadeUp>
            </div>
            <WordFade
              className="lede max-w-3xl text-[#1A1A18]"
              text="Most product failures on site are not product failures — they are specification or application failures. That is why every CONFAST service exists upstream and downstream of the sale: we help choose the right system, then make sure it goes down correctly."
            />
          </div>
        </div>
      </section>

      {/* ══════════ SERVICE LIST ══════════ */}
      <section className="bg-[#F7F6F3] pb-20 lg:pb-28">
        <div className="shell">
          <div className="hairline" />
          {services.map((s) => (
            <FadeUp key={s.n}>
              <article className="grid gap-8 border-b border-[#1A1A18]/10 py-12 lg:grid-cols-[5rem_1.2fr_1fr] lg:gap-14 lg:py-20">
                <p className="numeral eyebrow text-[#F39100]">{s.n}</p>

                <div>
                  <h2 className="display text-[1.75rem] leading-tight text-[#1A1A18] sm:text-[2.5rem]">
                    {s.title}
                  </h2>
                  <p className="mt-5 max-w-lg text-base font-normal leading-relaxed text-muted">
                    {s.summary}
                  </p>
                  <p className="mt-5 max-w-lg text-sm font-normal leading-relaxed text-muted">
                    {s.body}
                  </p>
                  <Link
                    href="/contact"
                    className="link-underline mt-8 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#1A1A18] hover:text-[#F39100]"
                  >
                    Request this service
                  </Link>
                </div>

                <div className="lg:pt-3">
                  <p className="eyebrow text-[#868786]">What&apos;s included</p>
                  <div className="mt-6">
                    {s.includes.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-4 border-t border-[#1A1A18]/10 py-4"
                      >
                        <span className="tick mt-1.5" />
                        <p className="text-sm font-normal leading-relaxed text-muted">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="bg-[#101010]">
        <div className="band shell">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-24">
            <h2 className="display display-md text-white">
              <Reveal>Bring us in</Reveal>
              <Reveal delay={0.08}>
                <span className="text-[#F39100]">before you specify.</span>
              </Reveal>
            </h2>
            <FadeUp delay={0.12}>
              <p className="text-sm font-normal leading-relaxed text-white/70">
                Consultation and site assessment cost nothing and prevent the
                expensive kind of surprise. Tell us about the project.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-orange">
                  Contact Our Team
                </Link>
                <Link href="/quote" className="btn btn-line-invert">
                  Request a Quote
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
