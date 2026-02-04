// Interface matching API response structure
export interface AccessQueryLogsData {
  sessionStarted?: string;
  queryCountToday?: number;
  lastAccessedBy?: string;
}

interface AccessQueryLogsProps {
  data?: AccessQueryLogsData;
}

function AccessQueryLogs({ 
  data = {
    sessionStarted: '12:00 PM',
    queryCountToday: 15,
    lastAccessedBy: 'Admin User'
  }
}: AccessQueryLogsProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-gray-200 text-base font-semibold">Access and query logs</h3>
      </div>

      {/* Content Fields */}
      <div className="space-y-3 mb-4">
        {/* Session Started */}
        <div>
          <label className="block text-gray-400 text-xs mb-1">This session started:</label>
          <div className="bg-white rounded-lg px-3 py-1.5 min-h-[32px] flex items-center">
            <span className="text-gray-800 text-sm">{data.sessionStarted || '—'}</span>
          </div>
        </div>

        {/* Query Count */}
        <div>
          <label className="block text-gray-400 text-xs mb-1">Query count (today):</label>
          <div className="bg-white rounded-lg px-3 py-1.5 min-h-[32px] flex items-center">
            <span className="text-gray-800 text-sm">{data.queryCountToday !== undefined ? data.queryCountToday.toString() : '—'}</span>
          </div>
        </div>

        {/* Last Accessed By */}
        <div>
          <label className="block text-gray-400 text-xs mb-1">Last accessed by:</label>
          <div className="bg-white rounded-lg px-3 py-1.5 min-h-[32px] flex items-center">
            <span className="text-gray-800 text-sm">{data.lastAccessedBy || '—'}</span>
          </div>
        </div>
      </div>

      {/* View Full Audit Log Button */}
      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors text-sm">
        View Full Audit Log
      </button>
    </div>
  );
}

export default AccessQueryLogs;
