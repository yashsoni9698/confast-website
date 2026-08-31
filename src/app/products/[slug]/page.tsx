import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FadeUp, Reveal } from "@/components/ui/Reveal";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

const products = productsData as Product[];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | CONFAST Chemicals`,
      description: product.shortDescription,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== slug).slice(0, 3);

  const quickFacts = [
    { label: "Category", value: product.category },
    { label: "Type", value: product.type },
    { label: "Coverage", value: product.coverage },
    { label: "Pack Size", value: product.packSize.join(", ") },
    { label: "Shelf Life", value: product.shelfLife },
    { label: "Colour", value: product.color_field },
  ];

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden bg-[#101010] pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-24">
        <div className="blueprint-invert absolute inset-0 opacity-50" />
        <div
          className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(243,145,0,0.18) 0%, transparent 68%)",
          }}
        />

        <div className="shell relative">
          <FadeUp y={14}>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/"
                className="eyebrow text-white/65 transition-colors hover:text-[#F39100]"
              >
                Home
              </Link>
              <span className="text-white/60">/</span>
              <Link
                href="/products"
                className="eyebrow text-white/65 transition-colors hover:text-[#F39100]"
              >
                Products
              </Link>
              <span className="text-white/60">/</span>
              <span className="eyebrow text-white/80">
                {product.name.replace("Confast ", "")}
              </span>
            </nav>
          </FadeUp>

          <div className="mt-14 grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            {/* copy */}
            <div>
              <FadeUp y={14}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="tick" />
                  <p className="eyebrow text-white/70">
                    {product.category} — {product.type}
                  </p>
                  {product.badge && (
                    <span className="badge-orange">{product.badge}</span>
                  )}
                </div>
              </FadeUp>

              <h1 className="display display-lg mt-6 text-white">
                <Reveal>{product.name.replace("Confast ", "")}</Reveal>
              </h1>

              <FadeUp delay={0.12}>
                <p className="mt-5 text-lg font-normal text-[#F39100]">
                  {product.tagline}
                </p>
                <p className="lede mt-8 max-w-xl text-white/75">
                  {product.shortDescription}
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Link href="/quote" className="btn btn-orange">
                    Request a Quote
                  </Link>
                  <a href="#specifications" className="btn btn-line-invert">
                    Specifications
                  </a>
                </div>
              </FadeUp>
            </div>

            {/* pack shot */}
            <FadeUp delay={0.1}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-[#F7F6F3]">
                <Image
                  src={product.heroImage || product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain p-10 sm:p-16"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════ QUICK FACTS STRIP ══════════ */}
      <section className="border-b border-[#1A1A18]/10 bg-[#F7F6F3]">
        <div className="shell">
          <FadeUp stagger={0.06} className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
            {quickFacts.map((f) => (
              <div
                key={f.label}
                className="border-b border-[#1A1A18]/10 px-4 py-5 sm:px-6 sm:py-7 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <p className="eyebrow text-[#868786]">{f.label}</p>
                <p className="mt-3 text-sm font-medium leading-snug text-[#1A1A18]">
                  {f.value}
                </p>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ══════════ OVERVIEW ══════════ */}
      <section className="bg-[#F7F6F3]">
        <div className="band shell">
          <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-24">
            <div className="lg:w-[9rem]">
              <FadeUp>
                <p className="eyebrow text-[#868786]">Overview</p>
                <div className="mt-4 h-px w-16 bg-[#F39100] lg:mt-6" />
              </FadeUp>
            </div>
            <FadeUp>
              <p className="lede max-w-3xl text-[#1A1A18]">
                {product.fullDescription}
              </p>
            </FadeUp>
          </div>

          {/* ── features ── */}
          <div className="mt-24">
            <div className="flex items-end justify-between gap-6">
              <h2 className="display display-md text-[#1A1A18]">
                <Reveal>Key features</Reveal>
              </h2>
              <p className="numeral eyebrow shrink-0 pb-2 text-[#868786]">
                {String(product.features.length).padStart(2, "0")}
              </p>
            </div>
            <div className="mt-8 hairline" />
            <FadeUp stagger={0.06} className="grid sm:grid-cols-2">
              {product.features.map((f, i) => (
                <div
                  key={f}
                  className="flex gap-5 border-b border-[#1A1A18]/10 py-6 sm:px-8 sm:first:pl-0 sm:[&:nth-child(odd)]:pl-0"
                >
                  <span className="numeral eyebrow pt-1 text-[#F39100]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-normal leading-relaxed text-muted">
                    {f}
                  </p>
                </div>
              ))}
            </FadeUp>
          </div>

          {/* ── benefits ── */}
          <div className="mt-24 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <div>
              <h2 className="display display-md text-[#1A1A18]">
                <Reveal>Benefits</Reveal>
              </h2>
              <p className="mt-6 text-sm font-normal leading-relaxed text-muted">
                What this product changes on site, in practice.
              </p>
            </div>
            <FadeUp stagger={0.08}>
              {product.benefits.map((b) => (
                <div
                  key={b}
                  className="flex items-start gap-5 border-b border-[#1A1A18]/10 py-5"
                >
                  <span className="tick mt-2" />
                  <p className="text-base font-normal leading-relaxed text-muted">
                    {b}
                  </p>
                </div>
              ))}
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════ APPLICATIONS ══════════ */}
      <section className="bg-[#101010]">
        <div className="band shell">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
            <div>
              <FadeUp>
                <div className="flex items-center gap-3">
                  <span className="tick" />
                  <p className="eyebrow text-white/70">Applications</p>
                </div>
              </FadeUp>
              <h2 className="display display-md mt-7 text-white">
                <Reveal>Where it</Reveal>
                <Reveal delay={0.08}>
                  <span className="text-[#F39100]">gets used.</span>
                </Reveal>
              </h2>
              <FadeUp stagger={0.06} className="mt-10">
                {product.applications.map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-4 border-b border-white/10 py-4"
                  >
                    <span className="tick" />
                    <p className="text-sm font-normal text-white/80">{a}</p>
                  </div>
                ))}
              </FadeUp>
            </div>

            <div className="lg:pt-24">
              <FadeUp>
                <p className="eyebrow text-white/70">Suitable For</p>
              </FadeUp>
              <FadeUp stagger={0.06} className="mt-8 flex flex-wrap gap-2.5">
                {product.suitableFor.map((s) => (
                  <span
                    key={s}
                    className="border border-white/12 px-4 py-2.5 text-sm font-normal text-white/75"
                  >
                    {s}
                  </span>
                ))}
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ SPECIFICATIONS ══════════ */}
      <section id="specifications" className="scroll-mt-24 bg-[#F7F6F3]">
        <div className="band shell">
          <div className="flex items-end justify-between gap-6">
            <h2 className="display display-md text-[#1A1A18]">
              <Reveal>Technical data</Reveal>
            </h2>
            <FadeUp>
              <Link href="/contact" className="btn btn-line hidden sm:inline-flex">
                Request TDS
              </Link>
            </FadeUp>
          </div>

          <div className="mt-10 hairline" />
          <FadeUp stagger={0.05}>
            {product.technicalSpecs.map((spec) => (
              <div
                key={spec.parameter}
                className="grid grid-cols-1 gap-2 border-b border-[#1A1A18]/10 py-5 sm:grid-cols-[1fr_1fr] sm:gap-8 sm:py-6"
              >
                <p className="text-sm font-normal text-muted">
                  {spec.parameter}
                </p>
                <p className="numeral text-base font-medium text-[#1A1A18]">
                  {spec.value}
                </p>
              </div>
            ))}
          </FadeUp>

          {/* ── faqs ── */}
          <div className="mt-24">
            <h2 className="display display-md text-[#1A1A18]">
              <Reveal>Questions</Reveal>
            </h2>
            <div className="mt-10 hairline" />
            <FadeUp stagger={0.08}>
              {product.faqs.map((faq, i) => (
                <details
                  key={faq.question}
                  className="group border-b border-[#1A1A18]/10 py-6"
                >
                  <summary className="flex cursor-pointer list-none items-start gap-5 [&::-webkit-details-marker]:hidden">
                    <span className="numeral eyebrow pt-1.5 text-[#F39100]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display flex-1 text-lg text-[#1A1A18] transition-colors duration-300 group-open:text-[#F39100] sm:text-xl">
                      {faq.question}
                    </span>
                    <span className="relative mt-2 h-3 w-3 shrink-0">
                      <span className="absolute left-0 top-1/2 h-px w-3 bg-[#1A1A18]" />
                      <span className="absolute left-1/2 top-0 h-3 w-px bg-[#1A1A18] transition-transform duration-400 group-open:scale-y-0" />
                    </span>
                  </summary>
                  <p className="mt-5 max-w-3xl pl-11 text-sm font-normal leading-relaxed text-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="bg-[#F39100]">
        <div className="band shell">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-24">
            <h2 className="display display-md text-white">
              <Reveal>Specify {product.name.replace("Confast ", "")}</Reveal>
              <Reveal delay={0.08}>on your next project.</Reveal>
            </h2>
            <FadeUp delay={0.12}>
              <p className="text-sm font-normal leading-relaxed text-white/80">
                Share your quantities and site conditions — we will return a
                quote and a written technical recommendation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/quote"
                  className="btn bg-[#1A1A18] text-white hover:bg-white hover:text-[#1A1A18]"
                >
                  Request a Quote
                </Link>
                <a
                  href="tel:+917392949294"
                  className="btn border-white/40 text-white hover:bg-white hover:text-[#1A1A18]"
                >
                  Call Technical Desk
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════ RELATED ══════════ */}
      <section className="bg-[#F7F6F3]">
        <div className="band shell">
          <p className="eyebrow text-[#868786]">More from the range</p>
          <div className="mt-8 hairline" />
          <FadeUp stagger={0.1} className="grid gap-px sm:grid-cols-3">
            {related.map((rp) => (
              <Link
                key={rp.id}
                href={`/products/${rp.id}`}
                className="group border-b border-[#1A1A18]/10 py-8 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white">
                  <Image
                    src={rp.image}
                    alt={rp.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-contain p-6 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                  />
                </div>
                <p className="eyebrow mt-6 text-[#F39100]">{rp.category}</p>
                <h3 className="display mt-3 text-xl text-[#1A1A18] transition-colors duration-500 group-hover:text-[#F39100]">
                  {rp.name.replace("Confast ", "")}
                </h3>
                <p className="mt-2 text-sm font-normal text-muted">
                  {rp.tagline}
                </p>
              </Link>
            ))}
          </FadeUp>
        </div>
      </section>
    </>
  );
}
