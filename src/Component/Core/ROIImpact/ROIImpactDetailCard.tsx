import React from 'react';

// Interface matching API response structure
export interface ROIImpactDetailCardData {
  title: string;
  badge: string;
  detailLine1: string;
  detailLine2: string;
  iconType: string;
  colorTheme: 'green' | 'blue' | 'purple' | 'red';
}

interface ROIImpactDetailCardProps {
  data: ROIImpactDetailCardData;
}

// Color theme mapping
const colorThemes = {
  green: {
    border: 'border-green-500',
    iconBg: 'bg-green-100',
    iconBorder: 'border-green-500',
    badgeBg: 'bg-green-100',
    badgeBorder: 'border-green-500',
    badgeText: 'text-green-800',
    text: 'text-green-400'
  },
  blue: {
    border: 'border-blue-500',
    iconBg: 'bg-blue-100',
    iconBorder: 'border-blue-500',
    badgeBg: 'bg-blue-100',
    badgeBorder: 'border-blue-500',
    badgeText: 'text-blue-800',
    text: 'text-blue-400'
  },
  purple: {
    border: 'border-purple-500',
    iconBg: 'bg-purple-100',
    iconBorder: 'border-purple-500',
    badgeBg: 'bg-purple-100',
    badgeBorder: 'border-purple-500',
    badgeText: 'text-purple-800',
    text: 'text-purple-400'
  },
  red: {
    border: 'border-red-500',
    iconBg: 'bg-red-100',
    iconBorder: 'border-red-500',
    badgeBg: 'bg-red-100',
    badgeBorder: 'border-red-500',
    badgeText: 'text-red-800',
    text: 'text-red-400'
  }
};

// Icon mapping function
const getIconComponent = (iconType: string, theme: typeof colorThemes.green) => {
  const iconMap: Record<string, React.ReactNode> = {
    dollar: (
      <div className={`w-12 h-12 ${theme.iconBg} ${theme.iconBorder} border-2 rounded-full flex items-center justify-center`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    ),
    target: (
      <div className={`w-12 h-12 ${theme.iconBg} ${theme.iconBorder} border-2 rounded-full flex items-center justify-center`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <circle cx="12" cy="12" r="6" strokeWidth="2" />
          <circle cx="12" cy="12" r="2" strokeWidth="2" />
        </svg>
      </div>
    ),
    staff: (
      <div className={`w-12 h-12 ${theme.iconBg} ${theme.iconBorder} border-2 rounded-full flex items-center justify-center`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    ),
    star: (
      <div className={`w-12 h-12 ${theme.iconBg} ${theme.iconBorder} border-2 rounded-full flex items-center justify-center`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </div>
    ),
    shield: (
      <div className={`w-12 h-12 ${theme.iconBg} ${theme.iconBorder} border-2 rounded-full flex items-center justify-center`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
    )
  };

  return iconMap[iconType] || null;
};

function ROIImpactDetailCard({ data }: ROIImpactDetailCardProps) {
  const theme = colorThemes[data.colorTheme];

  return (
    <div className={`bg-gray-800 rounded-lg p-6 border-2 ${theme.border}`}>
      <div className="flex flex-col gap-4">
        {/* Icon and Badge */}
        <div className="flex items-start justify-between">
          {getIconComponent(data.iconType, theme)}
          <div className={`px-3 py-1 ${theme.badgeBg} ${theme.badgeBorder} border rounded-lg`}>
            <span className={`text-sm font-semibold ${theme.badgeText}`}>{data.badge}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white text-lg font-semibold">{data.title}</h3>

        {/* Details */}
        <div className="space-y-1">
          <p className={`text-sm ${theme.text}`}>{data.detailLine1}</p>
          <p className={`text-sm italic ${theme.text}`}>{data.detailLine2}</p>
        </div>
      </div>
    </div>
  );
}

export default ROIImpactDetailCard;
