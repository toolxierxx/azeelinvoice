'use client';
import React, { useState, useCallback } from 'react';
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';
import TemplateSelector from './TemplateSelector';
import { InvoiceData, defaultInvoiceData } from './invoiceTypes';
import { Save, Download, Printer, Copy, Eye, EyeOff } from 'lucide-react';

export default function InvoiceGeneratorClient() {
  const [invoice, setInvoice] = useState<InvoiceData>(defaultInvoiceData);
  const [template, setTemplate] = useState<string>('modern');
  const [showPreview, setShowPreview] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  const updateInvoice = useCallback((updates: Partial<InvoiceData>) => {
    setInvoice((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleSave = () => {
    setSaving(true);
    // TODO: Backend — POST /api/invoices with invoice data
    const existing = JSON.parse(localStorage.getItem('azeel-invoices') || '[]');
    const idx = existing.findIndex((inv: InvoiceData) => inv.invoiceNumber === invoice.invoiceNumber);
    if (idx >= 0) existing[idx] = invoice;
    else existing.unshift(invoice);
    localStorage.setItem('azeel-invoices', JSON.stringify(existing));
    setTimeout(() => {
      setSaving(false);
      setSaveMsg('Invoice saved!');
      setTimeout(() => setSaveMsg(''), 2500);
    }, 600);
  };

  const handleDuplicate = () => {
    const newInv = {
      ...invoice,
      invoiceNumber: `AZL-${Date.now().toString().slice(-6)}`,
    };
    setInvoice(newInv);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="bg-card border-b border-border sticky top-16 z-40">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-3">
          <div>
            <h1 className="font-800 text-foreground text-lg">Invoice Generator</h1>
            <p className="text-xs text-muted-foreground">Fill in the details and see your invoice update live</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {saveMsg && (
              <span className="text-sm text-green font-600 animate-fade-in">{saveMsg}</span>
            )}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm font-500 text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              {showPreview ? <EyeOff size={15} /> : <Eye size={15} />}
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button
              onClick={handleDuplicate}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm font-500 text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <Copy size={15} />
              Duplicate
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm font-500 text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <Printer size={15} />
              Print
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 btn-secondary text-sm px-4 py-2"
            >
              <Save size={15} />
              {saving ? 'Saving...' : 'Save'}
            </button>
            <PDFDownloadButton invoice={invoice} template={template} />
          </div>
        </div>
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 pb-3">
          <TemplateSelector active={template} onSelect={setTemplate} />
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-6">
        <div className={`grid gap-6 ${showPreview ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 max-w-3xl'}`}>
          <InvoiceForm invoice={invoice} onChange={updateInvoice} />
          {showPreview && (
            <div className="xl:sticky xl:top-36 xl:self-start">
              <InvoicePreview invoice={invoice} template={template} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PDFDownloadButton({ invoice, template }: { invoice: InvoiceData; template: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const { default: jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');
      const el = document.getElementById('invoice-preview-area');
      if (!el) { setLoading(false); return; }
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice-${invoice.invoiceNumber}.pdf`);
    } catch (e) {
      console.error('PDF generation failed:', e);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="btn-primary flex items-center gap-1.5 text-sm px-4 py-2 disabled:opacity-60"
      style={{ minWidth: 140 }}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Download size={15} />
          Download PDF
        </>
      )}
    </button>
  );
}