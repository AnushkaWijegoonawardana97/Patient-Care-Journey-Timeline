import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { authService } from './auth.service';
import * as apiClient from './api';
import * as authDto from '@/dto/auth.dto';
import type { LoginRequest, RegisterRequest, LoginResponse, RegisterResponse, User } from '@/types/auth';

// Mock apiClient
vi.mock('./api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

// Mock DTO transformation functions
vi.mock('@/dto/auth.dto', () => ({
  toLoginRequestDTO: vi.fn((req) => req),
  toLoginResponse: vi.fn((dto) => dto),
  toRegisterRequestDTO: vi.fn((req) => req),
  toRegisterResponse: vi.fn((dto) => dto),
  toUser: vi.fn((dto) => dto),
}));

// Mock sessionStorage
const mockSessionStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
});

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSessionStorage.clear();
  });

  afterEach(() => {
    mockSessionStorage.clear();
  });

  describe('login', () => {
    it('should call API and store token/user in sessionStorage', async () => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };
      const mockResponse = {
        data: {
          user: {
            id: 'u_001',
            name: 'Test User',
            email: 'test@example.com',
          },
          token: 'mock-token',
        },
      };
      const loginResponse: LoginResponse = {
        user: {
          id: 'u_001',
          name: 'Test User',
          email: 'test@example.com',
        },
        token: 'mock-token',
      };

      vi.mocked(apiClient.default.post).mockResolvedValue(mockResponse);
      vi.mocked(authDto.toLoginResponse).mockReturnValue(loginResponse);

      const result = await authService.login(loginRequest);

      expect(apiClient.default.post).toHaveBeenCalledWith('/auth/login', loginRequest);
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('auth_token', 'mock-token');
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(loginResponse.user));
      expect(result).toEqual(loginResponse);
    });

    it('should handle API errors gracefully', async () => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };
      const mockError = new Error('Login failed');
      vi.mocked(apiClient.default.post).mockRejectedValue(mockError);

      await expect(authService.login(loginRequest)).rejects.toThrow('Login failed');
    });
  });

  describe('register', () => {
    it('should call API and store token/user in sessionStorage', async () => {
      const registerRequest: RegisterRequest = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };
      const mockResponse = {
        data: {
          user: {
            id: 'u_001',
            name: 'Test User',
            email: 'test@example.com',
          },
          token: 'mock-token',
        },
      };
      const registerResponse: RegisterResponse = {
        user: {
          id: 'u_001',
          name: 'Test User',
          email: 'test@example.com',
        },
        token: 'mock-token',
      };

      vi.mocked(apiClient.default.post).mockResolvedValue(mockResponse);
      vi.mocked(authDto.toRegisterResponse).mockReturnValue(registerResponse);

      const result = await authService.register(registerRequest);

      expect(apiClient.default.post).toHaveBeenCalledWith('/auth/register', registerRequest);
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('auth_token', 'mock-token');
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(registerResponse.user));
      expect(result).toEqual(registerResponse);
    });

    it('should handle API errors gracefully', async () => {
      const registerRequest: RegisterRequest = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };
      const mockError = new Error('Registration failed');
      vi.mocked(apiClient.default.post).mockRejectedValue(mockError);

      await expect(authService.register(registerRequest)).rejects.toThrow('Registration failed');
    });
  });

  describe('getCurrentUser', () => {
    it('should call API and return user', async () => {
      const mockResponse = {
        data: {
          id: 'u_001',
          name: 'Test User',
          email: 'test@example.com',
        },
      };
      const mockUser: User = {
        id: 'u_001',
        name: 'Test User',
        email: 'test@example.com',
      };

      vi.mocked(apiClient.default.get).mockResolvedValue(mockResponse);
      vi.mocked(authDto.toUser).mockReturnValue(mockUser);

      const result = await authService.getCurrentUser();

      expect(apiClient.default.get).toHaveBeenCalledWith('/auth/me');
      expect(result).toEqual(mockUser);
    });

    it('should handle API errors gracefully', async () => {
      const mockError = new Error('Failed to get user');
      vi.mocked(apiClient.default.get).mockRejectedValue(mockError);

      await expect(authService.getCurrentUser()).rejects.toThrow('Failed to get user');
    });
  });

  describe('logout', () => {
    it('should call API and clear sessionStorage', async () => {
      // Set up sessionStorage with data
      mockSessionStorage.setItem('auth_token', 'mock-token');
      mockSessionStorage.setItem('user', JSON.stringify({ id: 'u_001', name: 'Test User' }));

      vi.mocked(apiClient.default.post).mockResolvedValue({ data: {} });

      await authService.logout();

      expect(apiClient.default.post).toHaveBeenCalledWith('/auth/logout');
      expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('auth_token');
      expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('user');
    });

    it('should clear sessionStorage even if API call fails', async () => {
      mockSessionStorage.setItem('auth_token', 'mock-token');
      mockSessionStorage.setItem('user', JSON.stringify({ id: 'u_001', name: 'Test User' }));

      const mockError = new Error('Logout failed');
      vi.mocked(apiClient.default.post).mockRejectedValue(mockError);

      await expect(authService.logout()).rejects.toThrow('Logout failed');
      expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('auth_token');
      expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('user');
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when token exists', () => {
      mockSessionStorage.setItem('auth_token', 'mock-token');

      const result = authService.isAuthenticated();

      expect(result).toBe(true);
    });

    it('should return false when token missing', () => {
      mockSessionStorage.clear();

      const result = authService.isAuthenticated();

      expect(result).toBe(false);
    });
  });

  describe('getStoredUser', () => {
    it('should return parsed user from sessionStorage', () => {
      const user: User = {
        id: 'u_001',
        name: 'Test User',
        email: 'test@example.com',
      };
      mockSessionStorage.setItem('user', JSON.stringify(user));

      const result = authService.getStoredUser();

      expect(result).toEqual(user);
    });

    it('should return null when no user stored', () => {
      mockSessionStorage.clear();

      const result = authService.getStoredUser();

      expect(result).toBeNull();
    });

    it('should handle invalid JSON in sessionStorage', () => {
      mockSessionStorage.setItem('user', 'invalid-json');

      const result = authService.getStoredUser();

      expect(result).toBeNull();
    });
  });

  describe('getStoredToken', () => {
    it('should return token from sessionStorage', () => {
      mockSessionStorage.setItem('auth_token', 'mock-token');

      const result = authService.getStoredToken();

      expect(result).toBe('mock-token');
    });

    it('should return null when no token stored', () => {
      mockSessionStorage.clear();

      const result = authService.getStoredToken();

      expect(result).toBeNull();
    });
  });
});
