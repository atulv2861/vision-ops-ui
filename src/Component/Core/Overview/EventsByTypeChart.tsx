// Temporary: Using stub until packages are installed
// After running: npm install react-chartjs-2 chart.js
// Replace this import with: import { Bar } from 'react-chartjs-2';
import { Bar } from './chart-stubs';
import { Link } from 'react-router-dom';
// Interface matching API response structure
export interface EventTypeData {
  type: string;
  count: number;
}

interface EventsByTypeChartProps {
  data?: EventTypeData[];
}

// Dummy data array - This structure matches API response format
const dummyEventsData: EventTypeData[] = [
  { type: "Running", count: 28 },
  { type: "Crowd Gathering", count: 17 },
  { type: "Overcrowding", count: 11 },
  { type: "Loitering", count: 8 },
  { type: "Unauthorized Access", count: 5 }
];

function EventsByTypeChart({ data = dummyEventsData }: EventsByTypeChartProps) {
  const chartData = {
    labels: data.map(item => item.type),
    datasets: [
      {
        label: 'Events',
        data: data.map(item => item.count),
        backgroundColor: 'rgba(55, 65, 81, 0.8)', // gray-700
        borderColor: 'rgba(75, 85, 99, 1)', // gray-600
        borderWidth: 1,
        borderRadius: 4
      }
    ]
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 28,
        ticks: {
          stepSize: 7,
          color: '#9CA3AF',
          font: {
            size: 11
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false
        }
      },
      y: {
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 11
          }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">Events by Type</h3>
          <p className="text-gray-400 text-sm">Detected activities today</p>
        </div>
       <Link to="/events"> <a href="#" className="text-blue-500 hover:text-blue-400 text-sm font-medium flex items-center gap-1">
          View All
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a></Link>
      </div>
      <div className="h-64 mt-4">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default EventsByTypeChart;
