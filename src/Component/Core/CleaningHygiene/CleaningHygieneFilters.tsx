import { useState, useEffect, useRef } from 'react';

// Interface matching API response structure
export interface CleaningHygieneFiltersData {
  location: string;
  camera: string;
  cameraCount: number;
}

interface CleaningHygieneFiltersProps {
  data?: CleaningHygieneFiltersData;
  onDataChange?: (data: CleaningHygieneFiltersData) => void;
}

// Dummy data - This structure matches API response format
const locations = [
  'Main Gate',
  'Building A',
  'Building B',
  'Building C',
  'Library',
  'Cafeteria',
  'Sports Complex',
  'Admin Building'
];

function CleaningHygieneFilters({ data, onDataChange }: CleaningHygieneFiltersProps) {
  const [filtersData, setFiltersData] = useState<CleaningHygieneFiltersData>({
    location: 'Main Gate',
    camera: 'All Cameras at Main Gate',
    cameraCount: 2,
    ...data
  });

  // Dropdown states
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Refs for outside click detection
  const locationRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);

  // Get cameras for selected location (dummy data)
  const getCamerasForLocation = (location: string) => {
    const cameraMap: Record<string, string[]> = {
      'Main Gate': ['All Cameras at Main Gate', 'CAM-MG-001', 'CAM-MG-002'],
      'Building A': ['All Cameras at Building A', 'CAM-A-001', 'CAM-A-002', 'CAM-A-003', 'CAM-A-004'],
      'Building B': ['All Cameras at Building B', 'CAM-B-001', 'CAM-B-002'],
      'Building C': ['All Cameras at Building C', 'CAM-C-001', 'CAM-C-002', 'CAM-C-003'],
      'Library': ['All Cameras at Library', 'CAM-LIB-001', 'CAM-LIB-002'],
      'Cafeteria': ['All Cameras at Cafeteria', 'CAM-CAF-001'],
      'Sports Complex': ['All Cameras at Sports Complex', 'CAM-SC-001', 'CAM-SC-002'],
      'Admin Building': ['All Cameras at Admin Building', 'CAM-ADM-001', 'CAM-ADM-002', 'CAM-ADM-003']
    };
    return cameraMap[location] || ['All Cameras'];
  };

  const getCameraCountForLocation = (location: string) => {
    const countMap: Record<string, number> = {
      'Main Gate': 2,
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

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
      if (cameraRef.current && !cameraRef.current.contains(event.target as Node)) {
        setIsCameraOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <div className="relative" ref={locationRef}>
          <label className="block text-gray-400 text-sm mb-3">Location</label>
          <div className="relative">
            <button
              onClick={() => {
                setIsLocationOpen(!isLocationOpen);
                setIsCameraOpen(false);
              }}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 text-left flex items-center justify-between hover:border-gray-400 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-700">{filtersData.location}</span>
              </div>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isLocationOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto scrollbar-hide">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => handleLocationChange(location)}
                    className={`w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2 transition-colors ${
                      filtersData.location === location ? 'bg-blue-50' : ''
                    }`}
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
        <div className="relative" ref={cameraRef}>
          <label className="block text-gray-400 text-sm mb-3">Camera</label>
          <div className="relative">
            <button
              onClick={() => {
                setIsCameraOpen(!isCameraOpen);
                setIsLocationOpen(false);
              }}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 text-left flex items-center justify-between hover:border-gray-400 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-700 truncate">{filtersData.camera}</span>
              </div>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform ${isCameraOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isCameraOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto scrollbar-hide">
                {cameras.map((camera) => (
                  <button
                    key={camera}
                    onClick={() => handleCameraChange(camera)}
                    className={`w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2 transition-colors ${
                      filtersData.camera === camera ? 'bg-blue-50' : ''
                    }`}
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{camera}</span>
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

export default CleaningHygieneFilters;
