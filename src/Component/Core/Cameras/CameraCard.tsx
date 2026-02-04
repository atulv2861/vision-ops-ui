// Interface matching API response structure
export interface CameraCardData {
  id: string;
  name: string;
  status: 'online' | 'offline';
  frameRate: number;
  uptime: number;
  health: number;
  lastEvent?: string;
}

interface CameraCardProps {
  data: CameraCardData;
}

function CameraCard({ data }: CameraCardProps) {
  const statusColor = data.status === 'online' ? 'bg-green-500' : 'bg-red-500';
  const statusText = data.status === 'online' ? 'online' : 'offline';

  return (
    <div className="bg-gray-800 rounded-lg p-6 relative">
      {/* Status Badge (Top Left) */}
      <div className="absolute top-4 left-4">
        <div className={`${statusColor} rounded-full px-3 py-1 flex items-center gap-2`}>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span className="text-white text-xs font-medium">{statusText}</span>
        </div>
      </div>

      {/* Frame Rate (Top Right) */}
      <div className="absolute top-4 right-4">
        <span className="text-white text-sm font-medium">{data.frameRate} FPS</span>
      </div>

      {/* Camera Icon (Center Top) */}
      <div className="flex justify-center mt-8 mb-4">
        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>

      {/* Camera Name */}
      <h3 className="text-gray-300 text-center font-medium mb-6">{data.name}</h3>

      {/* Metrics */}
      <div className="space-y-3">
        {/* Uptime */}
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Uptime</span>
          <span className="text-green-500 font-semibold">{data.uptime}%</span>
        </div>

        {/* Health */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Health</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${data.health}%` }}
            ></div>
          </div>
        </div>

        {/* Last Event */}
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Last Event</span>
          {data.lastEvent ? (
            <span className="text-gray-300 text-sm">{data.lastEvent}</span>
          ) : (
            <span className="text-gray-500 text-sm">—</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CameraCard;
