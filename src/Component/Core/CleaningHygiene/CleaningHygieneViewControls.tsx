import { useState } from 'react';
import ViewSelector from '../../Comman/ViewSelector';

// Interface matching API response structure
export interface CleaningHygieneViewControlsData {
  selectedView: 'dashboard' | 'map';
  selectedTimeRange: 'last-hour' | 'last-day' | 'last-week' | 'custom';
}

interface CleaningHygieneViewControlsProps {
  data?: CleaningHygieneViewControlsData;
  onDataChange?: (data: CleaningHygieneViewControlsData) => void;
}

function CleaningHygieneViewControls({ data, onDataChange }: CleaningHygieneViewControlsProps) {
  const [controlsData, setControlsData] = useState<CleaningHygieneViewControlsData>({
    selectedView: 'dashboard',
    selectedTimeRange: 'last-day',
    ...data
  });

  const handleViewChange = (view: 'dashboard' | 'map') => {
    const newData = { ...controlsData, selectedView: view };
    setControlsData(newData);
    onDataChange?.(newData);
  };

  const handleTimeRangeChange = (range: 'last-hour' | 'last-day' | 'last-week' | 'custom') => {
    const newData = { ...controlsData, selectedTimeRange: range };
    setControlsData(newData);
    onDataChange?.(newData);
  };

  const timeRanges: Array<{ value: 'last-hour' | 'last-day' | 'last-week' | 'custom'; label: string }> = [
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
        <div className="flex gap-0 bg-gray-100 rounded-lg overflow-hidden">
          {timeRanges.map((range, index) => (
            <button
              key={range.value}
              onClick={() => handleTimeRangeChange(range.value as 'last-hour' | 'last-day' | 'last-week' | 'custom')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                controlsData.selectedTimeRange === range.value
                  ? 'bg-white text-gray-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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

export default CleaningHygieneViewControls;
