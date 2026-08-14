import api from './axiosInstance';


export const getNotificationsApi = async (recipientId) => {
  try {
    const response = await api.get(`/notifications/${recipientId}`);
    console.log('notifications ' , response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const markAllasRead = async (recipientId) => {
  try {
    const response = await api.put(`/notifications/read/${recipientId}`);
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