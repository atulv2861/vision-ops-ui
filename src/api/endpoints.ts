/**
 * Centralized API endpoints. No hard-coded URLs in components or services.
 * Grouped by feature for scalability.
 */

const BASE = {
  AUTH: '/auth',
  USER: '/user',
  OVERVIEW: `${import.meta.env.VITE_API_BASE_URL}/overview`,
  FILTER: `${import.meta.env.VITE_API_BASE_URL}/filter`,
} as const;

/** Shared query params for overview APIs (global filter). */
export type OverviewFilterParams = {
  client_id: string;
  from: string;
  to: string;
  camera_id: string | null;
  location_id: string | null;
};

function overviewQueryString(params: OverviewFilterParams): string {
  const sp = new URLSearchParams();
  sp.set('client_id', params.client_id);
  sp.set('from', params.from);
  sp.set('to', params.to);
  sp.set('camera_id', params.camera_id ?? 'null');
  sp.set('location_id', params.location_id ?? 'null');
  return sp.toString();
}

export const endpoints = {
  auth: {
    login: () => `${BASE.AUTH}/login`,
    logout: () => `${BASE.AUTH}/logout`,
    refresh: () => `${BASE.AUTH}/refresh`,
    me: () => `${BASE.AUTH}/me`,
  },
  user: {
    profile: () => `${BASE.USER}/profile`,
    updateProfile: () => `${BASE.USER}/profile`,
  },
  filter: {
    location: (clientId: string) =>
      `${BASE.FILTER}/location?client_id=${clientId}`,
    camera: (locationId: string) =>
      `${BASE.FILTER}/camera?location_id=${locationId}`,
  },
  overview: {
    overviewCards: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/overview-cards?${overviewQueryString(params)}`,
    summaryCards: () => `${BASE.OVERVIEW}/summary-cards`,
    aiPatterns: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/ai-patterns?${overviewQueryString(params)}`,
    campusTraffic: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/campus-traffic?${overviewQueryString(params)}`,
    eventsByType: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/events-by-type?${overviewQueryString(params)}`,
    spaceUtilization: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/space-utilization?${overviewQueryString(params)}`,
    securityAccess: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/security-access?${overviewQueryString(params)}`,
    cleaningCompliance: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/cleaning-compliance?${overviewQueryString(params)}`,
    cameraNetworkStatus: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/camera-network-status?${overviewQueryString(params)}`,
    systemStatus: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/system-status?${overviewQueryString(params)}`,
    quickNavigationStats: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/quick-navigation-stats?${overviewQueryString(params)}`,
  },
} as const;
