import { useApp } from '@/context/AppContext';
import { TrendingDown, ArrowRight, MapPin, Target, Megaphone } from 'lucide-react';
import { coverageGapData } from '@/data/demoData';
import { DemoBadge } from '@/components/DemoBadge';

export function CoverageGapsPage() {
  const { navigate } = useApp();
  const sorted = [...coverageGapData].sort((a, b) => b.gap - a.gap);
  const totalEligible = coverageGapData.reduce((sum, r) => sum + r.potentiallyEligible, 0);
  const totalApplied = coverageGapData.reduce((sum, r) => sum + r.applied, 0);
  const totalGap = coverageGapData.reduce((sum, r) => sum + r.gap, 0);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
              <TrendingDown className="w-6 h-6 text-error-600" />
              Coverage Gap Analysis
            </h1>
            <p className="text-sm text-neutral-500 mt-1">Find households that may be missing benefits.</p>
          </div>
          <DemoBadge className="hidden sm:inline-flex" />
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card p-5">
            <p className="text-xs font-medium text-neutral-500 mb-1">Total Potentially Eligible</p>
            <p className="text-2xl font-extrabold text-neutral-900">{totalEligible.toLocaleString('en-IN')}</p>
          </div>
          <div className="card p-5">
            <p className="text-xs font-medium text-neutral-500 mb-1">Total Applied</p>
            <p className="text-2xl font-extrabold text-neutral-900">{totalApplied.toLocaleString('en-IN')}</p>
          </div>
          <div className="card p-5 border-error-200/60 bg-error-50/20">
            <p className="text-xs font-medium text-neutral-500 mb-1">Total Coverage Gap</p>
            <p className="text-2xl font-extrabold text-error-600">{totalGap.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="text-left font-semibold text-neutral-600 px-5 py-3">District</th>
                  <th className="text-left font-semibold text-neutral-600 px-5 py-3">Scheme</th>
                  <th className="text-right font-semibold text-neutral-600 px-5 py-3">Potentially Eligible</th>
                  <th className="text-right font-semibold text-neutral-600 px-5 py-3">Applied</th>
                  <th className="text-right font-semibold text-neutral-600 px-5 py-3">Beneficiaries</th>
                  <th className="text-right font-semibold text-neutral-600 px-5 py-3">Gap</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((row, i) => (
                  <tr key={i} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-1.5 text-neutral-700">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        {row.district}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-neutral-700">{row.schemeName}</td>
                    <td className="px-5 py-3.5 text-right font-medium text-neutral-800">{row.potentiallyEligible.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-3.5 text-right font-medium text-neutral-800">{row.applied.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-3.5 text-right font-medium text-success-600">{row.beneficiaries.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="inline-flex items-center gap-1 font-bold text-error-600">
                        {row.gap.toLocaleString('en-IN')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual bars */}
        <div className="card p-6 mb-6">
          <h3 className="section-title mb-5 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary-600" />
            Coverage Rate by Scheme
          </h3>
          <div className="space-y-4">
            {sorted.map((row, i) => {
              const coverageRate = Math.round((row.beneficiaries / row.potentiallyEligible) * 100);
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-neutral-700">{row.schemeName} <span className="text-neutral-400">· {row.district}</span></span>
                    <span className="text-sm font-bold text-neutral-900">{coverageRate}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-neutral-100 overflow-hidden flex">
                    <div className="h-full bg-success-500" style={{ width: `${(row.beneficiaries / row.potentiallyEligible) * 100}%` }} />
                    <div className="h-full bg-warning-400" style={{ width: `${((row.applied - row.beneficiaries) / row.potentiallyEligible) * 100}%` }} />
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-neutral-400">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success-500" /> Beneficiaries: {row.beneficiaries.toLocaleString('en-IN')}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning-400" /> Applied: {(row.applied - row.beneficiaries).toLocaleString('en-IN')}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-neutral-200" /> Gap: {row.gap.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Targeted outreach CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Megaphone className="w-5 h-5" />
              Plan Targeted Outreach
            </h3>
            <p className="text-sm text-primary-100 max-w-lg">
              {totalGap.toLocaleString('en-IN')} households may be missing benefits. Launch targeted outreach campaigns in high-gap districts to improve coverage.
            </p>
          </div>
          <button className="btn bg-white text-primary-700 hover:bg-primary-50 btn-lg shrink-0">
            Plan Outreach
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
