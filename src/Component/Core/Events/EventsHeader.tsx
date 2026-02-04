import { useState } from 'react';

function EventsHeader() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSeverity, setSelectedSeverity] = useState('All Severity');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSeverityOpen, setIsSeverityOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const categories = ['All Categories', 'Student Distribution', 'Security', 'Cleaning', 'Staff'];
  const severities = ['All Severity', 'High', 'Medium', 'Low'];
  const statuses = ['All Status', 'Open', 'Acknowledge', 'Closed'];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search Bar */}
      <div className="flex-1 relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search events..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="flex gap-3">
        {/* Categories Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsCategoryOpen(!isCategoryOpen);
              setIsSeverityOpen(false);
              setIsStatusOpen(false);
            }}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm flex items-center gap-2 hover:bg-gray-750 transition-colors min-w-[140px]"
          >
            <span>{selectedCategory}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isCategoryOpen && (
            <div className="absolute top-full mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsCategoryOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Severity Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsSeverityOpen(!isSeverityOpen);
              setIsCategoryOpen(false);
              setIsStatusOpen(false);
            }}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm flex items-center gap-2 hover:bg-gray-750 transition-colors min-w-[140px]"
          >
            <span>{selectedSeverity}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isSeverityOpen && (
            <div className="absolute top-full mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
              {severities.map((severity) => (
                <button
                  key={severity}
                  onClick={() => {
                    setSelectedSeverity(severity);
                    setIsSeverityOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                >
                  {severity}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsStatusOpen(!isStatusOpen);
              setIsCategoryOpen(false);
              setIsSeverityOpen(false);
            }}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm flex items-center gap-2 hover:bg-gray-750 transition-colors min-w-[140px]"
          >
            <span>{selectedStatus}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isStatusOpen && (
            <div className="absolute top-full mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setIsStatusOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter Icon Button */}
        <button className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-750 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default EventsHeader;
