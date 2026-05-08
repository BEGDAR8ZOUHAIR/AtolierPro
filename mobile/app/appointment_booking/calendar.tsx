import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import { API_URL } from "../../constants/api";
import Ionicons from "@expo/vector-icons/Ionicons";

const MONTH_NAMES = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre",
];
const MONTH_SHORT = ["JANV","FÉVR","MARS","AVR","MAI","JUIN","JUIL","AOÛT","SEPT","OCT","NOV","DÉC"];
const DAY_HEADERS = ["LUN","MAR","MER","JEU","VEN","SAM","DIM"];

export default function CalendarScreen() {
  const router = useRouter();
  const { token } = useAuthStore();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [busyDates, setBusyDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    fetchBusyDates();
  }, [year, month]);

  const fetchBusyDates = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/appointments/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      const busy = data.map((a: any) => new Date(a.appointmentDate).toISOString().split("T")[0]);
      setBusyDates([...new Set(busy)]);
    } catch {
      console.log("Could not fetch busy dates");
    } finally {
      setLoading(false);
    }
  };

  const handleDaySelect = (day: number) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return;
    const dateStr = date.toISOString().split("T")[0];
    if (busyDates.includes(dateStr)) return;
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
  const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
  const startOffset = firstDow === 0 ? 6 : firstDow - 1;

  const prevMonthDays = new Date(year, month, 0).getDate();
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

  const cells = Array.from({ length: totalCells }, (_, i) => {
    if (i < startOffset) {
      return { day: prevMonthDays - startOffset + i + 1, type: "prev" };
    } else if (i < startOffset + daysInMonth) {
      return { day: i - startOffset + 1, type: "current" };
    } else {
      return { day: i - startOffset - daysInMonth + 1, type: "next" };
    }
  });

  const prevMonth = month === 0 ? 11 : month - 1;
  const nextMonth = month === 11 ? 0 : month + 1;
  const today = new Date();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#F97316" style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
     
      {/* ── Title + Subtitle ── */}
      <Text style={styles.title}>Choisissez une date</Text>
      <Text style={styles.subtitle}>Sélectionnez une date parmi les disponibilités.</Text>

      {/* ── Month nav ── */}
      <View style={styles.monthNav}>
        <TouchableOpacity
          style={styles.monthNavSide}
          onPress={() => setCurrentDate(new Date(year, month - 1, 1))}
        >
          <Ionicons name="chevron-back" size={16} color="#9CA3AF" />
          <Text style={styles.monthNavText}>{MONTH_SHORT[prevMonth]}</Text>
        </TouchableOpacity>

        <Text style={styles.monthCenter}>
          {MONTH_NAMES[month]} {year}
        </Text>

        <TouchableOpacity
          style={styles.monthNavSideRight}
          onPress={() => setCurrentDate(new Date(year, month + 1, 1))}
        >
          <Text style={styles.monthNavText}>{MONTH_SHORT[nextMonth]}</Text>
          <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* ── Calendar card ── */}
      <View style={styles.calCard}>
        {/* Day headers */}
        <View style={styles.daysHeader}>
          {DAY_HEADERS.map((d) => (
            <Text key={d} style={styles.dayHeaderText}>{d}</Text>
          ))}
        </View>

        {/* Grid */}
        <View style={styles.grid}>
          {cells.map((cell, idx) => {
            if (cell.type !== "current") {
              return (
                <View key={`${cell.type}-${idx}`} style={styles.cell}>
                  <Text style={styles.dayOther}>{cell.day}</Text>
                </View>
              );
            }

            const date = new Date(year, month, cell.day);
            const dateStr = date.toISOString().split("T")[0];
            const isToday =
              today.getFullYear() === year &&
              today.getMonth() === month &&
              today.getDate() === cell.day;
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            const isBusy = busyDates.includes(dateStr);
            const isPast = date < today;
            const isAvailable = !isBusy && !isPast;

            return (
              <TouchableOpacity
                key={`current-${cell.day}`}
                style={styles.cell}
                onPress={() => handleDaySelect(cell.day)}
                disabled={isBusy || isPast}
                activeOpacity={0.7}
              >
                <View style={[styles.dayInner, isSelected && styles.daySelected]}>
                  <Text
                    style={[
                      styles.dayText,
                      isAvailable && !isSelected && styles.dayTextAvailable,
                      isSelected && styles.dayTextSelected,
                      isToday && !isSelected && styles.dayTextToday,
                    ]}
                  >
                    {cell.day}
                  </Text>
                  {isToday && !isSelected && <View style={styles.todayUnderline} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ── Legend ── */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendDotAvailable]} />
          <Text style={styles.legendText}>DISPONIBLE</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, styles.legendDotBusy]} />
          <Text style={styles.legendText}>COMPLET</Text>
        </View>
      </View>

      {/* ── Button ── */}
      <View style={styles.bottomWrap}>
        <TouchableOpacity
          style={[styles.btn, !selectedDate && styles.btnDisabled]}
          onPress={handleNext}
          disabled={!selectedDate}
          activeOpacity={0.85}
        >
          <Text style={styles.btnText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F3F5",
    paddingVertical: 20,
  },

  // ─── Title + subtitle ─────────────────────────────────────────────
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: -0.3,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },

  // ─── Month nav (white pill) ───────────────────────────────────────
  monthNav: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  monthNavSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minWidth: 60,
  },

  monthNavSideRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    minWidth: 60,
    justifyContent: "flex-end",
  },

  monthNavText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#9CA3AF",
    letterSpacing: 0.5,
  },

  monthCenter: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  // ─── Calendar card ────────────────────────────────────────────────
  calCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    // borderColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  daysHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },

  dayHeaderText: {
    width: 40,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "700",
    color: "#9CA3AF",
    letterSpacing: 0.3,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  cell: {
    width: "14.28%", // 7 cols
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },

  dayInner: {
    width: "80%",
    aspectRatio: 1,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },

  daySelected: {
    backgroundColor: "#1E2D50",
  },

  dayText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#D1D5DB", // light gray default (prev/next month look)
  },

  dayTextAvailable: {
    color: "#111827",
    fontWeight: "700", // bold for available dates
  },

  dayTextSelected: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  dayTextToday: {
    color: "#111827",
    fontWeight: "700",
  },

  dayOther: {
    fontSize: 13,
    color: "#D1D5DB",
  },

  todayUnderline: {
    position: "absolute",
    bottom: 2,
    width: 16,
    height: 2,
    borderRadius: 1,
    backgroundColor: "#111827",
  },

  // ─── Legend (white pill) ──────────────────────────────────────────
  legend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  legendDotAvailable: {
    backgroundColor: "#1E2D50",
  },

  legendDotBusy: {
    backgroundColor: "#D1D5DB",
  },

  legendText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
    letterSpacing: 0.3,
  },

  // ─── Bottom button ────────────────────────────────────────────────
  bottomWrap: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 32,
  },

  btn: {
    backgroundColor: "#F97316",
    borderRadius: 9999,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 5,
  },

  btnDisabled: {
    backgroundColor: "#D1D5DB",
    shadowOpacity: 0,
    elevation: 0,
  },

  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});