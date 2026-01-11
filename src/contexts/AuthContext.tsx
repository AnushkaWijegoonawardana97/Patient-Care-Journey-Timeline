import * as React from "react";
import type { User, AuthState, LoginRequest, RegisterRequest } from "@/types/auth";
import { authService } from "@/services/auth.service";

interface AuthContextValue extends AuthState {
  login: (request: LoginRequest) => Promise<void>;
  register: (request: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(() => authService.getStoredUser());
  const [token, setToken] = React.useState<string | null>(() => authService.getStoredToken());
  const [isLoading, setIsLoading] = React.useState(false);

  const isAuthenticated = !!token && !!user;

  const login = React.useCallback(async (request: LoginRequest): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.login(request);
      setUser(response.user);
      setToken(response.token);
    } catch (error) {
      setIsLoading(false);
      throw error; // Re-throw to propagate to mutation
    }
    setIsLoading(false);
  }, []);

  const register = React.useCallback(async (request: RegisterRequest): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.register(request);
      setUser(response.user);
      setToken(response.token);
    } catch (error) {
      setIsLoading(false);
      throw error; // Re-throw to propagate to mutation
    }
    setIsLoading(false);
  }, []);

  const logout = React.useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setToken(null);
      setIsLoading(false);
    }
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, token, isAuthenticated, isLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/** Hook to access auth context */
export function useAuthContext(): AuthContextValue {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
