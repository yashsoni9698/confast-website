import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { FadeUp, Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach the CONFAST Chemicals team for technical support, product queries, dealer enquiries and quotations.",
};

const channels = [
  {
    label: "Phone",
    value: "+91 XXXX XXXXXX",
    href: "tel:+91XXXXXXXXXX",
    note: "Mon–Sat, 9 AM – 6 PM",
  },
  {
    label: "Email",
    value: "info@confastchemicals.com",
    href: "mailto:info@confastchemicals.com",
    note: "Response within one working day",
  },
  {
    label: "WhatsApp",
    value: "Chat with the team",
    href: "https://wa.me/91XXXXXXXXXX",
    note: "Fastest route for site queries",
  },
  {
    label: "Technical Desk",
    value: "+91 XXXX XXXXXX",
    href: "tel:+91XXXXXXXXXX",
    note: "Product selection & specification",
  },
];

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
  { day: "Saturday", time: "9:00 AM – 2:00 PM" },
  { day: "Sunday", time: "Closed" },
];

const subjects = [
  "General enquiry",
  "Technical support",
  "Product information",
  "Dealer / distributor enquiry",
  "Quotation request",
];

/* Shared field styling — bottom-ruled inputs, no boxes */
const field =
  "w-full border-0 border-b border-[#1A1A18]/15 bg-transparent px-0 py-3.5 text-base text-[#1A1A18] transition-colors placeholder:text-[#1A1A18]/35 focus:border-[#F39100]";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's build"
        accent="something solid."
        lede="Technical query, product selection, dealer enquiry or a quotation — reach the team directly and we will route it to the right desk."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* ══════════ CHANNELS ══════════ */}
      <section className="border-b border-[#1A1A18]/10 bg-[#F7F6F3]">
        <div className="shell">
          <FadeUp stagger={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`group border-b border-[#1A1A18]/10 px-5 py-8 transition-colors duration-500 hover:bg-white sm:py-10 sm:border-r lg:border-b-0 lg:px-8 lg:py-14 ${
                  i === channels.length - 1 ? "border-r-0" : ""
                } ${i % 2 === 1 ? "sm:border-r-0 lg:border-r" : ""} ${
                  i >= channels.length - 2 ? "sm:border-b-0" : ""
                }`}
              >
                <p className="eyebrow text-[#868786]">{c.label}</p>
                <p className="display mt-5 text-lg leading-snug text-[#1A1A18] transition-colors duration-500 group-hover:text-[#F39100] sm:text-xl">
                  {c.value}
                </p>
                <p className="mt-3 text-xs font-normal text-muted">{c.note}</p>
              </a>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ══════════ FORM + ASIDE ══════════ */}
      <section className="bg-[#F7F6F3]">
        <div className="band shell">
          <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
            {/* form */}
            <div>
              <h2 className="display display-md text-[#1A1A18]">
                <Reveal>Send a message</Reveal>
              </h2>
              <div className="mt-10 hairline" />

              <FadeUp delay={0.1}>
                <form className="mt-10 space-y-10">
                  <div className="grid gap-10 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="eyebrow text-[#868786]">
                        Full name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="Your name"
                        className={`mt-4 ${field}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="eyebrow text-[#868786]">
                        Company
                      </label>
                      <input
                        id="company"
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
                      <label htmlFor="email" className="eyebrow text-[#868786]">
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="you@company.com"
                        className={`mt-4 ${field}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="eyebrow text-[#868786]">
                        Phone *
                      </label>
                      <input
                        id="phone"
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

                  <div>
                    <label htmlFor="subject" className="eyebrow text-[#868786]">
                      Subject
                    </label>
                    <select id="subject" name="subject" className={`mt-4 ${field}`}>
                      {subjects.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="eyebrow text-[#868786]">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Describe the project, substrate or query"
                      className={`mt-4 resize-none ${field}`}
                    />
                  </div>

                  <button type="submit" className="btn btn-solid w-full sm:w-auto">
                    Send Message
                  </button>
                </form>
              </FadeUp>
            </div>

            {/* aside */}
            <aside className="lg:pt-6">
              <FadeUp>
                <p className="eyebrow text-[#868786]">Business hours</p>
                <div className="mt-6">
                  {hours.map((h) => (
                    <div
                      key={h.day}
                      className="flex items-baseline justify-between gap-4 border-t border-[#1A1A18]/10 py-4"
                    >
                      <span className="text-sm font-normal text-muted">
                        {h.day}
                      </span>
                      <span
                        className={
                          h.time === "Closed"
                            ? "text-sm font-medium text-[#D16312]"
                            : "numeral text-sm font-medium text-[#1A1A18]"
                        }
                      >
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.1} className="mt-14">
                <p className="eyebrow text-[#868786]">Registered office</p>
                <p className="mt-6 text-base font-normal leading-relaxed text-muted">
                  CONFAST Chemicals Pvt. Ltd.
                  <br />
                  India
                </p>
                <a
                  href="https://www.confastchemicals.com"
                  className="link-underline mt-4 inline-block text-sm font-normal text-[#F39100]"
                >
                  www.confastchemicals.com
                </a>
              </FadeUp>

              <FadeUp delay={0.16} className="mt-14 rounded-[1.5rem] bg-[#1A1A18] p-8">
                <p className="eyebrow text-[#F39100]">On site right now?</p>
                <p className="mt-5 text-base font-normal leading-relaxed text-white/80">
                  For an active application query, WhatsApp the technical desk with
                  a photo of the substrate — it is the fastest way to get an answer.
                </p>
                <a
                  href="https://wa.me/91XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-line-invert mt-8 w-full"
                >
                  Open WhatsApp
                </a>
              </FadeUp>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
