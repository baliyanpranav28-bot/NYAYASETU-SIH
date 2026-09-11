import { useApp } from '@/context/AppContext';
import { Search, FileText, LifeBuoy, ArrowRight, LayoutDashboard, Sparkles } from 'lucide-react';

export function HomePage() {
  const { t, navigate, profileCompleted } = useApp();

  const cards = [
    {
      icon: Search,
      title: t('home.findSchemes'),
      desc: t('home.findSchemesDesc'),
      color: 'bg-primary-50 text-primary-600',
      action: () => navigate(profileCompleted ? 'schemes' : 'profile'),
    },
    {
      icon: FileText,
      title: t('home.trackApp'),
      desc: t('home.trackAppDesc'),
      color: 'bg-success-50 text-success-600',
      action: () => navigate('tracking'),
    },
    {
      icon: LifeBuoy,
      title: t('home.reportProblem'),
      desc: t('home.reportProblemDesc'),
      color: 'bg-accent-50 text-accent-600',
      action: () => navigate('reportProblem'),
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary-200" />
            <span className="text-sm font-medium text-primary-100">Unified Welfare Access</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3">
            {t('home.welcome')}
          </h1>
          <p className="text-lg text-primary-100 mb-6">{t('home.whatToDo')}</p>

          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-success-400 animate-pulse-soft" />
            From eligibility to benefit — one welfare journey
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid sm:grid-cols-3 gap-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <button
                key={i}
                onClick={card.action}
                className="card-hover p-6 text-left animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-neutral-900 mb-1.5">{card.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-3">{card.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
                  Get Started <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            );
          })}
        </div>

        {/* Profile prompt */}
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-5">
          <div>
            <p className="text-sm font-semibold text-neutral-900">{t('home.haveProfile')}</p>
            <p className="text-sm text-neutral-500">View your dashboard, applications and recommended schemes.</p>
          </div>
          <button
            onClick={() => navigate(profileCompleted ? 'citizenDashboard' : 'profile')}
            className="btn-secondary shrink-0"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">{t('home.continueDashboard')}</span>
            <span className="sm:hidden">Dashboard</span>
          </button>
        </div>
      </div>

      {/* Final homepage message */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-3">
            {t('footer.message')}
          </h2>
          <p className="text-base text-neutral-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t('footer.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate('schemes')} className="btn-primary btn-lg">
              <Search className="w-5 h-5" />
              {t('home.findSchemes')}
            </button>
            <button onClick={() => navigate('tracking')} className="btn-secondary btn-lg">
              <FileText className="w-5 h-5" />
              {t('home.trackApp')}
            </button>
          </div>
        </div>

        {/* How it works strip */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-neutral-50 to-primary-50/50 border border-neutral-200/60 p-6 sm:p-8">
          <h3 className="section-title mb-5 text-center">{t('welcome.howItWorks')}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {['welcome.step1', 'welcome.step2', 'welcome.step3', 'welcome.step4', 'welcome.step5', 'welcome.step6', 'welcome.step7'].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-primary-200 flex items-center justify-center text-sm font-bold text-primary-700">
                  {i + 1}
                </div>
                <span className="text-xs font-medium text-neutral-600 leading-tight">{t(step)}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button onClick={() => navigate('howItWorks')} className="text-sm font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1">
              Learn more <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
