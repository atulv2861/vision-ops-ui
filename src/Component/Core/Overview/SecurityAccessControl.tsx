import { Link } from "react-router-dom";
import { useOverviewSecurityAccess } from "../../../hooks/queries";
import type { SecurityAccessPoint } from "../../../api/services/overview.service";

function SecurityAccessControl() {
  const { data, isLoading, isError } = useOverviewSecurityAccess();
  const securityData: SecurityAccessPoint[] = data ?? [];
  return (
    <div className="bg-[#28283B] rounded-xl p-6 border border-white/[0.06]">
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
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-12 bg-white/[0.04] rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {isError && !isLoading && (
          <p className="text-sm text-red-400">Failed to load security access.</p>
        )}

        {!isLoading && !isError && securityData.map((gate, index) => {
          const coveragePercentage = gate.guardsNeeded > 0 
            ? (gate.guardsPresent / gate.guardsNeeded) * 100 
            : 0;
          
          return (
            <div key={gate.id ?? index} className="space-y-6">
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
                  <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {gate.status}
                  </span>
                </div>
              </div>
              <div className="w-full bg-white/[0.08] h-2 rounded-full">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
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
