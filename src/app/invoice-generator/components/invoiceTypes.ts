export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxPercent: number;
  discount: number;
}

export interface InvoiceData {
  // Company
  companyName: string;
  companyGST: string;
  companyEmail: string;
  companyPhone: string;
  companyWebsite: string;
  companyAddress: string;
  companyLogo: string;

  // Client
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  billingAddress: string;
  shippingAddress: string;

  // Invoice details
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  currencySymbol: string;
  paymentStatus: 'draft' | 'sent' | 'paid' | 'overdue';

  // Line items
  items: LineItem[];

  // Extras
  notes: string;
  terms: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
  signatureUrl: string;
  showQR: boolean;
  watermark: string;
}

export const currencies = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
];

export const defaultInvoiceData: InvoiceData = {
  companyName: 'Azeel Technologies',
  companyGST: '27AADCA2354Q1Z5',
  companyEmail: 'billing@azeel.tech',
  companyPhone: '+91 98765 43210',
  companyWebsite: 'www.azeel.tech',
  companyAddress: '401 Maker Chambers, Nariman Point, Mumbai, MH 400021',
  companyLogo: '',
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  billingAddress: '',
  shippingAddress: '',
  invoiceNumber: `AZL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  currency: 'INR',
  currencySymbol: '₹',
  paymentStatus: 'draft',
  items: [
    { id: 'item-001', description: 'Web Design Services', quantity: 1, unitPrice: 45000, taxPercent: 18, discount: 0 },
    { id: 'item-002', description: 'Frontend Development', quantity: 2, unitPrice: 35000, taxPercent: 18, discount: 5 },
  ],
  notes: 'Thank you for your business! Payment is due within 30 days.',
  terms: 'Late payments are subject to 1.5% monthly interest. All disputes subject to Mumbai jurisdiction.',
  bankName: 'HDFC Bank',
  accountNumber: '50200012345678',
  ifscCode: 'HDFC0001234',
  upiId: 'azeel@hdfcbank',
  signatureUrl: '',
  showQR: true,
  watermark: '',
};

export function calcLineItem(item: LineItem) {
  let subtotal = item.quantity * item.unitPrice;
  const discountAmt = subtotal * (item.discount / 100);
  const taxable = subtotal - discountAmt;
  const taxAmt = taxable * (item.taxPercent / 100);
  return { subtotal, discountAmt, taxable, taxAmt, total: taxable + taxAmt };
}

export function calcInvoiceTotals(items: LineItem[]) {
  let subtotal = 0, totalDiscount = 0, totalTax = 0;
  items.forEach((item) => {
    const c = calcLineItem(item);
    subtotal += c.subtotal;
    totalDiscount += c.discountAmt;
    totalTax += c.taxAmt;
  });
  const grandTotal = subtotal - totalDiscount + totalTax;
  return { subtotal, totalDiscount, totalTax, grandTotal };
}