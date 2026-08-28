# CONFAST Chemicals — Premium Website Setup Guide

## 🚀 Quick Start

```bash
# Navigate to project
cd "C:\Users\yash\Downloads\Confast New\confast-website"

# Install dependencies (already done)
npm install

# Start development server
npm run dev
# Opens at http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout (Header + Footer)
│   ├── about/page.tsx      # About page
│   ├── products/
│   │   ├── page.tsx        # Products listing
│   │   └── [slug]/page.tsx # Individual product pages
│   ├── projects/page.tsx   # Projects showcase
│   ├── gallery/page.tsx    # Image gallery
│   ├── services/page.tsx   # Services page
│   ├── contact/page.tsx    # Contact page
│   ├── quote/page.tsx      # Quote request form
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── robots.ts           # robots.txt
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Sticky glass header with nav
│   │   └── Footer.tsx      # Premium footer
│   ├── sections/           # Homepage sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── WhyChooseSection.tsx
│   │   ├── ProductsSection.tsx
│   │   ├── ApplicationsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTASection.tsx
│   └── ui/
│       └── FloatingActions.tsx  # WhatsApp/Call/Quote/ScrollTop
├── data/
│   └── products.json       # All product data (edit here)
├── types/index.ts          # TypeScript interfaces
└── lib/utils.ts            # Utility functions
public/
└── images/
    └── products/           # Add product images here
```

---

## 🎨 Brand Colors

| Color | Hex |
|-------|-----|
| Primary Orange | `#F59E0B` |
| Dark Charcoal | `#1F1F1F` |
| White | `#FFFFFF` |
| Light Gray | `#F7F7F7` |
| Text | `#333333` |

---

## 📦 Adding Products

Edit `src/data/products.json` to add/modify products. Each product has:
- `id` — URL slug (e.g., `block-fix`)
- `name`, `tagline`, `category`, `type`
- `image`, `heroImage` — paths in `/public/images/products/`
- `shortDescription`, `fullDescription`
- `features`, `benefits`, `applications`, `suitableFor`
- `coverage`, `packSize`, `shelfLife`, `color_field`
- `technicalSpecs` — array of `{parameter, value}`
- `faqs` — array of `{question, answer}`

---

## 🖼 Adding Images

Place actual product images in:
```
public/images/products/block-fix.jpg
public/images/products/tileset-11.jpg
... etc.
```

Update the product cards in `ProductsSection.tsx` and product pages to use `<Image>` from next/image instead of the placeholder icons.

---

## 📞 Contact Details to Update

1. Phone number: Search for `+91 XXXX XXXXXX` and replace with actual number
2. Email: Replace `info@confastchemicals.com` with actual email
3. WhatsApp: Update `91XXXXXXXXXX` in FloatingActions and CTASection
4. Address: Update in Footer.tsx and Contact page
5. Google verification: Update in layout.tsx

---

## 🔧 Technical Stack

- **Next.js 16** — App Router, TypeScript
- **Tailwind CSS v4** — Utility-first styling
- **GSAP** — Premium scroll animations
- **Framer Motion** — UI interactions
- **Lucide React** — Icons
- **React Hook Form + Zod** — Form validation (ready to wire up)

---

## 🌐 SEO

- Meta titles/descriptions on all pages
- Open Graph + Twitter cards
- JSON-LD schema (Organization)
- Auto-generated sitemap.xml
- robots.txt
- Canonical URLs via Next.js layout

---

## 📈 Performance

- Static generation for all pages
- Image lazy loading (Next.js Image)
- Code splitting via dynamic imports
- Tailwind CSS purging for minimal CSS

---

## 🚀 Deployment

Deploy to Vercel (recommended):
```bash
npm install -g vercel
vercel --prod
```

Or Netlify, AWS Amplify, etc.
