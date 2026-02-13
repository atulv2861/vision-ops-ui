const ICON_COLORS = {
  orange: 'bg-amber-500/20 text-amber-400',
  purple: 'bg-violet-500/20 text-violet-400',
  red: 'bg-red-500/20 text-red-400',
  blue: 'bg-blue-500/20 text-blue-400',
  green: 'bg-emerald-500/20 text-emerald-400',
} as const;

const SUBTITLE_COLORS = {
  default: 'text-gray-400',
  positive: 'text-emerald-400',
  warning: 'text-red-400',
} as const;

export type StatCardIconColor = keyof typeof ICON_COLORS;
export type StatCardSubtitleVariant = keyof typeof SUBTITLE_COLORS;

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon?: React.ReactNode;
  iconColor?: StatCardIconColor;
  subtitleVariant?: StatCardSubtitleVariant;
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconColor = 'blue',
  subtitleVariant = 'default',
}: StatCardProps) {
  return (
    <div className="bg-[#1A1A2E] rounded-xl p-4 flex flex-col min-h-[120px] border border-white/[0.06] shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-[#E0E0E0] text-sm font-medium capitalize">
          {title.replace(/_/g, ' ')}
        </h3>
        {icon != null && (
          <div
            className={`p-2 rounded-xl shrink-0 ${ICON_COLORS[iconColor]}`}
          >
            <span className="[&>svg]:w-5 [&>svg]:h-5">{icon}</span>
          </div>
        )}
      </div>

      <div className="mb-1">
        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
      </div>

      <div>
        <p className={`text-sm ${SUBTITLE_COLORS[subtitleVariant]}`}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default StatCard;
