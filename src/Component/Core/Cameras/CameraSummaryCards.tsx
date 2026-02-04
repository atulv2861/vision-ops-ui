import CameraSummaryCard, { type CameraSummaryCardData } from './CameraSummaryCard';

// Dummy data - This structure matches API response format
const summaryCardsData: CameraSummaryCardData[] = [
  {
    title: 'Total Cameras',
    value: '',
    iconType: 'camera',
    iconColor: 'bg-blue-500',
    valueColor: 'text-white'
  },
  {
    title: 'Online',
    value: '10',
    iconType: 'online',
    iconColor: 'bg-green-500',
    valueColor: 'text-green-500'
  },
  {
    title: 'Offline',
    value: '2',
    iconType: 'offline',
    iconColor: 'bg-red-500',
    valueColor: 'text-red-500'
  },
  {
    title: 'Avg. Health',
    value: '',
    iconType: 'health',
    iconColor: 'bg-purple-500',
    valueColor: 'text-white'
  }
];

function CameraSummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryCardsData.map((card, index) => (
        <CameraSummaryCard key={index} data={card} />
      ))}
    </div>
  );
}

export default CameraSummaryCards;
