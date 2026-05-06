export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profession: string;
  phone: string;
  serviceArea: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  fullName: string;
  profession: string;
  phone: string;
  serviceArea: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
  };
  email: string;
  password: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  date: string;
  time: string;
  duration: string;
  service: string;
  status: 'CONFIRMED' | 'PENDING';
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentFormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  postalCode: string;
  city: string;
  service: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface CalendarDate {
  date: string;
  day: number;
  month: string;
  available: boolean;
  appointments: number;
}