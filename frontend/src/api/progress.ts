import { apiClient } from './client';
import type { UserProgress, ApiResponse } from '@/types';

export const progressService = {
  getByUser: (userId: number) =>
    apiClient.get<ApiResponse<UserProgress[]>>(`/progress/${userId}`),

  update: (data: { userId: number; lessonId: number; percentComplete: number }) =>
    apiClient.post('/progress', { userId: data.userId, lessonId: data.lessonId, percent: data.percentComplete }),

  enroll: (data: { userId: number; lessonId: number }) =>
    apiClient.post('/progress/enroll', data),

  unenroll: (userId: number, lessonId: number) =>
    apiClient.delete(`/progress/${userId}/${lessonId}`),
};
