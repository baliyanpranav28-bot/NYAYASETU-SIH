import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { LANGUAGES } from '@/data/translations';
import type { Language } from '@/data/translations';
import { Logo } from '@/components/Logo';
import { Globe, ArrowRight, UserPlus, Search, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

export function WelcomePage() {
  const { setLanguage, navigate, t, language } = useApp();
  const [selected, setSelected] = useState<Language>(language);

  const steps = [
    'welcome.step1',
    'welcome.step2',
    'welcome.step3',
    'welcome.step4',
    'welcome.step5',
    'welcome.step6',
    'welcome.step7',
  ];
  const stepIcons = [UserPlus, Search, HelpCircle, FileText, FileText, CheckCircle2, HelpCircle];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10 animate-fade-in">
          <Logo size="lg" />
        </div>

        {/* Language Selector */}
        <div className="card p-6 sm:p-8 mb-8 animate-slide-up">
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-5 h-5 text-primary-600" />
            <h2 className="text-base font-semibold text-neutral-900">Choose your language</h2>
          </div>
          <p className="text-sm text-neutral-500 mb-5">
            अपनी भाषा चुनें · আপনার ভাষা নির্বাচন করুন · ನಿಮ್ಮ ಭಾಷೆ ಆಯ್ಕಿಸಿ
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelected(lang.code as Language)}
                className={`flex items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  selected === lang.code
                    ? 'border-primary-600 bg-primary-50 text-primary-700 ring-2 ring-primary-100'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setLanguage(selected);
              navigate('home');
            }}
            className="btn-primary btn-lg w-full mt-6"
          >
            {t('app.continue')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Headline */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-snug mb-2">
            {t('welcome.headline')}
          </h1>
          <p className="text-sm text-neutral-500">
            From eligibility to benefit — one welfare journey.
          </p>
        </div>

        {/* How it works */}
        <div className="card p-6 sm:p-8 animate-slide-up">
          <h3 className="section-title mb-5 text-center">{t('welcome.howItWorks')}</h3>
          <div className="space-y-3">
            {steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 text-primary-600" strokeWidth={2} />
                    </div>
                    <span className="text-sm text-neutral-700 font-medium">
                      <span className="text-primary-600 font-bold mr-2">{i + 1}.</span>
                      {t(step)}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden sm:block w-px h-5 bg-neutral-200" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-6">
          Demo / Prototype Data — Smart India Hackathon
        </p>
      </div>
    </div>
  );
}
