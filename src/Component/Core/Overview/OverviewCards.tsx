import StatCard from './StatCard';
import { useOverviewSummaryCards } from '../../../hooks/queries';
import type { OverviewCardData } from '../../../api/services/overview.service';

// Static icon for all overview cards
const OverviewCardIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

function OverviewCards() {
  const { data, isLoading, isError } = useOverviewSummaryCards();
  const cardsData: OverviewCardData[] = data ?? [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 animate-pulse h-28"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-6 text-red-400 text-sm">
        Failed to load overview summary cards.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
      {cardsData.map((card, index) => (
        <StatCard
          key={index}
          title={card.title}
          value={card.value}
          subtitle={card.subtitle}
          icon={OverviewCardIcon}
        />
      ))}
    </div>
  );
}

export default OverviewCards;
