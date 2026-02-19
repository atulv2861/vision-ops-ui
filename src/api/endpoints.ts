/**
 * Centralized API endpoints. No hard-coded URLs in components or services.
 * Grouped by feature for scalability.
 */

const BASE = {
  AUTH: '/auth',
  USER: '/user',
  OVERVIEW: `${import.meta.env.VITE_API_BASE_URL}/overview`,
  FILTER: `${import.meta.env.VITE_API_BASE_URL}/filter`,
  STUDENTS: `${import.meta.env.VITE_API_BASE_URL}/students`,
} as const;

/** Shared query params for overview APIs (global filter). */
export type OverviewFilterParams = {
  client_id: string;
  from: string;
  to: string;
  camera_id: string | null;
  location_id: string | null;
  /** Sent in request body for overview-cards (camera_ids array). */
  camera_ids?: string[];
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

/** Query string for overview-cards, ai-patterns, camera-network-status, campus-traffic, space-utilization, security-access: only client_id, from, to (camera_ids in body). */
function overviewCardsQueryString(params: Pick<OverviewFilterParams, 'client_id' | 'from' | 'to'>): string {
  const sp = new URLSearchParams();
  sp.set('client_id', params.client_id);
  sp.set('from', params.from);
  sp.set('to', params.to);
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
    cameras: () => `${BASE.FILTER}/cameras`,
  },
  overview: {
    overviewCards: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/overview-cards?${overviewCardsQueryString(params)}`,
    summaryCards: () => `${BASE.OVERVIEW}/summary-cards`,
    aiPatterns: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/ai-patterns?${overviewCardsQueryString(params)}`,
    campusTraffic: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/campus-traffic?${overviewCardsQueryString(params)}`,
    eventsByType: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/events-by-type?${overviewQueryString(params)}`,
    spaceUtilization: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/space-utilization?${overviewCardsQueryString(params)}`,
    securityAccess: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/security-access?${overviewCardsQueryString(params)}`,
    cleaningCompliance: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/cleaning-compliance?${overviewQueryString(params)}`,
    cameraNetworkStatus: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/camera-network-status?${overviewCardsQueryString(params)}`,
    systemStatus: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/system-status?${overviewQueryString(params)}`,
    quickNavigationStats: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/quick-navigation-stats?${overviewQueryString(params)}`,
  },
  students: {
    summary: (params: Pick<OverviewFilterParams, 'client_id' | 'from' | 'to'>) =>
      `${BASE.STUDENTS}/summary?${overviewCardsQueryString(params)}`,
  },
  studentDistribution: {
    aggregatePresenceChart: (params: OverviewFilterParams) =>
      `${BASE.OVERVIEW}/aggregate-presence?${overviewQueryString(params)}`,
  },
} as const;
