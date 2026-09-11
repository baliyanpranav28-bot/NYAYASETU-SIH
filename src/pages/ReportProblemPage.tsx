import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { LifeBuoy, CheckCircle2, ArrowLeft, Copy } from 'lucide-react';
import type { CitizenComplaint } from '@/types/welfare';

const PROBLEM_TYPES = [
  { key: 'grievance.appDelayed', icon: '⏱', label: 'Application delayed' },
  { key: 'grievance.docProblem', icon: '📄', label: 'Document problem' },
  { key: 'grievance.paymentNotReceived', icon: '💸', label: 'Payment not received' },
  { key: 'grievance.appRejected', icon: '✖', label: 'Application rejected' },
  { key: 'grievance.incorrectInfo', icon: 'ℹ', label: 'Information is incorrect' },
  { key: 'grievance.other', icon: '❓', label: 'Other' },
];

export function ReportProblemPage() {
  const { t, navigate, complaints, addComplaint } = useApp();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [complaintId] = useState(`NY-COMP-2026-${String(Math.floor(100 + Math.random() * 899))}`);

  const handleSubmit = () => {
    const typeLabel = PROBLEM_TYPES.find((p) => p.key === selectedType)?.label ?? 'Other';
    const newComplaint: CitizenComplaint = {
      id: complaintId,
      type: typeLabel,
      description: description.trim(),
      status: 'Under Review',
      lastUpdate: 'Today',
      assignedDepartment: 'Concerned Department',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    addComplaint(newComplaint);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
        <div className="card p-8 sm:p-10 max-w-md w-full text-center animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-success-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-10 h-10 text-success-600" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 mb-2">{t('grievance.reported')}</h2>
          <p className="text-sm text-neutral-500 mb-6">Your problem has been registered. We will get back to you.</p>

          <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-5 mb-6 text-left space-y-3">
            <div>
              <p className="text-xs text-neutral-500">{t('grievance.complaintId')}</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-primary-700 tracking-wider">{complaintId}</p>
                <button onClick={() => navigator.clipboard?.writeText(complaintId)} className="p-1.5 rounded-lg hover:bg-neutral-200 transition-colors">
                  <Copy className="w-4 h-4 text-neutral-500" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-neutral-200 pt-3">
              <span className="text-xs text-neutral-500">{t('grievance.status')}</span>
              <span className="badge-warning">{t('grievance.underReview')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">{t('grievance.lastUpdate')}</span>
              <span className="text-sm text-neutral-700">Today</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">{t('grievance.assignedDept')}</span>
              <span className="text-sm text-neutral-700">Concerned Department</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={() => navigate('tracking')} className="btn-primary w-full">Track My Problems</button>
            <button onClick={() => navigate('home')} className="btn-secondary w-full">Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <button onClick={() => navigate('tracking')} className="btn-ghost text-sm mb-4 -ml-2">
          <ArrowLeft className="w-4 h-4" />
          {t('common.back')}
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center">
            <LifeBuoy className="w-6 h-6 text-accent-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">{t('grievance.title')}</h1>
            <p className="text-sm text-neutral-500">We'll help you resolve issues with your applications.</p>
          </div>
        </div>

        <div className="card p-6 mb-4">
          <h3 className="section-title mb-4">{t('grievance.whatProblem')}</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {PROBLEM_TYPES.map((pt) => (
              <button
                key={pt.key}
                onClick={() => setSelectedType(pt.key)}
                className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium transition-all text-left ${
                  selectedType === pt.key
                    ? 'border-accent-500 bg-accent-50 text-accent-700'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <span className="text-lg">{pt.icon}</span>
                {t(pt.key)}
              </button>
            ))}
          </div>
        </div>

        {selectedType && (
          <div className="card p-6 mb-4 animate-slide-down">
            <h3 className="section-title mb-3">{t('grievance.describe')}</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="input resize-none"
              placeholder="Please describe the problem you are facing..."
            />
            <button
              onClick={handleSubmit}
              disabled={!description.trim()}
              className="btn-primary btn-lg w-full mt-4"
            >
              {t('common.submit')}
            </button>
          </div>
        )}

        {complaints.length > 0 && (
          <div className="mt-8">
            <h3 className="section-title mb-3">Your Previous Problems</h3>
            <div className="space-y-3">
              {complaints.map((c) => (
                <div key={c.id} className="card p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-neutral-500">{c.id}</span>
                    <span className="badge-warning">{c.status}</span>
                  </div>
                  <p className="text-sm font-semibold text-neutral-900">{c.type}</p>
                  <p className="text-sm text-neutral-500 mt-1">{c.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-neutral-400">
                    <span>{t('grievance.assignedDept')}: {c.assignedDepartment}</span>
                    <span>·</span>
                    <span>{c.lastUpdate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
