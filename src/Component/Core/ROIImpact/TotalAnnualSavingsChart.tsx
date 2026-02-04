// Interface matching API response structure
export interface AnnualSavingsDataPoint {
  category: string;
  value: number;
}

interface TotalAnnualSavingsChartProps {
  data?: AnnualSavingsDataPoint[];
  totalSavings?: string;
}

// Dummy data - This structure matches API response format
const dummySavingsData: AnnualSavingsDataPoint[] = [
  { category: 'Security Staffing', value: 35000 },
  { category: 'Cleaning Operations', value: 22000 },
  { category: 'Infrastructure', value: 45000 },
  { category: 'Incident Response', value: 15000 },
  { category: 'Staff Overtime', value: 12000 }
];

function TotalAnnualSavingsChart({ 
  data: _data = dummySavingsData,
  totalSavings = '$130K/year'
}: TotalAnnualSavingsChartProps) {
  // TODO: Replace with chart library implementation
  // This component is ready to be integrated with a chart library
  // The data structure is prepared and matches API response format
  // Data will be used when chart library is integrated

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-white text-lg font-semibold mb-6">Total Annual Savings</h2>
      <div className="h-80 flex items-center justify-center mb-4">
        <p className="text-gray-400">Bar chart will be implemented with chart library</p>
      </div>
      <div className="text-center">
        <span className="text-white">Total Savings: </span>
        <span className="text-green-500 font-bold text-xl">{totalSavings}</span>
      </div>
    </div>
  );
}

export default TotalAnnualSavingsChart;
