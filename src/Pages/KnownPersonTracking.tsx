import { useState } from 'react';
import KnownPersonControlPanel from '../Component/Core/KnownPersonTracking/KnownPersonControlPanel';
import ViewSelector from '../Component/Comman/ViewSelector';
import KnownPersonSummaryCards from '../Component/Core/KnownPersonTracking/KnownPersonSummaryCards';
import DetectionEventsList from '../Component/Core/KnownPersonTracking/DetectionEventsList';
import TrackingAuthorizationStatus from '../Component/Core/KnownPersonTracking/TrackingAuthorizationStatus';
import AccessQueryLogs from '../Component/Core/KnownPersonTracking/AccessQueryLogs';
import TimeScrubber from '../Component/Core/KnownPersonTracking/TimeScrubber';
import CameraFilter from '../Component/Core/KnownPersonTracking/CameraFilter';
import DetectionSummary from '../Component/Core/KnownPersonTracking/DetectionSummary';

function KnownPersonTracking() {
  const [selectedView, setSelectedView] = useState<'dashboard' | 'map'>('dashboard');
  const [selectedPerson] = useState('Dr. Sarah Johnson');

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <KnownPersonControlPanel />
      
      {/* View Selector */}
      <ViewSelector value={selectedView} onChange={setSelectedView} />
      
      {/* Dashboard View Content */}
      {selectedView === 'dashboard' && (
        <>
          {/* Summary Cards */}
          <KnownPersonSummaryCards />
          
          {/* Detection Events and Status Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Detection Events List - Takes 2 columns */}
            <div className="lg:col-span-2">
              <DetectionEventsList personName={selectedPerson} />
            </div>

            {/* Status Cards - Takes 1 column */}
            <div className="space-y-6 ">
              <TrackingAuthorizationStatus />
              <AccessQueryLogs />
            </div>
          </div>
        </>
      )}

      {/* Map View Content */}
      {selectedView === 'map' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Time Scrubber */}
          <TimeScrubber />
          
          {/* Camera Filter */}
          <CameraFilter />
          
          {/* Detection Summary */}
          <DetectionSummary />
        </div>
      )}
    </div>
  );
}

export default KnownPersonTracking;
