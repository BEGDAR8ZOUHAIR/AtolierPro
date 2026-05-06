export type AppointmentStatus = "CONFIRMÉ" | "EN ATTENTE";

export interface Appointment {
  _id: string;
  clientName: string;
  clientPhone: string;
  appointmentDate: string;
  appointmentTime: string;
  duration?: string;
  service: string;
  address: string;
  status: AppointmentStatus;
  email?: string;
  motif?: string;
}

export interface AppointmentsByDate {
  [dateStr: string]: Appointment[];
}
