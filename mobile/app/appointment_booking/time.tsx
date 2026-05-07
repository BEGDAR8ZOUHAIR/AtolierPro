import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator , StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../../constants/api";
import COLORS from "../../constants/colors";

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
      {/* ── Title + Subtitle ── */}
            <Text style={styles.title}>Choisissez un créneau</Text>
            <Text style={styles.subtitle}>Créneaux affichés en heure locale (Paris)</Text>

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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
    marginTop : 20
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: -0.3,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  timeSlot: {
    width: "48%",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  timeSlotSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },
  timeSlotTextSelected: {
    color: COLORS.white,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 9999,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  nextButtonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 16,
    textAlign: "center",
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backText: {
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
});

