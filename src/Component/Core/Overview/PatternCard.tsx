import { useNavigate } from 'react-router-dom';

interface PatternCardProps {
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  timeAgo: string;
  icon: React.ReactNode;
  borderColor: string;
  path: string;
}

function PatternCard({ title, badge, badgeColor, description, timeAgo, icon, borderColor, path }: PatternCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div 
      onClick={handleClick}
      className={`bg-gray-700 rounded-lg p-4 border-l-4 ${borderColor} flex items-start justify-between hover:bg-gray-750 cursor-pointer transition-colors`}
    >
      <div className="flex items-start gap-3 flex-1">
        {/* Icon */}
        <div className="mt-1">
          {icon}
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-white font-semibold">{title}</h3>
            <span className={`${badgeColor} text-white text-xs font-medium px-2 py-0.5 rounded`}>
              {badge}
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-2">{description}</p>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
      
      {/* Chevron */}
      <div className="text-gray-500 ml-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

export default PatternCard;
