import AccessControlSummaryCard, { type AccessControlSummaryCardData } from './AccessControlSummaryCard';

// Dummy data - This structure matches API response format
const dummySummaryCardsData: AccessControlSummaryCardData[] = [
  {
    title: 'Total Entries',
    value: '2602',
    subtitle: 'today',
    subtitleColor: 'text-green-500',
    iconType: 'entries',
    iconColor: 'bg-green-500'
  },
  {
    title: 'Total Exits',
    value: '1969',
    subtitle: 'today',
    subtitleColor: 'text-gray-400',
    iconType: 'exits',
    iconColor: 'bg-blue-500'
  },
  {
    title: 'Security Guards Active',
    value: '5',
    subtitle: '63% coverage',
    subtitleColor: 'text-red-500',
    iconType: 'guards',
    iconColor: 'bg-purple-500'
  },
  {
    title: 'Low Coverage Gates',
    value: '3',
    subtitle: 'needs attention',
    subtitleColor: 'text-red-500',
    iconType: 'warning',
    iconColor: 'bg-red-500'
  }
];

function AccessControlSummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {dummySummaryCardsData.map((card, index) => (
        <AccessControlSummaryCard key={index} data={card} />
      ))}
    </div>
  );
}

export default AccessControlSummaryCards;
