import KnownPersonSummaryCard, { type KnownPersonSummaryCardData } from './KnownPersonSummaryCard';

// Dummy data - This structure matches API response format
const dummySummaryCardsData: KnownPersonSummaryCardData[] = [
  {
    title: 'Total Detections',
    value: '247',
    subtitle: 'event-based only',
    iconType: 'detections',
    iconColor: 'text-blue-500',
    iconBgColor: 'bg-gray-100'
  },
  {
    title: 'First Seen',
    value: '11:45 AM',
    subtitle: 'at Main Gate',
    iconType: 'firstSeen',
    iconColor: 'text-green-500',
    iconBgColor: 'bg-gray-100'
  },
  {
    title: 'Last Seen',
    value: '2:30 PM',
    subtitle: 'at Library',
    iconType: 'lastSeen',
    iconColor: 'text-purple-500',
    iconBgColor: 'bg-gray-100'
  },
  {
    title: 'Cameras Involved',
    value: '12',
    subtitle: 'unique locations',
    iconType: 'cameras',
    iconColor: 'text-orange-500',
    iconBgColor: 'bg-yellow-50'
  }
];

function KnownPersonSummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {dummySummaryCardsData.map((card, index) => (
        <KnownPersonSummaryCard key={index} data={card} />
      ))}
    </div>
  );
}

export default KnownPersonSummaryCards;
