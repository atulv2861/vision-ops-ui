// Interface matching API response structure
export interface TrackingAuthorizationStatusData {
  consentStatus: 'authorized' | 'pending' | 'revoked';
  dataRetentionDays: number;
  accessLevel: string;
}

interface TrackingAuthorizationStatusProps {
  data?: TrackingAuthorizationStatusData;
}

function TrackingAuthorizationStatus({ 
  data = {
    consentStatus: 'authorized',
    dataRetentionDays: 28,
    accessLevel: 'Admin'
  }
}: TrackingAuthorizationStatusProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="text-gray-200 text-base font-semibold">Tracking authorization status</h3>
      </div>

      {/* Content Sections */}
      <div className="space-y-2">
        {/* Consent Status */}
        <div className="bg-green-100 rounded-lg p-3 flex justify-between items-center">
          <span className="text-gray-800 font-medium">Consent Status</span>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-600 font-medium">Authorized</span>
          </div>
        </div>

        {/* Data Retention */}
        <div className="bg-gray-100 rounded-lg p-3 flex justify-between items-center">
          <span className="text-gray-800 font-medium text-sm">Data Retention</span>
          <span className="text-gray-800 font-medium text-sm">{data.dataRetentionDays} days remaining</span>
        </div>

        {/* Access Level */}
        <div className="bg-gray-100 rounded-lg p-3 flex justify-between items-center">
          <span className="text-gray-800 font-medium text-sm">Access Level</span>
          <span className="text-gray-800 font-medium text-sm">{data.accessLevel}</span>
        </div>
      </div>
    </div>
  );
}

export default TrackingAuthorizationStatus;
