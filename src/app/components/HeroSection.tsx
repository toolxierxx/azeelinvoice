'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, CheckCircle, Star, Zap, Shield, TrendingUp } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const trustBadges = [
  { icon: CheckCircle, text: 'No Credit Card' },
  { icon: Zap, text: 'Instant Setup' },
  { icon: Shield, text: 'Bank-grade Security' },
];

const floatingCards = [
  {
    id: 'card-revenue',
    label: 'Total Revenue',
    value: '₹4,82,500',
    sub: '+18.4% this month',
    color: 'from-green/20 to-green/5',
    accent: 'text-green',
    icon: TrendingUp,
    style: { top: '8%', right: '-5%' },
  },
  {
    id: 'card-invoices',
    label: 'Invoices Sent',
    value: '1,284',
    sub: '47 pending review',
    color: 'from-primary/20 to-primary/5',
    accent: 'text-primary',
    icon: CheckCircle,
    style: { bottom: '20%', right: '-8%' },
  },
  {
    id: 'card-rating',
    label: 'Customer Rating',
    value: '4.9 / 5.0',
    sub: '12,400+ reviews',
    color: 'from-amber/20 to-amber/5',
    accent: 'text-amber',
    icon: Star,
    style: { bottom: '5%', left: '5%' },
  },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const els = sectionRef?.current?.querySelectorAll('.section-reveal') ?? [];
    els?.forEach((el) => obs?.observe(el));
    return () => obs?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 45%, #0F172A 100%)',
      }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 blob-primary opacity-30 animate-spin-slow" />
        <div className="absolute bottom-20 right-10 w-80 h-80 blob-sky opacity-25 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blob-primary opacity-10" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 pt-24 pb-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Left */}
          <div className="section-reveal">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-sky text-sm font-600 mb-8 backdrop-blur-sm">
              <Zap size={14} className="text-amber" />
              <span>Trusted by 50,000+ businesses worldwide</span>
            </div>

            <h1 className="text-hero-xl font-extrabold text-white mb-6 leading-tight">
              Generate{' '}
              <span className="gradient-text">Beautiful</span>
              {' '}Professional Invoices{' '}
              <span className="text-sky">in Seconds</span>
            </h1>

            <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-xl">
              Create GST-ready, multi-currency invoices with live preview, PDF export, and a full analytics dashboard. Free forever. No credit card required.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mb-10">
              {trustBadges?.map((b) => {
                const Icon = b?.icon;
                return (
                  <div key={`trust-${b?.text}`} className="flex items-center gap-2 text-sm text-white/70">
                    <Icon size={16} className="text-green" />
                    {b?.text}
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/invoice-generator"
                className="btn-primary flex items-center gap-2 text-base px-7 py-3.5 animate-pulse-glow"
              >
                Create Invoice Free
                <ArrowRight size={18} />
              </Link>
              <button className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all font-600 text-base">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Play size={14} fill="white" />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['user-1', 'user-2', 'user-3', 'user-4', 'user-5']?.map((u, i) => (
                  <div
                    key={`avatar-${u}`}
                    className="w-8 h-8 rounded-full border-2 border-navy flex items-center justify-center text-xs font-700 text-white"
                    style={{
                      background: `hsl(${i * 60 + 200}, 70%, 50%)`,
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-amber text-sm">★★★★★</div>
                <div className="text-xs text-white/50">4.9/5 from 12,400+ reviews</div>
              </div>
            </div>
          </div>

          {/* Right — Invoice Mockup */}
          <div className="relative section-reveal delay-300 hidden lg:block">
            <div className="relative">
              {/* Main invoice card */}
              <div className="invoice-preview-shadow rounded-2xl overflow-hidden bg-white float-animation mx-auto max-w-md">
                {/* Invoice header */}
                <div className="gradient-primary p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-extrabold text-xl mb-0.5">INVOICE</div>
                      <div className="text-white/70 text-sm">#AZL-2026-0847</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-white/60 mb-0.5">Due Date</div>
                      <div className="font-700 text-sm">15 Jun, 2026</div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-xs text-white/60 mb-0.5">From</div>
                      <div className="font-600 text-sm">Azeel Technologies</div>
                      <div className="text-xs text-white/60">GST: 27AADCA2354Q1Z5</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-white/60 mb-0.5">To</div>
                      <div className="font-600 text-sm">Nexus Corp Pvt Ltd</div>
                      <div className="text-xs text-white/60">Mumbai, MH</div>
                    </div>
                  </div>
                </div>

                {/* Line items */}
                <div className="p-5 bg-white">
                  <div className="text-xs font-700 text-gray-400 uppercase tracking-wider mb-3 grid grid-cols-4 gap-2">
                    <span className="col-span-2">Description</span>
                    <span className="text-right">Qty</span>
                    <span className="text-right">Amount</span>
                  </div>
                  {[
                    { desc: 'UI/UX Design Services', qty: 1, amt: '₹45,000' },
                    { desc: 'Frontend Development', qty: 3, amt: '₹1,20,000' },
                    { desc: 'API Integration', qty: 2, amt: '₹40,000' },
                  ]?.map((item, i) => (
                    <div key={`mock-item-${i}`} className="grid grid-cols-4 gap-2 py-2 border-b border-gray-100 text-sm text-gray-700">
                      <span className="col-span-2 font-500 truncate">{item?.desc}</span>
                      <span className="text-right text-gray-500">{item?.qty}</span>
                      <span className="text-right font-600">{item?.amt}</span>
                    </div>
                  ))}

                  <div className="mt-4 space-y-1.5 text-sm">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span className="tabular-nums">₹2,05,000</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>GST (18%)</span>
                      <span className="tabular-nums">₹36,900</span>
                    </div>
                    <div className="flex justify-between font-800 text-base text-gray-900 border-t border-gray-200 pt-2 mt-2">
                      <span>Total</span>
                      <span className="tabular-nums text-primary">₹2,41,900</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <div className="flex-1 py-2 rounded-lg text-center text-xs font-700 status-paid">✓ PAID</div>
                    <button className="flex-1 py-2 rounded-lg gradient-primary text-white text-xs font-700">
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              {floatingCards?.map((card) => {
                const Icon = card?.icon;
                return (
                  <div
                    key={card?.id}
                    className={`absolute glass rounded-xl p-3 min-w-[160px] float-animation-delay`}
                    style={card?.style}
                  >
                    <div className={`flex items-center gap-2 bg-gradient-to-br ${card?.color} rounded-lg p-2.5`}>
                      <Icon size={16} className={card?.accent} />
                      <div>
                        <div className="text-xs text-muted-foreground font-500">{card?.label}</div>
                        <div className={`font-800 text-sm ${card?.accent} tabular-nums`}>{card?.value}</div>
                        <div className="text-xs text-muted-foreground">{card?.sub}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="var(--background)" />
        </svg>
      </div>
    </section>
  );
}