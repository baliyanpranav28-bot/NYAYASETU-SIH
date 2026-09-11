import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertCircle, Upload, BadgeCheck, FileText, Info, ArrowRight, Clock } from 'lucide-react';
import { findMatchingSchemes } from '@/services/eligibilityEngine';
import type { RequiredDocument } from '@/types/welfare';

export function DocumentsPage() {
  const { t, navigate, currentProfile, profileCompleted } = useApp();
  const [docOverrides, setDocOverrides] = useState<Record<string, 'available' | 'missing' | 'pending'>>({});

  const results = useMemo(() => (profileCompleted ? findMatchingSchemes(currentProfile) : []), [currentProfile, profileCompleted]);

  // Collect all required documents from matched schemes (high + potential only)
  const relevantSchemes = results.filter((r) => r.result.matchLevel !== 'low');

  const allDocs: Record<string, RequiredDocument & { schemes: string[] }> = {};
  for (const { scheme, result } of relevantSchemes) {
    for (const doc of result.requiredDocuments) {
      if (!allDocs[doc.name]) {
        allDocs[doc.name] = { ...doc, schemes: [] };
      }
      allDocs[doc.name].schemes.push(scheme.name);
    }
  }

  const docList = Object.values(allDocs);
  const getDocStatus = (doc: RequiredDocument) => docOverrides[doc.name] ?? doc.status;

  const available = docList.filter((d) => getDocStatus(d) === 'available');
  const missing = docList.filter((d) => getDocStatus(d) === 'missing');
  const pending = docList.filter((d) => getDocStatus(d) === 'pending');

  const markAvailable = (docName: string) => {
    setDocOverrides((prev) => ({ ...prev, [docName]: 'available' }));
  };

  const markPending = (docName: string) => {
    setDocOverrides((prev) => ({ ...prev, [docName]: 'pending' }));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Your Documents</h1>
        <p className="text-sm text-neutral-500 mb-6">
          Documents help us check whether you may meet scheme requirements. These are generated based on your matched schemes.
        </p>

        {!profileCompleted && (
          <div className="card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-warning-50 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-warning-500" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">Complete your profile first</h3>
            <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">
              Complete your profile and find matching schemes to see which documents you may need.
            </p>
            <button onClick={() => navigate('profile')} className="btn-primary">
              Complete Profile
            </button>
          </div>
        )}

        {profileCompleted && docList.length === 0 && (
          <div className="card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">No documents required yet</h3>
            <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">
              Complete your profile and find matching schemes to see which documents you may need.
            </p>
            <button onClick={() => navigate('schemes')} className="btn-primary">
              Find My Schemes
            </button>
          </div>
        )}

        {/* Available documents */}
        {available.length > 0 && (
          <div className="card p-6 mb-4">
            <h3 className="section-title mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success-600" />
              Available Documents ({available.length})
            </h3>
            <div className="space-y-3">
              {available.map((doc, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-neutral-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-success-50 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-success-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-800">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="badge-success"><BadgeCheck className="w-3.5 h-3.5" /> Available</span>
                        {doc.schemes.length <= 2 ? (
                          <span className="text-xs text-neutral-400">Required for: {doc.schemes.join(', ')}</span>
                        ) : (
                          <span className="text-xs text-neutral-400">Required for {doc.schemes.length} schemes</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Missing documents */}
        {missing.length > 0 && (
          <div className="card p-6 mb-4 border-warning-200/60">
            <h3 className="section-title mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning-600" />
              Missing Documents ({missing.length})
            </h3>
            <div className="space-y-3">
              {missing.map((doc, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-warning-200 bg-warning-50/30 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-warning-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-warning-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-800">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="badge-warning">Missing</span>
                        {doc.schemes.length <= 2 ? (
                          <span className="text-xs text-neutral-400">For: {doc.schemes.join(', ')}</span>
                        ) : (
                          <span className="text-xs text-neutral-400">For {doc.schemes.length} schemes</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => markAvailable(doc.name)} className="btn-primary text-xs px-3 py-2">
                      <Upload className="w-3.5 h-3.5" />
                      Mark Available
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-primary-50 border border-primary-100 p-4">
              <Info className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
              <p className="text-sm text-primary-800 leading-relaxed">
                You may still be eligible, but these documents may be required during application or verification.
              </p>
            </div>
          </div>
        )}

        {/* Pending documents */}
        {pending.length > 0 && (
          <div className="card p-6 mb-4">
            <h3 className="section-title mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-neutral-500" />
              Pending Verification ({pending.length})
            </h3>
            <div className="space-y-3">
              {pending.map((doc, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-neutral-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-neutral-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-800">{doc.name}</p>
                      <span className="badge-info mt-0.5">Pending Verification</span>
                    </div>
                  </div>
                  <button onClick={() => markAvailable(doc.name)} className="btn-secondary text-xs px-3 py-2">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Mark Verified
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {docList.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button onClick={() => navigate('schemes')} className="btn-primary btn-lg flex-1">
              Find My Schemes
              <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('citizenDashboard')} className="btn-secondary btn-lg">
              View Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
