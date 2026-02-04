interface EventCardProps {
  eventType: string;
  location: string;
  timeAgo: string;
  confidence: number;
  icon: React.ReactNode;
  iconColor: string;
}

function EventCard({ eventType, location, timeAgo, confidence, icon, iconColor }: EventCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-5 hover:bg-gray-750 cursor-pointer transition-colors border border-gray-700/50">
      {/* Icon */}
      <div className={`${iconColor} w-10 h-10 rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>

      {/* Event Type */}
      <h3 className="text-white font-semibold text-base mb-3">{eventType}</h3>

      {/* Location */}
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-gray-400 text-sm">{location}</span>
      </div>

      {/* Timestamp */}
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-gray-400 text-sm">{timeAgo}</span>
      </div>

      {/* Confidence Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-xs">Confidence:</span>
          <span className="text-white text-xs font-medium">{confidence}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default EventCard;
