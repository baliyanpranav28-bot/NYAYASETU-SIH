import { useApp } from '@/context/AppContext';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, FileText, Info, Save, Building2, ExternalLink } from 'lucide-react';
import { getSchemeById, getMatchResultForScheme } from '@/services/eligibilityEngine';

export function SchemeDetailsPage() {
  const { t, navigate, selectedSchemeId, currentProfile } = useApp();
  const scheme = getSchemeById(selectedSchemeId || '');
  const matchResult = getMatchResultForScheme(currentProfile, selectedSchemeId || '');

  if (!scheme) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-neutral-500 mb-4">Scheme not found.</p>
          <button onClick={() => navigate('schemes')} className="btn-primary">Back to Schemes</button>
        </div>
      </div>
    );
  }

  const matchBadge =
    matchResult?.matchLevel === 'high'
      ? 'badge-success'
      : matchResult?.matchLevel === 'potential'
      ? 'badge-warning'
      : 'badge-neutral';

  const metReasons = matchResult?.reasons.filter((r) => r.met) ?? [];
  const unmetReasons = matchResult?.reasons.filter((r) => !r.met) ?? [];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <button onClick={() => navigate('schemes')} className="btn-ghost text-sm mb-4 -ml-2">
          <ArrowLeft className="w-4 h-4" />
          {t('common.back')}
        </button>

        {/* Scheme header */}
        <div className="card p-6 mb-4">
          <div className="flex items-center gap-2 mb-2">
            {matchResult && <span className={matchBadge}>
              {matchResult.matchLevel === 'high' ? t('schemes.highMatch') : matchResult.matchLevel === 'potential' ? t('schemes.potentialMatch') : 'Low Match'}
            </span>}
            <span className="badge-neutral">{scheme.category}</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-900 mb-1">{scheme.name}</h1>
          <p className="text-sm text-neutral-500 flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            {scheme.ministry}
          </p>
        </div>

        {/* What is this scheme */}
        <div className="card p-6 mb-4">
          <h3 className="section-title mb-2">What is this scheme?</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{scheme.description}</p>
        </div>

        {/* What benefit */}
        <div className="card p-6 mb-4 bg-primary-50/30 border-primary-100">
          <h3 className="section-title mb-2 text-primary-700">What benefit can you receive?</h3>
          <p className="text-sm text-neutral-700 leading-relaxed font-medium">{scheme.benefit}</p>
        </div>

        {/* Why does it match */}
        {matchResult && (
          <div className="card p-6 mb-4">
            <h3 className="section-title mb-4">Why this scheme may be relevant to you</h3>
            <div className="space-y-2.5">
              {matchResult.reasons.map((reason, i) => (
                <div key={i} className="flex items-start gap-3">
                  {reason.met ? (
                    <CheckCircle2 className="w-5 h-5 text-success-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-warning-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">{reason.label}</p>
                    <p className="text-sm text-neutral-500">{reason.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Needs verification */}
        {unmetReasons.length > 0 && (
          <div className="card p-6 mb-4 border-warning-200/60">
            <h3 className="section-title mb-3 flex items-center gap-2 text-warning-700">
              <XCircle className="w-5 h-5" />
              Needs Verification
            </h3>
            <div className="space-y-2">
              {unmetReasons.map((reason, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-neutral-700">
                  <XCircle className="w-4 h-4 text-warning-600" />
                  {reason.detail}
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-start gap-2.5 rounded-lg bg-warning-50 p-3">
              <Info className="w-4 h-4 text-warning-600 shrink-0 mt-0.5" />
              <p className="text-xs text-warning-800 leading-relaxed">
                You may still be eligible, but these conditions may require verification during application.
              </p>
            </div>
          </div>
        )}

        {/* Documents required */}
        <div className="card p-6 mb-4">
          <h3 className="section-title mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-neutral-600" />
            Documents you may need
          </h3>
          <div className="space-y-2">
            {scheme.requiredDocuments.map((docName, i) => {
              const docResult = matchResult?.requiredDocuments.find((d) => d.name === docName);
              const isAvailable = docResult?.status === 'available';
              return (
                <div key={i} className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3">
                  <div className="flex items-center gap-3">
                    {isAvailable ? (
                      <CheckCircle2 className="w-5 h-5 text-success-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-neutral-300" />
                    )}
                    <span className="text-sm font-medium text-neutral-700">{docName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isAvailable ? (
                      <span className="badge-success text-xs">Available</span>
                    ) : (
                      <span className="badge-warning text-xs">Missing</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Application process */}
        <div className="card p-6 mb-4">
          <h3 className="section-title mb-4">Application Process</h3>
          <div className="space-y-0">
            {scheme.applicationSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-50 border-2 border-primary-200 flex items-center justify-center text-xs font-bold text-primary-700">
                    {i + 1}
                  </div>
                  {i < scheme.applicationSteps.length - 1 && <div className="w-0.5 h-6 bg-neutral-200" />}
                </div>
                <span className="text-sm text-neutral-700 font-medium pb-1">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Official source */}
        <div className="card p-5 mb-4 bg-neutral-50/50">
          <h3 className="text-sm font-bold text-neutral-700 mb-1">Official Source</h3>
          <a
            href={scheme.officialSource}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1.5"
          >
            {scheme.officialSource}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2.5 rounded-xl bg-neutral-50 border border-neutral-200 p-4 mb-6">
          <Info className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
          <p className="text-sm text-neutral-500 leading-relaxed">
            Final eligibility and approval are determined by the concerned authority.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => navigate('application')} className="btn-primary btn-lg flex-1">
            {t('common.startApplication')}
            <ArrowRight className="w-5 h-5" />
          </button>
          {scheme.applicationUrl && (
            <a href={scheme.applicationUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-lg">
              <ExternalLink className="w-5 h-5" />
              Official Portal
            </a>
          )}
          <button onClick={() => navigate('schemes')} className="btn-secondary btn-lg">
            <Save className="w-5 h-5" />
            {t('common.saveScheme')}
          </button>
        </div>
      </div>
    </div>
  );
}
