import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { ApiError } from "@/types/api";

const API_BASE_URL = "/api";

/** Get auth token from session storage */
function getAuthToken(): string | null {
  return sessionStorage.getItem("auth_token");
}

/** Create axios instance with default configuration */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/** Request interceptor to add auth token */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/** Response interceptor for error handling */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      const { status, data } = error.response;
      const requestUrl = error.config?.url || "";

      // Check if this is an auth endpoint (login/register should not redirect)
      const isAuthEndpoint = requestUrl.includes("/auth/login") || requestUrl.includes("/auth/register");

      // Handle 401 Unauthorized - clear auth and redirect (but not for auth endpoints)
      if (status === 401 && !isAuthEndpoint) {
        sessionStorage.removeItem("auth_token");
        sessionStorage.removeItem("user");
        window.location.href = "/";
      }

      // Return structured error with proper message
      const apiError: ApiError = {
        message: data?.message || error.message || "An error occurred",
        code: data?.code || "UNKNOWN_ERROR",
        status,
        details: data?.details,
      };

      return Promise.reject(apiError);
    }

    // Network error or timeout
    const networkError: ApiError = {
      message: error.message || "Network error",
      code: "NETWORK_ERROR",
      status: 0,
    };

    return Promise.reject(networkError);
  }
);

export default apiClient;
