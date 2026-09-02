
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = 'https://nazdeek-fyp.onrender.com/api'; 



const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // HTTP-Only Cookie bhejne ke liye zaroori hai
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Access Token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('API Interceptor Token Error:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Auto-Renew Token on 401 Expiry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Agar 401 error aaye aur yeh retry na hua ho pehle
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token route ko call karke naya access token lein
        const refreshResponse = await axios.get(`${API_BASE_URL}/user-auth/refresh-token`, {
          withCredentials: true,
        });

        const newAccessToken = refreshResponse.data?.accessToken;

        if (newAccessToken) {
          // Naye Token ko SecureStore mein save karein
          await SecureStore.setItemAsync('userToken', newAccessToken);

          // Original request ka header update karke usko wapis execute karein
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Agar Refresh Token bhi expire ho chuka ho to clear karke logout hone dein
        console.log('Refresh token expired or invalid, logging out...');
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userData');
      }
    }

    return Promise.reject(error);
  }
);

export default api;