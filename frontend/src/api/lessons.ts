import { apiClient } from './client';
import type { Lesson, ApiResponse } from '@/types';

export const lessonService = {
  getAll: (params?: { category?: string; difficulty?: string; search?: string }) =>
    apiClient.get<ApiResponse<Lesson[]>>('/lessons', { params }),

  getById: (id: number) =>
    apiClient.get<ApiResponse<Lesson>>(`/lessons/${id}`),

  create: (data: Partial<Lesson>) =>
    apiClient.post<ApiResponse<Lesson>>('/lessons', data),

  update: (id: number, data: Partial<Lesson>) =>
    apiClient.put<ApiResponse<Lesson>>(`/lessons/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<ApiResponse<null>>(`/lessons/${id}`),
};
