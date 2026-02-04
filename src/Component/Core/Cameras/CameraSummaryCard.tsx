import React from 'react';

// Interface matching API response structure
export interface CameraSummaryCardData {
  title: string;
  value: string;
  iconType: string;
  iconColor: string;
  valueColor: string;
}

interface CameraSummaryCardProps {
  data: CameraSummaryCardData;
}

// Icon mapping function - converts iconType to React component
const getIconComponent = (iconType: string, iconColor: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    camera: (
      <div className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    ),
    online: (
      <div className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      </div>
    ),
    offline: (
      <div className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center relative`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    ),
    health: (
      <div className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center`}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
    )
  };

  return iconMap[iconType] || null;
};

function CameraSummaryCard({ data }: CameraSummaryCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-gray-400 text-sm mb-2">{data.title}</h3>
          {data.value && (
            <p className={`text-2xl font-bold ${data.valueColor}`}>{data.value}</p>
          )}
        </div>
        <div className="flex-shrink-0">
          {getIconComponent(data.iconType, data.iconColor)}
        </div>
      </div>
    </div>
  );
}

export default CameraSummaryCard;
