import ReactECharts from 'echarts-for-react';

/** Single time point for aggregate presence (e.g. 8AM -> 10). */
export interface PresencePoint {
  time: string;
  value: number;
}

const DEFAULT_TITLE = 'Aggregate presence across all cameras at Building A';

const DEFAULT_DATA: PresencePoint[] = [
  { time: '8AM', value: 10 },
  { time: '9AM', value: 28 },
  { time: '10AM', value: 42 },
  { time: '11AM', value: 48 },
  { time: '12PM', value: 45 },
  { time: '1PM', value: 38 },
  { time: '2PM', value: 34 },
  { time: '3PM', value: 29 },
  { time: '4PM', value: 20 },
  { time: '5PM', value: 10 },
];

interface AggregatePresenceChartProps {
  title?: string;
  data?: PresencePoint[];
}

function AggregatePresenceChart({
  title = DEFAULT_TITLE,
  data = DEFAULT_DATA,
}: AggregatePresenceChartProps) {
  const xLabels = data.map((d) => d.time);
  const values = data.map((d) => d.value);

  const option = {
    title: {
      text: title,
      left: 0,
      top: 0,
      textStyle: {
        color: '#E5E7EB',
        fontSize: 16,
        fontWeight: 500,
      },
    },
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: 'rgba(40, 40, 59, 0.95)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textStyle: { color: '#fff' },
      formatter: (params: unknown) => {
        const arr = Array.isArray(params) ? params : [];
        const item = arr[0] as { name?: string; value?: unknown } | undefined;
        const val = typeof item?.value === 'number' ? item.value : 0;
        return `${item?.name ?? ''}: ${val}`;
      },
    },
    grid: {
      left: '8%',
      right: '4%',
      bottom: '12%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category' as const,
      boundaryGap: false,
      data: xLabels,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#E5E7EB',
        fontSize: 11,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)',
          type: 'dotted' as const,
        },
      },
    },
    yAxis: {
      type: 'value' as const,
      min: 0,
      max: 60,
      interval: 15,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#E5E7EB',
        fontSize: 11,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)',
          type: 'dotted' as const,
        },
      },
    },
    series: [
      {
        name: 'Presence',
        type: 'line' as const,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        data: values,
        lineStyle: {
          color: '#F59E0B',
          width: 2,
        },
        itemStyle: {
          color: '#F59E0B',
          borderWidth: 0,
        },
        showSymbol: true,
      },
    ],
  };

  return (
    <div className="bg-[#28283B] rounded-xl p-6 border border-white/[0.06]">
      <ReactECharts
        option={option}
        style={{ height: 320 }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
}

export default AggregatePresenceChart;
