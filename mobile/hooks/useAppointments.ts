import { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { API_ENDPOINTS } from '../utils/api';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.appointments.list, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }

      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const confirmAppointment = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(API_ENDPOINTS.appointments.confirm(id), {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        return false;
      }

      // Update local state
      setAppointments(prev =>
        prev.map(appointment =>
          appointment.id === id
            ? { ...appointment, status: 'CONFIRMED' as const }
            : appointment
        )
      );

      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchAppointments();
    }
  }, []);

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    confirmAppointment,
  };
};