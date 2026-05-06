import { useState } from 'react';
import { TimeSlot, CalendarDate, AppointmentFormData } from '../types';
import { API_ENDPOINTS } from '../utils/api';

export const useBooking = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<'date' | 'time' | 'client' | 'confirm'>('date');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAppointment = async (formData: AppointmentFormData): Promise<{ success: boolean; error?: string }> => {
    if (!selectedDate || !selectedTime) {
      return { success: false, error: 'Date et heure doivent être sélectionnées' };
    }

    setLoading(true);
    setError(null);

    try {
      const appointmentData = {
        ...formData,
        date: selectedDate,
        time: selectedTime,
        duration: '1h30',
        status: 'PENDING',
      };

      const response = await fetch(API_ENDPOINTS.appointments.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error('Failed to create appointment');
      }

      return { success: true };
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setStep('date');
    setError(null);
  };

  return {
    selectedDate,
    selectedTime,
    step,
    loading,
    error,
    setSelectedDate,
    setSelectedTime,
    setStep,
    createAppointment,
    resetBooking,
  };
};