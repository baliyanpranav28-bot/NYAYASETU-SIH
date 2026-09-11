import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, ArrowRight, ArrowLeft, FileText, Check, Copy } from 'lucide-react';
import { getSchemeById, getMatchResultForScheme } from '@/services/eligibilityEngine';
import type { CitizenApplication } from '@/types/welfare';

export function ApplicationPage() {
  const { t, navigate, selectedSchemeId, currentProfile, addApplication } = useApp();
  const scheme = getSchemeById(selectedSchemeId || '');
  const [submitted, setSubmitted] = useState(false);
  const [appId] = useState(`NY-2026-${String(Math.floor(10000 + Math.random() * 89999)).slice(0, 5)}`);

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

  const profileSections = [
    {
      title: 'Basic Details',
      items: [
        `Name: ${currentProfile.name || '—'}`,
        `Age: ${currentProfile.age || '—'}, Gender: ${currentProfile.gender}`,
        `State: ${currentProfile.state || '—'}, District: ${currentProfile.district || '—'}`,
        `Area: ${currentProfile.areaType}`,
        `Occupation: ${currentProfile.occupation || '—'}`,
      ],
    },
    {
      title: 'Household Details',
      items: [
        `Family Members: ${currentProfile.familyMembers}`,
        `Annual Income: ₹${currentProfile.householdIncome.toLocaleString('en-IN')}`,
        `Dependents: ${currentProfile.dependents}`,
        `Existing Benefits: ${currentProfile.existingBenefits || 'None'}`,
      ],
    },
  ];

  const handleSubmit = () => {
    const newApp: CitizenApplication = {
      id: appId,
      schemeId: scheme.id,
      schemeName: scheme.name,
      citizenName: currentProfile.name,
      status: 'Submitted',
      currentStep: 0,
      steps: [
        { label: 'Application Submitted', status: 'done', detail: `Submitted on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}` },
        { label: 'Document Verification', status: 'current', detail: 'Your documents are being verified.' },
        ...scheme.applicationSteps.slice(2).map((label) => ({ label, status: 'pending' as const, detail: 'Pending' })),
      ],
      lastUpdated: 'Today',
      nextAction: 'Your application is being processed.',
      hasIssue: false,
      issueDetail: '',
      submittedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    addApplication(newApp);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="card p-8 sm:p-10 max-w-md w-full text-center animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-success-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-10 h-10 text-success-600" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 mb-2">Application Submitted</h2>
          <p className="text-sm text-neutral-500 mb-6">Your application has been submitted successfully.</p>

          <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-5 mb-6">
            <p className="text-xs text-neutral-500 mb-1">Application ID</p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-lg font-bold text-primary-700 tracking-wider">{appId}</p>
              <button onClick={() => navigator.clipboard?.writeText(appId)} className="p-1.5 rounded-lg hover:bg-neutral-200 transition-colors">
                <Copy className="w-4 h-4 text-neutral-500" />
              </button>
            </div>
            <p className="text-xs text-neutral-400 mt-2">Scheme: {scheme.name}</p>
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={() => navigate('tracking')} className="btn-primary btn-lg w-full">
              Track Application
              <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('citizenDashboard')} className="btn-secondary w-full">
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const docs = matchResult?.requiredDocuments ?? [];
  const missingCount = docs.filter((d) => d.status === 'missing').length;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <button onClick={() => navigate('schemeDetails')} className="btn-ghost text-sm mb-4 -ml-2">
          <ArrowLeft className="w-4 h-4" />
          {t('common.back')}
        </button>

        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Apply for Scheme</h1>
        <p className="text-sm text-neutral-500 mb-1">{scheme.name}</p>
        <p className="text-xs text-neutral-400 mb-6">{scheme.ministry}</p>

        <div className="space-y-4 mb-6">
          <p className="text-sm font-semibold text-neutral-700">
            Your profile information is ready. No need to re-enter your details.
          </p>

          {profileSections.map((section, i) => (
            <div key={i} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-neutral-900">{section.title}</h3>
                <span className="badge-success"><Check className="w-3.5 h-3.5" /> Complete</span>
              </div>
              <div className="space-y-1.5">
                {section.items.map((item, j) => (
                  <p key={j} className="text-sm text-neutral-600">{item}</p>
                ))}
              </div>
            </div>
          ))}

          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-neutral-600" />
                Documents you may need
              </h3>
              {missingCount > 0 && <span className="badge-warning">{missingCount} missing</span>}
            </div>
            <div className="space-y-2">
              {docs.map((doc, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">{doc.name}</span>
                  {doc.status === 'available' ? (
                    <span className="badge-success text-xs"><Check className="w-3 h-3" /> Available</span>
                  ) : (
                    <span className="badge-warning text-xs">Missing</span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-primary-50 p-3">
              <p className="text-xs text-primary-800 leading-relaxed">
                You can still submit your application with missing documents. They may be required during verification.
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6 bg-primary-50/30 border-primary-100 mb-6">
          <h3 className="section-title mb-2">Review Application</h3>
          <p className="text-sm text-neutral-600 mb-4">
            Please review your information above. By submitting, you confirm the information is accurate to the best of your knowledge.
          </p>
          <div className="rounded-lg bg-white border border-neutral-200 p-3 mb-4">
            <p className="text-xs text-neutral-500">Scheme</p>
            <p className="text-sm font-semibold text-neutral-900">{scheme.name}</p>
            <p className="text-xs text-neutral-500 mt-2">Applicant</p>
            <p className="text-sm font-semibold text-neutral-900">{currentProfile.name || '—'} · {currentProfile.district}, {currentProfile.state}</p>
          </div>
          <button onClick={handleSubmit} className="btn-primary btn-lg w-full">
            {t('common.submit')} Application
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-neutral-400 text-center">
          Final eligibility and approval are determined by the concerned authority.
        </p>
      </div>
    </div>
  );
}
