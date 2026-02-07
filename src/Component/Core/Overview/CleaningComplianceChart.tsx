import { Link } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import { useOverviewCleaningCompliance } from '../../../hooks/queries';
import type { CleaningCompliancePoint } from '../../../api/services/overview.service';

const dummyCleaningData: CleaningCompliancePoint[] = [
  { zone: 'Building A', score: 93 },
  { zone: 'Building B', score: 88 },
  { zone: 'Cafeteria', score: 91 },
  { zone: 'Library', score: 96 },
  { zone: 'Sports Complex', score: 85 },
];

function CleaningComplianceChart() {
  const { data, isLoading, isError } = useOverviewCleaningCompliance();
  const cleaningData: CleaningCompliancePoint[] =
    data != null && !isError ? data : dummyCleaningData;

  const option = {
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: 'rgba(31, 41, 55, 0.95)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textStyle: { color: '#fff' },
      formatter: (params: unknown) => {
        const arr = Array.isArray(params) ? params : [];
        const first = arr[0] as { value?: number; data?: number } | undefined;
        const val = first?.value ?? first?.data ?? 0;
        return `Score: ${val}%`;
      },
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
      data: cleaningData.map((item) => item.zone),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#9CA3AF', fontSize: 11 },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value' as const,
      min: 75,
      max: 100,
      interval: 7,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#9CA3AF',
        fontSize: 11,
        formatter: (value: number) => value + '%',
      },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)', type: 'dashed' } },
    },
    series: [
      {
        name: 'Compliance Score',
        type: 'bar' as const,
        data: cleaningData.map((item) => item.score),
        itemStyle: {
          color: 'rgba(34, 197, 94, 0.85)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: '55%',
      },
    ],
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">Cleaning Compliance</h3>
          <p className="text-gray-400 text-sm">Zone-wise hygiene status</p>
        </div>
        <Link
          to="/cleaning-hygiene"
          className="text-green-500 hover:text-green-400 text-sm font-medium flex items-center gap-1"
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

export default CleaningComplianceChart;
