/**
 * LocalStorage Utility for Token Management
 * Handles storing and retrieving authentication token
 */

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const storageService = {
  /**
   * Save token to localStorage
   */
  setToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(TOKEN_KEY, token);
      } catch (error) {
        console.error('Error saving token to localStorage:', error);
      }
    }
  },

  /**
   * Get token from localStorage
   */
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(TOKEN_KEY);
      } catch (error) {
        console.error('Error getting token from localStorage:', error);
        return null;
      }
    }
    return null;
  },

  /**
   * Remove token from localStorage
   */
  removeToken: (): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(TOKEN_KEY);
      } catch (error) {
        console.error('Error removing token from localStorage:', error);
      }
    }
  },

  /**
   * Save user data to localStorage
   */
  setUser: (user: any): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } catch (error) {
        console.error('Error saving user to localStorage:', error);
      }
    }
  },

  /**
   * Get user data from localStorage
   */
  getUser: (): any | null => {
    if (typeof window !== 'undefined') {
      try {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
      } catch (error) {
        console.error('Error getting user from localStorage:', error);
        return null;
      }
    }
    return null;
  },

  /**
   * Remove user data from localStorage
   */
  removeUser: (): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(USER_KEY);
      } catch (error) {
        console.error('Error removing user from localStorage:', error);
      }
    }
  },

  /**
   * Clear all auth data from localStorage
   */
  clearAuth: (): void => {
    storageService.removeToken();
    storageService.removeUser();
  },

  /**
   * Check if user is authenticated (has valid token)
   */
  isAuthenticated: (): boolean => {
    return !!storageService.getToken();
  },
};
