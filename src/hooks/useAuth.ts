import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import type { LoginRequest, RegisterRequest } from "@/types/auth";
import { queryKeys } from "@/lib/queryKeys";

/** Hook for authentication operations */
export function useAuth() {
  const queryClient = useQueryClient();
  const authContext = useAuthContext();

  const loginMutation = useMutation({
    mutationFn: (request: LoginRequest) => authContext.login(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (request: RegisterRequest) => authContext.register(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authContext.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });

  return {
    user: authContext.user,
    token: authContext.token,
    isAuthenticated: authContext.isAuthenticated,
    isLoading: authContext.isLoading,
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoginLoading: loginMutation.isLoading,
    loginError: loginMutation.error,
    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegisterLoading: registerMutation.isLoading,
    registerError: registerMutation.error,
    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    isLogoutLoading: logoutMutation.isLoading,
  };
}

export default useAuth;
