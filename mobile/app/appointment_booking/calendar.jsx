import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../../constants/api";
import COLORS from "../../constants/colors";
import styles from "../../assets/styles/calendar.styles";

export default function CalendarScreen() {
  const router = useRouter();
  const { token } = useAuthStore();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [busyDates, setBusyDates] = useState([]);
  const [loading, setLoading] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const dayHeaders = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];

  // Fetch busy dates whenever month changes
  useEffect(() => {
    fetchBusyDates();
  }, [year, month]);

  const fetchBusyDates = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/appointments/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch");
      const appointments = await response.json();

      // Build list of date strings that already have appointments
      const busy = appointments.map(a => {
        const d = new Date(a.appointmentDate);
        return d.toISOString().split("T")[0];
      });
      setBusyDates([...new Set(busy)]);
    } catch (err) {
      console.log("Could not fetch busy dates", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDaySelect = (day) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return; // prevent past dates

    const dateStr = date.toISOString().split("T")[0];
    if (busyDates.includes(dateStr)) return; // prevent busy dates

    setSelectedDate(date);
  };

  const handleNext = () => {
    if (!selectedDate) {
      return Alert.alert("Erreur", "Veuillez choisir une date avant de continuer");
    }

    router.push({
      pathname: "/appointment_booking/time",
      params: { date: selectedDate.toISOString() },
    });
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // French calendar: Monday = 0. getDay() returns 0=Sun,1=Mon... so we convert
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0=Sun
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // convert to Mon=0

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choisissez une date</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.calendarCard}>
        {/* Subtitle */}
        <Text style={styles.subtitle}>Sélectionnez une date parmi les disponibilités.</Text>

        {/* Month Selector */}
        <View style={styles.monthSelector}>
          <TouchableOpacity style={styles.monthNavButton} onPress={handlePrevMonth}>
            <Text style={styles.monthNavText}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.monthLabel}>{monthNames[month]} {year}</Text>
          <TouchableOpacity style={styles.monthNavButton} onPress={handleNextMonth}>
            <Text style={styles.monthNavText}>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Day Headers */}
        <View style={styles.daysHeader}>
          {dayHeaders.map((day, index) => (
            <View key={index} style={styles.dayHeaderItem}>
              <Text style={styles.dayHeaderText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {/* Empty cells for offset */}
          {Array.from({ length: startOffset }).map((_, i) => (
            <View key={`empty-${i}`} style={styles.dayItem} />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const date = new Date(year, month, day);
            const dateStr = date.toISOString().split("T")[0];
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            const isBusy = busyDates.includes(dateStr);
            const isPast = date < today;
            const isAvailable = !isBusy && !isPast;

            return (
              <TouchableOpacity
                key={`day-${day}`}
                style={[
                  styles.dayItem,
                  isSelected && styles.dayItemSelected,
                  isToday && !isSelected && styles.dayItemToday,
                  isPast && styles.dayItemPast,
                ]}
                onPress={() => handleDaySelect(day)}
                disabled={isBusy || isPast}
              >
                <Text
                  style={[
                    styles.dayNumber,
                    isSelected && styles.dayNumberSelected,
                    isToday && !isSelected && styles.dayNumberToday,
                    isPast && styles.dayNumberPast,
                  ]}
                >
                  {day}
                </Text>
                {/* Dot indicator */}
                {isBusy && !isSelected && <View style={styles.busyDot} />}
                {isAvailable && !isSelected && <View style={styles.availableDot} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Legend */}
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.legendDotAvailable]} />
            <Text style={styles.legendText}>DISPONIBLE</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.legendDotBusy]} />
            <Text style={styles.legendText}>COMPLET</Text>
          </View>
        </View>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={[styles.nextButton, !selectedDate && styles.nextButtonDisabled]}
        onPress={handleNext}
        disabled={!selectedDate}
      >
        <Text style={styles.nextButtonText}>Suivant</Text>
      </TouchableOpacity>
    </View>
  );
}
