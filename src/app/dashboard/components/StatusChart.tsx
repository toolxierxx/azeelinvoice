'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./StatusChartInner'), { ssr: false });

export default function StatusChart({ data }: { data: { status: string; count: number; amount: number }[] }) {
  return <Chart data={data} />;
}