// Interface matching API response structure
export interface ROIImpactSectionCardData {
  title: string;
  value: string;
}

export interface ROIImpactSectionData {
  annualSavings: string;
  colorTheme: 'orange' | 'blue' | 'red' | 'purple' | 'green';
  cards: ROIImpactSectionCardData[];
  benefits: string[];
}

interface ROIImpactSectionProps {
  data: ROIImpactSectionData;
}

// Color theme mapping
const colorThemes = {
  orange: {
    bar: 'bg-orange-500',
    text: 'text-orange-500',
    value: 'text-orange-600'
  },
  blue: {
    bar: 'bg-blue-500',
    text: 'text-blue-500',
    value: 'text-blue-600'
  },
  red: {
    bar: 'bg-red-500',
    text: 'text-red-500',
    value: 'text-red-600'
  },
  purple: {
    bar: 'bg-purple-500',
    text: 'text-purple-500',
    value: 'text-purple-600'
  },
  green: {
    bar: 'bg-green-500',
    text: 'text-green-500',
    value: 'text-green-600'
  }
};

function ROIImpactSection({ data }: ROIImpactSectionProps) {
  const theme = colorThemes[data.colorTheme];

  return (
    <div className="relative bg-gray-900 rounded-lg p-6 mb-6">
      {/* Left Vertical Bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${theme.bar} rounded-l-lg`}></div>

      {/* Annual Savings */}
      <div className="flex justify-end mb-6">
        <span className={`text-2xl font-bold ${theme.text}`}>{data.annualSavings}</span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {data.cards.map((card, index) => (
          <div key={index} className="bg-gray-100 rounded-lg p-4">
            <p className={`text-sm font-medium mb-2 ${theme.text}`}>{card.title}</p>
            <p className={`text-2xl font-bold ${theme.value}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Benefits List */}
      <div className="space-y-2">
        {data.benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-300 text-sm">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ROIImpactSection;
