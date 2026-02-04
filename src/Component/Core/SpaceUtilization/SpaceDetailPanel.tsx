// Interface matching API response structure
export interface SpaceDetailData {
  spaceName: string;
  building: string;
  currentOccupancy: number;
  capacity: number;
  utilization: number;
  peakTime: string;
  peakOccupancy: number;
  cameras: number;
  students: number;
  staff: number;
}

interface SpaceDetailPanelProps {
  data?: SpaceDetailData;
  onClose?: () => void;
}

function SpaceDetailPanel({ 
  data = {
    spaceName: 'Classroom',
    building: 'Building A',
    currentOccupancy: 29,
    capacity: 30,
    utilization: 93,
    peakTime: '10:30 AM',
    peakOccupancy: 31,
    cameras: 1,
    students: 28,
    staff: 1
  },
  onClose
}: SpaceDetailPanelProps) {
  // const totalPeople = data.students + data.staff;
  // const studentsPercentage = totalPeople > 0 ? (data.students / totalPeople) * 100 : 0;
  // const staffPercentage = totalPeople > 0 ? (data.staff / totalPeople) * 100 : 0;

  return (
    <div className="bg-gray-800 rounded-lg p-6  relative">
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Space Title */}
      <h2 className="text-gray-300 text-lg font-semibold mb-6">
        {data.spaceName} • {data.building}
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Current Occupancy */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-blue-600 text-xs font-medium">Current Occupancy</span>
          </div>
          <p className="text-gray-900 text-2xl font-bold">{data.currentOccupancy}</p>
          <p className="text-gray-600 text-xs mt-1">of {data.capacity} capacity</p>
        </div>

        {/* Utilization */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-purple-600 text-xs font-medium">Utilization</span>
          </div>
          <p className="text-gray-900 text-2xl font-bold">{data.utilization}%</p>
        </div>

        {/* Peak Time */}
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <circle cx="12" cy="12" r="6" strokeWidth="2" />
              <circle cx="12" cy="12" r="2" strokeWidth="2" />
            </svg>
            <span className="text-orange-600 text-xs font-medium">Peak Time</span>
          </div>
          <p className="text-gray-900 text-2xl font-bold">{data.peakTime}</p>
          <p className="text-gray-600 text-xs mt-1">{data.peakOccupancy} people</p>
        </div>

        {/* Cameras */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-green-600 text-xs font-medium">Cameras</span>
          </div>
          <p className="text-gray-900 text-2xl font-bold">{data.cameras}</p>
          <p className="text-gray-600 text-xs mt-1">monitoring space</p>
        </div>
      </div>

      {/* Current Breakdown */}
      <div>
        <h3 className="text-gray-200 text-base font-semibold mb-3">Current Breakdown</h3>
        <div className="space-y-3">
          {/* Students Row */}
          <div className="flex items-center gap-3">
            <span className="text-white text-sm font-medium w-20">Students</span>
            <span className="text-white text-sm font-medium w-8 text-right">{data.students}</span>
            <div 
              className="bg-blue-500 h-6 rounded flex-1"
              style={{ minWidth: '20px' }}
            ></div>
          </div>
          
          {/* Staff Row */}
          <div className="flex items-center gap-3">
            <span className="text-white text-sm font-medium w-20">Staff</span>
            <span className="text-white text-sm font-medium w-8 text-right">{data.staff}</span>
            <div 
              className="bg-purple-500 h-6 rounded flex-1"
              style={{ minWidth: '20px' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpaceDetailPanel;
