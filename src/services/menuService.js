import axios from 'axios';
import { API_URL } from './url';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Set up axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("auth_token");
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Menu Management Services
export const createMenu = async (menuData) => {
  try {
    const response = await api.post('/menu', menuData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: error.message };
  }
};

export const getAllMenus = async (vendorId = null) => {
  try {
    const url = vendorId ? `/api/menus?vendor_id=${vendorId}` : '/api/menus';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: error.message };
  }
};

export const getMenuById = async (id) => {
  try {
    const response = await api.get(`/api/menus/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: error.message };
  }
};

export const updateMenu = async (id, menuData) => {
  try {
    const response = await api.put(`/api/menus/${id}`, menuData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: error.message };
  }
};

export const deleteMenu = async (id) => {
  try {
    const response = await api.delete(`/api/menus/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: error.message };
  }
};