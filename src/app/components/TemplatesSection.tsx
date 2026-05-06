'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, CheckCircle } from 'lucide-react';

const templates = [
  {
    id: 'tpl-modern',
    name: 'Modern',
    desc: 'Clean gradients, bold typography',
    headerBg: 'gradient-primary',
    headerText: 'text-white',
    accent: 'text-primary',
    tag: 'Most Popular',
    tagColor: 'bg-primary/10 text-primary',
  },
  {
    id: 'tpl-minimal',
    name: 'Minimal',
    desc: 'Pure white, subtle borders',
    headerBg: 'bg-gray-50',
    headerText: 'text-gray-900',
    accent: 'text-gray-700',
    tag: 'Clean',
    tagColor: 'bg-gray-100 text-gray-600',
  },
  {
    id: 'tpl-corporate',
    name: 'Corporate',
    desc: 'Navy header, professional look',
    headerBg: 'bg-navy',
    headerText: 'text-white',
    accent: 'text-navy',
    tag: 'Enterprise',
    tagColor: 'bg-navy/10 text-navy',
  },
  {
    id: 'tpl-elegant',
    name: 'Elegant',
    desc: 'Gold accents, serif styling',
    headerBg: 'bg-amber',
    headerText: 'text-white',
    accent: 'text-amber',
    tag: 'Premium',
    tagColor: 'bg-amber/10 text-amber',
  },
  {
    id: 'tpl-dark',
    name: 'Dark',
    desc: 'Dark background, neon accents',
    headerBg: 'bg-gray-900',
    headerText: 'text-white',
    accent: 'text-sky',
    tag: 'Bold',
    tagColor: 'bg-gray-900/10 text-gray-700',
  },
  {
    id: 'tpl-creative',
    name: 'Creative',
    desc: 'Colorful, playful layout',
    headerBg: 'bg-green',
    headerText: 'text-white',
    accent: 'text-green',
    tag: 'Fun',
    tagColor: 'bg-green/10 text-green',
  },
];

export default function TemplatesSection() {
  const [active, setActive] = useState('tpl-modern');

  return (
    <section id="templates" className="py-20 bg-muted/30">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-600 mb-5">
            <Layers size={13} />
            Invoice Templates
          </div>
          <h2 className="text-section-title font-extrabold text-foreground mb-4">
            6 Professional{' '}
            <span className="gradient-text">Invoice Templates</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Pick a template that matches your brand. Switch instantly — no redesign needed.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6 gap-4">
          {templates?.map((tpl) => (
            <div
              key={tpl?.id}
              onClick={() => setActive(tpl?.id)}
              className={`template-card ${active === tpl?.id ? 'active' : ''} cursor-pointer`}
            >
              {/* Mini preview */}
              <div className="aspect-[3/4] relative overflow-hidden">
                {/* Header */}
                <div className={`${tpl?.headerBg} p-3 flex justify-between items-start`}>
                  <div>
                    <div className={`font-800 text-xs ${tpl?.headerText}`}>INVOICE</div>
                    <div className={`text-xs opacity-60 ${tpl?.headerText}`}>#2026-047</div>
                  </div>
                  <div className={`text-xs font-600 ${tpl?.headerText} opacity-80`}>₹42,500</div>
                </div>
                {/* Body */}
                <div className="p-3 bg-white flex-1">
                  <div className="space-y-1.5">
                    {[70, 55, 65, 50]?.map((w, i) => (
                      <div
                        key={`tpl-line-${tpl?.id}-${i}`}
                        className="h-1.5 rounded-full bg-gray-100"
                        style={{ width: `${w}%` }}
                      />
                    ))}
                    <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between">
                      <div className="h-1.5 w-12 rounded-full bg-gray-100" />
                      <div className={`text-xs font-800 ${tpl?.accent}`}>Total</div>
                    </div>
                  </div>
                </div>
                {/* Active check */}
                {active === tpl?.id && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle size={18} className="text-primary" fill="rgba(37,99,235,0.15)" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-700 text-sm text-foreground">{tpl?.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-600 ${tpl?.tagColor}`}>{tpl?.tag}</span>
                </div>
                <p className="text-xs text-muted-foreground">{tpl?.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/invoice-generator" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3.5">
            Use This Template
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}