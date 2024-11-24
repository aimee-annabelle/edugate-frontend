import axios from 'axios';
import { useAuthStore } from './authStore';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/edugate';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for handling tokens, errors, etc.
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
