import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { FadeUp, Reveal } from "@/components/ui/Reveal";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

const products = productsData as Product[];

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a project quotation from CONFAST Chemicals. Share your quantities and site conditions for pricing and a written technical recommendation.",
};

const states = [
  "Maharashtra",
  "Gujarat",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "Delhi NCR",
  "Rajasthan",
  "Other",
];

const projectTypes = [
  "Residential",
  "Commercial",
  "Industrial",
  "Hospitality",
  "Healthcare",
  "Infrastructure",
  "Swimming pool",
  "Other",
];

const steps = [
  { n: "01", label: "You send the details", note: "Quantities, site conditions, timeline" },
  { n: "02", label: "We review the system", note: "Technical team checks suitability" },
  { n: "03", label: "You get a written quote", note: "Pricing plus a recommendation" },
];

const field =
  "w-full border-0 border-b border-[#1A1A18]/15 bg-transparent px-0 py-3.5 text-base text-[#1A1A18] transition-colors placeholder:text-[#1A1A18]/35 focus:border-[#F39100]";

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a Quote"
        title="Tell us about"
        accent="the project."
        lede="Send through your quantities and site conditions. You will receive pricing and a written technical recommendation within one working day."
        crumbs={[{ label: "Home", href: "/" }, { label: "Request Quote" }]}
      />

      {/* ══════════ PROCESS ══════════ */}
      <section className="border-b border-[#1A1A18]/10 bg-[#F7F6F3]">
        <div className="shell">
          <FadeUp stagger={0.1} className="grid md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="border-b border-r border-[#1A1A18]/10 px-5 py-10 last:border-r-0 md:border-b-0 md:px-8 md:py-14"
              >
                <p className="numeral eyebrow text-[#F39100]">{s.n}</p>
                <p className="display mt-5 text-lg text-[#1A1A18] sm:text-xl">
                  {s.label}
                </p>
                <p className="mt-3 text-sm font-normal text-muted">{s.note}</p>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ══════════ FORM ══════════ */}
      <section className="bg-[#F7F6F3]">
        <div className="band shell">
          <div className="mx-auto max-w-4xl">
            <h2 className="display display-md text-[#1A1A18]">
              <Reveal>Quote request</Reveal>
            </h2>
            <div className="mt-10 hairline" />

            <FadeUp delay={0.1}>
              <form className="mt-12 space-y-16">
                {/* ── contact ── */}
                <fieldset>
                  <legend className="eyebrow text-[#F39100]">
                    01 — Your details
                  </legend>

                  <div className="mt-8 space-y-10">
                    <div className="grid gap-10 sm:grid-cols-2">
                      <div>
                        <label htmlFor="q-name" className="eyebrow text-[#868786]">
                          Full name *
                        </label>
                        <input
                          id="q-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          placeholder="Your name"
                          className={`mt-4 ${field}`}
                        />
                      </div>
                      <div>
                        <label htmlFor="q-company" className="eyebrow text-[#868786]">
                          Company
                        </label>
                        <input
                          id="q-company"
                          name="company"
                          type="text"
                          autoComplete="organization"
                          placeholder="Organisation"
                          className={`mt-4 ${field}`}
                        />
                      </div>
                    </div>

                    <div className="grid gap-10 sm:grid-cols-2">
                      <div>
                        <label htmlFor="q-email" className="eyebrow text-[#868786]">
                          Email *
                        </label>
                        <input
                          id="q-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          placeholder="you@company.com"
                          className={`mt-4 ${field}`}
                        />
                      </div>
                      <div>
                        <label htmlFor="q-phone" className="eyebrow text-[#868786]">
                          Phone *
                        </label>
                        <input
                          id="q-phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          required
                          placeholder="+91 XXXXX XXXXX"
                          className={`mt-4 ${field}`}
                        />
                      </div>
                    </div>

                    <div className="grid gap-10 sm:grid-cols-2">
                      <div>
                        <label htmlFor="q-city" className="eyebrow text-[#868786]">
                          City
                        </label>
                        <input
                          id="q-city"
                          name="city"
                          type="text"
                          autoComplete="address-level2"
                          placeholder="Project city"
                          className={`mt-4 ${field}`}
                        />
                      </div>
                      <div>
                        <label htmlFor="q-state" className="eyebrow text-[#868786]">
                          State
                        </label>
                        <select id="q-state" name="state" className={`mt-4 ${field}`}>
                          <option value="">Select state</option>
                          {states.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </fieldset>

                {/* ── project ── */}
                <fieldset>
                  <legend className="eyebrow text-[#F39100]">
                    02 — The project
                  </legend>

                  <div className="mt-8 space-y-10">
                    <div className="grid gap-10 sm:grid-cols-2">
                      <div>
                        <label htmlFor="q-type" className="eyebrow text-[#868786]">
                          Project type
                        </label>
                        <select id="q-type" name="projectType" className={`mt-4 ${field}`}>
                          {projectTypes.map((t) => (
                            <option key={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="q-qty" className="eyebrow text-[#868786]">
                          Estimated quantity
                        </label>
                        <input
                          id="q-qty"
                          name="quantity"
                          type="text"
                          placeholder="e.g. 500 bags / 2,000 sq.m"
                          className={`mt-4 ${field}`}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="q-drawing" className="eyebrow text-[#868786]">
                        Drawing or BOQ (optional)
                      </label>
                      <input
                        id="q-drawing"
                        name="drawing"
                        type="file"
                        accept=".pdf,.dwg,.jpg,.jpeg,.png,.xlsx"
                        className="mt-4 w-full border-b border-[#1A1A18]/15 bg-transparent py-3.5 text-sm font-normal text-muted file:mr-4 file:border file:border-[#1A1A18]/15 file:bg-transparent file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.15em] file:text-[#1A1A18] hover:file:border-[#F39100] hover:file:text-[#F39100]"
                      />
                    </div>
                  </div>
                </fieldset>

                {/* ── products ── */}
                <fieldset>
                  <legend className="eyebrow text-[#F39100]">
                    03 — Products required
                  </legend>

                  <div className="mt-8 grid sm:grid-cols-2">
                    {products.map((p) => (
                      <label
                        key={p.id}
                        className="group flex cursor-pointer items-center gap-4 border-t border-[#1A1A18]/10 py-4 transition-colors hover:text-[#F39100] sm:px-5 sm:[&:nth-child(odd)]:pl-0"
                      >
                        <input
                          type="checkbox"
                          name="products"
                          value={p.id}
                          className="h-4 w-4 shrink-0 accent-[#F39100]"
                        />
                        <span className="text-sm font-normal text-muted transition-colors group-hover:text-[#F39100]">
                          {p.name.replace("Confast ", "")}
                        </span>
                        <span className="eyebrow ml-auto hidden text-[#868786] sm:block">
                          {p.category}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* ── notes ── */}
                <fieldset>
                  <legend className="eyebrow text-[#F39100]">
                    04 — Site conditions
                  </legend>
                  <div className="mt-8">
                    <label htmlFor="q-message" className="eyebrow text-[#868786]">
                      Details
                    </label>
                    <textarea
                      id="q-message"
                      name="message"
                      rows={5}
                      placeholder="Substrate, tile format, exposure, timeline, or anything else we should know"
                      className={`mt-4 resize-none ${field}`}
                    />
                  </div>
                </fieldset>

                <div className="border-t border-[#1A1A18]/10 pt-10">
                  <button type="submit" className="btn btn-orange w-full sm:w-auto">
                    Submit Quote Request
                  </button>
                  <p className="mt-6 text-sm font-normal text-muted">
                    We respond within one working day. For urgent site
                    requirements,{" "}
                    <a
                      href="tel:+917392949294"
                      className="link-underline text-[#F39100]"
                    >
                      call the technical desk
                    </a>
                    .
                  </p>
                </div>
              </form>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
