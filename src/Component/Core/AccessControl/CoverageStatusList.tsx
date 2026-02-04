

// Interface matching API response structure
export interface CoverageStatusData {
  location: string;
  status: 'COVERED' | 'UNCOVERED' | 'LOW COVERAGE';
  guardsPresent: number;
  guardsNeeded: number;
}

interface CoverageStatusListProps {
  data?: CoverageStatusData[];
}

// Dummy data - This structure matches API response format
const dummyCoverageData: CoverageStatusData[] = [
  { location: 'Main Gate', status: 'COVERED', guardsPresent: 2, guardsNeeded: 2 },
  { location: 'North Gate', status: 'COVERED', guardsPresent: 1, guardsNeeded: 1 },
  { location: 'South Gate', status: 'UNCOVERED', guardsPresent: 0, guardsNeeded: 1 },
  { location: 'Library Entrance', status: 'LOW COVERAGE', guardsPresent: 1, guardsNeeded: 2 },
  { location: 'Admin Building', status: 'COVERED', guardsPresent: 1, guardsNeeded: 1 },
  { location: 'Student Center', status: 'COVERED', guardsPresent: 0, guardsNeeded: 0 },
  { location: 'Cafeteria Entrance', status: 'UNCOVERED', guardsPresent: 0, guardsNeeded: 1 }
];

function CoverageStatusList({ data = dummyCoverageData }: CoverageStatusListProps) {
  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string; bar: string }> = {
      'COVERED': { bg: 'bg-green-500', text: 'text-white', bar: 'bg-green-500' },
      'UNCOVERED': { bg: 'bg-red-500', text: 'text-white', bar: 'bg-red-500' },
      'LOW COVERAGE': { bg: 'bg-yellow-500', text: 'text-white', bar: 'bg-yellow-500' }
    };
    return colors[status] || { bg: 'bg-gray-500', text: 'text-white', bar: 'bg-gray-500' };
  };

  const getCoveragePercentage = (present: number, needed: number) => {
    if (needed === 0) return 100; // If no guards needed, consider it covered
    return Math.min((present / needed) * 100, 100);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-white text-lg font-semibold mb-4">Coverage Status</h2>
      <div className="space-y-6 p-2">
        {data.map((item, index) => {
          const colors = getStatusColor(item.status);
          const coveragePercentage = getCoveragePercentage(item.guardsPresent, item.guardsNeeded);

          return (
            <div key={index} className="flex items-center gap-4">
              {/* Location Pin Icon */}
              <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>

              {/* Status Badge */}
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} whitespace-nowrap`}>
                {item.status}
              </span>

              {/* Progress Bar */}
              <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full ${colors.bar} transition-all duration-300`}
                  style={{ width: `${coveragePercentage}%` }}
                />
              </div>

              {/* Guard Count */}
              <span className="text-gray-300 text-sm whitespace-nowrap">
                {item.guardsPresent}/{item.guardsNeeded} guards
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CoverageStatusList;
