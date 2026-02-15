import OverviewCards from '../Component/Core/Overview/OverviewCards';
import AIDetectedPatterns from '../Component/Core/Overview/AIDetectedPatterns';
import QuickNavigation from '../Component/Core/Overview/QuickNavigation';
import CampusTrafficChart from '../Component/Core/Overview/CampusTrafficChart';
import EventsByTypeChart from '../Component/Core/Overview/EventsByTypeChart';
import SpaceUtilizationList from '../Component/Core/Overview/SpaceUtilizationList';
import SecurityAccessControl from '../Component/Core/Overview/SecurityAccessControl';
import CleaningComplianceChart from '../Component/Core/Overview/CleaningComplianceChart';
import CameraNetworkStatus from '../Component/Core/Overview/CameraNetworkStatus';
import SystemStatusBanner from '../Component/Core/Overview/SystemStatusBanner';

function Overview() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[#1E2538] rounded-lg p-5 md:p-6">
        {/* AI-Powered Intelligence Badge */}
        <div className="flex items-center gap-2 mb-3">
          <svg 
            className="w-4 h-4 text-blue-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {/* Brain outline with convolutions */}
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 2C8 2 5 5 5 9c0 1.2.4 2.3 1 3.2-.6 1.1-1 2.4-1 3.8 0 3.5 2.5 6 6 6s6-2.5 6-6c0-1.4-.4-2.7-1-3.8.6-.9 1-2 1-3.2 0-4-3-7-7-7z" 
            />
            {/* Left hemisphere convolutions */}
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M8 7c-.5.3-1 .7-1.3 1.2M7.5 10c-.3.2-.5.5-.7.8M7.5 14c-.3-.2-.5-.5-.7-.8M8 17c-.5-.3-1-.7-1.3-1.2" 
            />
            {/* Right hemisphere convolutions */}
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M16 7c.5.3 1 .7 1.3 1.2M16.5 10c.3.2.5.5.7.8M16.5 14c.3-.2.5-.5.7-.8M16 17c.5-.3 1-.7 1.3-1.2" 
            />
            {/* Neural pathways/connections */}
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 9.5c.2.3.4.6.5 1M9 14.5c.2-.3.4-.6.5-1M15 9.5c-.2.3-.4.6-.5 1M15 14.5c-.2-.3-.4-.6-.5-1" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M10.5 11.5c.3.2.6.3 1 .3s.7-.1 1-.3" 
            />
          </svg>
          <span className="text-blue-400 text-xs font-normal uppercase tracking-wide">
            AI-POWERED INTELLIGENCE
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Campus Command Center
        </h1>

        {/* Features Subtitle */}
        <p className="text-gray-300 text-sm md:text-base">
          Vision-Based Analytics • Real-Time Monitoring • Privacy-First
        </p>
      </div>

      {/* Overview Cards */}
      <OverviewCards />

      {/* AI Detected Patterns and Quick Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <AIDetectedPatterns />
        <QuickNavigation />
      </div>

      {/* Charts Section - Campus Traffic and Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <CampusTrafficChart />
        <EventsByTypeChart />
      </div>

      {/* Space Utilization and Security Access Control */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <SpaceUtilizationList />
        <SecurityAccessControl />
      </div>

      {/* Cleaning Compliance and Camera Network Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <CleaningComplianceChart />
        <CameraNetworkStatus />
      </div>

      {/* System Status Banner */}
      <div className="mt-6">
        <SystemStatusBanner />
      </div>
    </div>
  );
}

export default Overview;
