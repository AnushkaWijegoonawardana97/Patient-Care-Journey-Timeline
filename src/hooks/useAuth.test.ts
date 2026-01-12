import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import * as AuthContext from '@/contexts/AuthContext';
import type { LoginRequest, RegisterRequest, User } from '@/types/auth';

// Mock AuthContext
vi.mock('@/contexts/AuthContext', () => ({
  useAuthContext: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const mockUser: User = {
  id: 'u_001',
  name: 'Test User',
  email: 'test@example.com',
};

const mockAuthContext = {
  user: mockUser,
  token: 'mock-token',
  isAuthenticated: true,
  isLoading: false,
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
};

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(AuthContext.useAuthContext).mockReturnValue(mockAuthContext);
  });

  it('should return user and authentication state from context', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.token).toBe('mock-token');
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('should call authContext.login when login mutation is called', async () => {
    const loginRequest: LoginRequest = {
      email: 'test@example.com',
      password: 'password123',
    };
    const mockLoginResponse = {
      user: mockUser,
      token: 'new-token',
    };
    mockAuthContext.login.mockResolvedValue(mockLoginResponse);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    result.current.login(loginRequest);

    await waitFor(() => {
      expect(mockAuthContext.login).toHaveBeenCalledWith(loginRequest);
    });
  });

  it('should call authContext.register when register mutation is called', async () => {
    const registerRequest: RegisterRequest = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };
    const mockRegisterResponse = {
      user: mockUser,
      token: 'new-token',
    };
    mockAuthContext.register.mockResolvedValue(mockRegisterResponse);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    result.current.register(registerRequest);

    await waitFor(() => {
      expect(mockAuthContext.register).toHaveBeenCalledWith(registerRequest);
    });
  });

  it('should call authContext.logout when logout mutation is called', async () => {
    mockAuthContext.logout.mockResolvedValue(undefined);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    result.current.logout();

    await waitFor(() => {
      expect(mockAuthContext.logout).toHaveBeenCalled();
    });
  });

  it('should handle loading states for login mutation', async () => {
    const loginRequest: LoginRequest = {
      email: 'test@example.com',
      password: 'password123',
    };
    mockAuthContext.login.mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    result.current.login(loginRequest);

    await waitFor(() => {
      expect(result.current.isLoginLoading).toBe(true);
    });
  });

  it('should handle loading states for register mutation', async () => {
    const registerRequest: RegisterRequest = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };
    mockAuthContext.register.mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    result.current.register(registerRequest);

    await waitFor(() => {
      expect(result.current.isRegisterLoading).toBe(true);
    });
  });

  it('should handle loading states for logout mutation', async () => {
    mockAuthContext.logout.mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    result.current.logout();

    await waitFor(() => {
      expect(result.current.isLogoutLoading).toBe(true);
    });
  });

  it('should handle error states for login mutation', async () => {
    const loginRequest: LoginRequest = {
      email: 'test@example.com',
      password: 'password123',
    };
    const mockError = new Error('Login failed');
    mockAuthContext.login.mockRejectedValue(mockError);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    result.current.login(loginRequest);

    await waitFor(() => {
      expect(result.current.loginError).toBe(mockError);
    });
  });

  it('should handle error states for register mutation', async () => {
    const registerRequest: RegisterRequest = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };
    const mockError = new Error('Registration failed');
    mockAuthContext.register.mockRejectedValue(mockError);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    result.current.register(registerRequest);

    await waitFor(() => {
      expect(result.current.registerError).toBe(mockError);
    });
  });

  it('should provide loginAsync function', async () => {
    const loginRequest: LoginRequest = {
      email: 'test@example.com',
      password: 'password123',
    };
    const mockLoginResponse = {
      user: mockUser,
      token: 'new-token',
    };
    mockAuthContext.login.mockResolvedValue(mockLoginResponse);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    const response = await result.current.loginAsync(loginRequest);

    expect(response).toEqual(mockLoginResponse);
    expect(mockAuthContext.login).toHaveBeenCalledWith(loginRequest);
  });

  it('should provide registerAsync function', async () => {
    const registerRequest: RegisterRequest = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };
    const mockRegisterResponse = {
      user: mockUser,
      token: 'new-token',
    };
    mockAuthContext.register.mockResolvedValue(mockRegisterResponse);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    const response = await result.current.registerAsync(registerRequest);

    expect(response).toEqual(mockRegisterResponse);
    expect(mockAuthContext.register).toHaveBeenCalledWith(registerRequest);
  });

  it('should provide logoutAsync function', async () => {
    mockAuthContext.logout.mockResolvedValue(undefined);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await result.current.logoutAsync();

    expect(mockAuthContext.logout).toHaveBeenCalled();
  });
});
