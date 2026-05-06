import { useState, useEffect, useCallback, useMemo } from 'react';
import { Linking } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { API_URL } from '../utils/api';

export const useAppointments = () => {
  const token = useAuthStore((state) => state.token);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async (refresh = false) => {
    if (!token) {
      setError('Utilisateur non authentifié');
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await fetch(`${API_URL}/appointments/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Impossible de charger les rendez-vous');
      }

      setAppointments(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      if (refresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, [token]);

  const callClient = useCallback(async (phone: string) => {
    try {
      await Linking.openURL(`tel:${phone}`);
    } catch {
      setError('Impossible de lancer l’appel');
    }
  }, []);

  const appointmentsByDate = useMemo(() => {
    return appointments.reduce<Record<string, any[]>>((acc, appt) => {
      const key = new Date(appt.appointmentDate).toISOString().split('T')[0];
      if (!acc[key]) acc[key] = [];
      acc[key].push(appt);
      return acc;
    }, {});
  }, [appointments]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    loading,
    refreshing,
    error,
    fetchAppointments,
    callClient,
    appointmentsByDate,
    setAppointments,
  };
};