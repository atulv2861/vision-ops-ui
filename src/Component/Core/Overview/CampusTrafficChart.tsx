import { Link } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import { useAppContext } from '../../../Context/AppContext';
import { useOverviewCampusTraffic } from '../../../hooks/queries';
import type { CampusTrafficPoint } from '../../../api/services/overview.service';

function CampusTrafficChart() {
  const { globalFilterData } = useAppContext();
  const { data, isLoading, isError } = useOverviewCampusTraffic(globalFilterData);
  const trafficData: CampusTrafficPoint[] = data ?? [];

  const option = {
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: 'rgba(40, 40, 59, 0.95)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textStyle: { color: '#fff' },
    },
    legend: {
      show: false,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '8%',
      containLabel: true,
    },
    xAxis: {
      type: 'category' as const,
      boundaryGap: false,
      data: trafficData.map((item) => item.time),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#9CA3AF', fontSize: 11 },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value' as const,
      min: 0,
      max: trafficData.length
        ? Math.max(50, Math.ceil((Math.max(...trafficData.map((d) => d.primary), ...trafficData.map((d) => d.secondary)) * 1.2) / 10) * 10)
        : 50,
      interval: undefined,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#9CA3AF', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } },
    },
    series: [
      {
        name: 'Students',
        type: 'line' as const,
        smooth: true,
        data: trafficData.map((item) => item.primary),
        lineStyle: { color: 'rgb(251, 146, 60)' },
        areaStyle: { color: 'rgba(251, 146, 60, 0.2)' },
        showSymbol: false,
      },
      {
        name: 'Staff',
        type: 'line' as const,
        smooth: true,
        data: trafficData.map((item) => item.secondary),
        lineStyle: { color: 'rgb(168, 85, 247)' },
        areaStyle: { color: 'rgba(168, 85, 247, 0.2)' },
        showSymbol: false,
      },
    ],
  };

  return (
    <div className="bg-[#28283B] rounded-xl p-6 border border-white/[0.06]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">Campus Traffic Today</h3>
          <p className="text-gray-400 text-sm">Students, staff, and entry patterns</p>
        </div>
        <Link
          to="/student-distribution"
          className="text-blue-500 hover:text-blue-400 text-sm font-medium flex items-center gap-1"
        >
          View Details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      <div className="h-64 mt-4">
        {isLoading && (
          <div className="h-full w-full bg-white/[0.04] rounded-xl animate-pulse" />
        )}
        {!isLoading && isError && (
          <p className="text-sm text-red-400">Failed to load campus traffic.</p>
        )}
        {!isLoading && !isError && trafficData.length > 0 && (
          <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
        )}
        {!isLoading && !isError && trafficData.length === 0 && (
          <p className="text-sm text-gray-400">No traffic data available.</p>
        )}
      </div>
    </div>
  );
}

export default CampusTrafficChart;
