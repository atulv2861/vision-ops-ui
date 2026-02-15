import { useNavigate } from 'react-router-dom';

const THEMES = {
  red: {
    border: 'border-l-4 border-l-rose-500',
    iconBg: 'bg-rose-500/20',
    iconColor: 'text-rose-400',
    badge: 'bg-rose-500 text-white',
  },
  amber: {
    border: 'border-l-4 border-l-amber-500',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
    badge: 'bg-amber-500 text-white',
  },
  blue: {
    border: 'border-l-4 border-l-blue-500',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    badge: 'bg-blue-500 text-white',
  },
} as const;

export type PatternCardTheme = keyof typeof THEMES;

export function getThemeFromBadge(badge: string): PatternCardTheme {
  const u = badge.toUpperCase();
  if (u === 'HIGH') return 'red';
  if (u === 'MEDIUM') return 'amber';
  if (u === 'LOW') return 'blue';
  return 'blue';
}

interface PatternCardProps {
  title: string;
  badge: string;
  description: string;
  timeAgo: string;
  icon: React.ReactNode;
  path: string;
  theme?: PatternCardTheme;
}

function PatternCard({
  title,
  badge,
  description,
  timeAgo,
  icon,
  path,
  theme,
}: PatternCardProps) {
  const navigate = useNavigate();
  const t = theme ?? getThemeFromBadge(badge);
  const styles = THEMES[t];

  const handleClick = () => {
    if (path && path !== '#') navigate(path);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        bg-[#28283B] rounded-xl ${styles.border}
        flex items-center gap-4 p-4
        hover:bg-[#33334B] cursor-pointer transition-colors
        border border-white/[0.06]
      `}
    >
      {/* Icon in rounded square */}
      <div
        className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${styles.iconBg} ${styles.iconColor}`}
      >
        <span className="[&>svg]:w-5 [&>svg]:h-5">{icon}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h3 className="text-white font-semibold text-sm">{title}</h3>
          <span
            className={`${styles.badge} text-xs font-medium px-2 py-0.5 rounded-md shrink-0`}
          >
            {badge}
          </span>
        </div>
        <p className="text-[#B0B0B0] text-sm mb-1.5">{description}</p>
        <div className="flex items-center gap-1.5 text-[#808080] text-xs">
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{timeAgo}</span>
        </div>
      </div>

      {/* Chevron */}
      <div className="text-[#808080] shrink-0">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}

export default PatternCard;
