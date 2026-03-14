import { apiClient } from './client';
import type { Category, ApiResponse } from '@/types';

export const categoryService = {
  getAll: () =>
    apiClient.get<ApiResponse<Category[]>>('/categories'),

  create: (data: Partial<Category>) =>
    apiClient.post<ApiResponse<Category>>('/categories', data),

  update: (id: number, data: Partial<Category>) =>
    apiClient.put<ApiResponse<Category>>(`/categories/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<ApiResponse<null>>(`/categories/${id}`),
};
