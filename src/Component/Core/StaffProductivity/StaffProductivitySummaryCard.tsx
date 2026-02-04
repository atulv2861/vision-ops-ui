import React from 'react';

// Interface matching API response structure
export interface StaffProductivitySummaryCardData {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor: string;
  iconType: string;
  iconColor: string;
}

interface StaffProductivitySummaryCardProps {
  data: StaffProductivitySummaryCardData;
}

// Icon mapping function - converts iconType to React component
const getIconComponent = (iconType: string, iconColor: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    currentPresence: (
      <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
        </svg>
      </div>
    ),
    zoneCoverage: (
      <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    ),
    requiredStaff: (
      <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    ),
    activeCameras: (
      <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
    )
  };

  return iconMap[iconType] || null;
};

function StaffProductivitySummaryCard({ data }: StaffProductivitySummaryCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 relative">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-white text-sm mb-2">{data.title}</h3>
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

export default StaffProductivitySummaryCard;
