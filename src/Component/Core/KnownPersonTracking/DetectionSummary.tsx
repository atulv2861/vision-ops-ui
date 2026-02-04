// Interface matching API response structure
export interface DetectionSummaryData {
  totalPoints: number;
  timeSpan: string;
  avgConfidence: number;
}

interface DetectionSummaryProps {
  data?: DetectionSummaryData;
}

function DetectionSummary({ 
  // data = {
  //   totalPoints: 0,
  //   timeSpan: '',
  //   avgConfidence: 0
  // }
}: DetectionSummaryProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-gray-300 text-base font-semibold mb-4">Detection Summary</h3>
      
      <div className="space-y-3">
        {/* Total Points */}
        <div>
          <p className="text-gray-400 text-sm">Total Points:</p>
        </div>

        {/* Time Span */}
        <div>
          <p className="text-gray-400 text-sm">Time Span:</p>
        </div>

        {/* Avg Confidence */}
        <div>
          <p className="text-gray-400 text-sm">Avg Confidence:</p>
        </div>
      </div>
    </div>
  );
}

export default DetectionSummary;
