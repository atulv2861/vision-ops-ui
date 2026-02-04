import React from 'react';

// Interface matching API response structure
export interface AccessControlSummaryCardData {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor: string;
  iconType: string;
  iconColor: string;
}

interface AccessControlSummaryCardProps {
  data: AccessControlSummaryCardData;
}

// Icon mapping function - converts iconType to React component
const getIconComponent = (iconType: string, iconColor: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    entries: (
      <div className={`w-8 h-8 ${iconColor} rounded flex items-center justify-center`}>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    ),
    exits: (
      <div className={`w-8 h-8 ${iconColor} rounded flex items-center justify-center`}>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
      </div>
    ),
    guards: (
      <div className={`w-12 h-12 ${iconColor} flex items-center justify-center`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
    ),
    warning: (
      <div className={`w-12 h-12 ${iconColor} flex items-center justify-center`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
    )
  };

  return iconMap[iconType] || null;
};

function AccessControlSummaryCard({ data }: AccessControlSummaryCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 relative">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-gray-400 text-sm mb-2">{data.title}</h3>
          <p className="text-white text-3xl font-bold mb-1">{data.value}</p>
          <p className={`text-sm ${data.subtitleColor}`}>{data.subtitle}</p>
        </div>
        <div className="flex-shrink-0">
          {getIconComponent(data.iconType, data.iconColor)}
        </div>
      </div>
    </div>
  );
}

export default AccessControlSummaryCard;
