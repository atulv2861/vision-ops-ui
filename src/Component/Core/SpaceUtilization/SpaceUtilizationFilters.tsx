import { useState, useEffect, useRef } from 'react';

// Interface matching API response structure
export interface SpaceUtilizationFiltersData {
  timeRange: string;
  entity: string;
  selectedSpace: string;
}

interface SpaceUtilizationFiltersProps {
  data?: SpaceUtilizationFiltersData;
  onDataChange?: (data: SpaceUtilizationFiltersData) => void;
}

// Dummy data - This structure matches API response format
const timeRanges = ['Hour', 'Day', 'Week'];
const entities = ['Students', 'Staff', 'Both'];
const spaces = [
  'Classroom A101 (classroom) - Building A',
  'Classroom B205 (classroom) - Building B',
  'Library Reading Room (library) - Main Building',
  'Cafeteria (dining) - Student Center',
  'Lab C301 (laboratory) - Science Building',
  'Auditorium (event) - Main Building',
  'Gymnasium (sports) - Sports Complex'
];

function SpaceUtilizationFilters({ data, onDataChange }: SpaceUtilizationFiltersProps) {
  const [filtersData, setFiltersData] = useState<SpaceUtilizationFiltersData>({
    timeRange: 'Day',
    entity: 'Both',
    selectedSpace: 'Classroom A101 (classroom) - Building A',
    ...data
  });

  // Dropdown state for Select Space
  const [isSpaceOpen, setIsSpaceOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSpaceOpen(false);
      }
    };

    if (isSpaceOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSpaceOpen]);

  const handleChange = (field: keyof SpaceUtilizationFiltersData, value: string) => {
    const newData = { ...filtersData, [field]: value };
    setFiltersData(newData);
    onDataChange?.(newData);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Time Range Filter */}
        <div>
          <label className="block text-gray-400 text-sm mb-3 font-medium">Time Range</label>
          <div className="bg-white rounded-lg p-1 flex gap-1 shadow-sm">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => handleChange('timeRange', range)}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  filtersData.timeRange === range
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Entity Filter */}
        <div>
          <label className="block text-gray-400 text-sm mb-3 font-medium">Entity Filter</label>
          <div className="bg-white rounded-lg p-1 flex gap-1 shadow-sm">
            {entities.map((entity) => (
              <button
                key={entity}
                onClick={() => handleChange('entity', entity)}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  filtersData.entity === entity
                    ? 'bg-purple-500 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                }`}
              >
                {entity}
              </button>
            ))}
          </div>
        </div>

        {/* Select Space Filter */}
        <div>
          <label className="block text-gray-400 text-sm mb-3">Select Space</label>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsSpaceOpen(!isSpaceOpen)}
              className={`w-full bg-white border rounded-lg px-4 py-3 text-left flex items-center justify-between transition-all ${
                isSpaceOpen
                  ? 'border-blue-500 shadow-md'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <span className={`truncate ${filtersData.selectedSpace ? 'text-gray-700' : 'text-gray-500'}`}>
                {filtersData.selectedSpace}
              </span>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ml-2 ${isSpaceOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isSpaceOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto scrollbar-hide">
                {spaces.map((space) => (
                  <button
                    key={space}
                    onClick={() => {
                      handleChange('selectedSpace', space);
                      setIsSpaceOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      filtersData.selectedSpace === space
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {space}
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

export default SpaceUtilizationFilters;
