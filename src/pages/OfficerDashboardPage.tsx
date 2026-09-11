import { useApp } from '@/context/AppContext';
import { TrendingDown, Clock, AlertTriangle, LifeBuoy, BarChart3, ArrowRight, Users, FileWarning } from 'lucide-react';
import { officerStats, bottleneckData, coverageGapData } from '@/data/demoData';
import { DemoBadge } from '@/components/DemoBadge';

export function OfficerDashboardPage() {
  const { t, navigate } = useApp();

  const cards = [
    {
      label: t('officer.coverageGaps'),
      value: officerStats.coverageGaps,
      icon: TrendingDown,
      color: 'bg-error-50 text-error-600',
      border: 'border-error-200/60',
      desc: 'households may be eligible but have no application',
      action: () => navigate('coverageGaps'),
      actionLabel: t('officer.viewCases'),
    },
    {
      label: t('officer.pendingApps'),
      value: officerStats.pendingApplications,
      icon: Clock,
      color: 'bg-warning-50 text-warning-600',
      border: 'border-warning-200/60',
      desc: 'applications awaiting processing',
      action: () => navigate('coverageGaps'),
      actionLabel: t('officer.viewPending'),
    },
    {
      label: t('officer.overlaps'),
      value: officerStats.possibleOverlaps,
      icon: AlertTriangle,
      color: 'bg-accent-50 text-accent-600',
      border: 'border-accent-200/60',
      desc: 'benefit records flagged for review',
      action: () => navigate('overlapReview'),
      actionLabel: t('officer.reviewCases'),
    },
    {
      label: t('officer.openProblems'),
      value: officerStats.openProblems,
      icon: LifeBuoy,
      color: 'bg-primary-50 text-primary-600',
      border: 'border-primary-200/60',
      desc: 'citizen grievances open',
      action: () => navigate('coverageGaps'),
      actionLabel: 'View Problems',
    },
  ];

  const topGaps = [...coverageGapData].sort((a, b) => b.gap - a.gap).slice(0, 4);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">{t('officer.overview')}</h1>
            <p className="text-sm text-neutral-500">Department of Agriculture & Welfare · Varanasi, Uttar Pradesh</p>
          </div>
          <DemoBadge className="hidden sm:inline-flex" />
        </div>

        {/* Bottleneck banner */}
        <div className="rounded-2xl bg-gradient-to-r from-warning-50 to-accent-50/40 border border-warning-200/60 p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-warning-100 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-warning-700" />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-900">{t('officer.bottlenecks')}: {officerStats.processingBottlenecks} applications waiting</p>
              <p className="text-xs text-neutral-500">Document verification is the slowest stage with an average of 12 days.</p>
            </div>
          </div>
          <button onClick={() => navigate('coverageGaps')} className="btn-secondary text-sm shrink-0 hidden sm:flex">
            View Pending Cases
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dashboard cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className={`card p-5 border ${card.border} animate-slide-up`} style={{ animationDelay: `${i * 60}ms` }}>
                <div className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5.5 h-5.5" />
                </div>
                <p className="text-3xl font-extrabold text-neutral-900 leading-none mb-1">{card.value}</p>
                <p className="text-sm font-semibold text-neutral-700 mb-1">{card.label}</p>
                <p className="text-xs text-neutral-400 leading-tight mb-4">{card.desc}</p>
                <button onClick={card.action} className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                  {card.actionLabel}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Processing bottlenecks breakdown */}
          <div className="card p-6">
            <h3 className="section-title mb-5 flex items-center gap-2">
              <FileWarning className="w-5 h-5 text-warning-600" />
              Processing Bottlenecks by Stage
            </h3>
            <div className="space-y-4">
              {bottleneckData.map((b, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-neutral-700">{b.stage}</span>
                    <span className="text-sm font-bold text-neutral-900">{b.count} <span className="text-xs font-normal text-neutral-400">cases · {b.avgDays} days avg</span></span>
                  </div>
                  <div className="h-2.5 rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${i === 0 ? 'bg-error-500' : i === 1 ? 'bg-warning-500' : 'bg-accent-500'}`}
                      style={{ width: `${(b.count / 73) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top coverage gaps */}
          <div className="card p-6">
            <h3 className="section-title mb-5 flex items-center gap-2">
              <Users className="w-5 h-5 text-error-600" />
              Top Coverage Gaps
            </h3>
            <div className="space-y-3">
              {topGaps.map((gap, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">{gap.schemeName}</p>
                    <p className="text-xs text-neutral-400">{gap.district}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-error-600">{gap.gap}</p>
                    <p className="text-xs text-neutral-400">households</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('coverageGaps')} className="btn-secondary text-sm w-full mt-4">
              View Full Analysis
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
