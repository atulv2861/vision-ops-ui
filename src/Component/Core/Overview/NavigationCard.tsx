import { useNavigate } from 'react-router-dom';
interface NavigationCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  borderColor?: string;
  path:string
}

function NavigationCard({ title, value, icon, borderColor ,path}: NavigationCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div onClick={handleClick} className={`bg-gray-700 rounded-lg p-4 flex items-center justify-between hover:bg-gray-750 cursor-pointer transition-colors ${borderColor ? `border-l-4 ${borderColor}` : ''}`}>
      <div className="flex items-center gap-3 flex-1">
        {/* Icon */}
        <div>
          {icon}
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <h3 className="text-white text-sm font-medium">{title}</h3>
          <p className="text-gray-400 text-xs mt-1">{value}</p>
        </div>
      </div>
      
      {/* Chevron */}
      <div className="text-gray-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

export default NavigationCard;
