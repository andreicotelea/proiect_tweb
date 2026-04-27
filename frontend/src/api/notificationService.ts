import { apiClient } from './client';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

interface ActionResponse { isSuccess: boolean; message: string }

export const notificationService = {
  getByUser: (userId: number) => apiClient.get<Notification[]>(`/notifications/user/${userId}`),
  markRead: (id: number) => apiClient.put<ActionResponse>(`/notifications/${id}/read`),
  delete: (id: number) => apiClient.delete(`/notifications/${id}`),
};
