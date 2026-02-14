import PatternCard from './PatternCard';
import { useOverviewAiPatterns } from '../../../hooks/queries';
import type { AIPatternData } from '../../../api/services/overview.service';

// Static icon for all pattern cards
const PatternCardIcon = (
  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

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
            key={pattern.id ?? index}
            title={pattern.title}
            badge={pattern.badge}
            description={pattern.description}
            timeAgo={pattern.timeAgo}
            icon={PatternCardIcon}
            path={pattern.path}
          />
        ))}
      </div>
    </div>
  );
}

export default AIDetectedPatterns;
