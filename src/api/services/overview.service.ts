import { axiosInstance } from '../axiosInstance';
import { endpoints } from '../endpoints';

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
  status: 'online' | 'offline' | 'maintenance';
}

export const overviewService = {
  async getSummaryCards(): Promise<OverviewCardData[]> {
    const { data } = await axiosInstance.get<OverviewCardApiResponse[]>(
      endpoints.overview.overviewCards()
    );
    return data.map((card) => ({
      id: card.id,
      title: card.title,
      value: String(card.value),
      subtitle: card.subtitle,
      iconColor: '',
      iconType: '',
    }));
  },

  async getAiPatterns(): Promise<AIPatternData[]> {
    const { data } = await axiosInstance.get<AiPatternsApiResponseItem[]>(
      endpoints.overview.aiPatterns()
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

  async getCampusTraffic(): Promise<CampusTrafficPoint[]> {
    const { data } = await axiosInstance.get<CampusTrafficApiResponseItem[]>(
      endpoints.overview.campusTraffic()
    );
    return (Array.isArray(data) ? data : []).map((item) => ({
      time: item.time,
      primary: item.students,
      secondary: item.staff,
    }));
  },

  async getEventsByType(): Promise<EventsByTypePoint[]> {
    const { data } = await axiosInstance.get<EventsByTypePoint[]>(
      endpoints.overview.eventsByType()
    );
    return data;
  },

   async getSpaceUtilization(): Promise<SpaceUtilizationPoint[]> {
    const { data } = await axiosInstance.get<SpaceUtilizationPoint[]>(
      endpoints.overview.spaceUtilization()
    );
    return data;
  },

  async getSecurityAccess(): Promise<SecurityAccessPoint[]> {
    const { data } = await axiosInstance.get<SecurityAccessPoint[]>(
      endpoints.overview.securityAccess()
    );
    return data;
  },

  async getCleaningCompliance(): Promise<CleaningCompliancePoint[]> {
    const { data } = await axiosInstance.get<CleaningCompliancePoint[]>(
      endpoints.overview.cleaningCompliance()
    );
    return data;
  },

  async getCameraNetworkStatus(): Promise<CameraNetworkPoint[]> {
    const { data } = await axiosInstance.get<CameraNetworkPoint[]>(
      endpoints.overview.cameraNetworkStatus()
    );
    return data;
  },
};

