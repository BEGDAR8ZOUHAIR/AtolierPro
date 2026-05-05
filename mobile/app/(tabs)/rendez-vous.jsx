import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Linking } from "react-native";
import styles from "../../assets/styles/appointments.styles";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../../constants/api";
import COLORS from "../../constants/colors";

export default function AppointmentsScreen() {
  const [view, setView] = useState("list"); // 'list' or 'calendar'
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { token } = useAuthStore();
  const router = useRouter();

  const fetchAppointments = async (refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else setLoading(true);

      const response = await fetch(`${API_URL}/appointments/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setAppointments(data);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger les rendez-vous");
    } finally {
      if (refresh) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setRefreshing(false);
      } else setLoading(false);
    }
  };

  // Calendar helpers
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  const dayHeaders = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  // Group appointments by date
  const appointmentsByDate = appointments.reduce((acc, appt) => {
    const dateStr = new Date(appt.appointmentDate).toISOString().split("T")[0];
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(appt);
    return acc;
  }, {});

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleDayPress = (day) => {
    const dateStr = new Date(year, month, day).toISOString().split("T")[0];
    if (appointmentsByDate[dateStr]) {
      setSelectedDate(new Date(year, month, day));
      setSelectedAppointment(appointmentsByDate[dateStr]);
      setModalVisible(true);
    }
  };

  const renderCalendarView = () => (
    <View style={styles.calendarContainer}>
      {/* Month Navigation */}
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
        {Array.from({ length: startOffset }).map((_, i) => (
          <View key={`empty-${i}`} style={styles.dayItem} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateStr = new Date(year, month, day).toISOString().split("T")[0];
          const hasAppointments = appointmentsByDate[dateStr];
          const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

          return (
            <TouchableOpacity
              key={`day-${day}`}
              style={[
                styles.dayItem,
                hasAppointments && styles.dayWithAppointments,
                isToday && styles.dayToday,
              ]}
              onPress={() => handleDayPress(day)}
              disabled={!hasAppointments}
            >
              <Text style={[
                styles.dayNumber,
                hasAppointments && styles.dayNumberWithAppointments,
                isToday && styles.dayNumberToday,
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleConfirm = async (id) => {
    try {
      const response = await fetch(`${API_URL}/appointments/${id}/confirm`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: "CONFIRMÉ" } : appt
        )
      );
    } catch (error) {
      Alert.alert("Erreur", "Impossible de confirmer le rendez-vous");
    }
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const renderAppointmentItem = ({ item }) => {
    const appointmentDate = new Date(item.appointmentDate);
    const month = appointmentDate.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase();
    const day = appointmentDate.getDate();
    const isConfirmed = item.status === "CONFIRMÉ";

    return (
      <View style={[
        styles.appointmentCard,
        { borderLeftColor: isConfirmed ? "transparent" : COLORS.pending }
      ]}>
        <View style={styles.cardContent}>
          {/* Date Badge */}
          <View style={styles.dateBadge}>
            <Text style={styles.dateBadgeMonth}>{month}</Text>
            <Text style={styles.dateBadgeDay}>{day}</Text>
          </View>

          {/* Appointment Info */}
          <View style={styles.appointmentInfo}>
            {/* Header: Client Name + Status Badge */}
            <View style={styles.cardHeader}>
              <Text style={styles.clientName}>{item.clientName}</Text>
              <View style={[
                styles.statusBadge,
                isConfirmed ? styles.statusBadgeConfirmed : styles.statusBadgePending
              ]}>
                <Text style={[
                  styles.statusBadgeText,
                  isConfirmed ? styles.statusTextConfirmed : styles.statusTextPending
                ]}>
                  {item.status}
                </Text>
              </View>
            </View>

            {/* Time with icon */}
            <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} />
              <Text style={styles.timeText}>
                {item.appointmentTime} • {item.duration || "1h30"}
              </Text>
            </View>

            {/* Service (bold) */}
            <Text style={styles.serviceText}>{item.service}</Text>

            {/* Address (gray) */}
            <Text style={styles.addressText}>{item.address}</Text>

            {/* Action Buttons */}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.buttonGhost}
                onPress={() => router.push(`/appointment_details?id=${item._id}`)}
              >
                <Text style={styles.buttonTextGhost}>Détails</Text>
              </TouchableOpacity>

              {isConfirmed ? (
                <TouchableOpacity
                  style={styles.buttonCall}
                  onPress={() => handleCall(item.clientPhone)}
                >
                  <Ionicons name="call-outline" size={16} color={COLORS.white} />
                  <Text style={styles.buttonTextCall}>Appeler</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.buttonConfirm}
                  onPress={() => handleConfirm(item._id)}
                >
                  <Text style={styles.buttonTextConfirm}>Confirmer</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

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
        <Text style={styles.headerTitle}>Mes rendez-vous</Text>
        <TouchableOpacity onPress={() => router.push("/appointments/schedule")}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Toggle View */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            view === "list" && styles.toggleButtonActive,
          ]}
          onPress={() => setView("list")}
        >
          <Text
            style={[
              styles.toggleText,
              view === "list" && styles.toggleTextActive,
            ]}
          >
            Vue liste
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            view === "calendar" && styles.toggleButtonActive,
          ]}
          onPress={() => setView("calendar")}
        >
          <Text
            style={[
              styles.toggleText,
              view === "calendar" && styles.toggleTextActive,
            ]}
          >
            Vue calendrier
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conditional View */}
      {view === "list" ? (
        <FlatList
          data={appointments}
          renderItem={renderAppointmentItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchAppointments(true)}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={50} color={COLORS.textSecondary} />
              <Text style={styles.emptyText}>Aucun rendez-vous</Text>
              <Text style={styles.emptySubtext}>
                Commencez à planifier votre emploi du temps
              </Text>
            </View>
          }
        />
      ) : (
        renderCalendarView()
      )}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/appointment_booking/calendar")}
      >
        <Ionicons name="add" size={32} color={COLORS.white} />
      </TouchableOpacity>

      {/* Appointment Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedAppointment && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {selectedDate?.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={24} color={COLORS.textPrimary} />
                  </TouchableOpacity>
                </View>

                {selectedAppointment.map((appt, index) => (
                  <View key={index} style={styles.modalCard}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.clientName}>{appt.clientName}</Text>
                      <View style={[
                        styles.statusBadge,
                        appt.status === "CONFIRMÉ" ? styles.statusBadgeConfirmed : styles.statusBadgePending
                      ]}>
                        <Text style={[
                          styles.statusBadgeText,
                          appt.status === "CONFIRMÉ" ? styles.statusTextConfirmed : styles.statusTextPending
                        ]}>
                          {appt.status}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.timeRow}>
                      <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} />
                      <Text style={styles.timeText}>{appt.appointmentTime} • {appt.duration || "1h30"}</Text>
                    </View>

                    <Text style={styles.serviceText}>{appt.service}</Text>
                    <Text style={styles.addressText}>{appt.address}</Text>

                    <View style={styles.buttonsContainer}>
                      <TouchableOpacity
                        style={styles.buttonGhost}
                        onPress={() => {
                          setModalVisible(false);
                          router.push(`/appointment_details?id=${appt._id}`);
                        }}
                      >
                        <Text style={styles.buttonTextGhost}>Détails</Text>
                      </TouchableOpacity>

                      {appt.status === "CONFIRMÉ" ? (
                        <TouchableOpacity
                          style={styles.buttonCall}
                          onPress={() => Linking.openURL(`tel:${appt.clientPhone}`)}
                        >
                          <Ionicons name="call-outline" size={16} color={COLORS.white} />
                          <Text style={styles.buttonTextCall}>Appeler</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={styles.buttonConfirm}
                          onPress={() => handleConfirm(appt._id)}
                        >
                          <Text style={styles.buttonTextConfirm}>Confirmer</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
