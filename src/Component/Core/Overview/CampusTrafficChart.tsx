// Temporary: Using stub until packages are installed
// After running: npm install react-chartjs-2 chart.js
// Replace this import with: import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { Line } from './chart-stubs';
import { useOverviewCampusTraffic } from '../../../hooks/queries';
import type { CampusTrafficPoint } from '../../../api/services/overview.service';

// Dummy data array - This structure matches API response format
const dummyTrafficData: CampusTrafficPoint[] = [
  { time: "6AM", primary: 200, secondary: 50 },
  { time: "7AM", primary: 400, secondary: 80 },
  { time: "8AM", primary: 800, secondary: 120 },
  { time: "9AM", primary: 1200, secondary: 150 },
  { time: "10AM", primary: 1400, secondary: 180 },
  { time: "11AM", primary: 1500, secondary: 200 },
  { time: "12PM", primary: 1450, secondary: 190 },
  { time: "1PM", primary: 1350, secondary: 170 },
  { time: "2PM", primary: 1100, secondary: 140 },
  { time: "3PM", primary: 900, secondary: 110 },
  { time: "4PM", primary: 600, secondary: 80 }
];

function CampusTrafficChart() {
  const { data, isLoading, isError } = useOverviewCampusTraffic();
  const trafficData: CampusTrafficPoint[] = data ?? dummyTrafficData;

  const chartData = {
    labels: trafficData.map(item => item.time),
    datasets: [
      {
        label: 'Primary Traffic',
        data: trafficData.map(item => item.primary),
        borderColor: 'rgb(251, 146, 60)', // orange-500
        backgroundColor: 'rgba(251, 146, 60, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4
      },
      {
        label: 'Secondary Traffic',
        data: trafficData.map(item => item.secondary),
        borderColor: 'rgb(168, 85, 247)', // purple-500
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
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
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 11
          }
        }
      },
      y: {
        beginAtZero: true,
        max: 1600,
        ticks: {
          stepSize: 400,
          color: '#9CA3AF',
          font: {
            size: 11
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false
        }
      }
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">Campus Traffic Today</h3>
          <p className="text-gray-400 text-sm">Students, staff, and entry patterns</p>
        </div>
       <Link to="/student-distribution"> <a href="#" className="text-blue-500 hover:text-blue-400 text-sm font-medium flex items-center gap-1">
          View Details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a></Link>
      </div>
      <div className="h-64 mt-4">
        {isLoading && (
          <div className="h-full w-full bg-gray-700/60 rounded-lg animate-pulse" />
        )}
        {isError && !isLoading && (
          <p className="text-sm text-red-400">Failed to load campus traffic.</p>
        )}
        {!isLoading && !isError && <Line data={chartData} options={options} />}
      </div>
    </div>
  );
}

export default CampusTrafficChart;
