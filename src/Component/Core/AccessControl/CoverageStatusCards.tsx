// Interface matching API response structure
export interface CoverageStatusCardData {
  location: string;
  cameraCount: number;
  camerasActive: number;
  camerasTotal: number;
  entries: number;
  exits: number;
}

interface CoverageStatusCardsProps {
  data?: CoverageStatusCardData[];
}

// Dummy data - This structure matches API response format
const dummyCoverageCardsData: CoverageStatusCardData[] = [
  { location: 'Main Entrance', cameraCount: 2, camerasActive: 2, camerasTotal: 2, entries: 847, exits: 312 },
  { location: 'Building A', cameraCount: 1, camerasActive: 1, camerasTotal: 1, entries: 428, exits: 395 },
  { location: 'Building B', cameraCount: 1, camerasActive: 0, camerasTotal: 1, entries: 312, exits: 298 },
  { location: 'Cafeteria', cameraCount: 1, camerasActive: 1, camerasTotal: 2, entries: 623, exits: 601 },
  { location: 'Sports Complex', cameraCount: 1, camerasActive: 1, camerasTotal: 1, entries: 245, exits: 198 },
  { location: 'Library', cameraCount: 1, camerasActive: 0, camerasTotal: 0, entries: 156, exits: 142 },
  { location: 'Building B', cameraCount: 1, camerasActive: 0, camerasTotal: 1, entries: 312, exits: 298 },
  { location: 'Cafeteria', cameraCount: 1, camerasActive: 1, camerasTotal: 2, entries: 623, exits: 601 },
  { location: 'Sports Complex', cameraCount: 1, camerasActive: 1, camerasTotal: 1, entries: 245, exits: 198 },
  { location: 'Library', cameraCount: 1, camerasActive: 0, camerasTotal: 0, entries: 156, exits: 142 },
  { location: 'Main Entrance', cameraCount: 2, camerasActive: 2, camerasTotal: 2, entries: 847, exits: 312 },
  { location: 'Building A', cameraCount: 1, camerasActive: 1, camerasTotal: 1, entries: 428, exits: 395 },
  { location: 'Building B', cameraCount: 1, camerasActive: 0, camerasTotal: 1, entries: 312, exits: 298 },
  { location: 'Cafeteria', cameraCount: 1, camerasActive: 1, camerasTotal: 2, entries: 623, exits: 601 },
  { location: 'Sports Complex', cameraCount: 1, camerasActive: 1, camerasTotal: 1, entries: 245, exits: 198 },
  { location: 'Library', cameraCount: 1, camerasActive: 0, camerasTotal: 0, entries: 156, exits: 142 },
  { location: 'Building B', cameraCount: 1, camerasActive: 0, camerasTotal: 1, entries: 312, exits: 298 },
  { location: 'Cafeteria', cameraCount: 1, camerasActive: 1, camerasTotal: 2, entries: 623, exits: 601 },
  { location: 'Sports Complex', cameraCount: 1, camerasActive: 1, camerasTotal: 1, entries: 245, exits: 198 },
  { location: 'Library', cameraCount: 1, camerasActive: 0, camerasTotal: 0, entries: 156, exits: 142 }
];

function CoverageStatusCards({ data = dummyCoverageCardsData }: CoverageStatusCardsProps) {
  const getStatusBadgeColor = (active: number, total: number) => {
    if (total === 0) return 'bg-gray-600 text-white';
    if (active === total) return 'bg-green-500 text-white';
    if (active === 0) return 'bg-red-500 text-white';
    return 'bg-yellow-500 text-white';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-white text-lg font-semibold mb-4">Coverage Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[780px] overflow-y-auto scrollbar-hide pr-2">
        {data.map((card, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-4 relative">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-white font-medium text-sm">
                  {card.location} • {card.cameraCount} {card.cameraCount === 1 ? 'camera' : 'cameras'}
                </h3>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(card.camerasActive, card.camerasTotal)}`}>
                {card.camerasActive}/{card.camerasTotal}
              </span>
            </div>

            {/* Entry/Exit Stats */}
            <div className="grid grid-cols-2 gap-3">
              {/* Entries */}
              <div className="bg-green-100 rounded p-3">
                <p className="text-green-700 text-xs mb-1">Entries</p>
                <p className="text-green-800 text-2xl font-bold">{card.entries}</p>
              </div>

              {/* Exits */}
              <div className="bg-blue-100 rounded p-3">
                <p className="text-blue-700 text-xs mb-1">Exits</p>
                <p className="text-blue-800 text-2xl font-bold">{card.exits}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoverageStatusCards;
