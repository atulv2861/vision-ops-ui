// Interface matching API response structure
export interface StudentDistributionSummaryCardData {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor: string;
  iconType: string;
  iconColor: string;
}

interface StudentDistributionSummaryCardProps {
  data: StudentDistributionSummaryCardData;
}

/** Theme-aligned icon container (matches Overview StatCard: soft tint, rounded-xl). */
const ICON_STYLES: Record<string, string> = {
  orange: 'bg-amber-500/20 text-amber-400',
  blue: 'bg-blue-500/20 text-blue-400',
  purple: 'bg-violet-500/20 text-violet-400',
  green: 'bg-emerald-500/20 text-emerald-400',
};

const getIconStyle = (iconColor: string): string => {
  if (iconColor.includes('orange') || iconColor.includes('amber')) return ICON_STYLES.orange;
  if (iconColor.includes('blue')) return ICON_STYLES.blue;
  if (iconColor.includes('purple') || iconColor.includes('violet')) return ICON_STYLES.purple;
  if (iconColor.includes('green') || iconColor.includes('emerald')) return ICON_STYLES.green;
  return ICON_STYLES.blue;
};

const getIconComponent = (iconType: string, iconColor: string) => {
  const style = getIconStyle(iconColor);
  const iconMap: Record<string, React.ReactNode> = {
    presence: (
      <div className={`p-2.5 rounded-xl shrink-0 ${style}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    ),
    peak: (
      <div className={`p-2.5 rounded-xl shrink-0 ${style}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
    ),
    avgDwell: (
      <div className={`p-2.5 rounded-xl shrink-0 ${style}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    ),
    peakDwell: (
      <div className={`p-2.5 rounded-xl shrink-0 ${style}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    ),
  };
  return iconMap[iconType] ?? null;
};

function StudentDistributionSummaryCard({ data }: StudentDistributionSummaryCardProps) {
  return (
    <div className="bg-[#28283B] rounded-xl p-5 border border-white/[0.06] shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-sm font-medium mb-1.5">{data.title}</h3>
          <p className="text-white text-3xl font-bold tracking-tight mb-1">{data.value}</p>
          <p className={`text-sm ${data.subtitleColor}`}>{data.subtitle}</p>
        </div>
        <div className="flex-shrink-0">
          {getIconComponent(data.iconType, data.iconColor)}
        </div>
      </div>
    </div>
  );
}

export default StudentDistributionSummaryCard;
