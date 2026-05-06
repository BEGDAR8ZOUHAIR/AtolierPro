export interface User {
  _id: string;
  fullName: string;
  email: string;
  profession: string;
  phone: string;
  profileImage?: string;
  serviceArea?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
}

export interface AuthStore extends AuthState {
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
  ) => Promise<{ success: boolean; error?: string; email?: string }>;
  verifyEmail: (
    otp: string
  ) => Promise<{ success: boolean; error?: string }>;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}
