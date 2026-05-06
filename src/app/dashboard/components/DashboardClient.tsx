'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  TrendingUp, FileText, Clock, AlertTriangle, Users,
  Plus, Search, Filter, Download, RefreshCw, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { mockInvoices, revenueChartData, statusChartData, activityFeed } from './dashboardData';
import RevenueChart from './RevenueChart';
import StatusChart from './StatusChart';
import ActivityFeed from './ActivityFeed';
import InvoiceTable from './InvoiceTable';
import Icon from '@/components/ui/AppIcon';


const kpiCards = [
  {
    id: 'kpi-revenue',
    label: 'Total Revenue',
    value: '₹11,20,400',
    sub: '+18.4% vs last month',
    trend: 'up',
    icon: TrendingUp,
    iconBg: 'from-primary/15 to-primary/5',
    iconColor: 'text-primary',
    trendColor: 'text-green',
    badge: 'All time',
  },
  {
    id: 'kpi-paid',
    label: 'Paid Invoices',
    value: '42',
    sub: '₹11,20,400 collected',
    trend: 'up',
    icon: FileText,
    iconBg: 'from-green/15 to-green/5',
    iconColor: 'text-green',
    trendColor: 'text-green',
    badge: 'This month',
  },
  {
    id: 'kpi-pending',
    label: 'Pending Amount',
    value: '₹2,27,700',
    sub: '14 invoices awaiting',
    trend: 'neutral',
    icon: Clock,
    iconBg: 'from-amber/15 to-amber/5',
    iconColor: 'text-amber',
    trendColor: 'text-amber',
    badge: 'Action needed',
  },
  {
    id: 'kpi-overdue',
    label: 'Overdue',
    value: '₹2,24,500',
    sub: '5 invoices past due',
    trend: 'down',
    icon: AlertTriangle,
    iconBg: 'from-red/15 to-red/5',
    iconColor: 'text-red',
    trendColor: 'text-red',
    badge: 'Urgent',
  },
  {
    id: 'kpi-clients',
    label: 'Total Clients',
    value: '38',
    sub: '+3 new this month',
    trend: 'up',
    icon: Users,
    iconBg: 'from-sky/15 to-sky/5',
    iconColor: 'text-sky',
    trendColor: 'text-green',
    badge: 'Growing',
  },
];

export default function DashboardClient() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);

  const filtered = useMemo(() => {
    return mockInvoices?.filter((inv) => {
      const matchSearch =
        !search ||
        inv?.clientName?.toLowerCase()?.includes(search?.toLowerCase()) ||
        inv?.invoiceNumber?.toLowerCase()?.includes(search?.toLowerCase());
      const matchStatus = statusFilter === 'all' || inv?.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const handleRefresh = () => {
    setRefreshing(true);
    // TODO: Backend — GET /api/invoices to refresh dashboard data
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-extrabold text-2xl text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Welcome back — here's your invoice overview for May 2026
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                title="Refresh dashboard data"
              >
                <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-600 text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                <Download size={15} />
                Export
              </button>
              <Link
                href="/invoice-generator"
                className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5"
              >
                <Plus size={15} />
                New Invoice
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-8 space-y-8">
        {/* KPI Cards — 5 cards: hero spans 2 cols + 4 regular */}
        {/* Grid plan: grid-cols-4, row 1: revenue spans 2 + paid + pending, row 2: overdue + clients + (spacer) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {/* Hero card — spans 2 cols */}
          <div className="kpi-card lg:col-span-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 blob-primary opacity-20 pointer-events-none" />
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${kpiCards?.[0]?.iconBg} flex items-center justify-center`}>
                <TrendingUp size={22} className={kpiCards?.[0]?.iconColor} />
              </div>
              <span className="text-xs font-600 px-2 py-1 rounded-full bg-primary/10 text-primary">{kpiCards?.[0]?.badge}</span>
            </div>
            <div className="text-xs font-600 text-muted-foreground uppercase tracking-wider mb-1">{kpiCards?.[0]?.label}</div>
            <div className="text-4xl font-extrabold text-foreground tabular-nums mb-2">{kpiCards?.[0]?.value}</div>
            <div className="flex items-center gap-1.5 text-sm">
              <ArrowUpRight size={14} className="text-green" />
              <span className="text-green font-600">{kpiCards?.[0]?.sub}</span>
            </div>
          </div>

          {/* Regular cards */}
          {kpiCards?.slice(1)?.map((card) => {
            const Icon = card?.icon;
            return (
              <div key={card?.id} className="kpi-card">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card?.iconBg} flex items-center justify-center`}>
                    <Icon size={19} className={card?.iconColor} />
                  </div>
                  <span className={`text-xs font-600 px-2 py-0.5 rounded-full ${
                    card?.id === 'kpi-overdue' ? 'bg-red/10 text-red' :
                    card?.id === 'kpi-pending'? 'bg-amber/10 text-amber' : 'bg-muted text-muted-foreground'
                  }`}>{card?.badge}</span>
                </div>
                <div className="text-xs font-600 text-muted-foreground uppercase tracking-wider mb-1">{card?.label}</div>
                <div className="text-2xl font-extrabold text-foreground tabular-nums mb-1.5">{card?.value}</div>
                <div className={`flex items-center gap-1 text-xs font-500 ${card?.trendColor}`}>
                  {card?.trend === 'up' ? <ArrowUpRight size={12} /> : card?.trend === 'down' ? <ArrowDownRight size={12} /> : null}
                  {card?.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-700 text-foreground">Revenue Trend</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Monthly revenue — last 7 months</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  Revenue
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky" />
                  Invoices
                </div>
              </div>
            </div>
            <RevenueChart data={revenueChartData} />
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="mb-6">
              <h3 className="font-700 text-foreground">Invoice Status</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Breakdown by payment status</p>
            </div>
            <StatusChart data={statusChartData} />
          </div>
        </div>

        {/* Table + Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
          {/* Invoice Table */}
          <div className="xl:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h3 className="font-700 text-foreground">Recent Invoices</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{filtered?.length} of {mockInvoices?.length} invoices</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Search */}
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search invoices..."
                    value={search}
                    onChange={(e) => setSearch(e?.target?.value)}
                    className="pl-8 pr-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all w-48"
                  />
                </div>
                {/* Filter */}
                <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                  {['all', 'paid', 'pending', 'overdue', 'draft']?.map((s) => (
                    <button
                      key={`filter-${s}`}
                      onClick={() => setStatusFilter(s)}
                      className={`px-3 py-1 rounded-md text-xs font-600 transition-all capitalize ${
                        statusFilter === s
                          ? 'bg-card text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <InvoiceTable invoices={filtered} />
          </div>

          {/* Activity Feed */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-700 text-foreground">Recent Activity</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Latest invoice events</p>
            </div>
            <ActivityFeed items={activityFeed} />
          </div>
        </div>
      </div>
    </div>
  );
}