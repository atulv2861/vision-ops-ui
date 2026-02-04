import CleaningHygieneSummaryCard, { type CleaningHygieneSummaryCardData } from './CleaningHygieneSummaryCard';

// Dummy data - This structure matches API response format
const summaryCardsData: CleaningHygieneSummaryCardData[] = [
  {
    title: 'Coverage',
    value: '84%',
    subtitle: 'needs improvement',
    subtitleColor: 'text-red-400',
    iconType: 'coverage',
    iconColor: 'text-green-500'
  },
  {
    title: 'Cleaning Sessions',
    value: '6',
    subtitle: 'completed today',
    subtitleColor: 'text-gray-400',
    iconType: 'sessions',
    iconColor: 'text-blue-500'
  },
  {
    title: 'Missed Areas',
    value: '1',
    subtitle: 'requires attention',
    subtitleColor: 'text-red-400',
    iconType: 'missed',
    iconColor: 'text-orange-500'
  },
  {
    title: 'Last Cleaned',
    value: '2.3h',
    subtitle: 'ago',
    subtitleColor: 'text-gray-400',
    iconType: 'lastCleaned',
    iconColor: 'text-purple-500'
  }
];

function CleaningHygieneSummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryCardsData.map((card, index) => (
        <CleaningHygieneSummaryCard key={index} data={card} />
      ))}
    </div>
  );
}

export default CleaningHygieneSummaryCards;
