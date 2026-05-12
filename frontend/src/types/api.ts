export type UserRole = 'Guest' | 'Student' | 'Profesor' | 'Admin';

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: ApiUser;
}

export interface ActionResponse {
  isSuccess: boolean;
  message: string;
}
