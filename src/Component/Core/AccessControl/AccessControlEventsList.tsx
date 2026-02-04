import AccessControlEventCard, { type AccessControlEventData } from './AccessControlEventCard';

// Dummy data - This structure matches API response format
const dummyEventsData: AccessControlEventData[] = [
  {
    location: 'Library Entrance',
    type: 'EXIT',
    role: 'visitor',
    time: '09:35 AM',
    cameraId: 'CAM-018',
    detectedCount: 2
  },
  {
    location: 'Building B Entrance',
    type: 'EXIT',
    role: 'staff',
    time: '09:35 AM',
    cameraId: 'CAM-021',
    detectedCount: 1
  },
  {
    location: 'Building B Entrance',
    type: 'EXIT',
    role: 'staff',
    time: '09:35 AM',
    cameraId: 'CAM-021',
    detectedCount: 1
  },
  {
    location: 'Building B Entrance',
    type: 'EXIT',
    role: 'staff',
    time: '09:35 AM',
    cameraId: 'CAM-021',
    detectedCount: 1
  },
  {
    location: 'Building B Entrance',
    type: 'EXIT',
    role: 'staff',
    time: '09:35 AM',
    cameraId: 'CAM-021',
    detectedCount: 1
  },
  {
    location: 'Building B Entrance',
    type: 'EXIT',
    role: 'staff',
    time: '09:35 AM',
    cameraId: 'CAM-021',
    detectedCount: 1
  },
  {
    location: 'Building B Entrance',
    type: 'EXIT',
    role: 'staff',
    time: '09:35 AM',
    cameraId: 'CAM-021',
    detectedCount: 1
  },
  {
    location: 'Building B Entrance',
    type: 'EXIT',
    role: 'staff',
    time: '09:35 AM',
    cameraId: 'CAM-021',
    detectedCount: 1
  },
  {
    location: 'Building A Emergency Exit',
    type: 'ENTRY',
    role: 'student',
    time: '09:15 AM',
    cameraId: 'CAM-013',
    detectedCount: 4
  },
  {
    location: 'Cafeteria Entrance',
    type: 'ENTRY',
    role: 'visitor',
    time: '09:12 AM',
    cameraId: 'CAM-006',
    detectedCount: 3
  },
  {
    location: 'Cafeteria Entrance',
    type: 'ENTRY',
    role: 'visitor',
    time: '09:03 AM',
    cameraId: 'CAM-006',
    detectedCount: 2
  }
];

function AccessControlEventsList() {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-300 text-lg font-medium">Last 50 detected entries/exits</h2>
        <span className="text-gray-400 text-sm">50 events</span>
      </div>
      <div className="space-y-3 max-h-[660px] overflow-y-auto scrollbar-hide pr-2 ">
        {dummyEventsData.map((event, index) => (
          <AccessControlEventCard key={index} data={event} />
        ))}
      </div>
    </div>
  );
}

export default AccessControlEventsList;
