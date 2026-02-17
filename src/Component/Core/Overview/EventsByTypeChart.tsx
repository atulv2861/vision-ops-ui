import ReactECharts from 'echarts-for-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../../Context/AppContext';
import { useOverviewEventsByType } from '../../../hooks/queries';
import type { EventsByTypePoint } from '../../../api/services/overview.service';

const dummyEventsData: EventsByTypePoint[] = [
  { type: 'Running', count: 28 },
  { type: 'Crowd Gathering', count: 17 },
  { type: 'Overcrowding', count: 11 },
  { type: 'Loitering', count: 8 },
  { type: 'Unauthorized Access', count: 5 },
];

function EventsByTypeChart() {
  const { globalFilterData } = useAppContext();
  const { data, isLoading, isError } = useOverviewEventsByType(globalFilterData);
  const eventsData: EventsByTypePoint[] =
    data != null && !isError ? data : dummyEventsData;

  const option = {
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: 'rgba(40, 40, 59, 0.95)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textStyle: { color: '#fff' },
    },
    grid: {
      left: '15%',
      right: '8%',
      bottom: '3%',
      top: '5%',
      containLabel: true,
    },
    xAxis: {
      type: 'value' as const,
      min: 0,
      max: 28,
      interval: 7,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#9CA3AF', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } },
    },
    yAxis: {
      type: 'category' as const,
      data: eventsData.map((item) => item.type),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#9CA3AF', fontSize: 11 },
      inverse: true,
    },
    series: [
      {
        name: 'Events',
        type: 'bar' as const,
        data: eventsData.map((item) => item.count),
        itemStyle: {
          color: 'rgba(55, 65, 81, 0.9)',
          borderColor: 'rgba(75, 85, 99, 1)',
          borderWidth: 1,
        },
        barWidth: '60%',
        barMaxWidth: 24,
      },
    ],
  };

  return (
    <div className="bg-[#28283B] rounded-xl p-6 border border-white/[0.06]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">Events by Type</h3>
          <p className="text-gray-400 text-sm">Detected activities today</p>
        </div>
        <Link
          to="/events"
          className="text-blue-500 hover:text-blue-400 text-sm font-medium flex items-center gap-1"
        >
          View All
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      <div className="h-64 mt-4">
        {isLoading && (
          <div className="h-full w-full bg-white/[0.04] rounded-xl animate-pulse" />
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

export default EventsByTypeChart;
