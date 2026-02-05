import { useQuery } from '@tanstack/react-query';
import { userService } from '../../api/services/user.service';
import { queryKeys } from './queryKeys';

export function useProfile(enabled = true) {
  return useQuery({
    queryKey: queryKeys.user.profile,
    queryFn: () => userService.getProfile(),
    enabled,
  });
}
