import { Link } from "react-router-dom";

// Interface matching API response structure
export interface CameraNetworkData {
  location: string;
  activeCameras: number;
  status: 'online' | 'offline' | 'maintenance';
}

interface CameraNetworkStatusProps {
  data?: CameraNetworkData[];
}

// Dummy data array - This structure matches API response format
const dummyCameraData: CameraNetworkData[] = [
  { location: "Main Gate", activeCameras: 2, status: "online" },
  { location: "Building A", activeCameras: 4, status: "online" },
  { location: "Building B", activeCameras: 3, status: "online" },
  { location: "Cafeteria", activeCameras: 3, status: "online" },
  { location: "Library", activeCameras: 3, status: "online" },
  { location: "Sports Complex", activeCameras: 3, status: "online" },
  { location: "Washroom Block A", activeCameras: 1, status: "online" },
  { location: "Washroom Block B", activeCameras: 1, status: "online" },
  { location: "Administrative Block", activeCameras: 2, status: "online" }
];

function CameraNetworkStatus({ data = dummyCameraData }: CameraNetworkStatusProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">Camera Network Status</h3>
          <p className="text-gray-400 text-sm">Location-wise coverage</p>
        </div>
       <Link to="/cameras"> <a href="#" className="text-blue-500 hover:text-blue-400 text-sm font-medium flex items-center gap-1">
          View All
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a></Link>
      </div>
      <div className="space-y-3 mt-6 max-h-96 overflow-y-auto scrollbar-hide">
        {data.map((camera, index) => (
          <div
            key={index}
            className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-between border border-gray-600/50"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gray-600 rounded-lg p-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold">{camera.location}</h4>
                <p className="text-gray-400 text-xs">{camera.activeCameras} cameras active</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-green-500 text-sm font-medium">Online</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CameraNetworkStatus;
