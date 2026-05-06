'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Users, FileText, Globe, Award, TrendingUp, Clock } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const stats = [
  { id: 'stat-users', icon: Users, value: 52400, suffix: '+', label: 'Active Users', color: 'text-primary' },
  { id: 'stat-invoices', icon: FileText, value: 2100000, suffix: '+', label: 'Invoices Created', color: 'text-sky' },
  { id: 'stat-countries', icon: Globe, value: 87, suffix: '', label: 'Countries Supported', color: 'text-green' },
  { id: 'stat-rating', icon: Award, value: 4.9, suffix: '/5', label: 'Average Rating', color: 'text-amber' },
  { id: 'stat-revenue', icon: TrendingUp, value: 480, suffix: 'Cr+', label: 'Revenue Tracked', color: 'text-red' },
  { id: 'stat-time', icon: Clock, value: 30, suffix: 'sec', label: 'Avg. Invoice Time', color: 'text-primary' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(current));
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  const formatted = target >= 1000000
    ? (count / 1000000).toFixed(1) + 'M'
    : target >= 1000
    ? (count / 1000).toFixed(0) + 'K'
    : target < 10
    ? count.toFixed(1)
    : count.toFixed(0);

  return <span ref={ref} className="tabular-nums">{formatted}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="kpi-card text-center group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon size={20} className={stat.color} />
                </div>
                <div className={`text-2xl font-extrabold mb-1 ${stat.color}`}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted-foreground font-500">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}