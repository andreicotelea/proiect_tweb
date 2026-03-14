import { apiClient } from './client';
import type { LoginRequest, RegisterRequest, AuthResponse, ApiResponse } from '@/types';

export const authService = {
  login: (data: LoginRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data),

  register: (data: RegisterRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data),

  logout: () =>
    apiClient.post<ApiResponse<null>>('/auth/logout'),

  me: () =>
    apiClient.get<ApiResponse<AuthResponse>>('/auth/me'),
};
