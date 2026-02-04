import { useState } from 'react';
import SpaceUtilizationFilters from '../Component/Core/SpaceUtilization/SpaceUtilizationFilters';
import SpaceUtilizationSummaryCards from '../Component/Core/SpaceUtilization/SpaceUtilizationSummaryCards';
import ViewSelector from '../Component/Comman/ViewSelector';
import SpaceDetailPanel from '../Component/Core/SpaceUtilization/SpaceDetailPanel';

function SpaceUtilization() {
  const [selectedView, setSelectedView] = useState<'dashboard' | 'map'>('dashboard');

  return (
    <div className="space-y-6">
      <SpaceUtilizationFilters />
      <SpaceUtilizationSummaryCards />
      <ViewSelector value={selectedView} onChange={setSelectedView} />
      
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
