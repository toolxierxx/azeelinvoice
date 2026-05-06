'use client';
import React, { useEffect, useRef } from 'react';
import {
  Zap, Calculator, Download, Printer, Layers, QrCode, Globe, Moon,
  Users, Clock, BarChart2, Smartphone, Cloud, Mail
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const features = [
  {
    id: 'feat-instant',
    icon: Zap,
    title: 'Instant Invoice Generator',
    desc: 'Create professional invoices in under 30 seconds with our smart auto-fill and template engine.',
    color: 'text-amber',
    bg: 'from-amber/15 to-amber/5',
  },
  {
    id: 'feat-gst',
    icon: Calculator,
    title: 'GST Calculator',
    desc: 'Automatic GST/CGST/SGST/IGST calculations with live updates as you type line items.',
    color: 'text-primary',
    bg: 'from-primary/15 to-primary/5',
  },
  {
    id: 'feat-pdf',
    icon: Download,
    title: 'PDF Download',
    desc: 'High-quality A4 PDF export with jsPDF. Multi-page support, crisp fonts, pixel-perfect layout.',
    color: 'text-red',
    bg: 'from-red/15 to-red/5',
  },
  {
    id: 'feat-print',
    icon: Printer,
    title: 'Print Invoice',
    desc: 'One-click browser print with optimized print stylesheet. Works on any printer worldwide.',
    color: 'text-sky',
    bg: 'from-sky/15 to-sky/5',
  },
  {
    id: 'feat-templates',
    icon: Layers,
    title: 'Invoice Templates',
    desc: '6 premium templates — Modern, Minimal, Corporate, Elegant, Dark, Creative. Switch instantly.',
    color: 'text-green',
    bg: 'from-green/15 to-green/5',
  },
  {
    id: 'feat-qr',
    icon: QrCode,
    title: 'QR Payment Support',
    desc: 'Auto-generate UPI QR codes for instant payment collection. Supports PhonePe, GPay, Paytm.',
    color: 'text-primary',
    bg: 'from-primary/15 to-primary/5',
  },
  {
    id: 'feat-currency',
    icon: Globe,
    title: 'Multi Currency',
    desc: 'Support for 30+ currencies including INR, USD, EUR, GBP, AED. Live rate display.',
    color: 'text-amber',
    bg: 'from-amber/15 to-amber/5',
  },
  {
    id: 'feat-dark',
    icon: Moon,
    title: 'Dark Mode',
    desc: 'Elegant dark theme with system detection and persistent preference. Easy on the eyes.',
    color: 'text-sky',
    bg: 'from-sky/15 to-sky/5',
  },
  {
    id: 'feat-clients',
    icon: Users,
    title: 'Client Management',
    desc: 'Save client profiles with billing/shipping addresses. Auto-fill on next invoice.',
    color: 'text-green',
    bg: 'from-green/15 to-green/5',
  },
  {
    id: 'feat-history',
    icon: Clock,
    title: 'Invoice History',
    desc: 'All invoices saved locally. Edit, duplicate, delete, or clone any past invoice in seconds.',
    color: 'text-red',
    bg: 'from-red/15 to-red/5',
  },
  {
    id: 'feat-analytics',
    icon: BarChart2,
    title: 'Analytics Dashboard',
    desc: 'Revenue charts, payment tracking, overdue alerts, and business insights at a glance.',
    color: 'text-primary',
    bg: 'from-primary/15 to-primary/5',
  },
  {
    id: 'feat-mobile',
    icon: Smartphone,
    title: 'Mobile Responsive',
    desc: 'Fully optimized for Android, iPhone, and tablets. Create invoices on the go.',
    color: 'text-amber',
    bg: 'from-amber/15 to-amber/5',
  },
  {
    id: 'feat-cloud',
    icon: Cloud,
    title: 'Cloud Ready',
    desc: 'Offline-first with LocalStorage. Optional cloud sync coming soon for cross-device access.',
    color: 'text-sky',
    bg: 'from-sky/15 to-sky/5',
  },
  {
    id: 'feat-email',
    icon: Mail,
    title: 'Email Sharing',
    desc: 'Share invoices directly via email with a professional HTML template or PDF attachment.',
    color: 'text-green',
    bg: 'from-green/15 to-green/5',
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    const els = sectionRef?.current?.querySelectorAll('.section-reveal') ?? [];
    els?.forEach((el) => obs?.observe(el));
    return () => obs?.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14 section-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-600 mb-5">
            <Zap size={13} />
            Everything You Need
          </div>
          <h2 className="text-section-title font-extrabold text-foreground mb-4">
            Powerful Features,{' '}
            <span className="gradient-text">Zero Complexity</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From instant invoice creation to advanced analytics — every tool a freelancer or small business needs, built into one free platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
          {features?.map((feat, i) => {
            const Icon = feat?.icon;
            return (
              <div
                key={feat?.id}
                className="feature-card section-reveal"
                style={{ transitionDelay: `${(i % 8) * 60}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat?.bg} flex items-center justify-center mb-4`}>
                  <Icon size={22} className={feat?.color} />
                </div>
                <h3 className="font-700 text-foreground mb-2 text-base">{feat?.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat?.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}