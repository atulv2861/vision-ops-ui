import { useState } from 'react';

// Interface matching API response structure
export interface AccessControlFiltersData {
  selectedEntity: string;
  selectedTimeRange: string;
  selectedGateSpace: string;
}

interface AccessControlFiltersProps {
  data?: AccessControlFiltersData;
  onDataChange?: (data: AccessControlFiltersData) => void;
}

// Dummy data - This structure matches API response format
const entities = ['All', 'Staff', 'Security', 'Visitor', 'Student'];
const timeRanges = ['Hour', 'Day', 'Week'];
const gatesAndSpaces = [
  'All Gates & Spaces',
  'Main Gate',
  'North Gate',
  'South Gate',
  'Library Entrance',
  'Admin Building',
  'Student Center'
];

function AccessControlFilters({ data, onDataChange }: AccessControlFiltersProps) {
  const [filtersData, setFiltersData] = useState<AccessControlFiltersData>({
    selectedEntity: 'All',
    selectedTimeRange: 'Day',
    selectedGateSpace: 'All Gates & Spaces',
    ...data
  });

  // Dropdown state for Gate/Space filter
  const [isGateSpaceOpen, setIsGateSpaceOpen] = useState(false);

  const handleChange = (field: keyof AccessControlFiltersData, value: string) => {
    const newData = { ...filtersData, [field]: value };
    setFiltersData(newData);
    onDataChange?.(newData);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6  p-2 rounded-lg shadow shadow-gray-800 border border-gray-800">
      {/* Entity Filter */}
      <div>
        <label className="block text-gray-400 text-sm mb-3">Entity Filter</label>
        <div className="flex flex-wrap gap-2">
          {entities.map((entity) => (
            <button
              key={entity}
              onClick={() => handleChange('selectedEntity', entity)}
              className={`px-2 py-1 rounded-full text-xs font-normal transition-colors ${
                filtersData.selectedEntity === entity
                  ? 'bg-white text-blue-600'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {entity}
            </button>
          ))}
        </div>
      </div>

      {/* Time Range Filter */}
      <div>
        <label className="block text-gray-400 text-sm mb-3">Time Range</label>
        <div className="flex flex-wrap gap-2">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => handleChange('selectedTimeRange', range)}
              className={`px-2 py-1 rounded-full text-xs font-normal transition-colors ${
                filtersData.selectedTimeRange === range
                  ? 'bg-white text-purple-600'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Gate / Space Filter */}
      <div>
        <label className="block text-gray-400 text-sm mb-3">Gate / Space Filter</label>
        <div className="relative">
          <button
            onClick={() => {
              setIsGateSpaceOpen(!isGateSpaceOpen);
            }}
            className="w-full text-xs bg-gray-900 border-1 border-gray-700 rounded-lg px-2 py-1 text-gray-200 text-left flex items-center justify-between hover:border-gray-400 transition-colors"
          >
            <span>{filtersData.selectedGateSpace}</span>
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isGateSpaceOpen && (
            <div className="absolute top-full mt-1 w-full bg-gray-800 border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {gatesAndSpaces.map((gateSpace) => (
                <button
                  key={gateSpace}
                  onClick={() => {
                    handleChange('selectedGateSpace', gateSpace);
                    setIsGateSpaceOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                >
                  {gateSpace}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccessControlFilters;
