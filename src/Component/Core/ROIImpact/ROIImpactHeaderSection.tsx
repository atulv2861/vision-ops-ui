// Interface matching API response structure
export interface ROIImpactSummaryCardData {
  title: string;
  subtitle: string;
  value?: string;
}

interface ROIImpactHeaderSectionProps {
  summaryCards?: ROIImpactSummaryCardData[];
}

// Dummy data - This structure matches API response format
const defaultSummaryCards: ROIImpactSummaryCardData[] = [
  {
    title: 'Total Annual Savings',
    subtitle: 'Camera-based automation only'
  },
  {
    title: 'Payback Period',
    subtitle: 'Average across US schools'
  },
  {
    title: '3-Year ROI',
    subtitle: 'Including safety risk reduction'
  }
];

function ROIImpactHeaderSection({ summaryCards = defaultSummaryCards }: ROIImpactHeaderSectionProps) {
  return (
    <div>
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        {/* Icon */}
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
          <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>

        {/* Title and Subtitle */}
        <div className="flex-1">
          <h1 className="text-white text-3xl font-bold mb-2">ROI & Impact Dashboard</h1>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <span>Vision-Based Analytics</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>Automated</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>Privacy-First</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg p-6">
            <p className="text-gray-600 text-sm mb-1">{card.title}</p>
            <p className="text-gray-500 text-xs">{card.subtitle}</p>
            {card.value && (
              <p className="text-gray-900 text-2xl font-bold mt-2">{card.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ROIImpactHeaderSection;
