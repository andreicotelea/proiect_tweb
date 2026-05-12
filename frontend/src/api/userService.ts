import { apiClient } from './client';

interface ActionResponse { isSuccess: boolean; message: string }

export const userService = {
  updateProfile: (id: number, data: { name: string; email: string; avatar: string }) =>
    apiClient.put<ActionResponse>(`/users/${id}/profile`, data),

  changePassword: (id: number, data: { currentPassword: string; newPassword: string }) =>
    apiClient.put<ActionResponse>(`/users/${id}/password`, data),

  getAll: () =>
    apiClient.get('/users'),

  getById: (id: number) =>
    apiClient.get(`/users/${id}`),

  delete: (id: number) =>
    apiClient.delete(`/users/${id}`),
};
