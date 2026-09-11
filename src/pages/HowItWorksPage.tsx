import { useApp } from '@/context/AppContext';
import { UserPlus, Search, HelpCircle, FileText, Send, Eye, ArrowRight, CheckCircle2 } from 'lucide-react';

export function HowItWorksPage() {
  const { navigate } = useApp();

  const steps = [
    { icon: UserPlus, title: 'Create Profile', desc: 'Tell us about yourself and your household.', color: 'bg-primary-50 text-primary-600' },
    { icon: Search, title: 'Find Benefits', desc: 'Find schemes relevant to your profile.', color: 'bg-primary-50 text-primary-600' },
    { icon: HelpCircle, title: 'Understand', desc: 'See why a scheme may match you.', color: 'bg-success-50 text-success-600' },
    { icon: FileText, title: 'Complete Documents', desc: 'Know exactly what is missing.', color: 'bg-warning-50 text-warning-600' },
    { icon: Send, title: 'Apply', desc: 'Submit your application.', color: 'bg-primary-50 text-primary-600' },
    { icon: Eye, title: 'Track', desc: 'Know where your application stands.', color: 'bg-success-50 text-success-600' },
    { icon: CheckCircle2, title: 'Resolve', desc: 'Report and track problems.', color: 'bg-accent-50 text-accent-600' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-neutral-900 text-center mb-3">How NYAYASETU Works</h1>
        <p className="text-base text-neutral-500 text-center mb-12 max-w-xl mx-auto">
          From eligibility to benefit — one welfare journey for citizens, and better visibility for government.
        </p>

        {/* Journey */}
        <div className="space-y-1 mb-12">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex items-center gap-4 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-7 h-7" strokeWidth={1.8} />
                  </div>
                  {i < steps.length - 1 && <div className="w-0.5 h-8 bg-gradient-to-b from-neutral-200 to-neutral-200" />}
                </div>
                <div className="pb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary-600">STEP {i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">{step.title}</h3>
                  <p className="text-sm text-neutral-500">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="card p-6">
            <h3 className="section-title mb-2 text-primary-700">For Citizens</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Easier access and less repeated paperwork. Understand why you may qualify, know what documents are missing, track your application, and report problems — all in one place.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="section-title mb-2 text-primary-700">For Government</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Better visibility of coverage gaps, pending cases, and processing bottlenecks. Review possible overlaps and plan targeted outreach to households missing benefits.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-3">
            <button onClick={() => navigate('profile')} className="btn-primary btn-lg">
              Create Profile
              <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('officerLogin')} className="btn-secondary btn-lg">
              Officer Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
