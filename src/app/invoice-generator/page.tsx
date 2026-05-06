import React from 'react';
import Navbar from '@/components/Navbar';
import InvoiceGeneratorClient from './components/InvoiceGeneratorClient';

export default function InvoiceGeneratorPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <InvoiceGeneratorClient />
      </div>
    </main>
  );
}