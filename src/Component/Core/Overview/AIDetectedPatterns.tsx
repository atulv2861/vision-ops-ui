import PatternCard from './PatternCard';

// Interface matching API response structure
export interface PatternData {
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  timeAgo: string;
  iconType: string;
  borderColor: string;
  path: string;
}

// Icon mapping function
const getPatternIcon = (iconType: string, color: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    occupancy: (
      <svg className={`w-5 h-5 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    security: (
      <svg className={`w-5 h-5 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    activity: (
      <svg className={`w-5 h-5 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  };

  return iconMap[iconType] || iconMap.occupancy;
};

// Dummy data array - This structure matches API response format
const dummyPatternsData: PatternData[] = [
  {
    title: "Main Cafeteria",
    badge: "HIGH",
    badgeColor: "bg-red-500",
    description: "Occupancy at 98% capacity",
    timeAgo: "2 min ago",
    iconType: "occupancy",
    borderColor: "border-red-500",
    path: "/student-distribution"
  },
  {
    title: "Building B Entrance",
    badge: "MEDIUM",
    badgeColor: "bg-orange-500",
    description: "No security guard coverage",
    timeAgo: "8 min ago",
    iconType: "security",
    borderColor: "border-orange-500",
    path: "/access-control"
  },
  {
    title: "Corridor A-Main",
    badge: "LOW",
    badgeColor: "bg-blue-500",
    description: "High usage, cleaning recommended",
    timeAgo: "15 min ago",
    iconType: "activity",
    borderColor: "border-blue-500",
    path: "/cleaning-hygiene"
  }
];

function AIDetectedPatterns() {
  // In future, replace dummy data with API call:
  // const [patternsData, setPatternsData] = useState<PatternData[]>([]);
  // useEffect(() => { fetchPatterns().then(setPatternsData); }, []);
  
  const patternsData = dummyPatternsData; // Replace with API data when ready
  const activeCount = patternsData.length;

  return (
    <div className="bg-gray-800 rounded-lg p-6  pt-16 col-span-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-14 ">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h2 className="text-white text-lg font-semibold">AI Detected Patterns</h2>
        </div>
        <span className="bg-red-500/20 border border-red-500 text-red-400 text-xs font-medium px-2 py-1 rounded">
          {activeCount} Active
        </span>
      </div>

      {/* Patterns List */}
      <div className="space-y-3">
        {patternsData.map((pattern, index) => (
          <PatternCard
            key={index}
            title={pattern.title}
            badge={pattern.badge}
            badgeColor={pattern.badgeColor}
            description={pattern.description}
            timeAgo={pattern.timeAgo}
            icon={getPatternIcon(pattern.iconType, pattern.badgeColor.replace('bg-', 'text-'))}
            borderColor={pattern.borderColor}
            path={pattern.path}
          />
        ))}
      </div>
    </div>
  );
}

export default AIDetectedPatterns;
