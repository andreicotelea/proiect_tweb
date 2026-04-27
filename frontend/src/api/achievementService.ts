import { apiClient } from './client';
import type { Achievement } from '@/types';

export const achievementService = {
  getAll: () => apiClient.get<Achievement[]>('/achievements'),
  getById: (id: number) => apiClient.get<Achievement>(`/achievements/${id}`),
};
