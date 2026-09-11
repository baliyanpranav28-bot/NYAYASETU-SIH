import { Info } from 'lucide-react';

interface DemoBadgeProps {
  className?: string;
}

export function DemoBadge({ className = '' }: DemoBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full bg-warning-50 border border-warning-200 px-3 py-1 text-xs font-medium text-warning-700 ${className}`}>
      <Info className="w-3.5 h-3.5" />
      Demo / Prototype Data
    </div>
  );
}
