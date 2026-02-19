import { useState, useEffect, useRef } from 'react';

export interface SpaceUtilizationFiltersData {
  entity: string;
}

interface SpaceUtilizationFiltersProps {
  data?: SpaceUtilizationFiltersData;
  onDataChange?: (data: SpaceUtilizationFiltersData) => void;
}

const entities = ['Students', 'Staff', 'Both'];

function SpaceUtilizationFilters({ data, onDataChange }: SpaceUtilizationFiltersProps) {
  const [filtersData, setFiltersData] = useState<SpaceUtilizationFiltersData>({
    entity: 'Both',
    ...data,
  });

  const [isEntityOpen, setIsEntityOpen] = useState(false);
  const entityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (entityRef.current?.contains(target)) return;
      setIsEntityOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (value: string) => {
    const newData = { entity: value };
    setFiltersData(newData);
    onDataChange?.(newData);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <span className="text-gray-400 text-xs">Entity Filter</span>
      <div className="relative" ref={entityRef}>
        <button
          type="button"
          onClick={() => setIsEntityOpen(!isEntityOpen)}
          className={`min-w-[6rem] bg-white/10 border border-white/20 rounded-md px-2.5 py-1 text-left flex items-center justify-between gap-1.5 transition-all text-sm ${
            isEntityOpen ? 'border-blue-400/60 bg-white/15' : 'hover:bg-white/15'
          }`}
        >
          <span className="text-gray-200 truncate">{filtersData.entity}</span>
          <svg
            className={`w-4 h-4 text-gray-400 flex-shrink-0 ${isEntityOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isEntityOpen && (
          <div className="absolute top-full left-0 mt-1 min-w-[6rem] bg-[#28283B] border border-white/10 rounded-md shadow-xl z-20 py-0">
            {entities.map((entity) => (
              <button
                key={entity}
                type="button"
                onClick={() => {
                  handleChange(entity);
                  setIsEntityOpen(false);
                }}
                className={`w-full text-left px-2.5 py-1 text-xs transition-colors first:rounded-t-md last:rounded-b-md ${
                  filtersData.entity === entity
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                {entity}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SpaceUtilizationFilters;
