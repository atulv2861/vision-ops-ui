import { useState } from 'react';
import ViewSelector from '../../Comman/ViewSelector';

// Interface matching API response structure
export interface StaffProductivityViewControlsData {
  selectedView: 'dashboard' | 'map';
  selectedTimeRange: 'live' | 'last-hour' | 'last-day' | 'last-week' | 'custom';
}

interface StaffProductivityViewControlsProps {
  data?: StaffProductivityViewControlsData;
  onDataChange?: (data: StaffProductivityViewControlsData) => void;
}

function StaffProductivityViewControls({ data, onDataChange }: StaffProductivityViewControlsProps) {
  const [controlsData, setControlsData] = useState<StaffProductivityViewControlsData>({
    selectedView: 'dashboard',
    selectedTimeRange: 'live',
    ...data
  });

  const handleViewChange = (view: 'dashboard' | 'map') => {
    const newData = { ...controlsData, selectedView: view };
    setControlsData(newData);
    onDataChange?.(newData);
  };

  const handleTimeRangeChange = (range: 'live' | 'last-hour' | 'last-day' | 'last-week' | 'custom') => {
    const newData = { ...controlsData, selectedTimeRange: range };
    setControlsData(newData);
    onDataChange?.(newData);
  };

  const timeRanges: Array<{ value: 'live' | 'last-hour' | 'last-day' | 'last-week' | 'custom'; label: string }> = [
    { value: 'live', label: 'Live' },
    { value: 'last-hour', label: 'Last Hour' },
    { value: 'last-day', label: 'Last Day' },
    { value: 'last-week', label: 'Last Week' },
    { value: 'custom', label: 'Custom' }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
      {/* View Selector */}
      <ViewSelector 
        value={controlsData.selectedView} 
        onChange={handleViewChange} 
      />

      {/* Time Range Selector */}
      <div className="flex items-center gap-3">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="flex gap-0 bg-gray-800 rounded-lg overflow-hidden">
          {timeRanges.map((range, index) => (
            <button
              key={range.value}
              onClick={() => handleTimeRangeChange(range.value)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                controlsData.selectedTimeRange === range.value
                  ? 'bg-white text-gray-800'
                  : 'bg-gray-800 text-gray-400 hover:text-gray-300'
              } ${
                index === 0 ? 'rounded-l-lg' : ''
              } ${
                index === timeRanges.length - 1 ? 'rounded-r-lg' : ''
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StaffProductivityViewControls;
