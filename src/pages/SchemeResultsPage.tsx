import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertCircle, ArrowRight, ChevronDown, ChevronUp, Sparkles, TrendingUp, Search, RotateCcw } from 'lucide-react';
import { useState, useMemo } from 'react';
import { findMatchingSchemes } from '@/services/eligibilityEngine';
import type { MatchResult, WelfareScheme } from '@/types/welfare';

export function SchemeResultsPage() {
  const { t, navigate, setSelectedSchemeId, currentProfile, isRaviProfile, profileCompleted } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const results = useMemo(() => (profileCompleted ? findMatchingSchemes(currentProfile) : []), [currentProfile, profileCompleted]);

  const highMatch = results.filter((r) => r.result.matchLevel === 'high');
  const potentialMatch = results.filter((r) => r.result.matchLevel === 'potential');
  const lowMatch = results.filter((r) => r.result.matchLevel === 'low');

  const renderCard = (scheme: WelfareScheme, result: MatchResult) => {
    const isExpanded = expandedId === scheme.id;
    const matchColor =
      result.matchLevel === 'high'
        ? { badge: 'badge-success', dot: 'bg-success-500', ring: 'border-success-200' }
        : result.matchLevel === 'potential'
        ? { badge: 'badge-warning', dot: 'bg-warning-500', ring: 'border-warning-200' }
        : { badge: 'badge-neutral', dot: 'bg-neutral-400', ring: 'border-neutral-200' };

    return (
      <div key={scheme.id} className={`card border ${matchColor.ring} overflow-hidden animate-slide-up`}>
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2.5 h-2.5 rounded-full ${matchColor.dot}`} />
                <span className={matchColor.badge}>
                  {result.matchLevel === 'high' ? t('schemes.highMatch') : result.matchLevel === 'potential' ? t('schemes.potentialMatch') : 'Low Match'}
                </span>
                <span className="text-xs text-neutral-400 font-medium">{result.matchScore}% profile match</span>
              </div>
              <h3 className="text-base font-bold text-neutral-900 leading-tight">{scheme.name}</h3>
              <p className="text-xs text-neutral-500 mt-0.5">{scheme.ministry} · {scheme.category}</p>
            </div>
          </div>

          <p className="text-sm text-neutral-600 leading-relaxed mb-4">{scheme.description}</p>

          {/* Match reasons preview */}
          <div className="space-y-1.5 mb-4">
            {result.reasons.slice(0, isExpanded ? undefined : 3).map((reason, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                {reason.met ? (
                  <CheckCircle2 className="w-4 h-4 text-success-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-warning-600 shrink-0 mt-0.5" />
                )}
                <span className="text-neutral-700">
                  <span className="font-medium">{reason.label}:</span> {reason.detail}
                </span>
              </div>
            ))}
          </div>

          {/* Missing evidence */}
          {result.missingEvidence.length > 0 && (
            <div className="rounded-lg bg-warning-50 border border-warning-100 px-3.5 py-2.5 mb-4">
              <p className="text-xs font-semibold text-warning-700 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {t('schemes.missingEvidence')}: {result.missingEvidence.join(', ')}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setSelectedSchemeId(scheme.id);
                navigate('schemeDetails');
              }}
              className="btn-primary text-sm"
            >
              {t('common.viewScheme')}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setExpandedId(isExpanded ? null : scheme.id)}
              className="btn-ghost text-sm"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {t('schemes.whyEligible')}
            </button>
            {result.matchLevel !== 'low' && (
              <button
                onClick={() => {
                  setSelectedSchemeId(scheme.id);
                  navigate('application');
                }}
                className="btn-accent text-sm ml-auto"
              >
                {t('common.startApplication')}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const hasAnyResults = highMatch.length > 0 || potentialMatch.length > 0;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-primary-600" />
            <h1 className="text-2xl font-bold text-neutral-900">{t('schemes.title')}</h1>
          </div>
          <p className="text-sm text-neutral-500">
            {t('schemes.subtitle')} · <span className="font-medium text-neutral-600">Profile: {currentProfile.name || 'Unnamed'}</span>
          </p>
        </div>

        {/* Summary bar */}
        {profileCompleted && (
        <div className="flex items-center gap-3 mb-6 rounded-xl bg-white border border-neutral-200 px-5 py-4">
          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-neutral-900">
              {highMatch.length} High Match · {potentialMatch.length} Potential · {lowMatch.length} Low
            </p>
            <p className="text-xs text-neutral-500">You may be eligible based on the information available.</p>
          </div>
          <button onClick={() => navigate('profile')} className="btn-secondary text-sm shrink-0">
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Update Profile</span>
            <span className="sm:hidden">Edit</span>
          </button>
        </div>
        )}

        {/* Profile incomplete state */}
        {!profileCompleted && (
          <div className="card p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-warning-50 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-warning-500" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">Complete your profile</h3>
            <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">
              We need your information before we can identify schemes that may be relevant to you.
            </p>
            <button onClick={() => navigate('profile')} className="btn-primary">
              Complete Profile
            </button>
          </div>
        )}

        {/* Empty state */}
        {profileCompleted && !hasAnyResults && lowMatch.length === 0 && (
          <div className="card p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">No immediate matches found</h3>
            <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">
              Based on the information provided, no schemes were identified as a strong match. Try updating your profile or providing additional details.
            </p>
            <button onClick={() => navigate('profile')} className="btn-primary">
              <RotateCcw className="w-4 h-4" />
              Update Profile
            </button>
          </div>
        )}

        {/* High match */}
        {profileCompleted && highMatch.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              {t('schemes.highMatch')}
            </h2>
            <div className="space-y-3">{highMatch.map((r) => renderCard(r.scheme, r.result))}</div>
          </div>
        )}

        {/* Potential match */}
        {profileCompleted && potentialMatch.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-warning-500" />
              {t('schemes.potentialMatch')}
            </h2>
            <div className="space-y-3">{potentialMatch.map((r) => renderCard(r.scheme, r.result))}</div>
          </div>
        )}

        {/* Low match */}
        {profileCompleted && lowMatch.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-neutral-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neutral-400" />
              Low Match
            </h2>
            <div className="space-y-3">{lowMatch.map((r) => renderCard(r.scheme, r.result))}</div>
          </div>
        )}

        {profileCompleted && (
        <div className="flex items-start gap-2.5 rounded-xl bg-neutral-50 border border-neutral-200 p-4 mt-4">
          <AlertCircle className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
          <p className="text-sm text-neutral-500 leading-relaxed">
            You may be eligible based on the information available. Final eligibility and approval are determined by the concerned authority.
          </p>
        </div>
        )}
      </div>
    </div>
  );
}
