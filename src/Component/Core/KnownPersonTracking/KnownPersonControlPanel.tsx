import { useState } from 'react';

// Interface matching API response structure
export interface ControlPanelData {
  knownPerson: string;
  timeRange: string;
  minConfidence: number;
  privacy: 'masked' | 'unmasked';
}

interface KnownPersonControlPanelProps {
  data?: ControlPanelData;
  onDataChange?: (data: ControlPanelData) => void;
}

// Dummy data for dropdowns
const knownPersons = [
  { id: '1', name: 'Dr. Sarah Johnson', role: 'Staff' },
  { id: '2', name: 'John Smith', role: 'Faculty' },
  { id: '3', name: 'Emily Davis', role: 'Staff' },
  { id: '4', name: 'Michael Brown', role: 'Faculty' },
  { id: '5', name: 'Lisa Anderson', role: 'Staff' }
];

const timeRanges = [
  'Today',
  'Yesterday',
  'Last 7 days',
  'Last 30 days',
  'Custom Range'
];

function KnownPersonControlPanel({ data, onDataChange }: KnownPersonControlPanelProps) {
  const [panelData, setPanelData] = useState<ControlPanelData>({
    knownPerson: 'Dr. Sarah Johnson (Staff)',
    timeRange: 'Today',
    minConfidence: 90,
    privacy: 'masked',
    ...data
  });

  // Dropdown states
  const [isPersonOpen, setIsPersonOpen] = useState(false);
  const [isTimeRangeOpen, setIsTimeRangeOpen] = useState(false);

  const handleChange = (field: keyof ControlPanelData, value: any) => {
    const newData = { ...panelData, [field]: value };
    setPanelData(newData);
    onDataChange?.(newData);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Known Person Dropdown */}
        <div className="relative">
          <label className="block text-gray-400 text-sm mb-2">Known Person</label>
          <button
            onClick={() => {
              setIsPersonOpen(!isPersonOpen);
              setIsTimeRangeOpen(false);
            }}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white text-left flex items-center justify-between hover:border-gray-500 transition-colors"
          >
            <span>{panelData.knownPerson}</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isPersonOpen && (
            <div className="absolute top-full mt-1 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {knownPersons.map((person) => (
                <button
                  key={person.id}
                  onClick={() => {
                    handleChange('knownPerson', `${person.name} (${person.role})`);
                    setIsPersonOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                >
                  {person.name} ({person.role})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Time Range Dropdown */}
        <div className="relative">
          <label className="block text-gray-400 text-sm mb-2">Time Range</label>
          <button
            onClick={() => {
              setIsTimeRangeOpen(!isTimeRangeOpen);
              setIsPersonOpen(false);
            }}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white text-left flex items-center justify-between hover:border-gray-500 transition-colors"
          >
            <span>{panelData.timeRange}</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isTimeRangeOpen && (
            <div className="absolute top-full mt-1 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    handleChange('timeRange', range);
                    setIsTimeRangeOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Confidence Slider */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Min. Confidence: <span className="text-white font-medium">{panelData.minConfidence}%</span>
          </label>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={panelData.minConfidence}
              onChange={(e) => handleChange('minConfidence', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${panelData.minConfidence}%, #374151 ${panelData.minConfidence}%, #374151 100%)`
              }}
            />
            <style>{`
              .slider::-webkit-slider-thumb {
                appearance: none;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #3b82f6;
                cursor: pointer;
                border: 2px solid #1f2937;
              }
              .slider::-moz-range-thumb {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #3b82f6;
                cursor: pointer;
                border: 2px solid #1f2937;
              }
            `}</style>
          </div>
        </div>

        {/* Privacy Toggle */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">Privacy</label>
          <button
            onClick={() => handleChange('privacy', panelData.privacy === 'masked' ? 'unmasked' : 'masked')}
            className={`w-full bg-gray-800 border border-gray-600 rounded-lg p-1 flex transition-all duration-300 ${
              panelData.privacy === 'masked' ? '' : 'flex-row-reverse'
            }`}
          >
            {/* Masked Option */}
            <div
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all duration-300 ${
                panelData.privacy === 'masked'
                  ? 'bg-white text-gray-700'
                  : 'text-gray-400'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-xs font-medium">Masked</span>
            </div>

            {/* Unmasked Option */}
            <div
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all duration-300 ${
                panelData.privacy === 'unmasked'
                  ? 'bg-white text-gray-700'
                  : 'text-gray-400'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.906 5.236m-3.59-3.59L12 12m-3.59-3.59L3 3" />
              </svg>
              <span className="text-xs font-medium">Unmasked</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default KnownPersonControlPanel;
