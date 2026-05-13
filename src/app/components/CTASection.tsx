import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div
          className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0F172A 100%)' }}
        >
          {/* Blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 blob-primary opacity-30 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 blob-sky opacity-20 pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-sky text-sm font-600 mb-6">
              <Zap size={13} className="text-amber" />
              Free Forever — No Credit Card
            </div>
            <h2 className="text-section-title font-extrabold text-white mb-5">
              Ready to Create Your First{' '}
              <span className="gradient-text">Professional Invoice?</span>
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
              Join 500+ freelancers and businesses who use Azeel to invoice clients faster and get paid on time.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/invoice-generator" className="btn-primary flex items-center gap-2 text-base px-8 py-4 animate-pulse-glow">
                Create Invoice Now — Free
                <ArrowRight size={18} />
              </Link>
              <Link href="/dashboard" className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all font-600 text-base">
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
