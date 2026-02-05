// Temporary: Using stub until packages are installed
// After running: npm install react-chartjs-2 chart.js
// Replace this import with: import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { Bar } from './chart-stubs';
import { useOverviewCleaningCompliance } from '../../../hooks/queries';
import type { CleaningCompliancePoint } from '../../../api/services/overview.service';

// Dummy data array - This structure matches API response format
const dummyCleaningData: CleaningCompliancePoint[] = [
  { zone: "Building A", score: 93 },
  { zone: "Building B", score: 88 },
  { zone: "Cafeteria", score: 91 },
  { zone: "Library", score: 96 },
  { zone: "Sports Complex", score: 85 }
];

function CleaningComplianceChart() {
  const { data, isLoading, isError } = useOverviewCleaningCompliance();
  const cleaningData: CleaningCompliancePoint[] = data ?? dummyCleaningData;
  const chartData = {
    labels: cleaningData.map(item => item.zone),
    datasets: [
      {
        label: 'Compliance Score',
        data: cleaningData.map(item => item.score),
        backgroundColor: 'rgba(34, 197, 94, 0.8)', // green-500
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 0,
        borderRadius: 4
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
        backgroundColor: 'rgba(31, 41, 55, 0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context: any) {
            return `Score: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
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
        beginAtZero: false,
        min: 75,
        max: 100,
        ticks: {
          stepSize: 7,
          color: '#9CA3AF',
          font: {
            size: 11
          },
          callback: function(value: any) {
            return value + '%';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
          borderDash: [5, 5]
        }
      }
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">Cleaning Compliance</h3>
          <p className="text-gray-400 text-sm">Zone-wise hygiene status</p>
        </div>
       <Link to="/cleaning-hygiene"> <a href="#" className="text-green-500 hover:text-green-400 text-sm font-medium flex items-center gap-1">
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
          <p className="text-sm text-red-400">
            Failed to load cleaning compliance data.
          </p>
        )}
        {!isLoading && !isError && <Bar data={chartData} options={options} />}
      </div>
    </div>
  );
}

export default CleaningComplianceChart;
