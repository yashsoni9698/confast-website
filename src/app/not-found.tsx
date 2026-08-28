import Link from "next/link";

const links = [
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#101010]">
      <div className="blueprint-invert absolute inset-0 opacity-50" />
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(243,145,0,0.16) 0%, transparent 68%)",
        }}
      />

      <div className="shell relative py-32">
        <div className="flex items-center gap-3">
          <span className="tick" />
          <p className="eyebrow text-white/70">Error 404</p>
        </div>

        <p className="numeral display mt-10 text-[6rem] leading-none text-[#F39100] sm:text-[10rem]">
          404
        </p>

        <h1 className="display display-md mt-8 max-w-[20ch] text-white">
          This page is not
          <br />
          <span className="text-[#F39100]">part of the range.</span>
        </h1>

        <p className="lede mt-8 max-w-xl text-white/75">
          The page you were looking for does not exist or has moved. Here is the
          way back.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-orange">
            Back to Home
          </Link>
          <Link href="/products" className="btn btn-line-invert">
            View Products
          </Link>
        </div>

        <div className="mt-20">
          <div className="hairline-invert" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group border-b border-white/10 py-6 sm:px-6 sm:first:pl-0"
              >
                <span className="display text-lg text-white/80 transition-colors duration-500 group-hover:text-[#F39100]">
                  {l.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
