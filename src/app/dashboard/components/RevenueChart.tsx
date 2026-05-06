'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./RevenueChartInner'), { ssr: false });

export default function RevenueChart({ data }: { data: { month: string; revenue: number; invoices: number }[] }) {
  return <Chart data={data} />;
}