import { apiClient } from './client';
import type { AdminStats, ApiResponse } from '@/types';

export const adminService = {
  getStats: () =>
    apiClient.get<ApiResponse<AdminStats>>('/admin/stats'),
};
