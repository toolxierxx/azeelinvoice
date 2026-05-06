'use client';
import React, { useRef, useCallback } from 'react';

import {
  Building2, User, FileText, Package, StickyNote, CreditCard,
  Plus, Trash2, Upload, RefreshCw
} from 'lucide-react';
import { InvoiceData, LineItem, currencies, calcLineItem, calcInvoiceTotals } from './invoiceTypes';
import Icon from '@/components/ui/AppIcon';


interface Props {
  invoice: InvoiceData;
  onChange: (updates: Partial<InvoiceData>) => void;
}

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon size={14} className="text-primary" />
      </div>
      <h3 className="font-700 text-sm text-foreground">{title}</h3>
    </div>
  );
}

function Field({
  label, helper, error, children
}: { label: string; helper?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-600 text-foreground tracking-wide">{label}</label>
      {helper && <p className="text-xs text-muted-foreground -mt-0.5">{helper}</p>}
      {children}
      {error && <p className="text-xs text-red font-500">{error}</p>}
    </div>
  );
}

export default function InvoiceForm({ invoice, onChange }: Props) {
  const logoRef = useRef<HTMLInputElement>(null);
  const sigRef = useRef<HTMLInputElement>(null);

  const set = useCallback(
    (key: keyof InvoiceData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      onChange({ [key]: e.target.value } as Partial<InvoiceData>);
    },
    [onChange]
  );

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange({ companyLogo: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  const handleSigUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange({ signatureUrl: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  const addItem = () => {
    const newItem: LineItem = {
      id: `item-${Date.now()}`,
      description: '',
      quantity: 1,
      unitPrice: 0,
      taxPercent: 18,
      discount: 0,
    };
    onChange({ items: [...invoice.items, newItem] });
  };

  const removeItem = (id: string) => {
    onChange({ items: invoice.items.filter((item) => item.id !== id) });
  };

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    onChange({
      items: invoice.items.map((item) =>
        item.id === id ? { ...item, [field]: typeof value === 'string' && field !== 'description' ? parseFloat(value) || 0 : value } : item
      ),
    });
  };

  const totals = calcInvoiceTotals(invoice.items);

  const genInvoiceNumber = () => {
    onChange({ invoiceNumber: `AZL-${Date.now().toString().slice(-6)}` });
  };

  const currencyObj = currencies.find((c) => c.code === invoice.currency) || currencies[0];

  return (
    <div className="flex flex-col gap-5 scrollbar-thin">
      {/* Company Details */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <SectionHeader icon={Building2} title="Company Details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Company Name" error={!invoice.companyName ? 'Required' : undefined}>
            <input className="input-field" value={invoice.companyName} onChange={set('companyName')} placeholder="Your Company Name" />
          </Field>
          <Field label="GST Number" helper="Optional — for GST-registered businesses">
            <input className="input-field" value={invoice.companyGST} onChange={set('companyGST')} placeholder="27AADCA2354Q1Z5" />
          </Field>
          <Field label="Email">
            <input className="input-field" type="email" value={invoice.companyEmail} onChange={set('companyEmail')} placeholder="billing@company.com" />
          </Field>
          <Field label="Phone">
            <input className="input-field" value={invoice.companyPhone} onChange={set('companyPhone')} placeholder="+91 98765 43210" />
          </Field>
          <Field label="Website">
            <input className="input-field" value={invoice.companyWebsite} onChange={set('companyWebsite')} placeholder="www.yourcompany.com" />
          </Field>
          <Field label="Company Logo" helper="PNG/JPG, max 2MB">
            <div
              className="border-2 border-dashed border-border rounded-lg p-3 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
              onClick={() => logoRef.current?.click()}
            >
              {invoice.companyLogo ? (
                <img src={invoice.companyLogo} alt="Company logo" className="h-10 mx-auto object-contain" />
              ) : (
                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                  <Upload size={18} />
                  <span className="text-xs">Drag & drop or click to upload</span>
                </div>
              )}
              <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </div>
          </Field>
          <Field label="Address" className="sm:col-span-2">
            <textarea
              className="input-field resize-none"
              rows={2}
              value={invoice.companyAddress}
              onChange={set('companyAddress')}
              placeholder="123 Business Park, City, State PIN"
            />
          </Field>
        </div>
      </div>

      {/* Client Details */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <SectionHeader icon={User} title="Client Details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Client Name" error={!invoice.clientName ? 'Required' : undefined}>
            <input className="input-field" value={invoice.clientName} onChange={set('clientName')} placeholder="Client / Company Name" />
          </Field>
          <Field label="Client Email">
            <input className="input-field" type="email" value={invoice.clientEmail} onChange={set('clientEmail')} placeholder="client@company.com" />
          </Field>
          <Field label="Client Phone">
            <input className="input-field" value={invoice.clientPhone} onChange={set('clientPhone')} placeholder="+91 98765 43210" />
          </Field>
          <div /> {/* spacer */}
          <Field label="Billing Address">
            <textarea className="input-field resize-none" rows={2} value={invoice.billingAddress} onChange={set('billingAddress')} placeholder="Billing address" />
          </Field>
          <Field label="Shipping Address" helper="Leave blank if same as billing">
            <textarea className="input-field resize-none" rows={2} value={invoice.shippingAddress} onChange={set('shippingAddress')} placeholder="Shipping address (optional)" />
          </Field>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <SectionHeader icon={FileText} title="Invoice Details" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field label="Invoice Number">
            <div className="flex gap-1.5">
              <input className="input-field" value={invoice.invoiceNumber} onChange={set('invoiceNumber')} />
              <button
                onClick={genInvoiceNumber}
                title="Auto-generate invoice number"
                className="px-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </Field>
          <Field label="Invoice Date">
            <input className="input-field" type="date" value={invoice.invoiceDate} onChange={set('invoiceDate')} />
          </Field>
          <Field label="Due Date">
            <input className="input-field" type="date" value={invoice.dueDate} onChange={set('dueDate')} />
          </Field>
          <Field label="Currency">
            <select
              className="input-field"
              value={invoice.currency}
              onChange={(e) => {
                const c = currencies.find((x) => x.code === e.target.value);
                onChange({ currency: e.target.value, currencySymbol: c?.symbol || '₹' });
              }}
            >
              {currencies.map((c) => (
                <option key={`cur-${c.code}`} value={c.code}>{c.code} — {c.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Payment Status">
            <select className="input-field" value={invoice.paymentStatus} onChange={set('paymentStatus') as React.ChangeEventHandler<HTMLSelectElement>}>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </Field>
        </div>
      </div>

      {/* Line Items */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <SectionHeader icon={Package} title="Products / Services" />

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                {['Description', 'Qty', 'Unit Price', 'Tax %', 'Discount %', 'Total', ''].map((h) => (
                  <th key={`th-${h}`} className="text-left text-xs font-600 text-muted-foreground pb-2 pr-2 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => {
                const calc = calcLineItem(item);
                return (
                  <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors group">
                    <td className="py-2 pr-2 w-48">
                      <input
                        className="input-field text-sm py-1.5"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        placeholder="Service or product name"
                      />
                    </td>
                    <td className="py-2 pr-2 w-16">
                      <input
                        className="input-field text-sm py-1.5 text-center"
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                      />
                    </td>
                    <td className="py-2 pr-2 w-28">
                      <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">{currencyObj.symbol}</span>
                        <input
                          className="input-field text-sm py-1.5 pl-6 tabular-nums"
                          type="number"
                          min={0}
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
                        />
                      </div>
                    </td>
                    <td className="py-2 pr-2 w-16">
                      <input
                        className="input-field text-sm py-1.5 text-center"
                        type="number"
                        min={0}
                        max={100}
                        value={item.taxPercent}
                        onChange={(e) => updateItem(item.id, 'taxPercent', e.target.value)}
                      />
                    </td>
                    <td className="py-2 pr-2 w-16">
                      <input
                        className="input-field text-sm py-1.5 text-center"
                        type="number"
                        min={0}
                        max={100}
                        value={item.discount}
                        onChange={(e) => updateItem(item.id, 'discount', e.target.value)}
                      />
                    </td>
                    <td className="py-2 pr-2 w-24 tabular-nums font-600 text-foreground whitespace-nowrap">
                      {currencyObj.symbol}{calc.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2 w-8">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red/10 hover:text-red text-muted-foreground transition-all"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <button
          onClick={addItem}
          className="mt-3 flex items-center gap-2 text-sm text-primary font-600 hover:text-primary/80 transition-colors px-2 py-1 rounded-lg hover:bg-primary/8"
        >
          <Plus size={15} />
          Add Line Item
        </button>

        {/* Totals */}
        <div className="mt-4 pt-4 border-t border-border ml-auto w-full sm:w-72 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span className="tabular-nums">{currencyObj.symbol}{totals.subtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
          </div>
          {totals.totalDiscount > 0 && (
            <div className="flex justify-between text-sm text-green">
              <span>Discount</span>
              <span className="tabular-nums">−{currencyObj.symbol}{totals.totalDiscount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
          )}
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Tax</span>
            <span className="tabular-nums">+{currencyObj.symbol}{totals.totalTax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between font-800 text-base text-foreground border-t border-border pt-2">
            <span>Grand Total</span>
            <span className="tabular-nums text-primary">{currencyObj.symbol}{totals.grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {/* Notes & Terms */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <SectionHeader icon={StickyNote} title="Notes & Terms" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Notes" helper="Visible to client on invoice">
            <textarea
              className="input-field resize-none"
              rows={3}
              value={invoice.notes}
              onChange={set('notes')}
              placeholder="Thank you for your business..."
            />
          </Field>
          <Field label="Terms & Conditions">
            <textarea
              className="input-field resize-none"
              rows={3}
              value={invoice.terms}
              onChange={set('terms')}
              placeholder="Payment due within 30 days..."
            />
          </Field>
          <Field label="Watermark" helper="Optional overlay text (e.g. DRAFT, CONFIDENTIAL)">
            <input className="input-field" value={invoice.watermark} onChange={set('watermark')} placeholder="Leave blank for none" />
          </Field>
          <Field label="Signature" helper="Upload your signature image">
            <div
              className="border-2 border-dashed border-border rounded-lg p-3 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
              onClick={() => sigRef.current?.click()}
            >
              {invoice.signatureUrl ? (
                <img src={invoice.signatureUrl} alt="Signature" className="h-10 mx-auto object-contain" />
              ) : (
                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                  <Upload size={16} />
                  <span className="text-xs">Upload signature</span>
                </div>
              )}
              <input ref={sigRef} type="file" accept="image/*" className="hidden" onChange={handleSigUpload} />
            </div>
          </Field>
        </div>
      </div>

      {/* Bank & Payment */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <SectionHeader icon={CreditCard} title="Bank Details & Payment" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Bank Name">
            <input className="input-field" value={invoice.bankName} onChange={set('bankName')} placeholder="HDFC Bank" />
          </Field>
          <Field label="Account Number">
            <input className="input-field" value={invoice.accountNumber} onChange={set('accountNumber')} placeholder="50200012345678" />
          </Field>
          <Field label="IFSC Code">
            <input className="input-field" value={invoice.ifscCode} onChange={set('ifscCode')} placeholder="HDFC0001234" />
          </Field>
          <Field label="UPI ID" helper="For QR payment generation">
            <input className="input-field" value={invoice.upiId} onChange={set('upiId')} placeholder="yourname@bankname" />
          </Field>
          <div className="flex items-center gap-3 col-span-full">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={invoice.showQR}
                onChange={(e) => onChange({ showQR: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:bg-primary transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
            </label>
            <span className="text-sm font-500 text-foreground">Show QR Code on Invoice</span>
          </div>
        </div>
      </div>
    </div>
  );
}