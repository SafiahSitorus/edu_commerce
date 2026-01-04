/**
 * Authentication Redux Slice
 * Manages authentication state and actions
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/features/auth';
import { storageService } from '@/utils/storage';
import { AuthState, LoginCredentials, LoginResponse, ApiError } from '@/types/auth';

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

/**
 * Async thunk for user login
 */
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: ApiError }
>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.loginUser(credentials);
      
      // Save token and user to localStorage
      storageService.setToken(response.token);
      storageService.setUser(response.user);
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error as ApiError);
    }
  }
);

/**
 * Async thunk for user logout
 */
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      storageService.clearAuth();
    } catch (error: any) {
      // Clear auth even if API call fails
      storageService.clearAuth();
      return rejectWithValue(error);
    }
  }
);

/**
 * Auth slice
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set authentication from localStorage (for app initialization)
    setAuthFromStorage: (state) => {
      const token = storageService.getToken();
      const user = storageService.getUser();
      
      if (token && user) {
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
      }
    },
    
    // Clear authentication state
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      storageService.clearAuth();
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Update user
    updateUser: (state, action: PayloadAction<any>) => {
      state.user = { ...state.user, ...action.payload };
      storageService.setUser(state.user);
    },
  },
  extraReducers: (builder) => {
    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload?.message || 'Login failed';
      });

    // Logout user
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
      });
  },
});

// Export actions
export const { setAuthFromStorage, clearAuth, clearError, updateUser } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
