import { useState } from 'react';

// Interface matching API response structure
export interface StudentDistributionFiltersData {
  location: string;
  camera: string;
  cameraCount: number;
}

interface StudentDistributionFiltersProps {
  data?: StudentDistributionFiltersData;
  onDataChange?: (data: StudentDistributionFiltersData) => void;
}

// Dummy data - This structure matches API response format
const locations = [
  'Building A',
  'Building B',
  'Building C',
  'Library',
  'Cafeteria',
  'Sports Complex',
  'Admin Building'
];

function StudentDistributionFilters({ data, onDataChange }: StudentDistributionFiltersProps) {
  const [filtersData, setFiltersData] = useState<StudentDistributionFiltersData>({
    location: 'Building A',
    camera: 'All Cameras at Building A',
    cameraCount: 4,
    ...data
  });

  // Dropdown states
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Get cameras for selected location (dummy data)
  const getCamerasForLocation = (location: string) => {
    const cameraMap: Record<string, string[]> = {
      'Building A': ['All Cameras at Building A', 'CAM-001', 'CAM-002', 'CAM-003', 'CAM-004'],
      'Building B': ['All Cameras at Building B', 'CAM-005', 'CAM-006'],
      'Building C': ['All Cameras at Building C', 'CAM-007', 'CAM-008', 'CAM-009'],
      'Library': ['All Cameras at Library', 'CAM-010', 'CAM-011'],
      'Cafeteria': ['All Cameras at Cafeteria', 'CAM-012'],
      'Sports Complex': ['All Cameras at Sports Complex', 'CAM-013', 'CAM-014'],
      'Admin Building': ['All Cameras at Admin Building', 'CAM-015', 'CAM-016', 'CAM-017']
    };
    return cameraMap[location] || ['All Cameras'];
  };

  const getCameraCountForLocation = (location: string) => {
    const countMap: Record<string, number> = {
      'Building A': 4,
      'Building B': 2,
      'Building C': 3,
      'Library': 2,
      'Cafeteria': 1,
      'Sports Complex': 2,
      'Admin Building': 3
    };
    return countMap[location] || 0;
  };

  const handleLocationChange = (location: string) => {
    const cameraCount = getCameraCountForLocation(location);
    const cameras = getCamerasForLocation(location);
    const newData = {
      location,
      camera: cameras[0], // Set to "All Cameras" for the new location
      cameraCount
    };
    setFiltersData(newData);
    setIsLocationOpen(false);
    onDataChange?.(newData);
  };

  const handleCameraChange = (camera: string) => {
    const newData = { ...filtersData, camera };
    setFiltersData(newData);
    setIsCameraOpen(false);
    onDataChange?.(newData);
  };

  const cameras = getCamerasForLocation(filtersData.location);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location Dropdown */}
        <div className="relative">
          <label className="block text-gray-400 text-sm mb-3">Location</label>
          <div className="relative">
            <button
              onClick={() => {
                setIsLocationOpen(!isLocationOpen);
                setIsCameraOpen(false);
              }}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 text-left flex items-center justify-between hover:border-gray-400 transition-colors"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-700">{filtersData.location}</span>
              </div>
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isLocationOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => handleLocationChange(location)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className="text-gray-400 text-sm mt-2">{filtersData.cameraCount} cameras</p>
        </div>

        {/* Camera Dropdown */}
        <div className="relative">
          <label className="block text-gray-400 text-sm mb-3">Camera</label>
          <div className="relative">
            <button
              onClick={() => {
                setIsCameraOpen(!isCameraOpen);
                setIsLocationOpen(false);
              }}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 text-left flex items-center justify-between hover:border-gray-400 transition-colors"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-700">{filtersData.camera}</span>
              </div>
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isCameraOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {cameras.map((camera) => (
                  <button
                    key={camera}
                    onClick={() => handleCameraChange(camera)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {camera}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDistributionFilters;
