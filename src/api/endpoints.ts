/**
 * Centralized API endpoints. No hard-coded URLs in components or services.
 * Grouped by feature for scalability.
 */

const BASE = {
  AUTH: '/auth',
  USER: '/user',
  OVERVIEW: 'http://localhost:3000/api/overview',
  FILTER: 'http://localhost:3000/api/filter',
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
    overviewCards: () => `${BASE.OVERVIEW}/overview-cards`,
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
