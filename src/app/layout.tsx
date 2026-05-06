import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../styles/tailwind.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Free Professional Invoice Generator | Azeel Invoice Easil',
  description:
    'Create professional invoices in seconds with Azeel Invoice Easil. Free GST invoice generator, PDF download, multi-currency, templates, and analytics dashboard for freelancers and small businesses.',
  keywords:
    'invoice generator, free invoice maker, GST invoice generator, professional invoice creator, invoice SaaS, billing software, online invoice tool, PDF invoice generator',
  openGraph: {
    title: 'Free Professional Invoice Generator | Azeel Invoice Easil',
    description:
      'Create professional invoices in seconds. Free GST support, PDF export, multi-currency, and analytics.',
    type: 'website',
    siteName: 'Azeel Invoice Easil',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Professional Invoice Generator | Azeel Invoice Easil',
    description: 'Create beautiful professional invoices in seconds — free forever.',
  },
  icons: { icon: [{ url: '/favicon.ico', type: 'image/x-icon' }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className={plusJakarta.className}>{children}

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fazeelinvoi3508back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.18" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
    </html>
  );
}