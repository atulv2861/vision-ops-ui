import EventCard from './EventCard';

// Interface matching API response structure
export interface EventData {
  eventType: string;
  location: string;
  timeAgo: string;
  confidence: number;
  iconType: string;
  iconColor: string;
}

// Icon mapping function
const getEventIcon = (iconType: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    warning: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    security: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    cleaning: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    staff: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  };

  return iconMap[iconType] || iconMap.warning;
};

// Dummy data array - This structure matches API response format
const dummyEventsData: EventData[] = [
  {
    eventType: "Student Distribution",
    location: "Main Cafeteria",
    timeAgo: "2 minutes ago",
    confidence: 94,
    iconType: "warning",
    iconColor: "bg-red-500/20 text-red-500"
  },
  {
    eventType: "Security",
    location: "Server Room - Building A",
    timeAgo: "15 minutes ago",
    confidence: 98,
    iconType: "security",
    iconColor: "bg-blue-500/20 text-blue-500"
  },
  {
    eventType: "Cleaning",
    location: "Washroom Block C",
    timeAgo: "23 minutes ago",
    confidence: 89,
    iconType: "cleaning",
    iconColor: "bg-green-500/20 text-green-500"
  },
  {
    eventType: "Student Distribution",
    location: "Staircase - Building B",
    timeAgo: "1 hour ago",
    confidence: 91,
    iconType: "warning",
    iconColor: "bg-red-500/20 text-red-500"
  },
  {
    eventType: "Security",
    location: "Main Gate",
    timeAgo: "1 hour ago",
    confidence: 87,
    iconType: "security",
    iconColor: "bg-blue-500/20 text-blue-500"
  },
  {
    eventType: "Staff",
    location: "Library - Floor 2",
    timeAgo: "2 hours ago",
    confidence: 85,
    iconType: "staff",
    iconColor: "bg-purple-500/20 text-purple-500"
  }
];

function EventsGrid() {
  // In future, replace dummy data with API call:
  // const [eventsData, setEventsData] = useState<EventData[]>([]);
  // useEffect(() => { fetchEvents().then(setEventsData); }, []);
  
  const eventsData = dummyEventsData; // Replace with API data when ready

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {eventsData.map((event, index) => (
        <EventCard
          key={index}
          eventType={event.eventType}
          location={event.location}
          timeAgo={event.timeAgo}
          confidence={event.confidence}
          icon={getEventIcon(event.iconType)}
          iconColor={event.iconColor}
        />
      ))}
    </div>
  );
}

export default EventsGrid;
