import { Link } from "react-router-dom";
import { useOverviewSpaceUtilization } from "../../../hooks/queries";
import type { SpaceUtilizationPoint } from "../../../api/services/overview.service";

function SpaceUtilizationList() {
  const { data, isLoading, isError } = useOverviewSpaceUtilization();
  const spaceData: SpaceUtilizationPoint[] = data ?? [];
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">Space Utilization Overview</h3>
          <p className="text-gray-400 text-sm">Top 5 spaces by occupancy</p>
        </div>
      <Link to="/space-utilization">  <a href="#" className="text-blue-500 hover:text-blue-400 text-sm font-medium flex items-center gap-1">
          View All
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
                className="h-12 bg-gray-700/60 rounded-lg animate-pulse"
              />
            ))}
          </div>
        )}

        {isError && !isLoading && (
          <p className="text-sm text-red-400">Failed to load space utilization.</p>
        )}

        {!isLoading && !isError && spaceData.map((space, index) => (
          <div key={space.id ?? index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold">{space.name}</h4>
                <p className="text-gray-400 text-xs">({space.type})</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white text-sm">{space.occupancy}/{space.capacity}</span>
                <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {space.percentage}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${space.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpaceUtilizationList;
