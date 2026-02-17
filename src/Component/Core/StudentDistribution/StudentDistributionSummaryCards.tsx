import StudentDistributionSummaryCard, { type StudentDistributionSummaryCardData } from './StudentDistributionSummaryCard';

// Dummy data - This structure matches API response format
const dummySummaryCardsData: StudentDistributionSummaryCardData[] = [
  {
    title: 'Current Presence',
    value: '156',
    subtitle: 'students across location',
    subtitleColor: 'text-[#B0B0B0]',
    iconType: 'presence',
    iconColor: 'bg-orange-500'
  },
  {
    title: 'Peak Today',
    value: '179',
    subtitle: 'at 11:00 AM',
    subtitleColor: 'text-emerald-400',
    iconType: 'peak',
    iconColor: 'bg-blue-500'
  },
  {
    title: 'Avg Dwell Time',
    value: '12 min',
    subtitle: 'per student',
    subtitleColor: 'text-[#B0B0B0]',
    iconType: 'avgDwell',
    iconColor: 'bg-purple-500'
  },
  {
    title: 'Peak Dwell Time',
    value: '18 min',
    subtitle: 'maximum today',
    subtitleColor: 'text-[#B0B0B0]',
    iconType: 'peakDwell',
    iconColor: 'bg-green-500'
  }
];

function StudentDistributionSummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {dummySummaryCardsData.map((card, index) => (
        <StudentDistributionSummaryCard key={index} data={card} />
      ))}
    </div>
  );
}

export default StudentDistributionSummaryCards;
