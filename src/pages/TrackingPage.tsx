import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, Circle, AlertCircle, ArrowRight, LifeBuoy, Clock, FileText, ChevronRight, Search } from 'lucide-react';
import type { CitizenApplication } from '@/types/welfare';

export function TrackingPage() {
  const { t, navigate, applications } = useApp();
  const [selectedApp, setSelectedApp] = useState<CitizenApplication | null>(null);

  if (selectedApp) {
    return <TrackingDetail app={selectedApp} onBack={() => setSelectedApp(null)} navigate={navigate} t={t} />;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">{t('tracking.title')}</h1>
        <p className="text-sm text-neutral-500 mb-6">Select an application to view its detailed status.</p>

        {applications.length === 0 ? (
          <div className="card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">No applications yet</h3>
            <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">
              You haven't applied for any schemes yet. Find schemes relevant to you and start an application.
            </p>
            <button onClick={() => navigate('schemes')} className="btn-primary">
              <Search className="w-4 h-4" />
              Find My Schemes
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {applications.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className="card-hover p-5 w-full text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-900">{app.schemeName}</p>
                      <p className="text-xs text-neutral-500">ID: {app.id}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400" />
                </div>
                <div className="flex items-center gap-2 ml-12">
                  {app.hasIssue ? (
                    <span className="badge-error"><AlertCircle className="w-3.5 h-3.5" /> {t('tracking.actionRequired')}</span>
                  ) : (
                    <span className="badge-warning">{app.status}</span>
                  )}
                  <span className="text-xs text-neutral-400">· {t('tracking.lastUpdated')}: {app.lastUpdated}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 rounded-xl border border-accent-200 bg-accent-50/40 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
              <LifeBuoy className="w-5 h-5 text-accent-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">Facing a problem with an application?</p>
              <p className="text-xs text-neutral-500">Report a delay, document issue, or payment problem.</p>
            </div>
          </div>
          <button onClick={() => navigate('reportProblem')} className="btn-accent text-sm shrink-0">
            Report
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function TrackingDetail({
  app,
  onBack,
  navigate,
  t,
}: {
  app: CitizenApplication;
  onBack: () => void;
  navigate: (page: 'tracking' | 'reportProblem') => void;
  t: (key: string) => string;
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <button onClick={onBack} className="btn-ghost text-sm mb-4 -ml-2">
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Applications
        </button>

        <div className="card p-6 mb-4">
          <h1 className="text-xl font-bold text-neutral-900 mb-1">{app.schemeName}</h1>
          <p className="text-sm text-neutral-500">Application ID: <span className="font-mono font-semibold text-neutral-700">{app.id}</span></p>
          <p className="text-xs text-neutral-400 mt-1">Submitted: {app.submittedDate}</p>
        </div>

        <div className="card p-6 mb-4">
          <h3 className="section-title mb-5">Application Progress</h3>
          <div className="space-y-0">
            {app.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  {step.status === 'done' ? (
                    <div className="w-9 h-9 rounded-full bg-success-500 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  ) : step.status === 'current' ? (
                    <div className="w-9 h-9 rounded-full bg-warning-400 flex items-center justify-center ring-4 ring-warning-100 animate-pulse-soft">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-neutral-100 border-2 border-neutral-200 flex items-center justify-center">
                      <Circle className="w-4 h-4 text-neutral-300" />
                    </div>
                  )}
                  {i < app.steps.length - 1 && (
                    <div className={`w-0.5 h-8 ${step.status === 'done' ? 'bg-success-500' : 'bg-neutral-200'}`} />
                  )}
                </div>
                <div className="pb-1 flex-1">
                  <p className={`text-sm font-semibold ${step.status === 'current' ? 'text-warning-700' : step.status === 'done' ? 'text-neutral-700' : 'text-neutral-400'}`}>
                    {step.label}
                  </p>
                  <p className={`text-xs ${step.status === 'pending' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6 mb-4 border-warning-200/60">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-warning-500 animate-pulse-soft" />
            <h3 className="section-title text-warning-700">{t('tracking.currentStatus')}</h3>
          </div>
          <p className="text-base font-bold text-neutral-900 mb-1">{app.status}</p>
          <p className="text-xs text-neutral-500 mb-3">{t('tracking.lastUpdated')}: {app.lastUpdated}</p>
          <div className="rounded-lg bg-neutral-50 p-3">
            <p className="text-xs font-semibold text-neutral-500 mb-1">{t('tracking.nextAction')}</p>
            <p className="text-sm text-neutral-700">{app.nextAction}</p>
          </div>
        </div>

        {app.hasIssue && (
          <div className="card p-6 mb-4 border-error-200/60 bg-error-50/20">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-error-600" />
              <h3 className="section-title text-error-700">{t('tracking.actionRequired')}</h3>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed mb-4">{app.issueDetail}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="btn-primary text-sm flex-1">{t('common.fixIssue')}</button>
              <button onClick={() => navigate('reportProblem')} className="btn-secondary text-sm flex-1">
                <LifeBuoy className="w-4 h-4" />
                {t('common.contactReport')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
