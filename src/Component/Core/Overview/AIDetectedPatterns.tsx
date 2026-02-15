import PatternCard, { getThemeFromBadge } from './PatternCard';
import { useOverviewAiPatterns } from '../../../hooks/queries';
import type { AIPatternData } from '../../../api/services/overview.service';

const HEADER_ICON = (
  <svg
    className="w-5 h-5 text-red-500"
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

function AIDetectedPatterns() {
  const { data, isLoading, isError } = useOverviewAiPatterns();
  const patternsData: AIPatternData[] = data ?? [];
  const activeCount = patternsData.length;

  return (
    <div className="bg-[#1A1A2E] rounded-xl p-6 border border-white/[0.06] shadow-sm col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {HEADER_ICON}
          <h2 className="text-white text-lg font-semibold">
            AI Detected Patterns
          </h2>
        </div>
        <span className="bg-red-500 text-white text-xs font-medium px-3 py-1.5 rounded-full">
          {activeCount} Active
        </span>
      </div>

      <div className="space-y-3">
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-[72px] bg-[#252836] rounded-lg animate-pulse"
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
          patternsData.map((pattern, index) => (
            <PatternCard
              key={pattern.id ?? index}
              title={pattern.title}
              badge={pattern.badge}
              description={pattern.description}
              timeAgo={pattern.timeAgo}
              path={pattern.path}
              theme={getThemeFromBadge(pattern.badge)}
            />
          ))}
      </div>
    </div>
  );
}

export default AIDetectedPatterns;
