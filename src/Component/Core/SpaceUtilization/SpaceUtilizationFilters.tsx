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

  const [isTimeRangeOpen, setIsTimeRangeOpen] = useState(false);
  const [isEntityOpen, setIsEntityOpen] = useState(false);
  const [isSpaceOpen, setIsSpaceOpen] = useState(false);
  const timeRangeRef = useRef<HTMLDivElement>(null);
  const entityRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);

  const closeAll = () => {
    setIsTimeRangeOpen(false);
    setIsEntityOpen(false);
    setIsSpaceOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        timeRangeRef.current?.contains(target) ||
        entityRef.current?.contains(target) ||
        spaceRef.current?.contains(target)
      ) return;
      closeAll();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          <div className="relative" ref={timeRangeRef}>
            <button
              type="button"
              onClick={() => { setIsTimeRangeOpen(!isTimeRangeOpen); setIsEntityOpen(false); setIsSpaceOpen(false); }}
              className={`w-full bg-white border rounded-lg px-4 py-3 text-left flex items-center justify-between transition-all ${
                isTimeRangeOpen ? 'border-blue-500 shadow-md' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <span className={filtersData.timeRange ? 'text-gray-700' : 'text-gray-500'}>
                {filtersData.timeRange}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ml-2 ${isTimeRangeOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isTimeRangeOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-xl z-20">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => { handleChange('timeRange', range); setIsTimeRangeOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      filtersData.timeRange === range ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Entity Filter */}
        <div>
          <label className="block text-gray-400 text-sm mb-3 font-medium">Entity Filter</label>
          <div className="relative" ref={entityRef}>
            <button
              type="button"
              onClick={() => { setIsEntityOpen(!isEntityOpen); setIsTimeRangeOpen(false); setIsSpaceOpen(false); }}
              className={`w-full bg-white border rounded-lg px-4 py-3 text-left flex items-center justify-between transition-all ${
                isEntityOpen ? 'border-blue-500 shadow-md' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <span className={filtersData.entity ? 'text-gray-700' : 'text-gray-500'}>
                {filtersData.entity}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ml-2 ${isEntityOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isEntityOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-xl z-20">
                {entities.map((entity) => (
                  <button
                    key={entity}
                    type="button"
                    onClick={() => { handleChange('entity', entity); setIsEntityOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      filtersData.entity === entity ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {entity}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Select Space Filter */}
        <div>
          <label className="block text-gray-400 text-sm mb-3 font-medium">Select Space</label>
          <div className="relative" ref={spaceRef}>
            <button
              type="button"
              onClick={() => { setIsSpaceOpen(!isSpaceOpen); setIsTimeRangeOpen(false); setIsEntityOpen(false); }}
              className={`w-full bg-white border rounded-lg px-4 py-3 text-left flex items-center justify-between transition-all ${
                isSpaceOpen ? 'border-blue-500 shadow-md' : 'border-gray-300 hover:border-gray-400'
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
                    type="button"
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
