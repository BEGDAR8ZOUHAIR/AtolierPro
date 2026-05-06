import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Modal,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "../../assets/styles/appointments.styles";
import { useAppointments } from "../../hooks/useAppointments";
import COLORS from "../../constants/colors";

// ─── Month / day helpers ────────────────────────────────────────────
const MONTH_NAMES_FR = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre",
];
const MONTH_SHORT_FR = [
  "JANV","FÉVR","MARS","AVR","MAI","JUIN",
  "JUIL","AOÛT","SEPT","OCT","NOV","DÉC",
];
const DAY_HEADERS = ["LUN","MAR","MER","JEU","VEN","SAM","DIM"];

export default function AppointmentsScreen() {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDayAppts, setSelectedDayAppts] = useState<any[]>([]);
  const [selectedDateLabel, setSelectedDateLabel] = useState("");
  const {
    appointments,
    loading,
    refreshing,
    fetchAppointments,
    callClient,
    appointmentsByDate,
  } = useAppointments();
  const router = useRouter();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
  const startOffset = firstDow === 0 ? 6 : firstDow - 1; // Mon-based

  // Days from previous month to fill the grid
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Total cells = startOffset + daysInMonth, rounded up to multiple of 7
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

  const handleDayPress = (day: number) => {
    const dateStr = new Date(year, month, day).toISOString().split("T")[0];
    if (appointmentsByDate[dateStr]) {
      setSelectedDayAppts(appointmentsByDate[dateStr]);
      setSelectedDateLabel(
        new Date(year, month, day).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })
      );
      setModalVisible(true);
    }
  };

  // ── Appointment card ───────────────────────────────────────────
  const renderCard = (item: any, inModal = false) => {
    const apptDate = new Date(item.appointmentDate);
    const monthShort = MONTH_SHORT_FR[apptDate.getMonth()];
    const dayNum = apptDate.getDate();
    const isConfirmed = item.status === "CONFIRMÉ";

    return (
      <View
        key={item._id}
        style={[
          styles.card,
          !isConfirmed && styles.cardPending,
          inModal && styles.cardInModal,
        ]}
      >
        {/* Orange left accent for pending */}
        {!isConfirmed && <View style={styles.pendingAccent} />}

        <View style={styles.cardInner}>
          {/* ── Top row: date badge + name + status ── */}
          <View style={styles.cardTop}>
            {/* Date badge */}
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeMonth}>{monthShort}</Text>
              <View style={styles.dateBadgeDayCircle}>
                <Text style={styles.dateBadgeDayText}>{dayNum}</Text>
              </View>
            </View>

            {/* Name + time */}
            <View style={styles.cardMeta}>
              <Text style={styles.clientName}>{item.clientName}</Text>
              <View style={styles.timeRow}>
                <Ionicons name="time-outline" size={14} color="#6B7280" />
                <Text style={styles.timeText}>
                  {item.appointmentTime} • {item.duration || "1h30"}
                </Text>
              </View>
            </View>

            {/* Status badge */}
            <View style={[
              styles.statusBadge,
              isConfirmed ? styles.statusConfirmed : styles.statusPending,
            ]}>
              <Text style={[
                styles.statusText,
                isConfirmed ? styles.statusTextConfirmed : styles.statusTextPending,
              ]}>
                {isConfirmed ? "CONFIRMÉ" : "EN ATTENTE"}
              </Text>
            </View>
          </View>

          {/* ── Divider ── */}
          <View style={styles.divider} />

          {/* ── Bottom: service + address ── */}
          <Text style={styles.serviceText}>{item.service}</Text>
          <Text style={styles.addressText}>{item.address}</Text>

          {/* ── Buttons ── */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.btnDetails}
              onPress={() => {
                if (inModal) setModalVisible(false);
                router.push(`/appointment_details?id=${item._id}`);
              }}
            >
              <Text style={styles.btnDetailsText}>Détails</Text>
            </TouchableOpacity>

            {isConfirmed ? (
              <TouchableOpacity
                style={styles.btnCall}
                onPress={() => callClient(item.clientPhone)}
              >
                <Ionicons name="call-outline" size={16} color="#fff" />
                <Text style={styles.btnCallText}>Appeler</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btnConfirm}
                onPress={() => callClient(item.clientPhone)}
              >
                <Text style={styles.btnConfirmText}>Appeler</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  // ── Calendar view ──────────────────────────────────────────────
  const renderCalendar = () => {
    const prevMonth = month === 0 ? 11 : month - 1;
    const nextMonth = month === 11 ? 0 : month + 1;
    const today = new Date();

    const cells = Array.from({ length: totalCells }, (_, i) => {
      if (i < startOffset) {
        // prev month overflow
        return { day: prevMonthDays - startOffset + i + 1, type: "prev" };
      } else if (i < startOffset + daysInMonth) {
        return { day: i - startOffset + 1, type: "current" };
      } else {
        return { day: i - startOffset - daysInMonth + 1, type: "next" };
      }
    });

    return (
      <ScrollView style={styles.calendarScroll} showsVerticalScrollIndicator={false}>
        {/* Month nav — white pill container */}
        <View style={styles.monthNavContainer}>
          <TouchableOpacity
            style={styles.monthNavSide}
            onPress={() => setCurrentMonth(new Date(year, month - 1, 1))}
          >
            <Ionicons name="chevron-back" size={16} color="#9CA3AF" />
            <Text style={styles.monthNavSideText}>
              {MONTH_SHORT_FR[prevMonth]}
            </Text>
          </TouchableOpacity>

          <Text style={styles.monthNavCenter}>
            {MONTH_NAMES_FR[month]} {year}
          </Text>

          <TouchableOpacity
            style={styles.monthNavSideRight}
            onPress={() => setCurrentMonth(new Date(year, month + 1, 1))}
          >
            <Text style={styles.monthNavSideText}>
              {MONTH_SHORT_FR[nextMonth]}
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Calendar card */}
        <View style={styles.calendarCard}>
          {/* Day headers */}
          <View style={styles.daysHeaderRow}>
            {DAY_HEADERS.map((d) => (
              <Text key={d} style={styles.dayHeaderText}>{d}</Text>
            ))}
          </View>

          {/* Grid */}
          <View style={styles.calendarGrid}>
            {cells.map((cell, idx) => {
              if (cell.type !== "current") {
                return (
                  <View key={`${cell.type}-${idx}`} style={styles.calCell}>
                    <Text style={styles.calDayOther}>{cell.day}</Text>
                  </View>
                );
              }

              const dateStr = new Date(year, month, cell.day).toISOString().split("T")[0];
              const hasAppts = !!appointmentsByDate[dateStr];
              const isToday =
                today.getFullYear() === year &&
                today.getMonth() === month &&
                today.getDate() === cell.day;

              return (
                <TouchableOpacity
                  key={`current-${cell.day}`}
                  style={styles.calCell}
                  onPress={() => hasAppts && handleDayPress(cell.day)}
                  disabled={!hasAppts}
                  activeOpacity={hasAppts ? 0.7 : 1}
                >
                  <View style={[
                    styles.calDayInner,
                    hasAppts && styles.calDayWithAppts,
                  ]}>
                    <Text style={[
                      styles.calDayText,
                      hasAppts && styles.calDayTextWithAppts,
                      isToday && !hasAppts && styles.calDayTextToday,
                    ]}>
                      {cell.day}
                    </Text>
                    {isToday && !hasAppts && <View style={styles.todayUnderline} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="notifications-outline" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* ── Title ── */}
      <Text style={styles.screenTitle}>Mes rendez-vous</Text>

      {/* ── Toggle ── */}
      <View style={styles.toggleWrap}>
        <TouchableOpacity
          style={[styles.toggleBtn, view === "list" && styles.toggleBtnActive]}
          onPress={() => setView("list")}
          activeOpacity={0.8}
        >
          <Ionicons
            name="list-outline"
            size={16}
            color={view === "list" ? "#fff" : "#6B7280"}
            style={{ marginRight: 6 }}
          />
          <Text style={[styles.toggleText, view === "list" && styles.toggleTextActive]}>
            Vue liste
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleBtn, view === "calendar" && styles.toggleBtnActive]}
          onPress={() => setView("calendar")}
          activeOpacity={0.8}
        >
          <Ionicons
            name="calendar-outline"
            size={16}
            color={view === "calendar" ? "#fff" : "#6B7280"}
            style={{ marginRight: 6 }}
          />
          <Text style={[styles.toggleText, view === "calendar" && styles.toggleTextActive]}>
            Vue calendrier
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── Content ── */}
      {view === "list" ? (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchAppointments(true)}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
          renderItem={({ item }) => renderCard(item)}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Ionicons name="calendar-outline" size={52} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>Aucun rendez-vous</Text>
              <Text style={styles.emptySubtitle}>
                Commencez à planifier votre emploi du temps
              </Text>
            </View>
          }
        />
      ) : renderCalendar()}

      {/* ── FAB ── */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/appointment_booking/calendar")}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* ── Modal ── */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={styles.modalSheet}
            onStartShouldSetResponder={() => true}
          >
            {/* Handle bar */}
            <View style={styles.modalHandle} />

            <Text style={styles.modalTitle}>{selectedDateLabel}</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedDayAppts.map((appt) => renderCard(appt, true))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}