import { useAppContext } from '../../../Context/AppContext';
import { useStudentSummary } from '../../../hooks/queries';
import StudentDistributionSummaryCard, { type StudentDistributionSummaryCardData } from './StudentDistributionSummaryCard';

const TITLE_TO_ICON: Record<string, { iconType: string; iconColor: string; subtitleColor: string }> = {
  'Current Presence': { iconType: 'presence', iconColor: 'bg-orange-500', subtitleColor: 'text-[#B0B0B0]' },
  'Peak Today': { iconType: 'peak', iconColor: 'bg-blue-500', subtitleColor: 'text-emerald-400' },
  'Avg Dwell Time': { iconType: 'avgDwell', iconColor: 'bg-purple-500', subtitleColor: 'text-[#B0B0B0]' },
  'Peak Dwell Time': { iconType: 'peakDwell', iconColor: 'bg-green-500', subtitleColor: 'text-[#B0B0B0]' },
};

function mapApiCardToCardData(item: { id?: string; title: string; value: string; subtitle: string }): StudentDistributionSummaryCardData {
  const icon = TITLE_TO_ICON[item.title] ?? { iconType: 'presence', iconColor: 'bg-blue-500', subtitleColor: 'text-[#B0B0B0]' };
  return {
    title: item.title,
    value: item.value,
    subtitle: item.subtitle,
    subtitleColor: icon.subtitleColor,
    iconType: icon.iconType,
    iconColor: icon.iconColor,
  };
}

function StudentDistributionSummaryCards() {
  const { globalFilterData } = useAppContext();
  const { data: summaryCards = [], isLoading, isError } = useStudentSummary(globalFilterData);

  const cards: StudentDistributionSummaryCardData[] = summaryCards.map(mapApiCardToCardData);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-xl bg-[#28283B] border border-white/[0.08] animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-[#28283B] border border-white/[0.08] p-4 text-red-400 text-sm">
        Failed to load student summary.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <StudentDistributionSummaryCard key={card.title ?? index} data={card} />
      ))}
    </div>
  );
}

export default StudentDistributionSummaryCards;
