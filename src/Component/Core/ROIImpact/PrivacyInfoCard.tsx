function PrivacyInfoCard() {
  const features = [
    'Camera-based detection (no PII stored without consent)',
    'Aggregated analytics (presence counts, not identities)',
    'Known person tracking limited to authorized staff only (with consent)'
  ];

  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Shield Icon */}
        <div className="flex-shrink-0">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-blue-900 text-xl font-bold">Vision-Based, Privacy-First Analytics</h3>
      </div>

      {/* Description */}
      <p className="text-blue-800 mb-4">
        All ROI calculations are based on <strong>vision-based analytics only</strong>. No wearables, no access cards, no individual tracking. Compliant with US school privacy regulations (FERPA, COPPA).
      </p>

      {/* Features List */}
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-blue-800 text-sm">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrivacyInfoCard;
