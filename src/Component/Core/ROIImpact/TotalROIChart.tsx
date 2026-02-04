// Interface matching API response structure
export interface ROIDataPoint {
  label: string;
  value: number;
  color: string;
}

interface TotalROIChartProps {
  data?: ROIDataPoint[];
  totalROI?: string;
}

// Dummy data - This structure matches API response format
const dummyROIData: ROIDataPoint[] = [
  { label: 'Student Distribution', value: 35000, color: 'orange' },
  { label: 'Tracking', value: 35000, color: 'blue' },
  { label: 'Asset Analytics', value: 28000, color: 'red' },
  { label: 'Staff Presence', value: 22000, color: 'purple' },
  { label: 'Cleaning Optimization', value: 33000, color: 'green' }
];

function TotalROIChart({ 
  data: _data = dummyROIData,
  totalROI = '$153K/year'
}: TotalROIChartProps) {
  // TODO: Replace with chart library implementation
  // This component is ready to be integrated with a chart library
  // The data structure is prepared and matches API response format
  // Data will be used when chart library is integrated

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-white text-lg font-semibold mb-6">Total ROI</h2>
      <div className="h-80 flex items-center justify-center mb-4">
        <p className="text-gray-400">Pie chart will be implemented with chart library</p>
      </div>
      <div className="text-center">
        <span className="text-white">Total ROI: </span>
        <span className="text-blue-500 font-bold text-xl">{totalROI}</span>
      </div>
    </div>
  );
}

export default TotalROIChart;
