import ReactECharts from 'echarts-for-react';

const DEFAULT_ACTUAL = [12, 22, 35, 48, 55, 52, 42, 28];
const DEFAULT_EXPECTED = [15, 25, 38, 45, 50, 48, 40, 25];
const TIME_LABELS = ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM'];

interface OccupancyOverTimeChartProps {
  title?: string;
  actual?: number[];
  expected?: number[];
  times?: string[];
}

function OccupancyOverTimeChart({
  title = 'Actual vs Expected occupancy over time',
  actual = DEFAULT_ACTUAL,
  expected = DEFAULT_EXPECTED,
  times = TIME_LABELS,
}: OccupancyOverTimeChartProps) {
  const option = {
    title: {
      text: title,
      left: 0,
      top: 0,
      textStyle: { color: '#E5E7EB', fontSize: 16, fontWeight: 500 },
    },
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: 'rgba(40, 40, 59, 0.95)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textStyle: { color: '#fff' },
      formatter: (params: unknown) => {
        const arr = Array.isArray(params) ? params : [];
        const time = (arr[0] as { name?: string })?.name ?? '';
        let lines = [time];
        (arr as { seriesName?: string; value?: number }[]).forEach((p) => {
          lines.push(`${p.seriesName ?? ''} : ${p.value ?? 0}`);
        });
        return lines.join('<br/>');
      },
    },
    legend: {
      data: ['Actual Occupancy', 'Expected Occupancy'],
      bottom: 0,
      textStyle: { color: '#B0B0B0', fontSize: 12 },
      itemGap: 24,
      itemWidth: 20,
      itemHeight: 10,
    },
    grid: {
      left: '8%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category' as const,
      boundaryGap: false,
      data: times,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#E5E7EB', fontSize: 11 },
      splitLine: {
        show: true,
        lineStyle: { color: 'rgba(255, 255, 255, 0.1)', type: 'dashed' as const },
      },
    },
    yAxis: {
      type: 'value' as const,
      min: 0,
      max: 60,
      interval: 15,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#E5E7EB', fontSize: 11 },
      splitLine: {
        show: true,
        lineStyle: { color: 'rgba(255, 255, 255, 0.1)', type: 'dashed' as const },
      },
    },
    series: [
      {
        name: 'Actual Occupancy',
        type: 'line' as const,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        data: actual,
        lineStyle: { color: '#3B82F6', width: 2 },
        itemStyle: { color: '#3B82F6', borderColor: '#fff', borderWidth: 1 },
        showSymbol: true,
      },
      {
        name: 'Expected Occupancy',
        type: 'line' as const,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        data: expected,
        lineStyle: { color: '#9CA3AF', width: 2, type: 'dashed' as const },
        itemStyle: { color: '#9CA3AF', borderColor: '#fff', borderWidth: 1 },
        showSymbol: true,
      },
    ],
  };

  return (
    <div className="bg-[#28283B] rounded-xl p-6 border border-white/[0.06]">
      <ReactECharts option={option} style={{ height: 300 }} opts={{ renderer: 'canvas' }} />
    </div>
  );
}

export default OccupancyOverTimeChart;
