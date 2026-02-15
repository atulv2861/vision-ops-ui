import type { ReactNode } from 'react';
import PatternCard, {
  getThemeFromBadge,
  type PatternCardTheme,
} from './PatternCard';
import { useOverviewAiPatterns } from '../../../hooks/queries';
import type { AIPatternData } from '../../../api/services/overview.service';

const HEADER_ICON = (
  <svg
    className="w-5 h-5 text-rose-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const PATTERN_ICONS: Record<PatternCardTheme, ReactNode> = {
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
  amber: (
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

function AIDetectedPatterns() {
  const { data, isLoading, isError } = useOverviewAiPatterns();
  const patternsData: AIPatternData[] = data ?? [];
  const activeCount = patternsData.length;

  return (
    <div className="bg-[#1A1A2E] rounded-xl p-6 border border-white/[0.06] shadow-sm col-span-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {HEADER_ICON}
          <h2 className="text-white text-lg font-semibold">
            AI Detected Patterns
          </h2>
        </div>
        <span className="bg-rose-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg">
          {activeCount} Active
        </span>
      </div>

      {/* Patterns List */}
      <div className="space-y-3">
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-[72px] bg-white/[0.04] rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {isError && !isLoading && (
          <p className="text-sm text-red-400">
            Failed to load AI detected patterns.
          </p>
        )}

        {!isLoading &&
          !isError &&
          patternsData.map((pattern, index) => {
            const theme = getThemeFromBadge(pattern.badge);
            return (
              <PatternCard
                key={pattern.id ?? index}
                title={pattern.title}
                badge={pattern.badge}
                description={pattern.description}
                timeAgo={pattern.timeAgo}
                icon={PATTERN_ICONS[theme]}
                path={pattern.path}
                theme={theme}
              />
            );
          })}
      </div>
    </div>
  );
}

export default AIDetectedPatterns;
