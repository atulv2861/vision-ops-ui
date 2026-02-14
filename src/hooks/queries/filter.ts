import { useQuery } from '@tanstack/react-query';
import { filterService } from '../../api/services/filter.service';
import { queryKeys } from './queryKeys';

const DEFAULT_CLIENT_ID =
  import.meta.env.VITE_CLIENT_ID ?? '507f1f77bcf86cd799439011';

export function useFilterLocations(clientId?: string) {
  const id = clientId ?? DEFAULT_CLIENT_ID;
  return useQuery({
    queryKey: queryKeys.filter.locations(id),
    queryFn: () => filterService.getLocations(id),
    enabled: !!id,
  });
}

export function useFilterCameras(locationId?: string | null) {
  return useQuery({
    queryKey: queryKeys.filter.cameras(locationId ?? ''),
    queryFn: () => filterService.getCameras(locationId!),
    enabled: !!locationId,
  });
}
