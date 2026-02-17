import ReactECharts from 'echarts-for-react';

const DEFAULT_LOCATIONS = [
  'Classroom A101',
  'Classroom A102',
  'Building A - Main Corridor',
  'Main Cafeteria',
  'Library Reading Area',
  'Computer Lab B',
  'Main Playground',
  'Building B - Main Corridor',
];
const DEFAULT_VALUES = [95, 50, 65, 67, 70, 80, 25, 50];

interface SpaceUtilizationBarChartProps {
  title?: string;
  locations?: string[];
  values?: number[];
}

function SpaceUtilizationBarChart({
  title = 'Utilization by space',
  locations = DEFAULT_LOCATIONS,
  values = DEFAULT_VALUES,
}: SpaceUtilizationBarChartProps) {
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
        const first = arr[0] as { name?: string; value?: number };
        return `${first?.name ?? ''}: ${first?.value ?? 0}%`;
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '8%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category' as const,
      data: locations,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#E5E7EB',
        fontSize: 10,
        rotate: 35,
        interval: 0,
      },
      splitLine: {
        show: true,
        lineStyle: { color: 'rgba(255, 255, 255, 0.1)', type: 'dashed' as const },
      },
    },
    yAxis: {
      type: 'value' as const,
      min: 0,
      max: 100,
      interval: 25,
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
        name: 'Utilization %',
        type: 'bar' as const,
        data: values,
        barWidth: '50%',
        itemStyle: {
          color: '#3B82F6',
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  return (
    <div className="bg-[#28283B] rounded-xl px-6 pt-6 pb-1 border border-white/[0.06]">
      <ReactECharts option={option} style={{ height: 480 }} opts={{ renderer: 'canvas' }} />
    </div>
  );
}

export default SpaceUtilizationBarChart;
