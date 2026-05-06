import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../../constants/api";
import COLORS from "../../constants/colors";
import styles from "../../assets/styles/time.styles";

export default function TimeSlotScreen() {
  const router = useRouter();
  const { date: dateString } = useLocalSearchParams();
  const { token } = useAuthStore();

  const selectedDate = new Date(dateString);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);

  // Available time slots formatted as hhmm (French style)
  const availableTimeSlots = [
    "09h00", "09h30", "10h00", "10h30",
    "12h00", "12h30",
    "14h00", "14h30",
    "16h00", "17h30"
  ];

  useEffect(() => {
    fetchBusyTimes();
  }, [dateString]);

  const fetchBusyTimes = async () => {
    try {
      setLoading(true);

      // Get all appointments to check which time slots are busy
      const response = await fetch(`${API_URL}/appointments/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const appointments = await response.json();

      // Filter appointments for the selected date
      const selectedDateStr = selectedDate.toISOString().split("T")[0];
      const busyAppointments = appointments.filter(
        appt => appt.appointmentDate.startsWith(selectedDateStr)
      );

      // Extract busy time strings
      const busyTimes = busyAppointments.map(appt => appt.appointmentTime);

      // Update available slots
      const available = availableTimeSlots.filter(time => !busyTimes.includes(time));
      setTimeSlots(available);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger les créneaux disponibles");
      // Fallback to all available slots if fetch fails
      setTimeSlots(availableTimeSlots);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    if (!selectedTime) {
      return Alert.alert("Erreur", "Veuillez choisir un créneau avant de continuer");
    }

    router.push({
      pathname: "/appointment_booking/client_info",
      params: {
        date: dateString,
        time: selectedTime,
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (timeSlots.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun créneau disponible pour ce jour</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Choisir une autre date</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.headerNavText}>{"<"}</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Choisissez un créneau</Text>
          <Text style={styles.subtitle}>Créneaux affichés en heure locale (Paris)</Text>
        </View>
      </View>

      {/* Date Info */}
      <View style={styles.dateInfo}>
        <Text style={styles.dateText}>
          {selectedDate.toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>

      {/* Time Slot Grid */}
      <View style={styles.timeGrid}>
        {timeSlots.map((time, index) => {
          const isSelected = selectedTime === time;

          return (
            <TouchableOpacity
              key={`time-${index}`}
              style={[
                styles.timeSlot,
                isSelected && styles.timeSlotSelected,
              ]}
              onPress={() => handleTimeSelect(time)}
            >
              <Text
                style={[
                  styles.timeSlotText,
                  isSelected && styles.timeSlotTextSelected,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendAvailableDot]} />
          <Text style={styles.legendText}>Disponible</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendBookedDot]} />
          <Text style={styles.legendText}>Complet</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.nextButton, !selectedTime && styles.nextButtonDisabled]}
        onPress={handleNext}
        disabled={!selectedTime}
      >
        <Text style={styles.nextButtonText}>Suivant</Text>
      </TouchableOpacity>
    </View>
  );
}
