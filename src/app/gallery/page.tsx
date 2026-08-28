import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { FadeUp, Reveal } from "@/components/ui/Reveal";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Product photography, brochure spreads and shade references from the CONFAST construction chemical range.",
};

const products = productsData as Product[];

/* Brochure spreads extracted from the CONFAST company brochure */
const spreads = [
  { src: "/images/brochure/page-03.jpg", caption: "Product range overview", span: "tall" },
  { src: "/images/brochure/page-10.jpg", caption: "Technical specification spread", span: "wide" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The range,"
        accent="up close."
        lede="Pack shots across the full product line, plus spreads from the CONFAST company brochure. Site and installation photography is being added."
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      {/* ══════════ PRODUCT PACK SHOTS ══════════ */}
      <section className="bg-[#F7F6F3]">
        <div className="band shell">
          <div className="flex items-end justify-between gap-6">
            <h2 className="display display-md text-[#1A1A18]">
              <Reveal>Product range</Reveal>
            </h2>
            <p className="numeral eyebrow shrink-0 pb-2 text-[#868786]">
              {String(products.length).padStart(2, "0")}
            </p>
          </div>
          <div className="mt-8 hairline" />

          <FadeUp
            stagger={0.08}
            className="head-gap grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 sm:gap-5 lg:grid-cols-3"
          >
            {products.map((product, i) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="card-apple group relative flex flex-col overflow-hidden"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-[#F2F1EE]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-8 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] sm:p-12"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-[#101010]/85 px-3 py-1.5 backdrop-blur-sm">
                    <span className="numeral eyebrow text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                </div>

                <div className="px-5 py-5">
                  <p className="eyebrow text-[#F39100]">{product.category}</p>
                  <h3 className="display display-sm mt-2.5 text-[#1A1A18] transition-colors duration-500 group-hover:text-[#F39100]">
                    {product.name.replace("Confast ", "")}
                  </h3>
                </div>
              </Link>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ══════════ BROCHURE SPREADS ══════════ */}
      <section className="bg-[#101010]">
        <div className="band shell">
          <FadeUp>
            <div className="flex items-center gap-3">
              <span className="tick" />
              <p className="eyebrow text-white/70">From the Brochure</p>
            </div>
          </FadeUp>
          <h2 className="display display-md mt-7 text-white">
            <Reveal>Printed</Reveal>
            <Reveal delay={0.08}>
              <span className="text-[#F39100]">reference material.</span>
            </Reveal>
          </h2>

          <FadeUp stagger={0.12} className="head-gap grid gap-8 lg:grid-cols-2">
            {spreads.map((s) => (
              <div key={s.src} className="group">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.5rem] bg-white">
                  <Image
                    src={s.src}
                    alt={s.caption}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-top transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <span className="tick" />
                  <p className="eyebrow text-white/70">{s.caption}</p>
                </div>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ══════════ SITE PHOTOGRAPHY NOTE ══════════ */}
      <section className="bg-[#F7F6F3]">
        <div className="band shell">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-24">
            <h2 className="display display-md text-[#1A1A18]">
              <Reveal>Site photography</Reveal>
              <Reveal delay={0.08}>
                <span className="text-[#F39100]">in progress.</span>
              </Reveal>
            </h2>
            <FadeUp delay={0.12}>
              <p className="text-sm font-normal leading-relaxed text-muted">
                We are building a photographic record of live applications and
                completed installations. If CONFAST products were used on your
                project, we would like to feature it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-solid">
                  Submit a Project
                </Link>
                <Link href="/products" className="btn btn-line">
                  View Products
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
