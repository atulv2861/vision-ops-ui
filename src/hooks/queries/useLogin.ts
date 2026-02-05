import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, type LoginPayload } from '../../api/services/auth.service';
import { queryKeys } from './queryKeys';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
  });
}
