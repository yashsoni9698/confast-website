import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { FadeUp, Reveal } from "@/components/ui/Reveal";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The complete CONFAST range — block mounting mortar, TileSet tile adhesives, Epoxy 77 grout and SBR Latex+ polymer. Technical data sheets for every product.",
};

const products = productsData as Product[];

/* Group the range by category */
const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Collection"
        title="Our products"
        accent=""
        lede="Every CONFAST product is polymer-modified, batch-tested and published with a full technical data sheet. Select by category or open a product for specifications."
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      {/* ══════════ CATEGORY FILTER TABS ══════════ */}
      <section className="border-b border-[#1A1A18]/10 bg-white">
        <div className="shell py-5">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((c, i) => (
              <span
                key={c}
                className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  i === 0
                    ? "bg-[#1A1A18] text-white"
                    : "border border-[#1A1A18]/15 text-[#1A1A18] hover:border-[#1A1A18]/40"
                }`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PRODUCT GRID ══════════ */}
      <section className="bg-white">
        <div className="shell py-16 lg:py-24">
          <FadeUp stagger={0.08}>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#1A1A18]/8 bg-[#F7F6F3] transition-all duration-500 hover:border-[#F39100]/30 hover:shadow-[0_16px_48px_rgba(26,26,24,0.08)]"
                >
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute right-4 top-4 z-10 rounded-full bg-[#1A1A18] px-3 py-1.5 text-[0.625rem] font-bold uppercase tracking-wider text-white">
                      {product.badge}
                    </span>
                  )}

                  {/* Product Image */}
                  <div className="relative aspect-square w-full overflow-hidden bg-[#F7F6F3] p-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-4 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col px-5 pb-6 pt-2">
                    {/* Category */}
                    <p className="eyebrow text-[#F39100]">{product.category}</p>

                    {/* Product Name */}
                    <h3 className="mt-2 font-[family-name:var(--sf-display)] text-lg font-semibold leading-tight tracking-tight text-[#1A1A18] transition-colors duration-400 group-hover:text-[#F39100]">
                      {product.name}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-[#62615c]">
                      {product.shortDescription}
                    </p>

                    {/* Pack Sizes */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {product.packSize.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-[#1A1A18]/10 px-2.5 py-1 text-[0.6875rem] text-[#868786]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* View More Button */}
                    <Link
                      href={`/products/${product.id}`}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A18] px-5 py-3 text-sm font-semibold text-white transition-all duration-400 hover:bg-[#F39100] hover:shadow-[0_8px_24px_rgba(243,145,0,0.3)]"
                    >
                      View More
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                        className="transition-transform duration-400 group-hover:translate-x-0.5"
                      >
                        <path
                          d="M1 7h12M8 2l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════ CLOSING CTA ══════════ */}
      <section className="bg-[#101010]">
        <div className="band shell">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-24">
            <h2 className="display display-md text-white">
              <Reveal>Not sure which</Reveal>
              <Reveal delay={0.08}>
                <span className="text-[#F39100]">system to specify?</span>
              </Reveal>
            </h2>
            <FadeUp delay={0.12}>
              <p className="text-sm font-normal leading-relaxed text-white/70">
                Send us the substrate, tile format and site conditions. Our
                technical team will come back with a written recommendation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/quote" className="btn btn-orange">
                  Request a Quote
                </Link>
                <Link href="/contact" className="btn btn-line-invert">
                  Technical Support
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
