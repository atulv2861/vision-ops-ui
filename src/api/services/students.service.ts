import { axiosInstance } from '../axiosInstance';
import { endpoints, type OverviewFilterParams } from '../endpoints';
import { getDateRangeFromFilter } from '../../utils/dateRangeFromFilter';
import type { GlobalFilterData } from '../../Context/AppContext';

const OVERVIEW_CLIENT_ID =
  import.meta.env.VITE_CLIENT_ID ?? 'c5a7e9b1-3d4f-4a8e-9c2b-6f7d3e1a8b5c';

function buildStudentsParams(filter: GlobalFilterData | null): OverviewFilterParams {
  const { from, to } = getDateRangeFromFilter(filter);
  return {
    client_id: OVERVIEW_CLIENT_ID,
    from,
    to,
    camera_id: filter?.cameraId ?? null,
    location_id: filter?.locationId ?? null,
    camera_ids: filter?.cameraIds,
  };
}

export interface StudentSummaryApiResponseItem {
  id: string;
  title: string;
  value: string;
  subtitle: string;
}

export interface StudentSummaryCardData {
  id?: string;
  title: string;
  value: string;
  subtitle: string;
}

export const studentsService = {
  async getSummary(filter: GlobalFilterData | null): Promise<StudentSummaryCardData[]> {
    const params = buildStudentsParams(filter);
    const { data } = await axiosInstance.post<StudentSummaryApiResponseItem[]>(
      endpoints.students.summary(params),
      { camera_ids: params.camera_ids ?? [] }
    );
    return Array.isArray(data) ? data : [];
  },
};
