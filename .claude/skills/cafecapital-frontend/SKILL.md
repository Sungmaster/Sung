---
name: cafecapital-frontend
description: Use when building pages, components, or sections for the CafeCapital.vn Next.js project at /home/user/Sung/cafecapital. Covers design tokens, component patterns, animation conventions, TypeScript types, and section structure specific to this codebase.
---

# CafeCapital Frontend

## Overview
CafeCapital.vn is a Vietnamese investment analytics platform. Stack: Next.js App Router, TypeScript strict, TailwindCSS v4 (`@theme inline`), Framer Motion, Lucide React.

## Design Tokens (globals.css `@theme inline`)

| Token | Value | Usage |
|-------|-------|-------|
| `deep-teal` | `#003C3F` | Primary brand, dark backgrounds |
| `dark-teal` | `#062F33` | Footer, darker sections |
| `mid-teal` | `#0E5A5F` | Hover states, accents |
| `gold` | `#DFA15F` | Gold accent, highlights |
| `copper` | `#C8754A` | Secondary accent |
| `cream` | `#F7EFE3` | Light warm backgrounds |
| `soft-gray` | `#F4F5F7` | Cards, hover backgrounds |
| `text-dark` | `#101828` | Body text |
| `text-muted` | `#667085` | Secondary text |
| `positive` | `#12B76A` | Price up, positive signals |
| `negative` | `#F04438` | Price down, negative signals |

**Fonts:** `font-sans` = Be Vietnam Pro, `font-serif` = Cormorant Garamond

## Section Rules

- All page sections: `py-20` (never `py-24` or `py-32`)
- Max width container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Cards: glassmorphism — `backdrop-blur` + `border border-soft-gray` + subtle bg
- No stock images — use gradient placeholders + Lucide icons
- Section headings: serif font for display, sans for body

## "use client" Rule

Add `"use client"` **only** when the component uses `useState`, `useEffect`, `useRef`, or Framer Motion `motion.*`.

Pure display components: no directive needed.

## Animation Patterns

```tsx
// Standard framer-motion whileInView (Server-safe via motion import)
import { motion } from "framer-motion";

// Standard fadeUp helper
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

// Usage
<motion.div {...fadeUp(0.1)}>...</motion.div>
<motion.div {...fadeUp(0.2)}>...</motion.div>
```

## TypeScript Patterns

```ts
// types/about.ts example
export type AboutTabKey = "cafe-cap-news" | "tuyen-dung" | "chuyen-nghe";

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  tag: string;
  imageLabel?: string;
};

export type VisualCard = {
  title: string;
  description?: string;
  imageUrl?: string;
  label?: string;
};
```

Types live in `cafecapital/types/`. Data constants live in `cafecapital/data/`.

## File Conventions

```
cafecapital/
  app/
    <route>/
      page.tsx          # Assembles section components
  components/
    <page>/             # e.g. about/, home/
      SectionName.tsx
  types/
    index.ts            # barrel + shared types
    <page>.ts           # page-specific types
  data/
    mockData.ts         # shared nav/market data
    <page>Data.ts       # page-specific data
```

## Link / URL Conventions

| Page | Route |
|------|-------|
| About / Về chúng tôi | `/about` |
| News | `/tin-moi` |
| Reports | `/bao-cao` |
| Analysis | `/phan-tich` |
| Media | `/media` |
| Login | `/dang-nhap` |
| Register | `/dang-ky` |
| About sub-sections | `/about#cafe-cap-news`, `/about#tuyen-dung`, `/about#chuyen-nghe` |
| Zalo CTA links | `https://zalo.me/cafecapital` |

## Accessibility Rules

- `type="button"` on all `<button>` elements not in forms
- `aria-hidden="true"` on decorative numbers (01, 02, 03)
- `aria-label` on icon-only buttons
- Prefer `<Link href>` for navigation, `<a href target="_blank" rel="noopener noreferrer">` for external

## CTA Pattern (Gold/Teal)

```tsx
// Primary CTA — dark gradient
<Link
  href="https://zalo.me/cafecapital"
  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-full hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200"
  style={{ background: "linear-gradient(135deg, #0E5A5F, #003C3F)" }}
>
  Text <ArrowRight className="w-4 h-4" />
</Link>

// Secondary CTA — gold outline
<Link
  href="/about"
  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gold border border-gold/40 rounded-full hover:bg-gold/10 transition-all duration-200"
>
  Text <ArrowRight className="w-4 h-4" />
</Link>
```

## Card Glassmorphism Pattern

```tsx
<div className="group relative bg-white/60 backdrop-blur-sm border border-soft-gray rounded-2xl p-6 hover:border-gold/30 hover:shadow-lg transition-all duration-300">
  ...
</div>
```

## Dark Section Pattern

```tsx
<section className="bg-dark-teal py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    ...
  </div>
</section>
```

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| `py-24` or `py-32` | Use `py-20` |
| `href="/ve-chung-toi"` | Use `href="/about"` |
| Inline hex colors | Use token e.g. `text-gold`, `bg-deep-teal` |
| Missing `type="button"` | Add to all non-form buttons |
| `viewport={{ once: false }}` | Always `once: true` |
| External link without `rel` | Add `rel="noopener noreferrer"` |
