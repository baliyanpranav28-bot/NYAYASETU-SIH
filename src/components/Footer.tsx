import { useApp } from '@/context/AppContext';
import { Logo } from './Logo';
import { ArrowRight, Heart } from 'lucide-react';

export function Footer() {
  const { t, navigate } = useApp();

  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md">
                <span className="text-white font-extrabold text-sm">N</span>
              </div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight">NYAYASETU</span>
                <p className="text-xs text-neutral-400">Unified Welfare Access</p>
              </div>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              {t('footer.desc')}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">For Citizens</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate('schemes')} className="hover:text-white transition-colors flex items-center gap-1">
                  {t('nav.findSchemes')} <ArrowRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => navigate('tracking')} className="hover:text-white transition-colors flex items-center gap-1">
                  {t('nav.myApplications')} <ArrowRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => navigate('reportProblem')} className="hover:text-white transition-colors flex items-center gap-1">
                  {t('nav.myProblems')} <ArrowRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => navigate('howItWorks')} className="hover:text-white transition-colors flex items-center gap-1">
                  How It Works <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">For Government</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate('officerLogin')} className="hover:text-white transition-colors flex items-center gap-1">
                  {t('officer.login')} <ArrowRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => navigate('coverageGaps')} className="hover:text-white transition-colors flex items-center gap-1">
                  {t('officer.coverageGaps')} <ArrowRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => navigate('overlapReview')} className="hover:text-white transition-colors flex items-center gap-1">
                  Overlap Review <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-6">
          <p className="text-center text-sm text-neutral-400 font-medium mb-2">
            {t('footer.message')}
          </p>
          <p className="text-center text-xs text-neutral-500 flex items-center justify-center gap-1.5">
            <span>Demo / Prototype Data</span>
            <span>·</span>
            <span className="flex items-center gap-1">Built for Smart India Hackathon <Heart className="w-3 h-3 text-primary-500 fill-primary-500" /></span>
          </p>
        </div>
      </div>
    </footer>
  );
}
