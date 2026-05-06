# Azeel Invoice Easil

> **Create Professional Invoices in Seconds**

A full-featured, production-ready Invoice Generator SaaS built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Includes a real-time invoice editor, live A4 preview, PDF export, analytics dashboard, 6 switchable templates, GST calculations, QR code payments, and localStorage persistence.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Production Build](#production-build)
- [Deployment](#deployment)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15.1.11 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 |
| Charts | Recharts 2 |
| PDF Export | jsPDF + html2canvas |
| QR Codes | qrcode |
| Icons | Heroicons + Lucide React |
| Runtime | Node.js 18+ |

---

## Prerequisites

Before running the project locally, make sure you have the following installed:

- **Node.js** v18.0.0 or higher — [Download](https://nodejs.org/)
- **npm** v9.0.0 or higher (bundled with Node.js)

Verify your versions:

```bash
node --version   # Should be v18+
npm --version    # Should be v9+
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd azeelinvoice
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages including Next.js, React, Tailwind CSS, jsPDF, Recharts, and all other dependencies listed in `package.json`.

### 3. Set Up Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Or create a `.env` file manually in the project root (see [Environment Variables](#environment-variables) section below).

### 4. Start the Development Server

```bash
npm run dev
```

The app will be available at: **[http://localhost:4028](http://localhost:4028)**

The development server supports:
- Hot Module Replacement (HMR) — changes reflect instantly
- Fast Refresh for React components
- TypeScript type checking

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Supabase (optional — for cloud persistence)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# AI Integrations (optional)
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
PERPLEXITY_API_KEY=your-perplexity-api-key

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX

# Stripe (optional — for payment features)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXX

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:4028
```

> **Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put secret keys in `NEXT_PUBLIC_` variables.
>
> The core invoice generator, PDF export, dashboard, and all local features work **without any environment variables** — they use localStorage for data persistence.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port **4028** |
| `npm run build` | Build the application for production |
| `npm run serve` | Start the production server (run after `build`) |
| `npm run lint` | Run ESLint to check code quality |
| `npm run lint:fix` | Automatically fix ESLint issues |
| `npm run format` | Format all source files with Prettier |
| `npm run type-check` | Run TypeScript compiler check without emitting files |

---

## Project Structure

```
azeelinvoice/
├── public/
│   ├── assets/
│   │   └── images/          # Static images and app logo
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx          # Home / Landing page
│   │   ├── not-found.tsx     # 404 page
│   │   ├── components/       # Home page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── TemplatesSection.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   └── CTASection.tsx
│   │   ├── invoice-generator/
│   │   │   ├── page.tsx      # Invoice Generator route (/invoice-generator)
│   │   │   └── components/
│   │   │       ├── InvoiceGeneratorClient.tsx
│   │   │       ├── InvoiceForm.tsx
│   │   │       ├── InvoicePreview.tsx
│   │   │       ├── TemplateSelector.tsx
│   │   │       └── invoiceTypes.ts
│   │   └── dashboard/
│   │       ├── page.tsx      # Dashboard route (/dashboard)
│   │       └── components/
│   │           ├── DashboardClient.tsx
│   │           ├── RevenueChart.tsx
│   │           ├── StatusChart.tsx
│   │           ├── InvoiceTable.tsx
│   │           ├── ActivityFeed.tsx
│   │           └── dashboardData.ts
│   ├── components/
│   │   ├── Navbar.tsx        # Global sticky navigation
│   │   ├── Footer.tsx        # Global footer
│   │   └── ui/
│   │       ├── AppImage.tsx
│   │       ├── AppIcon.tsx
│   │       └── AppLogo.tsx
│   └── styles/
│       ├── index.css         # Global base styles
│       └── tailwind.css      # Tailwind directives & CSS variables
├── .env                      # Environment variables (create this locally)
├── next.config.mjs           # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── postcss.config.js         # PostCSS configuration
└── package.json              # Dependencies and scripts
```

---

## Key Features

### 🧾 Invoice Generator (`/invoice-generator`)
- Company & client detail forms
- Dynamic line items with quantity, unit price, tax %, and discount
- Real-time GST / tax calculations
- Auto-generated invoice numbers
- Currency selector (multi-currency support)
- 6 switchable invoice templates (Modern, Minimal, Corporate, Elegant, Dark, Creative)
- Live A4 invoice preview panel
- PDF export via jsPDF + html2canvas
- QR code payment generation
- Drag-and-drop logo upload
- Save, edit, duplicate, and delete invoices via localStorage

### 📊 Dashboard (`/dashboard`)
- KPI cards: Total Revenue, Paid, Pending, Overdue, Total Clients
- Revenue trend chart (Recharts AreaChart)
- Invoice status distribution chart (Recharts BarChart)
- Searchable and filterable invoice table (by status, date, amount)
- Pagination and row-level actions
- Live activity feed

### 🏠 Home / Landing Page (`/`)
- Hero section with animated invoice mockup
- Features section with 14 feature cards
- Template showcase
- Pricing tiers
- FAQ accordion
- Stats section
- CTA section

---

## Production Build

### Build for Production

```bash
npm run build
```

This compiles and optimizes the application:
- TypeScript compilation
- Static page generation
- CSS purging and minification
- Image optimization
- Bundle splitting and tree-shaking

Build output is placed in the `.next/` directory.

### Run the Production Server

```bash
npm run serve
```

The production server starts on port **3000** by default (or the port configured in your environment).

### Verify the Build Locally

```bash
npm run build && npm run serve
```

Then open [http://localhost:3000](http://localhost:3000) to verify the production build.

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Next.js and configures the build.

### Netlify

The project includes `@netlify/plugin-nextjs`. Connect your repository in the Netlify dashboard and set:

- **Build command:** `npm run build`
- **Publish directory:** `.next`

Add your environment variables in the Netlify dashboard under **Site Settings → Environment Variables**.

### Self-Hosted / VPS

```bash
npm run build
npm run serve
```

Use a process manager like **PM2** to keep the server running:

```bash
npm install -g pm2
pm2 start "npm run serve" --name azeel-invoice
pm2 save
```

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/en-US/)
- [jsPDF Documentation](https://artskydj.github.io/jsPDF/docs/)

---

Built with ❤️ on [Rocket.new](https://rocket.new)