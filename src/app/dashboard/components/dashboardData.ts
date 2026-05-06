export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  date: string;
  dueDate: string;
  currency: string;
}

export const mockInvoices: InvoiceRecord[] = [
  { id: 'inv-001', invoiceNumber: 'AZL-2026-0847', clientName: 'Nexus Corp Pvt Ltd', amount: 241900, status: 'paid', date: '2026-04-01', dueDate: '2026-05-01', currency: 'INR' },
  { id: 'inv-002', invoiceNumber: 'AZL-2026-0846', clientName: 'Skyline Ventures', amount: 85000, status: 'pending', date: '2026-04-05', dueDate: '2026-05-05', currency: 'INR' },
  { id: 'inv-003', invoiceNumber: 'AZL-2026-0845', clientName: 'Meridian Solutions', amount: 132500, status: 'overdue', date: '2026-03-15', dueDate: '2026-04-15', currency: 'INR' },
  { id: 'inv-004', invoiceNumber: 'AZL-2026-0844', clientName: 'Apex Digital Agency', amount: 67200, status: 'paid', date: '2026-04-10', dueDate: '2026-05-10', currency: 'INR' },
  { id: 'inv-005', invoiceNumber: 'AZL-2026-0843', clientName: 'Prism Technologies', amount: 198000, status: 'paid', date: '2026-04-12', dueDate: '2026-05-12', currency: 'INR' },
  { id: 'inv-006', invoiceNumber: 'AZL-2026-0842', clientName: 'Orbit Media Works', amount: 44500, status: 'pending', date: '2026-04-15', dueDate: '2026-05-15', currency: 'INR' },
  { id: 'inv-007', invoiceNumber: 'AZL-2026-0841', clientName: 'Granite Infra Ltd', amount: 315000, status: 'paid', date: '2026-04-18', dueDate: '2026-05-18', currency: 'INR' },
  { id: 'inv-008', invoiceNumber: 'AZL-2026-0840', clientName: 'BlueStar Consulting', amount: 92000, status: 'overdue', date: '2026-03-20', dueDate: '2026-04-20', currency: 'INR' },
  { id: 'inv-009', invoiceNumber: 'AZL-2026-0839', clientName: 'Vivid Creatives', amount: 38500, status: 'draft', date: '2026-04-22', dueDate: '2026-05-22', currency: 'INR' },
  { id: 'inv-010', invoiceNumber: 'AZL-2026-0838', clientName: 'Zenith Exports', amount: 175000, status: 'paid', date: '2026-04-24', dueDate: '2026-05-24', currency: 'INR' },
  { id: 'inv-011', invoiceNumber: 'AZL-2026-0837', clientName: 'Ironclad Systems', amount: 58000, status: 'pending', date: '2026-04-26', dueDate: '2026-05-26', currency: 'INR' },
  { id: 'inv-012', invoiceNumber: 'AZL-2026-0836', clientName: 'Cascade Networks', amount: 110000, status: 'paid', date: '2026-04-28', dueDate: '2026-05-28', currency: 'INR' },
];

export const revenueChartData = [
  { month: 'Nov', revenue: 285000, invoices: 38 },
  { month: 'Dec', revenue: 342000, invoices: 45 },
  { month: 'Jan', revenue: 298000, invoices: 41 },
  { month: 'Feb', revenue: 415000, invoices: 52 },
  { month: 'Mar', revenue: 378000, invoices: 49 },
  { month: 'Apr', revenue: 482500, invoices: 61 },
  { month: 'May', revenue: 156000, invoices: 22 },
];

export const statusChartData = [
  { status: 'Paid', count: 42, amount: 1120000 },
  { status: 'Pending', count: 14, amount: 227700 },
  { status: 'Overdue', count: 5, amount: 224500 },
  { status: 'Draft', count: 3, amount: 38500 },
];

export const activityFeed = [
  { id: 'act-001', type: 'paid', message: 'Nexus Corp Pvt Ltd paid invoice AZL-2026-0847', amount: '₹2,41,900', time: '2 hours ago', color: 'text-green' },
  { id: 'act-002', type: 'created', message: 'New invoice AZL-2026-0836 created for Cascade Networks', amount: '₹1,10,000', time: '5 hours ago', color: 'text-primary' },
  { id: 'act-003', type: 'overdue', message: 'Invoice AZL-2026-0845 is overdue — Meridian Solutions', amount: '₹1,32,500', time: '1 day ago', color: 'text-red' },
  { id: 'act-004', type: 'paid', message: 'Zenith Exports paid invoice AZL-2026-0838', amount: '₹1,75,000', time: '2 days ago', color: 'text-green' },
  { id: 'act-005', type: 'sent', message: 'Invoice AZL-2026-0842 sent to Orbit Media Works', amount: '₹44,500', time: '3 days ago', color: 'text-sky' },
  { id: 'act-006', type: 'overdue', message: 'Invoice AZL-2026-0840 is overdue — BlueStar Consulting', amount: '₹92,000', time: '4 days ago', color: 'text-red' },
];