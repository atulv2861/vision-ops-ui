import { useState } from 'react';

// Interface matching API response structure
export interface ViewSelectorData {
  selectedView: 'dashboard' | 'map';
}

interface ViewSelectorProps {
  value?: 'dashboard' | 'map';
  onChange?: (value: 'dashboard' | 'map') => void;
}

function ViewSelector({ value, onChange }: ViewSelectorProps) {
  const [selectedView, setSelectedView] = useState<'dashboard' | 'map'>(value || 'dashboard');

  const handleSelect = (view: 'dashboard' | 'map') => {
    setSelectedView(view);
    onChange?.(view);
  };

  return (
    <div className="flex gap-3 px-2 py-1 rounded-lg bg-gray-800">
      <button
        onClick={() => handleSelect('dashboard')}
        className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
          selectedView === 'dashboard'
            ? 'bg-gray-200 text-gray-800'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        Dashboard View
      </button>
      <button
        onClick={() => handleSelect('map')}
        className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
          selectedView === 'map'
            ? 'bg-gray-200 text-gray-800'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        Map View
      </button>
    </div>
  );
}

export default ViewSelector;
