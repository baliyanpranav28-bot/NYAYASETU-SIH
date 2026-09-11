import { Home, Search, FileText, HelpCircle, User, Shield } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Page } from '@/context/AppContext';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';

const citizenNav: { page: Page; key: string; icon: typeof Home }[] = [
  { page: 'home', key: 'nav.home', icon: Home },
  { page: 'schemes', key: 'nav.findSchemes', icon: Search },
  { page: 'tracking', key: 'nav.myApplications', icon: FileText },
  { page: 'reportProblem', key: 'nav.myProblems', icon: HelpCircle },
  { page: 'citizenDashboard', key: 'nav.profile', icon: User },
];

const officerNav: { page: Page; key: string; icon: typeof Home }[] = [
  { page: 'officerDashboard', key: 'officer.overview', icon: Home },
  { page: 'coverageGaps', key: 'officer.coverageGaps', icon: Search },
  { page: 'officerDashboard', key: 'officer.pendingApps', icon: FileText },
  { page: 'overlapReview', key: 'officer.overlaps', icon: HelpCircle },
];

const officerPages: Page[] = ['officerDashboard', 'coverageGaps', 'overlapReview'];

export function Header() {
  const { currentPage, navigate, t } = useApp();
  const isOfficer = officerPages.includes(currentPage);
  const nav = isOfficer ? officerNav : citizenNav;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Logo onClick={() => navigate(isOfficer ? 'officerDashboard' : 'home')} size="sm" />
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.key}
                  onClick={() => navigate(item.page)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t(item.key)}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {!isOfficer && (
              <button
                onClick={() => navigate('officerLogin')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
              >
                <Shield className="w-4 h-4" />
                Officer
              </button>
            )}
            {isOfficer && (
              <button
                onClick={() => navigate('home')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
              >
                <User className="w-4 h-4" />
                Citizen View
              </button>
            )}
            <LanguageSelector compact />
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center gap-1 pb-2 overflow-x-auto scrollbar-hide">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.key}
                onClick={() => navigate(item.page)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-500 hover:bg-neutral-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t(item.key)}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
