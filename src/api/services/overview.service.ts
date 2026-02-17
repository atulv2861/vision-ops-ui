import { axiosInstance } from '../axiosInstance';
import { endpoints, type OverviewFilterParams } from '../endpoints';
import { getDateRangeFromFilter } from '../../utils/dateRangeFromFilter';
import type { GlobalFilterData } from '../../Context/AppContext';

const OVERVIEW_CLIENT_ID =
  import.meta.env.VITE_CLIENT_ID ?? 'c5a7e9b1-3d4f-4a8e-9c2b-6f7d3e1a8b5c';

function buildOverviewParams(filter: GlobalFilterData | null): OverviewFilterParams {
  const { from, to } = getDateRangeFromFilter(filter);
  return {
    client_id: OVERVIEW_CLIENT_ID,
    from,
    to,
    camera_id: filter?.cameraId ?? null,
    location_id: filter?.locationId ?? null,
  };
}

/** API response shape for GET /overview/overview-cards */
export interface OverviewCardApiResponse {
  id: string;
  title: string;
  value: number;
  subtitle: string;
}

export interface OverviewCardData {
  id?: string;
  title: string;
  value: string;
  subtitle: string;
  subtitleColor?: string;
  iconColor?: string;
  iconType?: string;
}

/** API response shape for GET /overview/ai-patterns */
export interface AiPatternsApiResponseItem {
  id: string;
  title: string;
  description: string;
  severity: string;
  timestamp: string;
  timeAgo: string;
}

export interface AIPatternData {
  id?: string;
  title: string;
  badge: string;
  badgeColor?: string;
  description: string;
  timeAgo: string;
  iconType?: string;
  borderColor?: string;
  path: string;
}

/** API response shape for GET /overview/campus-traffic */
export interface CampusTrafficApiResponseItem {
  time: string;
  students: number;
  staff: number;
}

export interface CampusTrafficPoint {
  time: string;
  primary: number;
  secondary: number;
}

export interface EventsByTypePoint {
  type: string;
  count: number;
}

export interface SpaceUtilizationPoint {
  id?: string;
  name: string;
  type: string;
  occupancy: number;
  capacity: number;
  percentage: number;
}

export interface SecurityAccessPoint {
  id?: string;
  name: string;
  guardsPresent: number;
  guardsNeeded: number;
  status: 'covered' | 'low-coverage' | 'uncovered';
}

export interface CleaningCompliancePoint {
  zone: string;
  score: number;
}

export interface CameraNetworkPoint {
  id?: string;
  location: string;
  activeCameras: number;
  status: 'online' | 'offline';
}

export const overviewService = {
  async getSummaryCards(filter: GlobalFilterData | null): Promise<OverviewCardData[]> {
    const params = buildOverviewParams(filter);
    const { data } = await axiosInstance.get<OverviewCardApiResponse[]>(
      endpoints.overview.overviewCards(params)
    );
    return (Array.isArray(data) ? data : []).map((card) => ({
      id: card.id,
      title: card.title,
      value: String(card.value),
      subtitle: card.subtitle,
      iconColor: '',
      iconType: '',
    }));
  },

  async getAiPatterns(filter: GlobalFilterData | null): Promise<AIPatternData[]> {
    const params = buildOverviewParams(filter);
    const { data } = await axiosInstance.get<AiPatternsApiResponseItem[]>(
      endpoints.overview.aiPatterns(params)
    );
    return (Array.isArray(data) ? data : []).map((item) => ({
      id: item.id,
      title: item.title,
      badge: item.severity ? item.severity.toUpperCase() : 'LOW',
      description: item.description,
      timeAgo: item.timeAgo,
      path: '#',
    }));
  },

  async getCampusTraffic(filter: GlobalFilterData | null): Promise<CampusTrafficPoint[]> {
    const params = buildOverviewParams(filter);
    const { data } = await axiosInstance.get<CampusTrafficApiResponseItem[]>(
      endpoints.overview.campusTraffic(params)
    );
    return (Array.isArray(data) ? data : []).map((item) => ({
      time: item.time,
      primary: item.students,
      secondary: item.staff,
    }));
  },

  async getEventsByType(filter: GlobalFilterData | null): Promise<EventsByTypePoint[]> {
    const params = buildOverviewParams(filter);
    const { data } = await axiosInstance.get<EventsByTypePoint[]>(
      endpoints.overview.eventsByType(params)
    );
    return data;
  },

  async getSpaceUtilization(filter: GlobalFilterData | null): Promise<SpaceUtilizationPoint[]> {
    const params = buildOverviewParams(filter);
    const { data } = await axiosInstance.get<SpaceUtilizationPoint[]>(
      endpoints.overview.spaceUtilization(params)
    );
    return data;
  },

  async getSecurityAccess(filter: GlobalFilterData | null): Promise<SecurityAccessPoint[]> {
    const params = buildOverviewParams(filter);
    const { data } = await axiosInstance.get<SecurityAccessPoint[]>(
      endpoints.overview.securityAccess(params)
    );
    return data;
  },

  async getCleaningCompliance(filter: GlobalFilterData | null): Promise<CleaningCompliancePoint[]> {
    const params = buildOverviewParams(filter);
    const { data } = await axiosInstance.get<CleaningCompliancePoint[]>(
      endpoints.overview.cleaningCompliance(params)
    );
    return data;
  },

  async getCameraNetworkStatus(filter: GlobalFilterData | null): Promise<CameraNetworkPoint[]> {
    const params = buildOverviewParams(filter);
    const { data } = await axiosInstance.get<CameraNetworkPoint[]>(
      endpoints.overview.cameraNetworkStatus(params)
    );
    return data;
  },
};

