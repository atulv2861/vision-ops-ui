import StaffProductivitySummaryCard, { type StaffProductivitySummaryCardData } from './StaffProductivitySummaryCard';

// Dummy data - This structure matches API response format
const summaryCardsData: StaffProductivitySummaryCardData[] = [
  {
    title: 'Current Presence',
    value: '7',
    subtitle: 'staff across location',
    subtitleColor: 'text-gray-400',
    iconType: 'currentPresence',
    iconColor: 'text-purple-500'
  },
  {
    title: 'Zone Coverage',
    value: '233%',
    subtitle: 'of required staffing',
    subtitleColor: 'text-green-400',
    iconType: 'zoneCoverage',
    iconColor: 'text-blue-500'
  },
  {
    title: 'Required Staff',
    value: '3',
    subtitle: 'fully staffed',
    subtitleColor: 'text-green-400',
    iconType: 'requiredStaff',
    iconColor: 'text-orange-500'
  },
  {
    title: 'Active Cameras',
    value: '2',
    subtitle: 'monitoring staff',
    subtitleColor: 'text-green-400',
    iconType: 'activeCameras',
    iconColor: 'text-green-500'
  }
];

function StaffProductivitySummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryCardsData.map((card, index) => (
        <StaffProductivitySummaryCard key={index} data={card} />
      ))}
    </div>
  );
}

export default StaffProductivitySummaryCards;
