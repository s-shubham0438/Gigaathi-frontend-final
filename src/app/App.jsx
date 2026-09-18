import React, { useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from './router/AppRoutes';
import { useTheme } from '../shared/hooks/useTheme';
import { getCurrentUser } from '../features/auth/state/authSlice';

export const App = () => {
  useTheme();

  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.auth.initialized);
  const hasCheckedSession = useRef(false);

  useEffect(() => {
    if (hasCheckedSession.current) return;
    hasCheckedSession.current = true;

    const hasSession = localStorage.getItem('hasSession');

    if (hasSession === 'true') {
      dispatch(getCurrentUser());

      // Safety fallback: if backend is unreachable, render the app within 2.5s
      const safetyTimer = setTimeout(() => {
        dispatch({ type: 'auth/initializeWithoutSession' });
      }, 2500);
      return () => clearTimeout(safetyTimer);
    } else {
      // User is not logged in, so no need to call /auth/me
      // This avoids unnecessary 401 errors on first page load.
      dispatch({ type: 'auth/initializeWithoutSession' });
    }
  }, [dispatch]);

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;