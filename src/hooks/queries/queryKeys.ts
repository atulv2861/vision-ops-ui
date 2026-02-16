/**
 * Centralized query keys for cache invalidation and consistency.
 */
export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  user: {
    profile: ['user', 'profile'] as const,
  },
  filter: {
    locations: (clientId: string) => ['filter', 'locations', clientId] as const,
    cameras: (locationId: string) => ['filter', 'cameras', locationId] as const,
  },
  overview: {
    summaryCards: (filterKey: string) =>
      ['overview', 'summaryCards', filterKey] as const,
    aiPatterns: ['overview', 'aiPatterns'] as const,
    campusTraffic: ['overview', 'campusTraffic'] as const,
    eventsByType: ['overview', 'eventsByType'] as const,
    spaceUtilization: ['overview', 'spaceUtilization'] as const,
    securityAccess: ['overview', 'securityAccess'] as const,
    cleaningCompliance: ['overview', 'cleaningCompliance'] as const,
    cameraNetworkStatus: ['overview', 'cameraNetworkStatus'] as const,
  },
} as const;
