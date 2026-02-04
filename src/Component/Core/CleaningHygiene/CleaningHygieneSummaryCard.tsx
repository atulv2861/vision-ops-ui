import React from 'react';

// Interface matching API response structure
export interface CleaningHygieneSummaryCardData {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor: string;
  iconType: string;
  iconColor: string;
}

interface CleaningHygieneSummaryCardProps {
  data: CleaningHygieneSummaryCardData;
}

// Icon mapping function - converts iconType to React component
const getIconComponent = (iconType: string, iconColor: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    coverage: (
      <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </div>
    ),
    sessions: (
      <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    ),
    missed: (
      <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    ),
    lastCleaned: (
      <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
    )
  };

  return iconMap[iconType] || null;
};

function CleaningHygieneSummaryCard({ data }: CleaningHygieneSummaryCardProps) {
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

export default CleaningHygieneSummaryCard;
