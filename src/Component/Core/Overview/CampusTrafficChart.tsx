import { Link } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import { useOverviewCampusTraffic } from '../../../hooks/queries';
import type { CampusTrafficPoint } from '../../../api/services/overview.service';

const dummyTrafficData: CampusTrafficPoint[] = [
  { time: '6AM', primary: 200, secondary: 50 },
  { time: '7AM', primary: 400, secondary: 80 },
  { time: '8AM', primary: 800, secondary: 120 },
  { time: '9AM', primary: 1200, secondary: 150 },
  { time: '10AM', primary: 1400, secondary: 180 },
  { time: '11AM', primary: 1500, secondary: 200 },
  { time: '12PM', primary: 1450, secondary: 190 },
  { time: '1PM', primary: 1350, secondary: 170 },
  { time: '2PM', primary: 1100, secondary: 140 },
  { time: '3PM', primary: 900, secondary: 110 },
  { time: '4PM', primary: 600, secondary: 80 },
];

function CampusTrafficChart() {
  const { data, isLoading, isError } = useOverviewCampusTraffic();
  const trafficData: CampusTrafficPoint[] =
    data != null && !isError ? data : dummyTrafficData;

  const option = {
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: 'rgba(31, 41, 55, 0.95)',
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
      max: 1600,
      interval: 400,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#9CA3AF', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } },
    },
    series: [
      {
        name: 'Primary Traffic',
        type: 'line' as const,
        smooth: true,
        data: trafficData.map((item) => item.primary),
        lineStyle: { color: 'rgb(251, 146, 60)' },
        areaStyle: { color: 'rgba(251, 146, 60, 0.2)' },
        showSymbol: false,
      },
      {
        name: 'Secondary Traffic',
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
    <div className="bg-gray-800 rounded-lg p-6">
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
          <div className="h-full w-full bg-gray-700/60 rounded-lg animate-pulse" />
        )}
        {!isLoading && (
          <>
            {isError && (
              <p className="text-xs text-amber-400 mb-2">Showing sample data (API unavailable).</p>
            )}
            <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
          </>
        )}
      </div>
    </div>
  );
}

export default CampusTrafficChart;
