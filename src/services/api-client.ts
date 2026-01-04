/**
 * Axios Instance Configuration
 * Configured HTTP client with interceptors for authentication
 */

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { NEXT_PUBLIC_API_URL } from '@/config/env';
import { storageService } from '@/utils/storage';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor - Add token to requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storageService.getToken();
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401) {
      storageService.clearAuth();
      // Redirect to login page if needed
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    // Handle other errors
    const errorMessage = 
      (error.response?.data as any)?.message || 
      error.message || 
      'An unexpected error occurred';

    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      errors: (error.response?.data as any)?.errors,
    });
  }
);

export default apiClient;
