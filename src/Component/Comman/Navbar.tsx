import { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../Context/AppContext';
import { useFilterLocations, useFilterCameras } from '../../hooks/queries';
import { getDateRangeYMDForPreset } from '../../utils/dateRangeFromFilter';

function Navbar() {
  const { isSidebarCollapsed, setGlobalFilterData } = useAppContext();
  const { data: locations = [] } = useFilterLocations();
  const [locationOpen, setLocationOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const [selectedLocationIds, setSelectedLocationIds] = useState<string[]>([]);
  const { data: cameras = [] } = useFilterCameras(selectedLocationIds.length > 0 ? selectedLocationIds : null);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedCameraIds, setSelectedCameraIds] = useState<string[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState('Admin');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showCustomCalendar, setShowCustomCalendar] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const locationRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);

  // Sync initial date range (Today) to global filter so first request has fromDate/toDate
  useEffect(() => {
    setGlobalFilterData((prev) => {
      if (prev.fromDate != null && prev.toDate != null) return prev;
      const { fromDate, toDate } = getDateRangeYMDForPreset('Today');
      return { ...prev, fromDate, toDate };
    });
  }, []);

  // Set all locations selected when locations first load
  useEffect(() => {
    if (locations.length > 0 && selectedLocationIds.length === 0) {
      setSelectedLocationIds(locations.map((loc) => loc.id));
    }
  }, [locations, selectedLocationIds.length]);

  // When location selection changes, reset camera selection so cameras list can reload for new selection
  useEffect(() => {
    setSelectedCameraIds([]);
  }, [selectedLocationIds.join(',')]);

  useEffect(() => {
    if (cameras.length > 0 && selectedCameraIds.length === 0) {
      setSelectedCameraIds(cameras.map((c) => c.camera_id));
    }
  }, [cameras, selectedLocationIds.length]);

  // Sync multi-select to global filter: locationId/cameraId for legacy; cameraIds for overview APIs
  useEffect(() => {
    setGlobalFilterData((prev) => {
      const locationId =
        selectedLocationIds.length === 0 || selectedLocationIds.length === locations.length
          ? null
          : selectedLocationIds[0];
      const cameraId =
        selectedCameraIds.length === 0 || selectedCameraIds.length === cameras.length
          ? null
          : selectedCameraIds[0];
      const cameraIds = selectedCameraIds.length === 0 ? undefined : selectedCameraIds;
      return {
        ...prev,
        locationId: locationId ?? undefined,
        cameraId: cameraId ?? undefined,
        cameraIds,
      };
    });
  }, [selectedLocationIds, selectedCameraIds, locations.length, cameras.length]);

  // Update date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setLocationOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setDateOpen(false);
        setShowCustomCalendar(false);
      }
      if (cameraRef.current && !cameraRef.current.contains(event.target as Node)) {
        setCameraOpen(false);
      }
      if (adminRef.current && !adminRef.current.contains(event.target as Node)) {
        setAdminOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Format date and time
  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return currentDateTime.toLocaleDateString('en-US', options);
  };

  const formatTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return currentDateTime.toLocaleTimeString('en-US', options);
  };

  return (
    <>
      <style>{`
        /* Custom date input styling for dark theme */
        input[type="date"] {
          color-scheme: dark;
        }
        
        /* Webkit browsers (Chrome, Safari, Edge) */
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1) brightness(0.9);
          cursor: pointer;
          opacity: 0.9;
          padding: 2px;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
          filter: invert(1) brightness(1);
        }
        input[type="date"]::-webkit-datetime-edit-text {
          color: white;
          padding: 0 2px;
        }
        input[type="date"]::-webkit-datetime-edit-month-field,
        input[type="date"]::-webkit-datetime-edit-day-field,
        input[type="date"]::-webkit-datetime-edit-year-field {
          color: white;
          padding: 2px;
        }
        input[type="date"]::-webkit-datetime-edit-month-field:focus,
        input[type="date"]::-webkit-datetime-edit-day-field:focus,
        input[type="date"]::-webkit-datetime-edit-year-field:focus {
          background-color: rgba(59, 130, 246, 0.3);
          color: white;
          border-radius: 2px;
        }
        
        /* Firefox */
        input[type="date"] {
          color: white;
        }
        input[type="date"]:focus {
          outline: 2px solid rgb(59, 130, 246);
          outline-offset: 2px;
        }
      `}</style>
      <div className={`bg-[#1E1E2D] text-white h-15 flex items-center justify-between px-6 border-b border-white/[0.08] fixed top-0 right-0 z-10 transition-all duration-300 ${isSidebarCollapsed ? 'left-20' : 'left-64'}`}>
      {/* Left Side - Filters and Dropdowns */}
      <div className="flex items-center gap-4">
        {/* Location Dropdown */}
        <div className="relative" ref={locationRef}>
          <button
            onClick={() => {
              setLocationOpen(!locationOpen);
              setDateOpen(false);
              setCameraOpen(false);
              setAdminOpen(false);
              setShowCustomCalendar(false);
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-700/80 rounded-lg transition-colors"
          >
            <svg
              className="w-4 h-4 text-sky-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Selected location</span>
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {locationOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-52 bg-[#28283B] border border-white/[0.08] rounded-xl shadow-xl z-50 py-1.5">
              {locations.map((loc) => {
                const isChecked = selectedLocationIds.includes(loc.id);
                return (
                  <label
                    key={loc.id}
                    className={`flex items-center gap-3 w-full cursor-pointer px-4 py-2.5 text-sm transition-colors ${
                      isChecked ? 'text-white bg-[#33334B]' : 'text-[#B0B0B0] hover:bg-[#33334B]/60'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        setSelectedLocationIds((prev) =>
                          prev.includes(loc.id) ? prev.filter((id) => id !== loc.id) : [...prev, loc.id]
                        );
                      }}
                      className="w-4 h-4 rounded border-gray-500 bg-gray-700 text-sky-500 focus:ring-sky-500 focus:ring-offset-0"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span>{loc.location}</span>
                  </label>
                );
              })}
              {locations.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No locations available
                </div>
              )}
            </div>
          )}
        </div>

        {/* Date Dropdown */}
        <div className="relative" ref={dateRef}>
          <button
            onClick={() => {
              setDateOpen(!dateOpen);
              setLocationOpen(false);
              setCameraOpen(false);
              setAdminOpen(false);
              if (!dateOpen) {
                setShowCustomCalendar(false);
              }
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{selectedDate}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dateOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-[#28283B] border border-white/[0.08] rounded-xl shadow-lg z-50">
              {['Today', 'Last 7 days', 'Last 30 days', 'This week', 'This month', 'Custom'].map((date) => (
                <button
                  key={date}
                  onClick={() => {
                    if (date === 'Custom') {
                      setSelectedDate('Custom');
                      setShowCustomCalendar(true);
                      setDateOpen(false);
                    } else {
                      setSelectedDate(date);
                      const { fromDate, toDate } = getDateRangeYMDForPreset(date);
                      setGlobalFilterData((prev) => ({ ...prev, fromDate, toDate }));
                      setShowCustomCalendar(false);
                      setDateOpen(false);
                    }
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${
                    selectedDate === date ? 'text-white bg-[#33334B]' : 'text-[#B0B0B0]'
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          )}
          {showCustomCalendar && (
            <div className="absolute top-full left-0 mt-1 bg-[#28283B] border border-white/[0.08] rounded-xl shadow-lg z-50 p-4 min-w-[280px]">
              <div className="mb-3">
                <label className="block text-xs text-gray-400 mb-1">Start Date</label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 [color-scheme:dark]"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs text-gray-400 mb-1">End Date</label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  min={customStartDate}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 [color-scheme:dark]"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (customStartDate && customEndDate) {
                      const start = new Date(customStartDate);
                      const end = new Date(customEndDate);
                      const formattedStart = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                      const formattedEnd = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                      const dateRange = `${formattedStart} - ${formattedEnd}`;
                      setSelectedDate(dateRange);
                      setGlobalFilterData((prev) => ({
                        ...prev,
                        fromDate: customStartDate,
                        toDate: customEndDate,
                      }));
                      setShowCustomCalendar(false);
                    }
                  }}
                  disabled={!customStartDate || !customEndDate}
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-sm rounded-md transition-colors"
                >
                  Apply
                </button>
                <button
                  onClick={() => {
                    setShowCustomCalendar(false);
                    setCustomStartDate('');
                    setCustomEndDate('');
                    if (selectedDate.includes(' - ')) {
                      setSelectedDate('Today');
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Camera Dropdown */}
        <div className="relative" ref={cameraRef}>
          <button
            onClick={() => {
              setCameraOpen(!cameraOpen);
              setLocationOpen(false);
              setDateOpen(false);
              setAdminOpen(false);
              setShowCustomCalendar(false);
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Selected camera</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {cameraOpen && (
            <div className="absolute top-full left-0 mt-1 w-52 bg-[#28283B] border border-white/[0.08] rounded-xl shadow-lg z-50 py-1 max-h-64 overflow-y-auto">
              {cameras.map((cam) => {
                const isChecked = selectedCameraIds.includes(cam.camera_id);
                return (
                  <label
                    key={cam.camera_id}
                    className={`flex items-center gap-3 w-full cursor-pointer px-4 py-2 text-sm transition-colors ${
                      isChecked ? 'text-white bg-[#33334B]' : 'text-[#B0B0B0] hover:bg-[#33334B]/60'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        setSelectedCameraIds((prev) =>
                          prev.includes(cam.camera_id)
                            ? prev.filter((id) => id !== cam.camera_id)
                            : [...prev, cam.camera_id]
                        );
                      }}
                      className="w-4 h-4 rounded border-gray-500 bg-gray-700 text-sky-500 focus:ring-sky-500 focus:ring-offset-0"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span>{cam.name}</span>
                  </label>
                );
              })}
              {cameras.length === 0 && selectedLocationIds.length > 0 && (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No cameras for this location
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Middle Section - Date and Time */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-4 px-4 py-2 bg-[#28283B] rounded-xl border border-white/[0.08] transition-all duration-200 cursor-default group">
          {/* Date Section */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 uppercase tracking-wide">Date</span>
              <span className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                {formatDate()}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-700"></div>

          {/* Time Section */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 uppercase tracking-wide">Time</span>
              <span className="text-sm font-mono font-semibold text-white group-hover:text-blue-300 transition-colors">
                {formatTime()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Notifications and Admin */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
            12
          </span>
        </button>

        {/* Admin Dropdown */}
        <div className="relative" ref={adminRef}>
          <button
            onClick={() => {
              setAdminOpen(!adminOpen);
              setLocationOpen(false);
              setDateOpen(false);
              setCameraOpen(false);
              setShowCustomCalendar(false);
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
          >
            <span>{selectedAdmin}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {adminOpen && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-[#28283B] border border-white/[0.08] rounded-xl shadow-lg z-50">
              {['Admin', 'Security', 'Staff', 'Parent'].map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setSelectedAdmin(role);
                    setAdminOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${
                    selectedAdmin === role ? 'text-white bg-[#33334B]' : 'text-[#B0B0B0]'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default Navbar;
