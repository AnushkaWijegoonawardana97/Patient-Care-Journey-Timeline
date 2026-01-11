import type { UserDTO, LoginResponseDTO, RegisterResponseDTO } from "@/dto/auth.dto";

/** Mock credentials for login validation */
export const mockCredentials = {
  email: "maria.santos@example.com",
  password: "password123",
};

/** Mock user data */
export const mockUser: UserDTO = {
  id: "usr_001",
  email: "maria.santos@example.com",
  name: "Maria Santos",
  avatar_url:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
};

/** Mock login response */
export const mockLoginResponse: LoginResponseDTO = {
  user: mockUser,
  token: "mock_jwt_token_12345",
  expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

/** Mock register response */
export const mockRegisterResponse: RegisterResponseDTO = {
  user: mockUser,
  token: "mock_jwt_token_12345",
  expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};
