
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


//LAPTOP IPADRESS
//const API_BASE_URL = 'https://nazdeek-fyp.onrender.com/api'; 

// my laptop
const API_BASE_URL = 'http://10.37.247.200:3000/api';

//OFFICE IPADRESS
//const API_BASE_URL = 'http://10.37.247.122:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const storedRefreshToken = await SecureStore.getItemAsync('refreshToken');

        if (!storedRefreshToken) {
          throw new Error("No refresh token stored");
        }

        const refreshResponse = await axios.post(`${API_BASE_URL}/user-auth/refresh-token`, {
          refreshToken: storedRefreshToken
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data;

        if (newAccessToken) {
          await SecureStore.setItemAsync('userToken', newAccessToken);
          if (newRefreshToken) {
            await SecureStore.setItemAsync('refreshToken', newRefreshToken);
          }

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.log('Refresh token expired (7 days inactive), forcing logout...');
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('refreshToken');
        await SecureStore.deleteItemAsync('userData');
      }
    }

    return Promise.reject(error);
  }
);

export default api;