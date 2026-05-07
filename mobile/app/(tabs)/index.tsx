import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import { useAuthStore } from "../../store/authStore";
import COLORS from "../../constants/colors";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";

export default function Accueil() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState({
    todayAppointments: 0,
    pendingAppointments: 0,
    confirmedThisWeek: 0,
    monthlyRevenue: 0,
  });

  const firstName = user?.fullName?.split(' ')[0] || "Artisan";
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Bonjour" : currentHour < 18 ? "Bon après-midi" : "Bonsoir";

  return (
    <View style={styles.container}>
      {/* Header with logo */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#111827" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>{greeting}, {firstName} 👋</Text>
          <Text style={styles.subtitleText}>
            Voici un aperçu de votre activité aujourd'hui
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {/* Today's appointments */}
          <TouchableOpacity 
            style={[styles.statCard, styles.statCardPrimary]}
            onPress={() => router.push("/(tabs)/rendez-vous")}
            activeOpacity={0.8}
          >
            <View style={styles.statIconCircle}>
              <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.statValue}>{stats.todayAppointments}</Text>
            <Text style={styles.statLabel}>Rendez-vous aujourd'hui</Text>
          </TouchableOpacity>

          {/* Pending */}
          <View style={[styles.statCard, styles.statCardSecondary]}>
            <View style={[styles.statIconCircle, styles.statIconOrange]}>
              <Ionicons name="time-outline" size={20} color="#F97316" />
            </View>
            <Text style={styles.statValueDark}>{stats.pendingAppointments}</Text>
            <Text style={styles.statLabelDark}>En attente</Text>
          </View>

          {/* This week */}
          <View style={[styles.statCard, styles.statCardSecondary]}>
            <View style={[styles.statIconCircle, styles.statIconGreen]}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#22C55E" />
            </View>
            <Text style={styles.statValueDark}>{stats.confirmedThisWeek}</Text>
            <Text style={styles.statLabelDark}>Cette semaine</Text>
          </View>

          {/* Revenue */}
          <View style={[styles.statCard, styles.statCardSecondary]}>
            <View style={[styles.statIconCircle, styles.statIconNavy]}>
              <Ionicons name="trending-up-outline" size={20} color="#1E2D50" />
            </View>
            <Text style={styles.statValueDark}>{stats.monthlyRevenue}€</Text>
            <Text style={styles.statLabelDark}>CA ce mois</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          
          <TouchableOpacity 
            style={styles.actionCard}
             onPress={() => router.push("/appointment_booking/calendar")}
            activeOpacity={0.7}
          >
            <View style={styles.actionIconWrap}>
              <Ionicons name="add-circle" size={24} color="#F97316" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Nouveau rendez-vous</Text>
              <Text style={styles.actionSubtitle}>Planifier une intervention</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push("/(tabs)/rendez-vous")}
            activeOpacity={0.7}
          >
            <View style={styles.actionIconWrap}>
              <Ionicons name="list" size={24} color="#1E2D50" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Mes rendez-vous</Text>
              <Text style={styles.actionSubtitle}>Voir tous vos rendez-vous</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push("/(tabs)/parametres")}
            activeOpacity={0.7}
          >
            <View style={styles.actionIconWrap}>
              <Ionicons name="person-circle-outline" size={24} color="#6B7280" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Mon profil</Text>
              <Text style={styles.actionSubtitle}>Gérer vos informations</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Pro Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Astuce du jour</Text>
          <View style={styles.tipCard}>
            <View style={styles.tipIcon}>
              <Ionicons name="bulb" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.tipText}>
              Confirmez vos rendez-vous 24h à l'avance pour réduire les absences de 40%
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  // ─── Header ───────────────────────────────────────────────────────
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },

  logo: {
    width: 38,
    height: 38,
  },

  notificationButton: {
    position: "relative",
  },

  notificationBadge: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    borderWidth: 1.5,
    borderColor: "#F3F4F6",
  },

  // ─── Scroll ───────────────────────────────────────────────────────
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  // ─── Greeting ─────────────────────────────────────────────────────
  greetingSection: {
    marginTop: 12,
    marginBottom: 24,
  },

  greetingText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6,
    letterSpacing: -0.5,
  },

  subtitleText: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
  },

  // ─── Stats Grid ───────────────────────────────────────────────────
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 28,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  statCardPrimary: {
    backgroundColor: "#F97316",
  },

  statCardSecondary: {
    backgroundColor: "#FFFFFF",
  },

  statIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  statIconOrange: {
    backgroundColor: "rgba(249, 115, 22, 0.1)",
  },

  statIconGreen: {
    backgroundColor: "rgba(34, 197, 94, 0.1)",
  },

  statIconNavy: {
    backgroundColor: "rgba(30, 45, 80, 0.1)",
  },

  statValue: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: -1,
  },

  statValueDark: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
    letterSpacing: -1,
  },

  statLabel: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
  },

  statLabelDark: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
  },

  // ─── Sections ─────────────────────────────────────────────────────
  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
    letterSpacing: -0.3,
  },

  // ─── Action cards ─────────────────────────────────────────────────
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  actionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  actionContent: {
    flex: 1,
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },

  actionSubtitle: {
    fontSize: 13,
    color: "#6B7280",
  },

  // ─── Tip card ─────────────────────────────────────────────────────
  tipCard: {
    flexDirection: "row",
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
  },

  tipIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    flexShrink: 0,
  },

  tipText: {
    flex: 1,
    fontSize: 14,
    color: "#78350F",
    lineHeight: 20,
    fontWeight: "500",
  },
});