import { apiClient } from './client';

export const healthService = {
  check: () =>
    apiClient.get<{ status: string; timestamp: string }>('/health'),
};
