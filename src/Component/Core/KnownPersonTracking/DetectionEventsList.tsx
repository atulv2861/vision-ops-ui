import DetectionEventCard, { type DetectionEventData } from './DetectionEventCard';
import NoDetectionPeriod from './NoDetectionPeriod';

// Dummy data - This structure matches API response format
const dummyDetectionEvents: (DetectionEventData | 'no-detection')[] = [
  {
    cameraId: 'CAM-001',
    location: 'Main Gate (Entrance)',
    confidence: 98,
    duration: 2
  },
  'no-detection',
  {
    cameraId: 'CAM-012',
    location: 'Main Corridor (Building A)',
    confidence: 96,
    duration: 5
  },
  'no-detection',
  {
    cameraId: 'CAM-005',
    location: 'Library Entrance',
    confidence: 99,
    duration: 3
  },
  {
    cameraId: 'CAM-008',
    location: 'Cafeteria',
    confidence: 94,
    duration: 4
  },
  'no-detection',
  {
    cameraId: 'CAM-003',
    location: 'Admin Building (Lobby)',
    confidence: 97,
    duration: 2
  }
];

interface DetectionEventsListProps {
  personName?: string;
  events?: (DetectionEventData | 'no-detection')[];
}

function DetectionEventsList({ personName = 'Dr. Sarah Johnson', events = dummyDetectionEvents }: DetectionEventsListProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-lg font-semibold">
          Event-based detections for {personName}
        </h2>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Showing discrete events only
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-0 max-h-[650px] overflow-y-auto scrollbar-hide pr-2">
        {events.map((event, index) => {
          if (event === 'no-detection') {
            return <NoDetectionPeriod key={`no-detection-${index}`} />;
          }
          return <DetectionEventCard key={index} data={event} personName={personName} />;
        })}
      </div>
    </div>
  );
}

export default DetectionEventsList;
