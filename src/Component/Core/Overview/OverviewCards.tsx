import StatCard from './StatCard';

// Interface matching API response structure
export interface OverviewCardData {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor?: string;
  iconColor: string;
  iconType: string; // Icon identifier (will be used to render appropriate icon)
}

// Icon mapping function - converts iconType to React component
const getIconComponent = (iconType: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    students: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    staff: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
      </svg>
    ),
    events: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    utilization: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
      </svg>
    ),
    gateEntries: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4z" />
      </svg>
    )
  };

  return iconMap[iconType] || iconMap.students; // Default fallback
};

// Dummy data array - This structure matches API response format
// In future, replace this with API call: const [cardsData, setCardsData] = useState<OverviewCardData[]>([]);
const dummyOverviewCardsData: OverviewCardData[] = [
  {
    title: "Students on Campus",
    value: "369",
    subtitle: "across all spaces",
    iconColor: "bg-orange-500/20 text-orange-500",
    iconType: "students"
  },
  {
    title: "Staff Present",
    value: "45",
    subtitle: "16% of total",
    subtitleColor: "text-green-400",
    iconColor: "bg-purple-500/20 text-purple-500",
    iconType: "staff"
  },
  {
    title: "Active Events",
    value: "68",
    subtitle: "detected today",
    subtitleColor: "text-red-400",
    iconColor: "bg-red-500/20 text-red-500",
    iconType: "events"
  },
  {
    title: "Space Utilization",
    value: "67%",
    subtitle: "1 underutilized",
    subtitleColor: "text-green-400",
    iconColor: "bg-blue-500/20 text-blue-500",
    iconType: "utilization"
  },
  {
    title: "Gate Entries Today",
    value: "2602",
    subtitle: "3 gates need coverage",
    subtitleColor: "text-red-400",
    iconColor: "bg-green-500/20 text-green-500",
    iconType: "gateEntries"
  }
];

function OverviewCards() {
  // In future, replace dummy data with API call:
  // const [cardsData, setCardsData] = useState<OverviewCardData[]>([]);
  // useEffect(() => { fetchOverviewCards().then(setCardsData); }, []);
  
  const cardsData = dummyOverviewCardsData; // Replace with API data when ready

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
      {cardsData.map((card, index) => (
        <StatCard
          key={index}
          title={card.title}
          value={card.value}
          subtitle={card.subtitle}
          subtitleColor={card.subtitleColor}
          iconColor={card.iconColor}
          icon={getIconComponent(card.iconType)}
        />
      ))}
    </div>
  );
}

export default OverviewCards;
