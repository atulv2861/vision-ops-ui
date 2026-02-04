import { useState } from 'react';

// Interface matching API response structure
export interface TimeScrubberData {
  startTime: string;
  endTime: string;
  currentTime: string;
  showing: string;
}

interface TimeScrubberProps {
  data?: TimeScrubberData;
  onChange?: (data: TimeScrubberData) => void;
}

function TimeScrubber({ 
  data = {
    startTime: '08:00',
    endTime: '15:00',
    currentTime: '08:00',
    showing: 'All'
  },
  onChange
}: TimeScrubberProps) {
  const [scrubberData, setScrubberData] = useState<TimeScrubberData>(data);

  // Convert time to minutes for slider calculation
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const startMinutes = timeToMinutes(scrubberData.startTime);
  const endMinutes = timeToMinutes(scrubberData.endTime);
  const currentMinutes = timeToMinutes(scrubberData.currentTime);
  const percentage = ((currentMinutes - startMinutes) / (endMinutes - startMinutes)) * 100;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPercentage = parseFloat(e.target.value);
    const newMinutes = startMinutes + (newPercentage / 100) * (endMinutes - startMinutes);
    const newTime = minutesToTime(Math.round(newMinutes));
    const newData = { ...scrubberData, currentTime: newTime };
    setScrubberData(newData);
    onChange?.(newData);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-white text-base font-semibold mb-3">Time Scrubber</h3>
      
      {/* Time Labels */}
      <div className="flex justify-between mb-2">
        <span className="text-gray-400 text-sm">{scrubberData.startTime}</span>
        <span className="text-gray-400 text-sm">{scrubberData.endTime}</span>
      </div>

      {/* Slider */}
      <div className="relative mb-3">
        <input
          type="range"
          min="0"
          max="100"
          value={percentage}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #60a5fa 0%, #60a5fa ${percentage}%, #374151 ${percentage}%, #374151 100%)`
          }}
        />
        <style>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #60a5fa;
            cursor: pointer;
            border: 2px solid #1f2937;
          }
          .slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #60a5fa;
            cursor: pointer;
            border: 2px solid #1f2937;
          }
        `}</style>
      </div>

      {/* Showing Text */}
      <p className="text-gray-400 text-sm">Showing: {scrubberData.showing}</p>
    </div>
  );
}

export default TimeScrubber;
