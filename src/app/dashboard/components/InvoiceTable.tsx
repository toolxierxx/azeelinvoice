'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, Edit2, Copy, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { InvoiceRecord } from './dashboardData';

const PAGE_SIZE = 8;

function StatusBadge({ status }: { status: InvoiceRecord['status'] }) {
  const map = {
    paid: 'status-paid',
    pending: 'status-pending',
    overdue: 'status-overdue',
    draft: 'status-draft',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-700 capitalize ${map[status]}`}>
      {status}
    </span>
  );
}

export default function InvoiceTable({ invoices }: { invoices: InvoiceRecord[] }) {
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const totalPages = Math.ceil(invoices.length / PAGE_SIZE);
  const paginated = invoices.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id: string) => {
    setDeletingId(id);
    // TODO: Backend — DELETE /api/invoices/:id
    setTimeout(() => setDeletingId(null), 600);
  };

  if (invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Eye size={24} className="text-muted-foreground" />
        </div>
        <h4 className="font-700 text-foreground mb-2">No invoices found</h4>
        <p className="text-sm text-muted-foreground text-center max-w-xs mb-5">
          No invoices match your current filters. Try adjusting your search or filter criteria.
        </p>
        <Link href="/invoice-generator" className="btn-primary text-sm px-5 py-2.5">
          Create New Invoice
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {['Invoice #', 'Client', 'Amount', 'Status', 'Date', 'Due Date', 'Actions'].map((h) => (
                <th
                  key={`dash-th-${h}`}
                  className="text-left text-xs font-700 uppercase tracking-wider text-muted-foreground px-4 py-3 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((inv) => (
              <tr
                key={inv.id}
                className={`border-b border-border/50 hover:bg-muted/30 transition-all group ${
                  deletingId === inv.id ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100'
                }`}
                style={{ transition: 'opacity 0.3s ease, max-height 0.3s ease' }}
              >
                <td className="px-4 py-3 font-600 text-primary">{inv.invoiceNumber}</td>
                <td className="px-4 py-3 font-500 text-foreground">{inv.clientName}</td>
                <td className="px-4 py-3 font-700 text-foreground tabular-nums">
                  ₹{inv.amount.toLocaleString('en-IN')}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={inv.status} />
                </td>
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{inv.date}</td>
                <td className={`px-4 py-3 whitespace-nowrap font-500 ${
                  inv.status === 'overdue' ? 'text-red' : 'text-muted-foreground'
                }`}>
                  {inv.dueDate}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      title="View invoice"
                      className="p-1.5 rounded-lg hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
                    >
                      <Eye size={14} />
                    </button>
                    <Link
                      href="/invoice-generator"
                      title="Edit invoice"
                      className="p-1.5 rounded-lg hover:bg-amber/10 hover:text-amber text-muted-foreground transition-colors"
                    >
                      <Edit2 size={14} />
                    </Link>
                    <button
                      title="Duplicate invoice"
                      className="p-1.5 rounded-lg hover:bg-sky/10 hover:text-sky text-muted-foreground transition-colors"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      title="Delete invoice — this cannot be undone"
                      onClick={() => handleDelete(inv.id)}
                      className="p-1.5 rounded-lg hover:bg-red/10 hover:text-red text-muted-foreground transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, invoices.length)} of {invoices.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={`page-${p}`}
                onClick={() => setPage(p)}
                className={`w-7 h-7 rounded-lg text-xs font-600 transition-all ${
                  page === p
                    ? 'bg-primary text-white' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}