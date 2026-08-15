import api from './axiosInstance';


export const getNotificationsApi = async (recipientId) => {
  try {
    const response = await api.get(`/notifications/${recipientId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const markNotificationAsReadApi = async (notificationId) => {
  try {
    const response = await api.put(`/notifications/read/${notificationId}`);
    return response.data;
  } catch (error) {
    console.error('Error marking as read:', error);
    throw error;
  }
};

export const clearAllNotificationsApi = async (recipientId) => {
  try {
    const response = await api.delete(`/notifications/clear/${recipientId}`);
    return response.data;
  } catch (error) {
    console.error('Error clearing notifications:', error);
    throw error;
  }
};