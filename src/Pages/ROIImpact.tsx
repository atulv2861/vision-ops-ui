import { useState } from 'react';
import ROIImpactHeaderSection from '../Component/Core/ROIImpact/ROIImpactHeaderSection';
import ROIImpactDetailCards from '../Component/Core/ROIImpact/ROIImpactDetailCards';
import ROIImpactSections from '../Component/Core/ROIImpact/ROIImpactSections';
import TotalAnnualSavingsChart from '../Component/Core/ROIImpact/TotalAnnualSavingsChart';
import TotalROIChart from '../Component/Core/ROIImpact/TotalROIChart';
import BeforeAfterMetrics from '../Component/Core/ROIImpact/BeforeAfterMetrics';
import PrivacyInfoCard from '../Component/Core/ROIImpact/PrivacyInfoCard';
import OverlaySelector from '../Component/Core/ROIImpact/OverlaySelector';
import ROIZonesTable from '../Component/Core/ROIImpact/ROIZonesTable';
import ViewSelector from '../Component/Comman/ViewSelector';

function ROIImpact() {
  const [selectedView, setSelectedView] = useState<'dashboard' | 'map'>('dashboard');

  return (
    <div className="space-y-6">
      {/* Main Gradient Container */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8">
        <ROIImpactHeaderSection />
      </div>

      {/* View Selector */}
      <div className="flex justify-start">
        <ViewSelector value={selectedView} onChange={setSelectedView} />
      </div>

      {/* Dashboard View Content */}
      {selectedView === 'dashboard' && (
        <div className="space-y-6">
          <ROIImpactDetailCards />
          <ROIImpactSections />
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TotalAnnualSavingsChart />
            <TotalROIChart />
          </div>

          {/* Before/After Metrics */}
          <BeforeAfterMetrics />

          {/* Privacy Info Card */}
          <PrivacyInfoCard />
        </div>
      )}

      {/* Map View Content */}
      {selectedView === 'map' && (
        <div className="space-y-6">
          <OverlaySelector />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Visualization */}
            <div className="lg:col-span-3 bg-gray-800 rounded-lg p-6 h-96">
              <p className="text-gray-400 text-center">Map visualization will be implemented here</p>
            </div>
            
            {/* ROI Zones Table */}
            <div className="lg:col-span-3">
              <ROIZonesTable />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ROIImpact;
