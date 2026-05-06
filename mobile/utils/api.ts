export const API_URL = "http://192.168.0.155:3000/api";

export const API_ENDPOINTS = {
  auth: {
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
    verifyEmail: `${API_URL}/auth/verify-email`,
    forgotPassword: `${API_URL}/auth/forgot-password`,
    resetPassword: `${API_URL}/auth/reset-password`,
  },
  appointments: {
    list: `${API_URL}/appointments`,
    create: `${API_URL}/appointments`,
    confirm: (id: string) => `${API_URL}/appointments/${id}/confirm`,
    details: (id: string) => `${API_URL}/appointments/${id}`,
  },
} as const;