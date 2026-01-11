import type { User, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/types/auth";

/** Login request DTO */
export interface LoginRequestDTO {
  email: string;
  password: string;
  remember_me?: boolean;
}

/** Login response DTO from API */
export interface LoginResponseDTO {
  user: {
    id: string;
    email: string;
    name: string;
    avatar_url?: string;
  };
  token: string;
  expires_at: string;
}

/** Register request DTO */
export interface RegisterRequestDTO {
  name: string;
  email: string;
  password: string;
}

/** Register response DTO from API */
export interface RegisterResponseDTO {
  user: {
    id: string;
    email: string;
    name: string;
    avatar_url?: string;
  };
  token: string;
  expires_at: string;
}

/** User DTO from API */
export interface UserDTO {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
}

/** Transform API user to domain User */
export function toUser(dto: UserDTO): User {
  return {
    id: dto.id,
    email: dto.email,
    name: dto.name,
    avatarUrl: dto.avatar_url,
  };
}

/** Transform domain LoginRequest to API DTO */
export function toLoginRequestDTO(request: LoginRequest): LoginRequestDTO {
  return {
    email: request.email,
    password: request.password,
    remember_me: request.rememberMe,
  };
}

/** Transform API LoginResponse DTO to domain */
export function toLoginResponse(dto: LoginResponseDTO): LoginResponse {
  return {
    user: toUser(dto.user),
    token: dto.token,
    expiresAt: dto.expires_at,
  };
}

/** Transform domain RegisterRequest to API DTO */
export function toRegisterRequestDTO(request: RegisterRequest): RegisterRequestDTO {
  return {
    name: request.name,
    email: request.email,
    password: request.password,
  };
}

/** Transform API RegisterResponse DTO to domain */
export function toRegisterResponse(dto: RegisterResponseDTO): RegisterResponse {
  return {
    user: toUser(dto.user),
    token: dto.token,
    expiresAt: dto.expires_at,
  };
}
