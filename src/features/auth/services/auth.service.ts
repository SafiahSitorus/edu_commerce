/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */

import apiClient from '@/services/api-client';
import { LoginCredentials, LoginResponse } from '@/types/auth';

export const authService = {
  /**
   * Login user with email and password
   * @param credentials - User login credentials
   * @returns Promise with login response containing token and user data
   */
  loginUser: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>(
        '/auth/loginUser',
        credentials
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user (optional - if backend has logout endpoint)
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Handle logout error silently
      console.error('Logout error:', error);
    }
  },

  /**
   * Get current user profile (optional)
   */
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Refresh token (optional - if backend supports token refresh)
   */
  refreshToken: async (refreshToken: string) => {
    try {
      const response = await apiClient.post('/auth/refresh', { refreshToken });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
