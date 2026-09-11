import { useApp } from '@/context/AppContext';
import { Search, FileText, AlertCircle, HelpCircle, ArrowRight, Bell, Target, Sparkles, CheckCircle2, UserPlus, RotateCcw, FileSearch } from 'lucide-react';
import { findMatchingSchemes } from '@/services/eligibilityEngine';
import { getSchemeById } from '@/services/eligibilityEngine';
import { useMemo } from 'react';
import { DemoBadge } from '@/components/DemoBadge';

export function CitizenDashboardPage() {
  const { t, navigate, setSelectedSchemeId, setSelectedApplicationId, currentProfile, applications, complaints, isRaviProfile, startNewCitizen, loadRaviProfile, profileCompleted } = useApp();

  const results = useMemo(() => (profileCompleted ? findMatchingSchemes(currentProfile) : []), [currentProfile, profileCompleted]);
  const recommended = results.filter((r) => r.result.matchLevel !== 'low').slice(0, 3);
  const highMatchCount = results.filter((r) => r.result.matchLevel === 'high').length;
  const potentialCount = results.filter((r) => r.result.matchLevel === 'potential').length;
  const totalRelevant = profileCompleted ? highMatchCount + potentialCount : 0;
  const issueApp = profileCompleted ? applications.find((a) => a.hasIssue) : undefined;

  const missingDocCount = useMemo(() => {
    if (!profileCompleted) return 0;
    const relevantSchemes = results.filter((r) => r.result.matchLevel !== 'low');
    const allDocs = new Set<string>();
    for (const { result } of relevantSchemes) {
      for (const doc of result.requiredDocuments) {
        if (doc.status === 'missing') allDocs.add(doc.name);
      }
    }
    return allDocs.size;
  }, [results, profileCompleted]);

  const stats = [
    { label: 'Potentially Relevant Schemes', value: totalRelevant, icon: Target, color: 'bg-primary-50 text-primary-600' },
    { label: 'Application in Progress', value: applications.length, icon: FileText, color: 'bg-warning-50 text-warning-600' },
    { label: 'Missing Documents', value: missingDocCount, icon: AlertCircle, color: 'bg-accent-50 text-accent-600' },
    { label: 'Open Problems', value: complaints.filter((c) => c.status === 'Under Review').length, icon: HelpCircle, color: 'bg-success-50 text-success-600' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Hello, {currentProfile.name || 'New Citizen'}</h1>
            <p className="text-sm text-neutral-500">Your Welfare Journey</p>
          </div>
          <div className="flex items-center gap-2">
            <DemoBadge className="hidden sm:inline-flex" />
            {isRaviProfile ? (
              <button onClick={startNewCitizen} className="btn-accent text-sm">
                <UserPlus className="w-4 h-4" />
                New Data
              </button>
            ) : (
              <button onClick={loadRaviProfile} className="btn-secondary text-sm">
                <RotateCcw className="w-4 h-4" />
                Load Demo (Ravi)
              </button>
            )}
          </div>
        </div>

        {/* New citizen banner */}
        {!isRaviProfile && (
          <div className="rounded-xl bg-primary-50 border border-primary-200 px-5 py-3 mb-6 flex items-center gap-3 animate-slide-down">
            <UserPlus className="w-5 h-5 text-primary-600 shrink-0" />
            <p className="text-sm text-primary-800">
              <span className="font-semibold">New citizen session active.</span> Ravi's data has been cleared. Enter the new citizen's information below.
            </p>
          </div>
        )}

        {/* Incomplete profile banner */}
        {!profileCompleted && (
          <div className="rounded-xl bg-warning-50 border border-warning-200 px-5 py-4 mb-6 flex items-center justify-between gap-3 animate-slide-down">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-warning-600 shrink-0" />
              <p className="text-sm text-warning-800">
                <span className="font-semibold">Profile incomplete.</span> Complete your profile to discover schemes relevant to you.
              </p>
            </div>
            <button onClick={() => navigate('profile')} className="btn-primary text-sm shrink-0">
              Complete Profile
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="card p-5 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-3xl font-extrabold text-neutral-900 leading-none mb-1">{stat.value}</p>
                <p className="text-xs font-medium text-neutral-500 leading-tight">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Recommended + Applications */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recommended */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="section-title flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  Recommended for You
                </h2>
                <button onClick={() => navigate('schemes')} className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                  View All
                </button>
              </div>
              {recommended.length === 0 ? (
                <div className="card p-6 text-center">
                  <FileSearch className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                  <p className="text-sm text-neutral-500 mb-3">No matching schemes found. Try updating your profile.</p>
                  <button onClick={() => navigate('profile')} className="btn-secondary text-sm">Update Profile</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recommended.map(({ scheme, result }) => (
                    <div key={scheme.id} className="card-hover p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={result.matchLevel === 'high' ? 'badge-success' : 'badge-warning'}>
                              {result.matchLevel === 'high' ? t('schemes.highMatch') : t('schemes.potentialMatch')}
                            </span>
                            <span className="text-xs text-neutral-400">{result.matchScore}% match</span>
                          </div>
                          <p className="text-sm font-bold text-neutral-900">{scheme.name}</p>
                          <p className="text-xs text-neutral-500 mt-0.5">{scheme.description}</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedSchemeId(scheme.id);
                            navigate('schemeDetails');
                          }}
                          className="btn-ghost text-xs shrink-0"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Applications */}
            <div>
              <h2 className="section-title flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-neutral-600" />
                Your Applications
              </h2>
              {applications.length === 0 ? (
                <div className="card p-6 text-center">
                  <FileText className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                  <p className="text-sm text-neutral-500 mb-3">No applications yet.</p>
                  <button onClick={() => navigate('schemes')} className="btn-secondary text-sm">Find Schemes to Apply</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => {
                        setSelectedApplicationId(app.id);
                        navigate('tracking');
                      }}
                      className="card-hover p-4 w-full text-left"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-neutral-900">{app.schemeName}</p>
                        {app.hasIssue ? (
                          <span className="badge-error"><AlertCircle className="w-3.5 h-3.5" /> Action Required</span>
                        ) : (
                          <span className="badge-warning">{app.status}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-neutral-500">
                        <span className="font-mono">{app.id}</span>
                        <span>·</span>
                        <span>Updated: {app.lastUpdated}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Action Required + Updates */}
          <div className="space-y-6">
            {/* Action Required */}
            {issueApp && (
              <div className="card p-5 border-accent-200/60 bg-accent-50/20">
                <h2 className="section-title flex items-center gap-2 mb-4 text-accent-700">
                  <AlertCircle className="w-5 h-5" />
                  Action Required
                </h2>
                <div className="rounded-lg bg-white border border-accent-200 p-4">
                  <p className="text-sm text-neutral-700 mb-3">
                    An issue needs attention for <span className="font-semibold">{issueApp.schemeName}</span>
                  </p>
                  <button
                    onClick={() => {
                      setSelectedApplicationId(issueApp.id);
                      navigate('tracking');
                    }}
                    className="btn-accent text-sm w-full"
                  >
                    Complete Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Updates */}
            <div className="card p-5">
              <h2 className="section-title flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-neutral-600" />
                Updates
              </h2>
              {applications.length > 0 ? (
                <div className="space-y-3">
                  {applications.slice(0, 3).map((app) => (
                    <div key={app.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-700">Your application for <span className="font-semibold">{app.schemeName}</span> is at <span className="font-semibold">{app.status}</span>.</p>
                        <p className="text-xs text-neutral-400 mt-0.5">{app.id} · {app.lastUpdated}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-400">No updates yet. Apply for a scheme to see tracking updates here.</p>
              )}
            </div>

            {/* Quick actions */}
            <div className="card p-5">
              <h2 className="section-title mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button onClick={() => navigate('schemes')} className="w-full flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
                  <span className="flex items-center gap-2"><Search className="w-4 h-4 text-primary-600" /> Find New Schemes</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </button>
                <button onClick={() => navigate('profile')} className="w-full flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
                  <span className="flex items-center gap-2"><RotateCcw className="w-4 h-4 text-primary-600" /> Update Profile</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </button>
                <button onClick={() => navigate('reportProblem')} className="w-full flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
                  <span className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-accent-600" /> Report a Problem</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
