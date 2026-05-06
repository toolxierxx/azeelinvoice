'use client';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
  month: string;
  revenue: number;
  invoices: number;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-card-hover text-sm">
      <div className="font-700 text-foreground mb-2">{label}</div>
      {payload.map((p) => (
        <div key={`tooltip-${p.name}`} className="flex items-center gap-2 text-muted-foreground">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="capitalize">{p.name}:</span>
          <span className="font-600 text-foreground tabular-nums">
            {p.name === 'revenue' ? `₹${p.value.toLocaleString('en-IN')}` : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function RevenueChartInner({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradInvoices" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.25} />
            <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="revenue"
          orientation="left"
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
          width={55}
        />
        <YAxis
          yAxisId="invoices"
          orientation="right"
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
          width={30}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          yAxisId="revenue"
          type="monotone"
          dataKey="revenue"
          stroke="var(--primary)"
          strokeWidth={2.5}
          fill="url(#gradRevenue)"
          dot={{ fill: 'var(--primary)', strokeWidth: 0, r: 3 }}
          activeDot={{ r: 5, fill: 'var(--primary)' }}
        />
        <Area
          yAxisId="invoices"
          type="monotone"
          dataKey="invoices"
          stroke="var(--secondary)"
          strokeWidth={2}
          fill="url(#gradInvoices)"
          dot={{ fill: 'var(--secondary)', strokeWidth: 0, r: 3 }}
          activeDot={{ r: 5, fill: 'var(--secondary)' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}