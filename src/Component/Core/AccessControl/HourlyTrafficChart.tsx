// Interface matching API response structure
export interface HourlyTrafficDataPoint {
  time: string;
  entries: number;
  exits: number;
}

interface HourlyTrafficChartProps {
  data?: HourlyTrafficDataPoint[];
}

// Dummy data - This structure matches API response format
const dummyTrafficData: HourlyTrafficDataPoint[] = [
  { time: '6AM', entries: 50, exits: 20 },
  { time: '7AM', entries: 120, exits: 40 },
  { time: '8AM', entries: 280, exits: 60 },
  { time: '9AM', entries: 220, exits: 80 },
  { time: '10AM', entries: 180, exits: 100 },
  { time: '11AM', entries: 150, exits: 110 },
  { time: '12PM', entries: 140, exits: 120 },
  { time: '1PM', entries: 130, exits: 115 },
  { time: '2PM', entries: 120, exits: 125 },
  { time: '3PM', entries: 100, exits: 180 },
  { time: '4PM', entries: 80, exits: 260 }
];

function HourlyTrafficChart({ data: _data = dummyTrafficData }: HourlyTrafficChartProps) {
  // TODO: Replace with chart library implementation
  // This component is ready to be integrated with a chart library
  // The data structure is prepared and matches API response format
  // Data will be used when chart library is integrated

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-white text-xl font-semibold mb-6 text-center">
        Hourly traffic patterns across all gates and spaces
      </h2>
      <div className="h-80 flex items-center justify-center">
        <p className="text-gray-400">Chart will be implemented with chart library</p>
      </div>
    </div>
  );
}

export default HourlyTrafficChart;
