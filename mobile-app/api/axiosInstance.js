import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {AuthContext} from '../context/AuthContext';
import { useContext } from 'react';



//LAPTOP IPADRESS
const API_BASE_URL = 'https://nazdeek-fyp.onrender.com/api'; 

//Malaika Laptop IPAdress
//const API_BASE_URL = 'http://192.168.10.10:3000/api'; 

//OFFICE IPADRESS
//const API_BASE_URL = 'http://192.168.1.14:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Token expire or invalid. User logout.');
      
      await SecureStore.deleteItemAsync('userToken');
    }
    return Promise.reject(error);
  }
);

export default api;