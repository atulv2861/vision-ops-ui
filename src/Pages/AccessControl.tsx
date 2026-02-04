import { useState } from 'react';
import AccessControlFilters from '../Component/Core/AccessControl/AccessControlFilters';
import AccessControlSummaryCards from '../Component/Core/AccessControl/AccessControlSummaryCards';
import ViewSelector from '../Component/Comman/ViewSelector';
import HourlyTrafficChart from '../Component/Core/AccessControl/HourlyTrafficChart';
import AccessControlEventsList from '../Component/Core/AccessControl/AccessControlEventsList';
import CoverageStatusList from '../Component/Core/AccessControl/CoverageStatusList';
import CoverageStatusCards from '../Component/Core/AccessControl/CoverageStatusCards';

function AccessControl() {
  const [selectedView, setSelectedView] = useState<'dashboard' | 'map'>('dashboard');

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <AccessControlFilters />

      {/* Summary Cards */}
      <AccessControlSummaryCards />

      {/* View Selector */}
      <ViewSelector value={selectedView} onChange={setSelectedView} />

      {/* Dashboard View Content */}
      {selectedView === 'dashboard' && (
        <div className="space-y-6">
          {/* Hourly Traffic Chart */}
          <HourlyTrafficChart />

          {/* Events List and Coverage Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AccessControlEventsList />
            <CoverageStatusList />
          </div>

          {/* Coverage Status Cards Grid */}
          <CoverageStatusCards />
        </div>
      )}

      {/* Map View Content */}
      {selectedView === 'map' && (
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-gray-400 text-center">Map view coming soon...</p>
        </div>
      )}
    </div>
  );
}

export default AccessControl;
