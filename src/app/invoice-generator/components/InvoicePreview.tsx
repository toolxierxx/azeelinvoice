'use client';
import React, { useState, useEffect } from 'react';
import { InvoiceData, calcLineItem, calcInvoiceTotals, currencies } from './invoiceTypes';

interface Props {
  invoice: InvoiceData;
  template: string;
}

const statusLabels: Record<string, string> = {
  draft: 'DRAFT',
  sent: 'SENT',
  paid: 'PAID',
  overdue: 'OVERDUE',
};

const templateStyles: Record<string, {
  headerClass: string;
  headerTextClass: string;
  accentClass: string;
  borderClass: string;
  bg: string;
}> = {
  modern: {
    headerClass: 'gradient-primary',
    headerTextClass: 'text-white',
    accentClass: 'text-primary',
    borderClass: 'border-primary/20',
    bg: 'bg-white',
  },
  minimal: {
    headerClass: 'bg-gray-50 border-b border-gray-200',
    headerTextClass: 'text-gray-900',
    accentClass: 'text-gray-700',
    borderClass: 'border-gray-200',
    bg: 'bg-white',
  },
  corporate: {
    headerClass: 'bg-navy',
    headerTextClass: 'text-white',
    accentClass: 'text-navy',
    borderClass: 'border-navy/20',
    bg: 'bg-white',
  },
  elegant: {
    headerClass: 'bg-amber',
    headerTextClass: 'text-white',
    accentClass: 'text-amber',
    borderClass: 'border-amber/30',
    bg: 'bg-white',
  },
  dark: {
    headerClass: 'bg-gray-900',
    headerTextClass: 'text-white',
    accentClass: 'text-sky',
    borderClass: 'border-gray-700',
    bg: 'bg-gray-800',
  },
  creative: {
    headerClass: 'bg-green',
    headerTextClass: 'text-white',
    accentClass: 'text-green',
    borderClass: 'border-green/30',
    bg: 'bg-white',
  },
};

export default function InvoicePreview({ invoice, template }: Props) {
  const style = templateStyles[template] || templateStyles.modern;
  const totals = calcInvoiceTotals(invoice.items);
  const currencyObj = currencies.find((c) => c.code === invoice.currency) || currencies[0];
  const sym = currencyObj.symbol;

  const isDark = template === 'dark';
  const textBase = isDark ? 'text-gray-200' : 'text-gray-800';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const rowHover = isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-700 text-sm text-foreground">Live Preview</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">A4 Format</span>
      </div>

      <div
        id="invoice-preview-area"
        className={`invoice-a4 rounded-xl overflow-hidden invoice-preview-shadow ${style.bg} relative`}
        style={{ minHeight: '500px' }}
      >
        {/* Watermark */}
        {invoice.watermark && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-10"
            style={{ transform: 'rotate(-30deg)' }}
          >
            <span className="text-6xl font-extrabold text-gray-400 tracking-widest">{invoice.watermark}</span>
          </div>
        )}

        {/* Header */}
        <div className={`${style.headerClass} p-6 md:p-8`}>
          <div className="flex justify-between items-start">
            <div>
              {invoice.companyLogo && (
                <img src={invoice.companyLogo} alt="Company logo" className="h-12 mb-3 object-contain" />
              )}
              <div className={`font-extrabold text-xl ${style.headerTextClass}`}>{invoice.companyName || 'Your Company'}</div>
              {invoice.companyGST && (
                <div className={`text-xs opacity-70 ${style.headerTextClass}`}>GST: {invoice.companyGST}</div>
              )}
              <div className={`text-sm opacity-70 ${style.headerTextClass} mt-1`}>{invoice.companyAddress}</div>
              {invoice.companyPhone && (
                <div className={`text-xs opacity-60 ${style.headerTextClass}`}>{invoice.companyPhone}</div>
              )}
            </div>
            <div className="text-right">
              <div className={`font-extrabold text-3xl tracking-wider ${style.headerTextClass}`}>INVOICE</div>
              <div className={`text-sm opacity-80 ${style.headerTextClass} mt-1`}>{invoice.invoiceNumber}</div>
              <div
                className={`mt-2 px-3 py-1 rounded-full text-xs font-700 inline-block ${
                  invoice.paymentStatus === 'paid' ?'bg-green/20 text-green'
                    : invoice.paymentStatus === 'overdue' ?'bg-red/20 text-red'
                    : invoice.paymentStatus === 'sent' ?'bg-sky/20 text-sky' :'bg-white/20 text-white'
                }`}
              >
                {statusLabels[invoice.paymentStatus]}
              </div>
            </div>
          </div>
        </div>

        {/* Dates + Client */}
        <div className={`grid grid-cols-2 gap-6 p-6 md:p-8 border-b ${borderColor}`}>
          <div>
            <div className={`text-xs font-700 uppercase tracking-wider ${textMuted} mb-2`}>Bill To</div>
            <div className={`font-700 text-base ${textBase}`}>{invoice.clientName || 'Client Name'}</div>
            {invoice.clientEmail && <div className={`text-sm ${textMuted}`}>{invoice.clientEmail}</div>}
            {invoice.clientPhone && <div className={`text-sm ${textMuted}`}>{invoice.clientPhone}</div>}
            {invoice.billingAddress && (
              <div className={`text-sm ${textMuted} mt-1 whitespace-pre-line`}>{invoice.billingAddress}</div>
            )}
          </div>
          <div className="text-right">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between gap-4">
                <span className={`text-xs ${textMuted}`}>Invoice Date:</span>
                <span className={`text-sm font-600 ${textBase}`}>{invoice.invoiceDate}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className={`text-xs ${textMuted}`}>Due Date:</span>
                <span className={`text-sm font-600 ${textBase}`}>{invoice.dueDate}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className={`text-xs ${textMuted}`}>Currency:</span>
                <span className={`text-sm font-600 ${textBase}`}>{invoice.currency}</span>
              </div>
              {invoice.companyEmail && (
                <div className="flex justify-between gap-4">
                  <span className={`text-xs ${textMuted}`}>Email:</span>
                  <span className={`text-sm ${textBase}`}>{invoice.companyEmail}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Items table */}
        <div className="p-6 md:p-8">
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b-2 ${borderColor}`}>
                {['#', 'Description', 'Qty', 'Unit Price', 'Tax', 'Disc', 'Total'].map((h) => (
                  <th
                    key={`prev-th-${h}`}
                    className={`text-left text-xs font-700 uppercase tracking-wide ${textMuted} pb-2 pr-3`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => {
                const calc = calcLineItem(item);
                return (
                  <tr key={item.id} className={`border-b ${borderColor} ${rowHover} transition-colors`}>
                    <td className={`py-2.5 pr-3 ${textMuted} text-xs`}>{i + 1}</td>
                    <td className={`py-2.5 pr-3 font-500 ${textBase}`}>{item.description || '—'}</td>
                    <td className={`py-2.5 pr-3 ${textBase} tabular-nums`}>{item.quantity}</td>
                    <td className={`py-2.5 pr-3 ${textBase} tabular-nums`}>
                      {sym}{item.unitPrice.toLocaleString('en-IN')}
                    </td>
                    <td className={`py-2.5 pr-3 ${textBase} tabular-nums`}>{item.taxPercent}%</td>
                    <td className={`py-2.5 pr-3 ${textBase} tabular-nums`}>
                      {item.discount > 0 ? `${item.discount}%` : '—'}
                    </td>
                    <td className={`py-2.5 font-700 ${style.accentClass} tabular-nums`}>
                      {sym}{calc.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mt-5">
            <div className="w-64 space-y-1.5">
              <div className={`flex justify-between text-sm ${textMuted}`}>
                <span>Subtotal</span>
                <span className="tabular-nums">
                  {sym}{totals.subtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </span>
              </div>
              {totals.totalDiscount > 0 && (
                <div className="flex justify-between text-sm text-green">
                  <span>Discount</span>
                  <span className="tabular-nums">
                    −{sym}{totals.totalDiscount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}
              <div className={`flex justify-between text-sm ${textMuted}`}>
                <span>Tax</span>
                <span className="tabular-nums">
                  +{sym}{totals.totalTax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className={`flex justify-between font-800 text-base border-t pt-2 mt-1 ${borderColor} ${textBase}`}>
                <span>Grand Total</span>
                <span className={`tabular-nums ${style.accentClass}`}>
                  {sym}{totals.grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes + Terms */}
        {(invoice.notes || invoice.terms) && (
          <div className={`px-6 md:px-8 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-5 border-t ${borderColor} pt-5`}>
            {invoice.notes && (
              <div>
                <div className={`text-xs font-700 uppercase tracking-wider ${textMuted} mb-1.5`}>Notes</div>
                <p className={`text-xs ${textMuted} leading-relaxed`}>{invoice.notes}</p>
              </div>
            )}
            {invoice.terms && (
              <div>
                <div className={`text-xs font-700 uppercase tracking-wider ${textMuted} mb-1.5`}>Terms & Conditions</div>
                <p className={`text-xs ${textMuted} leading-relaxed`}>{invoice.terms}</p>
              </div>
            )}
          </div>
        )}

        {/* Bank Details + Signature */}
        <div className={`px-6 md:px-8 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-5 border-t ${borderColor} pt-5`}>
          {(invoice.bankName || invoice.upiId) && (
            <div>
              <div className={`text-xs font-700 uppercase tracking-wider ${textMuted} mb-2`}>Payment Details</div>
              <div className={`space-y-1 text-xs ${textMuted}`}>
                {invoice.bankName && (
                  <div className="flex gap-2">
                    <span className="font-600 w-24">Bank:</span>
                    <span>{invoice.bankName}</span>
                  </div>
                )}
                {invoice.accountNumber && (
                  <div className="flex gap-2">
                    <span className="font-600 w-24">Account:</span>
                    <span className="tabular-nums">{invoice.accountNumber}</span>
                  </div>
                )}
                {invoice.ifscCode && (
                  <div className="flex gap-2">
                    <span className="font-600 w-24">IFSC:</span>
                    <span>{invoice.ifscCode}</span>
                  </div>
                )}
                {invoice.upiId && (
                  <div className="flex gap-2">
                    <span className="font-600 w-24">UPI:</span>
                    <span>{invoice.upiId}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col items-end justify-between gap-3">
            {invoice.showQR && invoice.upiId && (
              <QRBlock upiId={invoice.upiId} amount={totals.grandTotal} />
            )}
            {invoice.signatureUrl && (
              <div className="text-right">
                <img
                  src={invoice.signatureUrl}
                  alt="Authorized signature"
                  className="h-12 object-contain ml-auto mb-1"
                />
                <div className={`text-xs ${textMuted} border-t ${borderColor} pt-1`}>Authorized Signature</div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`${style.headerClass} px-6 md:px-8 py-3 flex justify-between items-center`}>
          <span className={`text-xs opacity-60 ${style.headerTextClass}`}>
            Generated by Azeel Invoice Easil
          </span>
          {invoice.companyWebsite && (
            <span className={`text-xs opacity-60 ${style.headerTextClass}`}>{invoice.companyWebsite}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function QRBlock({ upiId, amount }: { upiId: string; amount: number }) {
  const [qrDataUrl, setQrDataUrl] = React.useState('');

  React.useEffect(() => {
    if (!upiId) return;
    // TODO: Backend — integrate UPI deep link QR generation
    import('qrcode').then((QRCode) => {
      const upiLink = `upi://pay?pa=${upiId}&am=${amount.toFixed(2)}&cu=INR`;
      QRCode.toDataURL(upiLink, { width: 80, margin: 1 }).then(setQrDataUrl).catch(() => {});
    });
  }, [upiId, amount]);

  if (!qrDataUrl) return null;

  return (
    <div className="text-center">
      <img src={qrDataUrl} alt="UPI QR code for payment" className="w-20 h-20 mx-auto rounded-lg" />
      <div className="text-xs text-gray-500 mt-1">Scan to Pay</div>
    </div>
  );
}