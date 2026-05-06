'use client';
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

interface DataPoint {
  status: string;
  count: number;
  amount: number;
}

const barColors: Record<string, string> = {
  Paid: 'var(--accent)',
  Pending: 'var(--amber)',
  Overdue: 'var(--red)',
  Draft: 'var(--muted-foreground)',
};

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; payload: DataPoint }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-card-hover text-sm">
      <div className="font-700 text-foreground mb-1">{label}</div>
      <div className="text-muted-foreground">Count: <span className="font-600 text-foreground">{d.count}</span></div>
      <div className="text-muted-foreground">Amount: <span className="font-600 text-foreground tabular-nums">₹{d.amount.toLocaleString('en-IN')}</span></div>
    </div>
  );
}

export default function StatusChartInner({ data }: { data: DataPoint[] }) {
  return (
    <div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }} barSize={36}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="status"
            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            width={25}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry) => (
              <Cell key={`cell-${entry.status}`} fill={barColors[entry.status] || 'var(--primary)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.map((d) => (
          <div key={`legend-${d.status}`} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: barColors[d.status] }} />
              <span className="text-muted-foreground">{d.status}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{d.count} inv</span>
              <span className="font-600 text-foreground tabular-nums text-xs">₹{(d.amount / 1000).toFixed(0)}K</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}