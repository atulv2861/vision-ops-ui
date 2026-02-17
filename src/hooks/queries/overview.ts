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

export function useOverviewAiPatterns(filter: GlobalFilterData | null) {
  const filterKey = getSummaryCardsFilterKey(filter);
  return useQuery({
    queryKey: [...queryKeys.overview.aiPatterns, filterKey],
    queryFn: () => overviewService.getAiPatterns(filter),
  });
}

export function useOverviewCampusTraffic(filter: GlobalFilterData | null) {
  const filterKey = getSummaryCardsFilterKey(filter);
  return useQuery({
    queryKey: [...queryKeys.overview.campusTraffic, filterKey],
    queryFn: () => overviewService.getCampusTraffic(filter),
  });
}

export function useOverviewEventsByType(filter: GlobalFilterData | null) {
  const filterKey = getSummaryCardsFilterKey(filter);
  return useQuery({
    queryKey: [...queryKeys.overview.eventsByType, filterKey],
    queryFn: () => overviewService.getEventsByType(filter),
  });
}

export function useOverviewSpaceUtilization(filter: GlobalFilterData | null) {
  const filterKey = getSummaryCardsFilterKey(filter);
  return useQuery({
    queryKey: [...queryKeys.overview.spaceUtilization, filterKey],
    queryFn: () => overviewService.getSpaceUtilization(filter),
  });
}

export function useOverviewSecurityAccess(filter: GlobalFilterData | null) {
  const filterKey = getSummaryCardsFilterKey(filter);
  return useQuery({
    queryKey: [...queryKeys.overview.securityAccess, filterKey],
    queryFn: () => overviewService.getSecurityAccess(filter),
  });
}

export function useOverviewCleaningCompliance(filter: GlobalFilterData | null) {
  const filterKey = getSummaryCardsFilterKey(filter);
  return useQuery({
    queryKey: [...queryKeys.overview.cleaningCompliance, filterKey],
    queryFn: () => overviewService.getCleaningCompliance(filter),
  });
}

export function useOverviewCameraNetworkStatus(filter: GlobalFilterData | null) {
  const filterKey = getSummaryCardsFilterKey(filter);
  return useQuery({
    queryKey: [...queryKeys.overview.cameraNetworkStatus, filterKey],
    queryFn: () => overviewService.getCameraNetworkStatus(filter),
  });
}

