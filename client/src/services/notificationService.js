import api from './api';

export const getNotifications = (userId) => api.get(`/api/notifications/${userId}`);
export const getUnreadCount = (userId) => api.get(`/api/notifications/${userId}/unreadCount`);
export const markAsRead = (notificationId) => api.patch(`/api/notifications/${notificationId}/read`);
