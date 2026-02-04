import { useState, useEffect, useRef } from 'react';

interface CameraFiltersProps {
  onSearchChange?: (searchTerm: string) => void;
  onStatusChange?: (status: string) => void;
}

const statusOptions = [
  'All Status',
  'Online',
  'Offline',
  'Maintenance'
];

function CameraFilters({ onSearchChange, onStatusChange }: CameraFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setIsStatusOpen(false);
    onStatusChange?.(status);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Search Bar */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search cameras..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-600 transition-colors"
        />
      </div>

      {/* Status Filter */}
      <div className="relative" ref={statusRef}>
        <button
          onClick={() => setIsStatusOpen(!isStatusOpen)}
          className="w-full md:w-48 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-left flex items-center justify-between hover:border-gray-600 transition-colors"
        >
          <span>{selectedStatus}</span>
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform ${isStatusOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isStatusOpen && (
          <div className="absolute top-full mt-1 w-full md:w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                  selectedStatus === status ? 'bg-gray-700' : ''
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CameraFilters;
