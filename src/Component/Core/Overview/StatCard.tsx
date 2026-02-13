interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon?: React.ReactNode;
}

function StatCard({ title, value, subtitle,icon}: StatCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 flex flex-col">
      {/* Header with title and icon */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-white text-xs font-medium">{title}</h3>
        {icon != null && (
          <div className="p-2 rounded-lg text-gray-400">
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-2">
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>

      {/* Subtitle */}
      <div>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}

export default StatCard;
