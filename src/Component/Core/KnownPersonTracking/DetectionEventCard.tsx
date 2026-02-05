// Interface matching API response structure
export interface DetectionEventData {
  cameraId: string;
  location: string;
  confidence: number;
  duration: number; // in seconds
  timestamp?: string;
}

interface DetectionEventCardProps {
  data: DetectionEventData;
  personName?: string;
}

function DetectionEventCard({ data }: DetectionEventCardProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-center gap-4">
      {/* Visual Evidence Placeholder */}
      <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </div>

      {/* Event Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-gray-300 text-sm font-medium">{data.cameraId}</span>
          <span className="text-gray-500">•</span>
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-gray-300 text-sm">{data.location}</span>
        </div>
        <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 transition-colors">
          View Evidence
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Confidence and Duration */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
          {data.confidence}% confidence
        </span>
        <span className="text-gray-400 text-xs">Duration: {data.duration}s</span>
      </div>
    </div>
  );
}

export default DetectionEventCard;
