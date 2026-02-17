import { useQuery } from '@tanstack/react-query';
import { overviewService } from '../../api/services/overview.service';
import { queryKeys } from './queryKeys';
import type { GlobalFilterData } from '../../Context/AppContext';

function getSummaryCardsFilterKey(filter: GlobalFilterData | null): string {
  if (!filter) return 'default';
  return [
    filter.locationId ?? '',
    filter.cameraId ?? '',
    filter.fromDate ?? '',
    filter.toDate ?? '',
  ].join('|');
}

export function useOverviewSummaryCards(filter: GlobalFilterData | null) {
  const filterKey = getSummaryCardsFilterKey(filter);
  return useQuery({
    queryKey: queryKeys.overview.summaryCards(filterKey),
    queryFn: () => overviewService.getSummaryCards(filter),
  });
}

export function useOverviewAiPatterns() {
  return useQuery({
    queryKey: queryKeys.overview.aiPatterns,
    queryFn: () => overviewService.getAiPatterns(),
  });
}

export function useOverviewCampusTraffic() {
  return useQuery({
    queryKey: queryKeys.overview.campusTraffic,
    queryFn: () => overviewService.getCampusTraffic(),
  });
}

export function useOverviewEventsByType() {
  return useQuery({
    queryKey: queryKeys.overview.eventsByType,
    queryFn: () => overviewService.getEventsByType(),
  });
}

export function useOverviewSpaceUtilization() {
  return useQuery({
    queryKey: queryKeys.overview.spaceUtilization,
    queryFn: () => overviewService.getSpaceUtilization(),
  });
}

export function useOverviewSecurityAccess() {
  return useQuery({
    queryKey: queryKeys.overview.securityAccess,
    queryFn: () => overviewService.getSecurityAccess(),
  });
}

export function useOverviewCleaningCompliance() {
  return useQuery({
    queryKey: queryKeys.overview.cleaningCompliance,
    queryFn: () => overviewService.getCleaningCompliance(),
  });
}

export function useOverviewCameraNetworkStatus() {
  return useQuery({
    queryKey: queryKeys.overview.cameraNetworkStatus,
    queryFn: () => overviewService.getCameraNetworkStatus(),
  });
}

