import { useQuery } from '@tanstack/react-query';
import { studentsService } from '../../api/services/students.service';
import { queryKeys } from './queryKeys';
import type { GlobalFilterData } from '../../Context/AppContext';

function getStudentSummaryFilterKey(filter: GlobalFilterData | null): string {
  if (!filter) return 'default';
  return [
    filter.locationId ?? '',
    filter.cameraId ?? '',
    (filter.cameraIds ?? []).join(','),
    filter.fromDate ?? '',
    filter.toDate ?? '',
  ].join('|');
}

export function useStudentSummary(filter: GlobalFilterData | null) {
  const filterKey = getStudentSummaryFilterKey(filter);
  return useQuery({
    queryKey: queryKeys.students.summary(filterKey),
    queryFn: () => studentsService.getSummary(filter),
  });
}
