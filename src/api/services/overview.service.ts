import { axiosInstance } from '../axiosInstance';
import { endpoints } from '../endpoints';

export interface OverviewCardData {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor?: string;
  iconColor: string;
  iconType: string;
}

export interface AIPatternData {
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  timeAgo: string;
  iconType: string;
  borderColor: string;
  path: string;
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
  name: string;
  type: string;
  occupancy: number;
  capacity: number;
  percentage: number;
}

export interface SecurityAccessPoint {
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
  location: string;
  activeCameras: number;
  status: 'online' | 'offline' | 'maintenance';
}

export const overviewService = {
  async getSummaryCards(): Promise<OverviewCardData[]> {
    const { data } = await axiosInstance.get<OverviewCardData[]>(
      endpoints.overview.summaryCards()
    );
    return data;
  },

  async getAiPatterns(): Promise<AIPatternData[]> {
    const { data } = await axiosInstance.get<AIPatternData[]>(
      endpoints.overview.aiPatterns()
    );
    return data;
  },

  async getCampusTraffic(): Promise<CampusTrafficPoint[]> {
    const { data } = await axiosInstance.get<CampusTrafficPoint[]>(
      endpoints.overview.campusTraffic()
    );
    return data;
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

