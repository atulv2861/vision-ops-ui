import { Link } from "react-router-dom";
import { useOverviewSecurityAccess } from "../../../hooks/queries";
import type { SecurityAccessPoint } from "../../../api/services/overview.service";

function getStatusStyle(
  status: string
): { pill: string; bar: string } {
  const s = status.toLowerCase();
  if (s === "covered") return { pill: "bg-emerald-500 text-white", bar: "bg-emerald-500" };
  if (s === "low-coverage") return { pill: "bg-amber-500 text-white", bar: "bg-amber-500" };
  return { pill: "bg-red-500 text-white", bar: "bg-red-500" };
}

function SecurityAccessControl() {
  const { data, isLoading, isError } = useOverviewSecurityAccess();
  const securityData: SecurityAccessPoint[] = data ?? [];

  return (
    <div className="bg-[#28283B] rounded-xl p-6 border border-white/[0.06]">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">
            Security & Access Control
          </h3>
          <p className="text-[#B0B0B0] text-sm">Gate coverage status</p>
        </div>
        <Link
          to="/access-control"
          className="text-[#6B5BFF] hover:text-[#8B7BFF] text-sm font-medium flex items-center gap-1 shrink-0"
        >
          View Details
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
          <p className="text-sm text-red-400">Failed to load security access.</p>
        )}

        {!isLoading &&
          !isError &&
          securityData.map((gate, index) => {
            const coveragePercentage =
              gate.guardsNeeded > 0
                ? (gate.guardsPresent / gate.guardsNeeded) * 100
                : 0;
            const { pill, bar } = getStatusStyle(gate.status);
            const statusLabel =
              gate.status.charAt(0).toUpperCase() +
              gate.status.slice(1).replace(/-/g, " ");

            return (
              <div key={gate.id ?? index} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-[#B0B0B0] shrink-0"
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
                    <span className="text-white font-medium text-sm">
                      {gate.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-white text-sm">
                      {gate.guardsPresent}/{gate.guardsNeeded} guards
                    </span>
                    <span
                      className={`${pill} text-xs font-medium px-2.5 py-1 rounded-lg capitalize`}
                    >
                      {statusLabel}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-white/[0.12] h-2 rounded-full">
                  <div
                    className={`${bar} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${Math.min(100, coveragePercentage)}%` }}
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
