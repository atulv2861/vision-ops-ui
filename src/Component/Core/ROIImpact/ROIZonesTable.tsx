// Interface matching API response structure
export interface ROIZoneData {
  zone: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  value: string;
  month: number;
  cameras: number;
}

interface ROIZonesTableProps {
  data?: ROIZoneData[];
  total?: {
    value: string;
    month: number;
    cameras: number;
  };
}

// Dummy data - This structure matches API response format
const defaultZonesData: ROIZoneData[] = [
  { zone: 'Zone A', priority: 'HIGH', value: '$32.4K', month: 412, cameras: 4 },
  { zone: 'Zone B', priority: 'MEDIUM', value: '$28.6K', month: 387, cameras: 3 },
  { zone: 'Zone C', priority: 'HIGH', value: '$22.1K', month: 298, cameras: 3 },
  { zone: 'Zone D', priority: 'MEDIUM', value: '$18.5K', month: 245, cameras: 2 },
  { zone: 'Zone E', priority: 'LOW', value: '$15.8K', month: 156, cameras: 3 },
  { zone: 'Zone F', priority: 'LOW', value: '$14.2K', month: 134, cameras: 2 },
  { zone: 'Zone G', priority: 'LOW', value: '$12.3K', month: 98, cameras: 3 }
];

const defaultTotal = {
  value: '$143.9K',
  month: 1730,
  cameras: 20
};

// Priority tag styling
const getPriorityStyles = (priority: 'HIGH' | 'MEDIUM' | 'LOW') => {
  const styles = {
    HIGH: 'bg-green-400 text-white',
    MEDIUM: 'bg-blue-400 text-white',
    LOW: 'bg-gray-600 text-white'
  };
  return styles[priority];
};

function ROIZonesTable({ data = defaultZonesData, total = defaultTotal }: ROIZonesTableProps) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-gray-700">
          {/* Header Row */}
          <div className="px-5 py-3 flex items-center bg-gray-800/50 border-b border-gray-700">
            <div className="flex-shrink-0 w-24">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Zone</span>
            </div>
            <div className="flex-shrink-0 w-24">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">ROI Level</span>
            </div>
            <div className="flex-1 min-w-[100px]">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Savings</span>
            </div>
            <div className="flex-shrink-0 w-20 text-right">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Month</span>
            </div>
            <div className="flex-shrink-0 w-16 text-right mr-2">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Cameras</span>
            </div>
          </div>

          {/* Data Rows */}
          {data.map((zone, index) => (
            <div key={index} className="px-5 py-3.5 flex items-center hover:bg-gray-800/30 transition-colors">
              {/* Zone Name */}
              <div className="flex-shrink-0 w-24">
                <span className="text-gray-300 text-sm">{zone.zone}</span>
              </div>

              {/* Priority Tag */}
              <div className="flex-shrink-0 w-24">
                <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${getPriorityStyles(zone.priority)}`}>
                  {zone.priority}
                </span>
              </div>

              {/* Monetary Value */}
              <div className="flex-1 min-w-[100px]">
                <span className="text-green-400 font-semibold">{zone.value}</span>
              </div>

              {/* Month */}
              <div className="flex-shrink-0 w-20 text-right">
                <span className="text-gray-300">{zone.month}</span>
              </div>

              {/* Cameras */}
              <div className="flex-shrink-0 w-16 text-right mr-2">
                <span className="text-gray-300">{zone.cameras}</span>
              </div>
            </div>
          ))}

          {/* Total Row */}
          <div className="px-5 py-3.5 flex items-center bg-gray-800">
            {/* Total Label */}
            <div className="flex-shrink-0 w-24">
              <span className="text-gray-200 font-bold">Total</span>
            </div>

            {/* Empty cell for ROI Level */}
            <div className="flex-shrink-0 w-24"></div>

            {/* Total Value */}
            <div className="flex-1 min-w-[100px]">
              <span className="text-green-400 font-bold">{total.value}</span>
            </div>

            {/* Total Month */}
            <div className="flex-shrink-0 w-20 text-right">
              <span className="text-gray-200 font-bold">{total.month}</span>
            </div>

            {/* Total Cameras */}
            <div className="flex-shrink-0 w-16 text-right mr-2">
              <span className="text-gray-200 font-bold">{total.cameras}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ROIZonesTable;
