import React, { useState } from 'react';

// Interface matching API response structure
export interface OverlayOption {
  id: string;
  label: string;
  iconType: string;
}

interface OverlaySelectorProps {
  selectedOverlay?: string;
  onOverlayChange?: (overlayId: string) => void;
}

// Dummy data - This structure matches API response format
const overlayOptions: OverlayOption[] = [
  { id: 'roi-zones', label: 'ROI Zones', iconType: 'dollar' },
  { id: 'event-density', label: 'Event Density', iconType: 'exclamation' },
  { id: 'student-distribution', label: 'Student Distribution', iconType: 'people' },
  { id: 'staff-presence', label: 'Staff Presence', iconType: 'people' },
  { id: 'cleaning-coverage', label: 'Cleaning Coverage', iconType: 'star' }
];

// Icon mapping function
const getIconComponent = (iconType: string, isSelected: boolean) => {
  const iconColor = isSelected ? 'text-white' : 'text-gray-700';
  
  const iconMap: Record<string, React.ReactNode> = {
    dollar: (
      <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    exclamation: (
      <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    people: (
      <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    star: (
      <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  };

  return iconMap[iconType] || null;
};

function OverlaySelector({ selectedOverlay = 'roi-zones', onOverlayChange }: OverlaySelectorProps) {
  const [currentOverlay, setCurrentOverlay] = useState<string>(selectedOverlay);

  const handleOverlayClick = (overlayId: string) => {
    setCurrentOverlay(overlayId);
    onOverlayChange?.(overlayId);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-gray-300 text-sm mb-4">Select Overlay</h3>
      <div className="flex flex-wrap gap-3">
        {overlayOptions.map((option) => {
          const isSelected = currentOverlay === option.id;
          return (
            <button
              key={option.id}
              onClick={() => handleOverlayClick(option.id)}
              className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
                isSelected
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getIconComponent(option.iconType, isSelected)}
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default OverlaySelector;
