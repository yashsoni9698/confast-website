"use client";

import React from "react";
import { FadeUp } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

const channels = [
  { label: "Phone", value: "+91 XXXX XXXXXX", href: "tel:+91XXXXXXXXXX" },
  {
    label: "Email",
    value: "info@confastchemicals.com",
    href: "mailto:info@confastchemicals.com",
  },
  { label: "WhatsApp", value: "Message the team", href: "https://wa.me/91XXXXXXXXXX" },
];

const subjects = [
  "General enquiry",
  "Technical support",
  "Product information",
  "Dealer / distributor enquiry",
  "Quotation request",
];

/* Apple-style fields: rounded, filled, hairline border, no hard focus ring */
const field =
  "w-full rounded-xl border border-[#1A1A18]/12 bg-white px-4 py-3.5 text-base text-[#1A1A18] transition-[border-color,box-shadow] duration-300 placeholder:text-[#1A1A18]/35 focus:border-[#F39100] focus:ring-4 focus:ring-[#F39100]/15";

export function ContactSection() {
  return (
    <section id="contact" className="bg-[#F7F6F3]">
      <div className="band shell">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* intro + channels */}
          <div>
            <SectionHead
              eyebrow="Contact Us"
              title="Let's build"
              accent="something solid."
              lede="Send us the substrate, tile format and site conditions. Our technical team replies within one working day."
            />

            <div className="mt-12">
              <div className="hairline" />
              <FadeUp stagger={0.09}>
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-baseline justify-between gap-6 border-b border-[#1A1A18]/10 py-6"
                  >
                    <span className="eyebrow text-[#868786]">{c.label}</span>
                    <span className="display display-sm text-[#1A1A18] transition-colors duration-500 group-hover:text-[#F39100]">
                      {c.value}
                    </span>
                  </a>
                ))}
              </FadeUp>
            </div>
          </div>

          {/* form */}
          <FadeUp delay={0.1}>
            <div className="rounded-[1.5rem] bg-white p-7 sm:p-10">
              <h3 className="display display-md text-[#1A1A18]">Send a message</h3>

              <form className="mt-9 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="h-name" className="body-sm block text-muted">
                      Full name *
                    </label>
                    <input
                      id="h-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Your name"
                      className={`mt-2.5 ${field}`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="h-company"
                      className="body-sm block text-muted"
                    >
                      Company
                    </label>
                    <input
                      id="h-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Organisation"
                      className={`mt-2.5 ${field}`}
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="h-email" className="body-sm block text-muted">
                      Email *
                    </label>
                    <input
                      id="h-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@company.com"
                      className={`mt-2.5 ${field}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="h-phone" className="body-sm block text-muted">
                      Phone *
                    </label>
                    <input
                      id="h-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className={`mt-2.5 ${field}`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="h-subject" className="body-sm block text-muted">
                    Subject
                  </label>
                  <select id="h-subject" name="subject" className={`mt-2.5 ${field}`}>
                    {subjects.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="h-message" className="body-sm block text-muted">
                    Message *
                  </label>
                  <textarea
                    id="h-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about the project, substrate or query"
                    className={`mt-2.5 resize-none ${field}`}
                  />
                </div>

                <button type="submit" className="btn btn-orange w-full sm:w-auto">
                  Send message
                </button>

                <p className="caption text-muted">
                  For urgent site requirements, call the technical desk directly.
                </p>
              </form>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
