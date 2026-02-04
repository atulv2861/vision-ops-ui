import SpaceUtilizationSummaryCard, { type SpaceUtilizationSummaryCardData } from './SpaceUtilizationSummaryCard';

// Dummy data - This structure matches API response format
const dummySummaryCardsData: SpaceUtilizationSummaryCardData[] = [
  {
    title: 'Average Occupancy',
    value: '67%',
    subtitle: 'across all spaces',
    subtitleColor: 'text-gray-400',
    iconType: 'occupancy',
    iconColor: 'text-blue-500'
  },
  {
    title: 'Peak Occupancy Time',
    value: '10:30 AM',
    subtitle: 'Classroom A101',
    subtitleColor: 'text-gray-400',
    iconType: 'peakTime',
    iconColor: 'text-orange-500'
  },
  {
    title: 'Underutilized Spaces',
    value: '1',
    subtitle: '10% of total',
    subtitleColor: 'text-green-500',
    iconType: 'warning',
    iconColor: 'text-red-500'
  },
  {
    title: 'Current Presence',
    value: '29',
    subtitle: 'in Classroom A101',
    subtitleColor: 'text-gray-400',
    iconType: 'presence',
    iconColor: 'text-purple-500'
  }
];

function SpaceUtilizationSummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {dummySummaryCardsData.map((card, index) => (
        <SpaceUtilizationSummaryCard key={index} data={card} />
      ))}
    </div>
  );
}

export default SpaceUtilizationSummaryCards;
