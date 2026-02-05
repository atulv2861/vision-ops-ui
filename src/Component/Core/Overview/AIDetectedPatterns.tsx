import PatternCard from './PatternCard';
import { useOverviewAiPatterns } from '../../../hooks/queries';
import type { AIPatternData } from '../../../api/services/overview.service';

// Icon mapping function
const getPatternIcon = (iconType: string, color: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    occupancy: (
      <svg className={`w-5 h-5 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    security: (
      <svg className={`w-5 h-5 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    activity: (
      <svg className={`w-5 h-5 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  };

  return iconMap[iconType] || iconMap.occupancy;
};

function AIDetectedPatterns() {
  const { data, isLoading, isError } = useOverviewAiPatterns();
  const patternsData: AIPatternData[] = data ?? [];
  const activeCount = patternsData.length;

  return (
    <div className="bg-gray-800 rounded-lg p-6  pt-16 col-span-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-14 ">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h2 className="text-white text-lg font-semibold">AI Detected Patterns</h2>
        </div>
        <span className="bg-red-500/20 border border-red-500 text-red-400 text-xs font-medium px-2 py-1 rounded">
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
                className="h-16 bg-gray-700/60 rounded-lg animate-pulse"
              />
            ))}
          </div>
        )}

        {isError && !isLoading && (
          <p className="text-sm text-red-400">
            Failed to load AI detected patterns.
          </p>
        )}

        {!isLoading && !isError && patternsData.map((pattern, index) => (
          <PatternCard
            key={index}
            title={pattern.title}
            badge={pattern.badge}
            badgeColor={pattern.badgeColor}
            description={pattern.description}
            timeAgo={pattern.timeAgo}
            icon={getPatternIcon(pattern.iconType, pattern.badgeColor.replace('bg-', 'text-'))}
            borderColor={pattern.borderColor}
            path={pattern.path}
          />
        ))}
      </div>
    </div>
  );
}

export default AIDetectedPatterns;
