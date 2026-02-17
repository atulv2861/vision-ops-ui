import { Link } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import { useOverviewSpaceUtilization } from "../../../hooks/queries";
import type { SpaceUtilizationPoint } from "../../../api/services/overview.service";

function getOccupancyStyle(percentage: number): { pill: string; bar: string } {
  if (percentage >= 80) return { pill: "bg-emerald-500 text-white", bar: "bg-emerald-500" };
  if (percentage >= 30) return { pill: "bg-amber-500 text-white", bar: "bg-amber-500" };
  return { pill: "bg-red-500 text-white", bar: "bg-red-500" };
}

function SpaceUtilizationList() {
  const { globalFilterData } = useAppContext();
  const { data, isLoading, isError } = useOverviewSpaceUtilization(globalFilterData);
  const spaceData: SpaceUtilizationPoint[] = data ?? [];

  return (
    <div className="bg-[#28283B] rounded-xl p-6 border border-white/[0.06]">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">
            Space Utilization Overview
          </h3>
          <p className="text-[#B0B0B0] text-sm">Top 5 spaces by occupancy</p>
        </div>
        <Link
          to="/space-utilization"
          className="text-[#6B5BFF] hover:text-[#8B7BFF] text-sm font-medium flex items-center gap-1 shrink-0"
        >
          View All
          <span className="ml-0.5">&gt;</span>
        </Link>
      </div>
      <div className="space-y-5 mt-6">
        {isLoading && (
          <div className="space-y-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-14 bg-white/[0.04] rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {isError && !isLoading && (
          <p className="text-sm text-red-400">Failed to load space utilization.</p>
        )}

        {!isLoading &&
          !isError &&
          spaceData.map((space, index) => {
            const { pill, bar } = getOccupancyStyle(space.percentage);
            return (
              <div key={space.id ?? index} className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-white font-semibold text-sm">
                      {space.name}
                      <span className="text-[#B0B0B0] font-normal text-xs ml-1">
                        ({space.type})
                      </span>
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-white text-sm">
                      {space.occupancy}/{space.capacity}
                    </span>
                    <span
                      className={`${pill} text-xs font-medium px-2.5 py-1 rounded-lg`}
                    >
                      {space.percentage}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-white/[0.12] rounded-full h-2">
                  <div
                    className={`${bar} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${Math.min(100, space.percentage)}%` }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SpaceUtilizationList;
