import { useState } from 'react';

// Interface matching API response structure
export interface CameraFilterData {
  cameras: { id: string; name: string; checked: boolean }[];
}

interface CameraFilterProps {
  data?: CameraFilterData;
  onChange?: (data: CameraFilterData) => void;
}

// Dummy data - This structure matches API response format
const defaultCameras = [
  { id: 'CAM-001', name: 'Main Gate', checked: true },
  { id: 'CAM-012', name: 'Main Corridor', checked: true },
  { id: 'CAM-015', name: 'Faculty Office', checked: true },
  { id: 'CAM-005', name: 'Cafeteria', checked: true },
  { id: 'CAM-018', name: 'Library', checked: true }
];

function CameraFilter({ 
  data = { cameras: defaultCameras },
  onChange
}: CameraFilterProps) {
  const [filterData, setFilterData] = useState<CameraFilterData>(data);

  const handleToggle = (cameraId: string) => {
    const newCameras = filterData.cameras.map(camera =>
      camera.id === cameraId ? { ...camera, checked: !camera.checked } : camera
    );
    const newData = { cameras: newCameras };
    setFilterData(newData);
    onChange?.(newData);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-white text-base font-semibold mb-1">Camera Filter</h3>
      
      <div className="space-y-1">
        {filterData.cameras.map((camera) => (
          <label
            key={camera.id}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 rounded-lg p-1 -mx-2 transition-colors"
          >
            <input
              type="checkbox"
              checked={camera.checked}
              onChange={() => handleToggle(camera.id)}
              className="w-3 h-3 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer"
            />
            <span className="text-gray-300 text-xs flex-1">
              {camera.id} - {camera.name}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default CameraFilter;
