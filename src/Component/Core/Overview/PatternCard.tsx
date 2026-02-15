import { useNavigate } from 'react-router-dom';

const THEMES = {
  red: {
    border: 'border-l-4 border-l-red-500',
    iconBg: 'bg-red-500/25',
    iconColor: 'text-white',
    badge: 'bg-red-500 text-white',
  },
  orange: {
    border: 'border-l-4 border-l-amber-500',
    iconBg: 'bg-amber-500/25',
    iconColor: 'text-white',
    badge: 'bg-amber-500 text-white',
  },
  blue: {
    border: 'border-l-4 border-l-blue-500',
    iconBg: 'bg-blue-500/25',
    iconColor: 'text-white',
    badge: 'bg-blue-500 text-white',
  },
} as const;

export type PatternCardTheme = keyof typeof THEMES;

export function getThemeFromBadge(badge: string): PatternCardTheme {
  const u = badge.toUpperCase();
  if (u === 'HIGH') return 'red';
  if (u === 'MEDIUM') return 'orange';
  if (u === 'LOW') return 'blue';
  return 'blue';
}

const PATTERN_ICONS = {
  red: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
  orange: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  blue: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  ),
};

interface PatternCardProps {
  title: string;
  badge: string;
  description: string;
  timeAgo: string;
  icon?: React.ReactNode;
  path: string;
  theme?: PatternCardTheme;
}

function PatternCard({
  title,
  badge,
  description,
  timeAgo,
  path,
  theme,
}: PatternCardProps) {
  const navigate = useNavigate();
  const t = theme ?? getThemeFromBadge(badge);
  const styles = THEMES[t];
  const icon = PATTERN_ICONS[t];

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        bg-[#252836] rounded-lg border-l-4 ${styles.border}
        flex items-center gap-4 p-4
        hover:bg-[#2d3142] cursor-pointer transition-colors
        border border-white/[0.06]
      `}
    >
      <div
        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${styles.iconBg} ${styles.iconColor}`}
      >
        <span className="[&>svg]:w-5 [&>svg]:h-5">{icon}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h3 className="text-white font-semibold text-sm">{title}</h3>
          <span
            className={`${styles.badge} text-xs font-medium px-2 py-0.5 rounded-md shrink-0`}
          >
            {badge}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-1">{description}</p>
        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
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

      <div className="text-gray-400 shrink-0">
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
