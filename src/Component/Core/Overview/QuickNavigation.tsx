import NavigationCard from './NavigationCard';

// Interface matching API response structure
export interface NavigationData {
  title: string;
  value: string;
  path: string;
}

// Static icon for all navigation cards
const NavigationCardIcon = (
  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Dummy data array - This structure matches API response format
const dummyNavigationData: NavigationData[] = [
  { title: "View All Events", value: "68", path: "/events" },
  { title: "Student Distribution", value: "369", path: "/student-distribution" },
  { title: "Space Utilization", value: "67%", path: "/space-utilization" },
  { title: "Access Control", value: "3 alerts", path: "/access-control" },
  { title: "Cleaning Status", value: "89%", path: "/cleaning-hygiene" },
  { title: "Staff Productivity", value: "45 present", path: "/staff-productivity" }
];

function QuickNavigation() {
  // In future, replace dummy data with API call:
  // const [navigationData, setNavigationData] = useState<NavigationData[]>([]);
  // useEffect(() => { fetchNavigation().then(setNavigationData); }, []);
  
  const navigationData = dummyNavigationData; // Replace with API data when ready

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h2 className="text-white text-lg font-semibold">Quick Navigation</h2>
      </div>

      {/* Navigation List */}
      <div className="space-y-3">
        {navigationData.map((item, index) => (
          <NavigationCard
            key={index}
            title={item.title}
            value={item.value}
            icon={NavigationCardIcon}
            path={item.path}
          />
        ))}
      </div>
    </div>
  );
}

export default QuickNavigation;
