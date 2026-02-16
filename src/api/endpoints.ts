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
    overviewCards: (params: {
      client_id: string;
      from: string;
      to: string;
      camera_id: string | null;
      location_id: string | null;
    }) => {
      const sp = new URLSearchParams();
      sp.set('client_id', params.client_id);
      sp.set('from', params.from);
      sp.set('to', params.to);
      sp.set('camera_id', params.camera_id ?? 'null');
      sp.set('location_id', params.location_id ?? 'null');
      return `${BASE.OVERVIEW}/overview-cards?${sp.toString()}`;
    },
    summaryCards: () => `${BASE.OVERVIEW}/summary-cards`,
    aiPatterns: () => `${BASE.OVERVIEW}/ai-patterns`,
    campusTraffic: () => `${BASE.OVERVIEW}/campus-traffic`,
    eventsByType: () => `${BASE.OVERVIEW}/events-by-type`,
    spaceUtilization: () => `${BASE.OVERVIEW}/space-utilization`,
    securityAccess: () => `${BASE.OVERVIEW}/security-access`,
    cleaningCompliance: () => `${BASE.OVERVIEW}/cleaning-compliance`,
    cameraNetworkStatus: () => `${BASE.OVERVIEW}/camera-network-status`,
    systemStatus: () => `${BASE.OVERVIEW}/system-status`,
    quickNavigationStats: () => `${BASE.OVERVIEW}/quick-navigation-stats`,
  },
} as const;
