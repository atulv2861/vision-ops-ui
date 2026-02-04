
// Interface matching API response structure
export interface AccessControlEventData {
  location: string;
  type: 'ENTRY' | 'EXIT';
  role: 'visitor' | 'staff' | 'student';
  time: string;
  cameraId: string;
  detectedCount: number;
}

interface AccessControlEventCardProps {
  data: AccessControlEventData;
}

function AccessControlEventCard({ data }: AccessControlEventCardProps) {
  const getTypeColor = (type: string) => {
    return type === 'ENTRY' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white';
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      visitor: 'bg-yellow-200 text-gray-700',
      staff: 'bg-blue-200 text-gray-800',
      student: 'bg-gray-200 text-gray-800'
    };
    return colors[role] || 'bg-gray-200 text-gray-800';
  };

  const getIcon = () => {
    if (data.type === 'ENTRY') {
      return (
        <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
        </div>
      );
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 shadow-md flex items-center gap-4">
      {/* Icon */}
      {getIcon()}

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-gray-200 font-semibold text-lg mb-2">{data.location}</h3>
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(data.type)}`}>
            {data.type}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(data.role)}`}>
            {data.role}
          </span>
          <div className="flex items-center gap-4 text-sm text-gray-200">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{data.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>{data.cameraId}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{data.detectedCount} detected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Count Badge */}
      <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center">
        <span className="text-gray-800 font-bold text-lg">{data.detectedCount}</span>
      </div>
    </div>
  );
}

export default AccessControlEventCard;
