import { apiClient } from './client';
import type { UserProgress, ApiResponse } from '@/types';

export const progressService = {
  getByUser: (userId: number) =>
    apiClient.get<ApiResponse<UserProgress[]>>(`/progress/${userId}`),

  update: (data: Partial<UserProgress>) =>
    apiClient.post<ApiResponse<UserProgress>>('/progress', data),

  enroll: (data: { userId: number; lessonId: number }) =>
    apiClient.post('/progress/enroll', data),
};
