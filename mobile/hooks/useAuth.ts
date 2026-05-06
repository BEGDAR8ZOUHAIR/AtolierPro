import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    isCheckingAuth,
    login,
    register,
    verifyEmail,
    logout,
    checkAuth,
  } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    isCheckingAuth,
    login,
    register,
    verifyEmail,
    logout,
  };
};