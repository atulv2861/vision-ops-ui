interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
  subtitleColor?: string;
}

function StatCard({ title, value, subtitle, icon, iconColor, subtitleColor = "text-gray-400" }: StatCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 flex flex-col">
      {/* Header with title and icon */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-white text-xs font-medium">{title}</h3>
        <div className={`${iconColor} p-2 rounded-lg`}>
          {icon}
        </div>
      </div>

      {/* Value */}
      <div className="mb-2">
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>

      {/* Subtitle */}
      <div>
        <p className={`text-sm ${subtitleColor}`}>{subtitle}</p>
      </div>
    </div>
  );
}

export default StatCard;
