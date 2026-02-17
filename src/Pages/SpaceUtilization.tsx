import { useState } from 'react';
import SpaceUtilizationFilters from '../Component/Core/SpaceUtilization/SpaceUtilizationFilters';
import SpaceUtilizationSummaryCards from '../Component/Core/SpaceUtilization/SpaceUtilizationSummaryCards';
import ViewSelector from '../Component/Comman/ViewSelector';
import SpaceDetailPanel from '../Component/Core/SpaceUtilization/SpaceDetailPanel';
import OccupancyOverTimeChart from '../Component/Core/Overview/OccupancyOverTimeChart';
import SpaceUtilizationBarChart from '../Component/Core/Overview/SpaceUtilizationBarChart';

function SpaceUtilization() {
  const [selectedView, setSelectedView] = useState<'dashboard' | 'map'>('dashboard');

  return (
    <div className="space-y-6">
      <SpaceUtilizationFilters />
      <SpaceUtilizationSummaryCards />
      <ViewSelector value={selectedView} onChange={setSelectedView} />

      {/* Dashboard View – Actual vs Expected & Utilization by space (stacked vertically) */}
      {selectedView === 'dashboard' && (
        <div className="flex flex-col gap-6">
          <OccupancyOverTimeChart />
          <SpaceUtilizationBarChart />
        </div>
      )}

      {/* Map View Content */}
      {selectedView === 'map' && (
        <div className="max-w-4xl mx-auto">
          <SpaceDetailPanel />
        </div>
      )}
    </div>
  );
}

export default SpaceUtilization;
