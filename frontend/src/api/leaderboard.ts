import { apiClient } from './client';
import type { LeaderboardEntry, ApiResponse } from '@/types';

export const leaderboardService = {
  getAll: () =>
    apiClient.get<ApiResponse<LeaderboardEntry[]>>('/leaderboard'),
};
