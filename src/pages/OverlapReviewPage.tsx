import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AlertTriangle, Check, ArrowRight, Shield, Eye, UserX } from 'lucide-react';
import { overlapCases } from '@/data/demoData';
import type { OverlapCase } from '@/data/demoData';
import { DemoBadge } from '@/components/DemoBadge';

export function OverlapReviewPage() {
  const [cases, setCases] = useState<OverlapCase[]>(overlapCases);

  const markReviewed = (id: string) => {
    setCases((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'Reviewed' } : c)));
  };

  const pending = cases.filter((c) => c.status === 'Review Required');
  const reviewed = cases.filter((c) => c.status === 'Reviewed');

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-accent-600" />
              Possible Benefit Overlaps
            </h1>
            <p className="text-sm text-neutral-500 mt-1">Cases flagged for human review. Officials retain final approval authority.</p>
          </div>
          <DemoBadge className="hidden sm:inline-flex" />
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4 mb-6 flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
          <p className="text-sm text-neutral-600 leading-relaxed">
            These cases are flagged for review only. NYAYASETU will never automatically cancel a citizen's benefit. All decisions are made by authorised officials.
          </p>
        </div>

        {/* Pending cases */}
        {pending.length > 0 && (
          <div className="mb-6">
            <h2 className="section-title mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-500" />
              Review Required ({pending.length})
            </h2>
            <div className="space-y-3">
              {pending.map((c) => (
                <div key={c.id} className="card p-5 border-accent-200/60 animate-slide-up">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <UserX className="w-4 h-4 text-neutral-400" />
                      <span className="text-xs font-mono text-neutral-500">Household ID: {c.householdId}</span>
                    </div>
                    <span className="badge-warning"><AlertTriangle className="w-3.5 h-3.5" /> {c.status}</span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div className="rounded-lg bg-success-50 border border-success-200/60 px-4 py-3">
                      <p className="text-xs font-medium text-neutral-500 mb-1">Scheme A</p>
                      <p className="text-sm font-semibold text-success-700">{c.schemeA}</p>
                    </div>
                    <div className="rounded-lg bg-primary-50 border border-primary-200/60 px-4 py-3">
                      <p className="text-xs font-medium text-neutral-500 mb-1">Scheme B</p>
                      <p className="text-sm font-semibold text-primary-700">{c.schemeB}</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-accent-50/40 border border-accent-200/60 px-4 py-3 mb-4">
                    <p className="text-xs font-semibold text-accent-700 mb-1">Reason for flag</p>
                    <p className="text-sm text-neutral-700">{c.reason}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="btn-secondary text-sm flex-1">
                      <Eye className="w-4 h-4" />
                      Review Case
                    </button>
                    <button onClick={() => markReviewed(c.id)} className="btn-primary text-sm flex-1">
                      <Check className="w-4 h-4" />
                      Mark Reviewed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviewed cases */}
        {reviewed.length > 0 && (
          <div>
            <h2 className="section-title mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Reviewed ({reviewed.length})
            </h2>
            <div className="space-y-3">
              {reviewed.map((c) => (
                <div key={c.id} className="card p-5 opacity-75">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-neutral-500">{c.householdId}</span>
                    <span className="badge-success"><Check className="w-3.5 h-3.5" /> Reviewed</span>
                  </div>
                  <p className="text-sm text-neutral-600">{c.schemeA} + {c.schemeB}</p>
                  <p className="text-xs text-neutral-400 mt-1">{c.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
