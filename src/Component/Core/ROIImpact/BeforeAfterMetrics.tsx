// Interface matching API response structure
export interface BeforeAfterMetricData {
  metricName: string;
  beforeValue: string;
  afterValue: string;
  reduction: string;
}

interface BeforeAfterMetricsProps {
  data?: BeforeAfterMetricData[];
}

// Dummy data - This structure matches API response format
const defaultMetricsData: BeforeAfterMetricData[] = [
  {
    metricName: 'Incident Investigation Time',
    beforeValue: '45 min',
    afterValue: '8 min',
    reduction: '82%'
  },
  {
    metricName: 'Cleaning Hours/Week',
    beforeValue: '180 hrs',
    afterValue: '135 hrs',
    reduction: '25%'
  },
  {
    metricName: 'Security Staff Required',
    beforeValue: '8 FTE',
    afterValue: '6 FTE',
    reduction: '25%'
  },
  {
    metricName: 'Overcrowding Incidents',
    beforeValue: '23/month',
    afterValue: '4/month',
    reduction: '83%'
  },
  {
    metricName: 'Response Time (Events)',
    beforeValue: '12 min',
    afterValue: '3 min',
    reduction: '75%'
  }
];

function BeforeAfterMetrics({ data = defaultMetricsData }: BeforeAfterMetricsProps) {
  return (
    <div className="space-y-4">
      {data.map((metric, index) => (
        <div key={index} className="bg-gray-100 rounded-lg p-6 flex items-center justify-between gap-6">
          {/* Metric Name */}
          <div className="flex-shrink-0 min-w-[200px]">
            <h3 className="text-gray-900 font-medium">{metric.metricName}</h3>
          </div>

          {/* Before and After Values */}
          <div className="flex items-center gap-8 flex-1">
            {/* Before */}
            <div className="text-center">
              <p className="text-gray-500 text-xs mb-1">Before</p>
              <p className="text-gray-900 font-bold text-lg">{metric.beforeValue}</p>
            </div>

            {/* Arrow */}
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>

            {/* After */}
            <div className="text-center">
              <p className="text-gray-500 text-xs mb-1">After</p>
              <p className="text-green-600 font-bold text-lg">{metric.afterValue}</p>
            </div>
          </div>

          {/* Reduction Badge */}
          <div className="flex-shrink-0">
            <div className="bg-green-100 rounded-full px-4 py-2 flex items-center gap-1">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className="text-green-600 font-semibold text-sm">{metric.reduction}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BeforeAfterMetrics;
