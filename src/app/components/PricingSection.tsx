'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Zap, Crown } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const plans = [
  {
    id: 'plan-free',
    name: 'Free Forever',
    price: { monthly: 0, yearly: 0 },
    desc: 'Perfect for freelancers and individuals',
    icon: Zap,
    iconColor: 'text-green',
    iconBg: 'from-green/15 to-green/5',
    featured: false,
    cta: 'Get Started Free',
    features: [
      'Unlimited invoices',
      '6 invoice templates',
      'PDF download & print',
      'GST calculator',
      'LocalStorage save',
      'QR payment support',
      'Multi-currency (5)',
      'Dark mode',
      'Mobile responsive',
      'Basic analytics',
    ],
  },
  {
    id: 'plan-pro',
    name: 'Pro',
    price: { monthly: 499, yearly: 399 },
    desc: 'For growing businesses and agencies',
    icon: Crown,
    iconColor: 'text-amber',
    iconBg: 'from-amber/15 to-amber/5',
    featured: true,
    cta: 'Start Pro Trial',
    badge: 'Most Popular',
    features: [
      'Everything in Free',
      'Cloud sync & backup',
      'Email invoice sharing',
      'Custom branding & logo',
      'Client management (CRM)',
      'Multi-currency (30+)',
      'Advanced analytics',
      'Recurring invoices',
      'Expense tracker',
      'Priority support',
    ],
  },
  {
    id: 'plan-business',
    name: 'Business',
    price: { monthly: 1299, yearly: 999 },
    desc: 'For teams and established companies',
    icon: Crown,
    iconColor: 'text-primary',
    iconBg: 'from-primary/15 to-primary/5',
    featured: false,
    cta: 'Contact Sales',
    features: [
      'Everything in Pro',
      'Team collaboration (5 seats)',
      'API access',
      'White-label invoices',
      'Custom domain',
      'Bulk invoice generation',
      'Tax filing integration',
      'Dedicated account manager',
      'SLA uptime guarantee',
      'Custom integrations',
    ],
  },
];

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-600 mb-5">
            <Zap size={13} />
            Simple Pricing
          </div>
          <h2 className="text-section-title font-extrabold text-foreground mb-4">
            Start Free,{' '}
            <span className="gradient-text">Scale as You Grow</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            No hidden fees. Cancel anytime. The free plan is genuinely free — forever.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-muted rounded-xl p-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-lg text-sm font-600 transition-all ${!yearly ? 'bg-card text-foreground shadow-card' : 'text-muted-foreground'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-lg text-sm font-600 transition-all flex items-center gap-2 ${yearly ? 'bg-card text-foreground shadow-card' : 'text-muted-foreground'}`}
            >
              Yearly
              <span className="text-xs bg-green/15 text-green px-2 py-0.5 rounded-full font-700">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans?.map((plan) => {
            const Icon = plan?.icon;
            const price = yearly ? plan?.price?.yearly : plan?.price?.monthly;
            return (
              <div key={plan?.id} className={`pricing-card ${plan?.featured ? 'featured' : ''} relative`}>
                {plan?.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full gradient-primary text-white text-xs font-700 shadow-lg">
                      {plan?.badge}
                    </span>
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan?.iconBg} flex items-center justify-center mb-4`}>
                  <Icon size={22} className={plan?.iconColor} />
                </div>
                <h3 className="font-800 text-xl text-foreground mb-1">{plan?.name}</h3>
                <p className="text-sm text-muted-foreground mb-5">{plan?.desc}</p>
                <div className="mb-6">
                  {price === 0 ? (
                    <div className="text-4xl font-extrabold text-foreground">Free</div>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-lg text-muted-foreground">₹</span>
                      <span className="text-4xl font-extrabold text-foreground tabular-nums">{price}</span>
                      <span className="text-muted-foreground text-sm mb-1">/mo</span>
                    </div>
                  )}
                </div>
                <Link
                  href="/invoice-generator"
                  className={`block text-center py-3 rounded-xl font-700 text-sm mb-6 transition-all ${
                    plan?.featured
                      ? 'btn-primary' :'border-2 border-border hover:border-primary hover:text-primary text-foreground'
                  }`}
                >
                  {plan?.cta}
                </Link>
                <ul className="space-y-2.5">
                  {plan?.features?.map((feat) => (
                    <li key={`${plan?.id}-feat-${feat?.slice(0, 20)}`} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle size={15} className="text-green mt-0.5 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}