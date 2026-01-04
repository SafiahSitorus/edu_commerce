/**
 * Redux Store Provider
 * Wraps the application with Redux store
 */

'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { useEffect } from 'react';
import { setAuthFromStorage } from '@/store/features/authSlice';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize auth state from localStorage on app mount
    store.dispatch(setAuthFromStorage());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
