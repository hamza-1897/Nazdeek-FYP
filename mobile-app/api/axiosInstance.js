
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


//LAPTOP IPADRESS
//const API_BASE_URL = 'https://nazdeek-fyp.onrender.com/api'; 

// my laptop
const API_BASE_URL = 'http://10.37.247.200:3000/api';

//OFFICE IPADRESS
const API_BASE_URL = 'http://10.37.247.122:3000/api';


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
      } else {
        console.warn(' SecureStore  token not found.');
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
    if (error.response && error.response.status === 401) {
      console.log(' Token expire or invalid .');
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('userData');
    }
    return Promise.reject(error);
  }
);

export default api;