import { apiClient } from './client';

interface ActionResponse { isSuccess: boolean; message: string }

export const certificateService = {
  getAll: () => apiClient.get('/certificates'),
  getById: (id: number) => apiClient.get(`/certificates/${id}`),
  create: (data: any) => apiClient.post<ActionResponse>('/certificates', data),
  update: (id: number, data: any) => apiClient.put<ActionResponse>(`/certificates/${id}`, data),
  delete: (id: number) => apiClient.delete(`/certificates/${id}`),
};
