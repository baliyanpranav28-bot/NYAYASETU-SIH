import { Landmark } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function Logo({ size = 'md', onClick }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-lg', tagline: 'text-[10px]' },
    md: { icon: 'w-10 h-10', text: 'text-xl', tagline: 'text-xs' },
    lg: { icon: 'w-14 h-14', text: 'text-3xl', tagline: 'text-sm' },
  };
  const s = sizes[size];

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2.5 ${onClick ? 'cursor-pointer' : ''} select-none`}
    >
      <div className={`${s.icon} rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-md shrink-0`}>
        <Landmark className="w-1/2 h-1/2 text-white" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`${s.text} font-extrabold text-primary-700 tracking-tight`}>
          NYAYASETU
        </span>
        <span className={`${s.tagline} text-neutral-500 font-medium tracking-wide`}>
          Unified Welfare Access
        </span>
      </div>
    </div>
  );
}
