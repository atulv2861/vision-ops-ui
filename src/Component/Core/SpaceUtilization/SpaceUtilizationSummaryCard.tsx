// Interface matching API response structure
export interface SpaceUtilizationSummaryCardData {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor: string;
  iconType: string;
  iconColor: string;
}

interface SpaceUtilizationSummaryCardProps {
  data: SpaceUtilizationSummaryCardData;
}

// Icon mapping function - converts iconType to React component
const getIconComponent = (iconType: string, iconColor: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    occupancy: (
      <div className={`w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center`}>
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <circle cx="12" cy="12" r="6" strokeWidth="2" />
          <circle cx="12" cy="12" r="2" strokeWidth="2" />
        </svg>
      </div>
    ),
    peakTime: (
      <div className={`w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center`}>
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
    ),
    warning: (
      <div className={`w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center`}>
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
    ),
    presence: (
      <div className={`w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center`}>
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    )
  };

  return iconMap[iconType] || null;
};

function SpaceUtilizationSummaryCard({ data }: SpaceUtilizationSummaryCardProps) {
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

export default SpaceUtilizationSummaryCard;
