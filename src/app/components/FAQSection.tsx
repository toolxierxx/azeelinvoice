'use client';
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    id: 'faq-free',
    q: 'Is Azeel Invoice Easil really free forever?',
    a: 'Yes, the Free plan is genuinely free with no credit card required. You get unlimited invoice creation, 6 templates, PDF download, GST calculator, and LocalStorage-based history — all free, forever.',
  },
  {
    id: 'faq-gst',
    q: 'Does it support GST invoices for Indian businesses?',
    a: 'Absolutely. Azeel supports CGST, SGST, IGST, and UTGST calculations with automatic split based on inter/intra-state transactions. GST Number field is included in the company details.',
  },
  {
    id: 'faq-pdf',
    q: 'How is the PDF generated?',
    a: 'We use jsPDF + html2canvas to render the live invoice preview into a pixel-perfect A4 PDF. The output is high-quality, print-ready, and supports multi-page invoices.',
  },
  {
    id: 'faq-data',
    q: 'Where is my invoice data stored?',
    a: 'All data is stored locally in your browser\'s LocalStorage — no server, no cloud upload on the Free plan. Your data stays private on your device. The Pro plan adds optional encrypted cloud sync.',
  },
  {
    id: 'faq-currency',
    q: 'Which currencies are supported?',
    a: 'The Free plan supports 5 major currencies (INR, USD, EUR, GBP, AED). The Pro plan unlocks 30+ currencies with live exchange rate display.',
  },
  {
    id: 'faq-qr',
    q: 'How does the QR payment feature work?',
    a: 'Enter your UPI ID or bank account details in the invoice form. Azeel auto-generates a UPI-compatible QR code that your client can scan to pay instantly via PhonePe, Google Pay, or Paytm.',
  },
  {
    id: 'faq-mobile',
    q: 'Can I create invoices on my phone?',
    a: 'Yes. Azeel is fully mobile-responsive and works on Android and iOS browsers. The form and preview panels adapt to smaller screens with touch-friendly inputs.',
  },
  {
    id: 'faq-templates',
    q: 'Can I customize the invoice templates?',
    a: 'You can choose from 6 built-in templates and add your company logo, colors, and branding. Deep customization (custom CSS, fonts) is available on the Pro plan.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<string | null>('faq-free');

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-600 mb-5">
            <HelpCircle size={13} />
            FAQ
          </div>
          <h2 className="text-section-title font-extrabold text-foreground mb-4">
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Everything you need to know about Azeel Invoice Easil.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs?.map((faq) => (
            <div key={faq?.id} className="faq-item">
              <button
                onClick={() => setOpen(open === faq?.id ? null : faq?.id)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
              >
                <span className="font-600 text-foreground text-sm pr-4">{faq?.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-muted-foreground shrink-0 transition-transform duration-300 ${
                    open === faq?.id ? 'rotate-180 text-primary' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === faq?.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq?.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}