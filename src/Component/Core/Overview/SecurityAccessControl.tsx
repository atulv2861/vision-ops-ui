import { Link } from "react-router-dom";

// Interface matching API response structure
export interface SecurityAccessData {
  name: string;
  guardsPresent: number;
  guardsNeeded: number;
  status: 'covered' | 'low-coverage' | 'uncovered';
}

interface SecurityAccessControlProps {
  data?: SecurityAccessData[];
}

// Dummy data array - This structure matches API response format
const dummySecurityData: SecurityAccessData[] = [
  { name: "Main Gate", guardsPresent: 2, guardsNeeded: 2, status: "covered" },
  { name: "Building A Entrance", guardsPresent: 1, guardsNeeded: 1, status: "covered" },
  { name: "Building B Entrance", guardsPresent: 0, guardsNeeded: 1, status: "uncovered" },
  { name: "Cafeteria Entrance", guardsPresent: 1, guardsNeeded: 2, status: "low-coverage" },
  { name: "Sports Complex Entrance", guardsPresent: 1, guardsNeeded: 1, status: "covered" }
];

function SecurityAccessControl({ data = dummySecurityData }: SecurityAccessControlProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'covered':
        return { badge: 'bg-green-500', line: 'bg-green-500' };
      case 'low-coverage':
        return { badge: 'bg-orange-500', line: 'bg-orange-500' };
      case 'uncovered':
        return { badge: 'bg-red-500', line: 'bg-orange-500' };
      default:
        return { badge: 'bg-gray-500', line: 'bg-gray-500' };
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">Security & Access Control</h3>
          <p className="text-gray-400 text-sm">Gate coverage status</p>
        </div>
     <Link to="/access-control">   <a href="#" className="text-purple-500 hover:text-purple-400 text-sm font-medium flex items-center gap-1">
          View Details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a></Link>
      </div>
      <div className="space-y-4 mt-6">
        {data.map((gate, index) => {
          const colors = getStatusColor(gate.status);
          // Calculate coverage percentage
          const coveragePercentage = gate.guardsNeeded > 0 
            ? (gate.guardsPresent / gate.guardsNeeded) * 100 
            : 0;
          
          return (
            <div key={index} className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-white font-medium">{gate.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white text-sm">{gate.guardsPresent}/{gate.guardsNeeded} guards</span>
                  <span className={`${colors.badge} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                    {gate.status}
                  </span>
                </div>
              </div>
              {/* Progress border based on coverage */}
              <div className="w-full bg-gray-700 h-2 rounded-full">
                <div
                  className={`${colors.line} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${coveragePercentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SecurityAccessControl;
