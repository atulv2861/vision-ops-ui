import CameraCard, { type CameraCardData } from './CameraCard';

// Dummy data - This structure matches API response format
const camerasData: CameraCardData[] = [
  {
    id: '1',
    name: 'Main Gate - Entry',
    status: 'online',
    frameRate: 30,
    uptime: 99.8,
    health: 95
  },
  {
    id: '2',
    name: 'Main Gate - Exit',
    status: 'online',
    frameRate: 30,
    uptime: 99.5,
    health: 92
  },
  {
    id: '3',
    name: 'Building A - Corridor 1',
    status: 'online',
    frameRate: 30,
    uptime: 99.9,
    health: 98
  },
  {
    id: '4',
    name: 'Building A - Corridor 2',
    status: 'online',
    frameRate: 30,
    uptime: 99.9,
    health: 98
  },
  {
    id: '5',
    name: 'Building A - Corridor 3',
    status: 'offline',
    frameRate: 30,
    uptime: 99.9,
    health: 98
  },
  {
    id: '6',
    name: 'Building A - Corridor 4',
    status: 'online',
    frameRate: 30,
    uptime: 99.9,
    health: 98
  },
  {
    id: '7',
    name: 'Building A - Corridor 5',
    status: 'offline',
    frameRate: 30,
    uptime: 99.9,
    health: 98
  },
  {
    id: '8',
    name: 'Building A - Corridor 6',
    status: 'online',
    frameRate: 30,
    uptime: 99.9,
    health: 98
  },
  {
    id: '9',
    name: 'Building A - Corridor 7',
    status: 'online',
    frameRate: 30,
    uptime: 99.9,
    health: 98
  },      
  {
    id: '10',
    name: 'Building A - Corridor 8',
    status: 'offline',
    frameRate: 30,
    uptime: 99.9,
    health: 98
  },
  {
    id: '11',
    name: 'Building A - Corridor 9',
    status: 'online',
    frameRate: 30,
    uptime: 99.9,
    health: 98
  },
  {
    id: '12',
    name: 'Building A - Corridor 10',
    status: 'online',
    frameRate: 30,
    uptime: 99.9,
    health: 98
  }
];

function CameraCardsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {camerasData.map((camera) => (
        <CameraCard key={camera.id} data={camera} />
      ))}
    </div>
  );
}

export default CameraCardsGrid;
