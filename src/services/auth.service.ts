import apiClient from "./api";
import type { User, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/types/auth";
import {
  toLoginRequestDTO,
  toLoginResponse,
  toRegisterRequestDTO,
  toRegisterResponse,
  toUser,
  type LoginResponseDTO,
  type RegisterResponseDTO,
  type UserDTO,
} from "@/dto/auth.dto";

/** Auth service for handling authentication operations */
export const authService = {
  /** Login user with email and password */
  async login(request: LoginRequest): Promise<LoginResponse> {
    const dto = toLoginRequestDTO(request);
    const response = await apiClient.post<LoginResponseDTO>("/auth/login", dto);
    const result = toLoginResponse(response.data);

    // Store auth data in session storage
    sessionStorage.setItem("auth_token", result.token);
    sessionStorage.setItem("user", JSON.stringify(result.user));

    return result;
  },

  /** Register new user */
  async register(request: RegisterRequest): Promise<RegisterResponse> {
    const dto = toRegisterRequestDTO(request);
    const response = await apiClient.post<RegisterResponseDTO>("/auth/register", dto);
    const result = toRegisterResponse(response.data);

    // Store auth data in session storage
    sessionStorage.setItem("auth_token", result.token);
    sessionStorage.setItem("user", JSON.stringify(result.user));

    return result;
  },

  /** Get current authenticated user */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<UserDTO>("/auth/me");
    return toUser(response.data);
  },

  /** Logout user and clear session */
  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      sessionStorage.removeItem("auth_token");
      sessionStorage.removeItem("user");
    }
  },

  /** Check if user is authenticated (local check) */
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem("auth_token");
  },

  /** Get stored user from session storage */
  getStoredUser(): User | null {
    const userJson = sessionStorage.getItem("user");
    if (!userJson) return null;
    try {
      return JSON.parse(userJson) as User;
    } catch {
      return null;
    }
  },

  /** Get stored token from session storage */
  getStoredToken(): string | null {
    return sessionStorage.getItem("auth_token");
  },
};

export default authService;
