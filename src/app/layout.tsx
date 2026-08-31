import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { SmoothScroll } from "@/components/providers/SmoothScroll";

/* Typography follows Apple's system stack.
   On macOS / iOS `-apple-system` resolves to the genuine SF Pro
   (see the font-family chain in globals.css). SF Pro is licensed to
   Apple platforms and cannot be self-hosted, so every other OS falls
   through to Inter — the closest widely-available match in metrics,
   x-height and aperture. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.confastchemicals.com"),
  title: {
    default: "CONFAST Chemicals — Premium Construction Chemicals Manufacturer India",
    template: "%s | CONFAST Chemicals",
  },
  description:
    "CONFAST Chemicals Pvt. Ltd. — Manufacturer of high-performance construction chemicals including tile adhesives, block fix mortar, epoxy grouts, and SBR latex. Trusted by builders, contractors and architects across India.",
  keywords: [
    "construction chemicals India",
    "tile adhesive manufacturer",
    "epoxy grout",
    "block fix mortar",
    "SBR latex",
    "CONFAST chemicals",
    "waterproofing chemicals",
    "building chemicals manufacturer",
  ],
  authors: [{ name: "CONFAST Chemicals Pvt. Ltd." }],
  creator: "CONFAST Chemicals Pvt. Ltd.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.confastchemicals.com",
    siteName: "CONFAST Chemicals",
    title: "CONFAST Chemicals — Premium Construction Chemicals",
    description:
      "Premium construction chemical solutions — tile adhesives, epoxy grouts, block fix, SBR latex and more. Engineered for excellence.",
    /* Card art comes from app/opengraph-image.tsx — Next wires it up
       automatically, so there is no static path to keep in sync. */
  },
  twitter: {
    card: "summary_large_image",
    title: "CONFAST Chemicals — Premium Construction Chemicals",
    description: "Premium construction chemical solutions engineered for excellence.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  /* `verification.google` previously shipped the literal placeholder
     "your-google-verification-code", which put an invalid meta tag on every
     page. Add the real token here once Search Console issues it. */
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={inter.variable}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CONFAST Chemicals Pvt. Ltd.",
              url: "https://www.confastchemicals.com",
              logo: "https://www.confastchemicals.com/images/brand/logomark.png",
              description:
                "Manufacturer of premium construction chemicals — tile adhesives, epoxy grouts, block fix mortar, and SBR latex.",
              telephone: "+91-73-9294-9294",
              email: "info@confastchemicals.com",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Behind Ultratech RMC Plant, Near Hindustan Spun Pipe, NH48, Narsanda",
                addressLocality: "Nadiad",
                addressRegion: "Gujarat",
                postalCode: "387345",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.facebook.com/confastchemicals",
                "https://www.linkedin.com/company/confast-chemicals",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
