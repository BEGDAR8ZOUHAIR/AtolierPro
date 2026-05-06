export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface AuthResponse {
  user: {
    _id: string;
    fullName: string;
    email: string;
    profession: string;
    phone: string;
  };
  token: string;
}
