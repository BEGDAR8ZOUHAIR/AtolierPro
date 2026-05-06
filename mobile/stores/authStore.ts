import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/api";
import { User, AuthState, LoginCredentials, RegisterCredentials } from "../types";

interface AuthActions {
  register: (
    fullName: string,
    profession: string,
    phone: string,
    serviceArea: string,
    address: string,
    postalCode: string,
    city: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; email?: string; error?: string }>;

  verifyEmail: (otp: string) => Promise<{ success: boolean; error?: string }>;

  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;

  checkAuth: () => Promise<void>;

  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,

  register: async (
    fullName,
    profession,
    phone,
    serviceArea,
    address,
    postalCode,
    city,
    email,
    password
  ) => {
    set({ isLoading: true });
    const username = fullName
      ? fullName.trim().replace(/\s+/g, "").toLowerCase()
      : email.split("@")[0];

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          profession,
          phone,
          serviceArea,
          address,
          postalCode,
          city,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      // Don't store token yet - wait for email verification
      set({ isLoading: false });

      return { success: true, email: data.email };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: (error as Error).message };
    }
  },

  verifyEmail: async (otp) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Invalid code");

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({
        token: data.token,
        user: data.user,
        isLoading: false,
        isAuthenticated: true
      });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: (error as Error).message };
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({
        token: data.token,
        user: data.user,
        isLoading: false,
        isAuthenticated: true
      });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: (error as Error).message };
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;

      set({
        token,
        user,
        isAuthenticated: !!token
      });
    } catch (error) {
      console.log("Auth check failed", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    set({
      token: null,
      user: null,
      isAuthenticated: false
    });
  },
}));