import axios from 'axios';
import { API_URL } from '../config/constants';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

// Interceptor for attaching auth token and short-circuiting localhost calls on cloud/Vercel deployments
api.interceptors.request.use(
  (config) => {
    if (
      typeof window !== 'undefined' &&
      API_URL.includes('localhost') &&
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1'
    ) {
      return Promise.reject(new Error('Cloud demo mode: skipping localhost API call'));
    }

    const token = localStorage.getItem('earth_admin_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for handling response and 401s
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = localStorage.getItem('earth_admin_token');
    if (
      error.response &&
      error.response.status === 401 &&
      token !== 'local-super-admin-token'
    ) {
      // If unauthorized and currently in admin section, clean token and redirect
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('earth_admin_token');
        localStorage.removeItem('earth_admin_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
