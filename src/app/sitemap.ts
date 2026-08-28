import { MetadataRoute } from "next";
import productsData from "@/data/products.json";

const products = productsData as Array<{ id: string }>;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.confastchemicals.com";

  const staticPages = [
    { url: `${base}/`, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${base}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/products`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/projects`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/gallery`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/services`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/quote`, changeFrequency: "monthly" as const, priority: 0.9 },
  ];

  const productPages = products.map((p) => ({
    url: `${base}/products/${p.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
