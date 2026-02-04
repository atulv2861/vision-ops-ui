import NavigationCard from './NavigationCard';

// Interface matching API response structure
export interface NavigationData {
  title: string;
  value: string;
  iconType: string;
  borderColor?: string;
  path: string;
}

// Icon mapping function
const getNavigationIcon = (iconType: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    events: (
      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    distribution: (
      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    utilization: (
      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
      </svg>
    ),
    access: (
      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4z" />
      </svg>
    ),
    cleaning: (
      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    staff: (
      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  };

  return iconMap[iconType] || iconMap.events;
};

// Dummy data array - This structure matches API response format
const dummyNavigationData: NavigationData[] = [
  {
    title: "View All Events",
    value: "68",
    iconType: "events",
     borderColor: "border-red-500",
     path:"/events"
  },
  {
    title: "Student Distribution",
    value: "369",
    iconType: "distribution", 
    borderColor: "border-blue-500", 
    path:"/student-distribution"
  },
  {
    title: "Space Utilization",
    value: "67%",
    iconType: "utilization",
     borderColor: "border-green-500",
     path:"/space-utilization"
  },
  {
    title: "Access Control",
    value: "3 alerts",
    iconType: "access",
    borderColor: "border-orange-500",
    path:"/access-control"
  },
  {
    title: "Cleaning Status",
    value: "89%",
    iconType: "cleaning", 
    borderColor: "border-sky-500",
    path:"/cleaning-hygiene"
  },
  {
    title: "Staff Productivity",
    value: "45 present",
    iconType: "staff",
     borderColor: "border-cyan-500",
     path:"/staff-productivity"

  }
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
            icon={getNavigationIcon(item.iconType)}
            borderColor={item.borderColor}
            path={item.path}
          />
        ))}
      </div>
    </div>
  );
}

export default QuickNavigation;
