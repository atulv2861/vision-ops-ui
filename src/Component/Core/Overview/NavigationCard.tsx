import { useNavigate } from 'react-router-dom';
interface NavigationCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  path: string;
}

function NavigationCard({ title, value, icon, path }: NavigationCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div onClick={handleClick} className="bg-[#28283B]/80 rounded-xl p-4 border-l-4 border-blue-500 flex items-center justify-between hover:bg-[#33334B] cursor-pointer transition-colors border border-white/[0.06]">
      <div className="flex items-center gap-3 flex-1">
        {/* Icon */}
        <div>
          {icon}
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <h3 className="text-white text-sm font-medium">{title}</h3>
          <p className="text-[#B0B0B0] text-xs mt-1">{value}</p>
        </div>
      </div>
      
      {/* Chevron */}
      <div className="text-[#808080]">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

export default NavigationCard;
