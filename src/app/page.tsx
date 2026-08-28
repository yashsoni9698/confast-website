import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProductsGrid } from "@/components/sections/ProductsGrid";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";



import { BrochureSection } from "@/components/sections/BrochureSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

/* Section order alternates surface tone — dark, white, bone — so no two
   neighbouring bands share a background. Previously Services/Products and
   Projects/Testimonials ran into each other with no visual break. */
export default function Home() {
  return (
    <>
      {/* 1 — Hero (ink) */}
      <HeroSection />
      {/* 2 — Proof of scale (white) */}
      <StatsSection />
      {/* 3 — Services (bone) */}
      <ServicesSection />
      {/* 4 — Our Products grid (white) */}
      <ProductsGrid />

      {/* 6 — Projects that prove the specification (bone) */}
      <ProjectShowcase />



      {/* 10 — Download the brochure (ink) */}
      <BrochureSection />
      {/* 11 — Contact (bone) */}
      <ContactSection />
      {/* 12 — Closing CTA band (photographic) */}
      <ClosingCTA />
      {/* Footer is rendered by the root layout */}
    </>
  );
}
