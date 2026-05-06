import React from 'react';
import Navbar from '@/components/Navbar';
import DashboardClient from './components/DashboardClient';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <DashboardClient />
      </div>
    </main>
  );
}