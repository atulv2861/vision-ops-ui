// Interface matching API response structure
export interface KnownPersonSummaryCardData {
  title: string;
  value: string;
  subtitle: string;
  iconType: string;
  iconColor: string;
  iconBgColor: string;
}

interface KnownPersonSummaryCardProps {
  data: KnownPersonSummaryCardData;
}

// Icon mapping function - converts iconType to React component
const getIconComponent = (iconType: string, iconColor: string, iconBgColor: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    detections: (
      <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    ),
    firstSeen: (
      <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    ),
    lastSeen: (
      <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    ),
    cameras: (
      <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    )
  };

  return iconMap[iconType] || null;
};

function KnownPersonSummaryCard({ data }: KnownPersonSummaryCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-start gap-4">
        {/* Icon */}
        {getIconComponent(data.iconType, data.iconColor, data.iconBgColor)}
        
        {/* Content */}
        <div className="flex-1">
          <h3 className="text-gray-200 text-sm mb-1">{data.title}</h3>
          <p className="text-white text-2xl font-bold mb-1">{data.value}</p>
          <p className="text-gray-400 text-xs">{data.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default KnownPersonSummaryCard;
