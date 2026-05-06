import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import styles from "../assets/styles/appointment_details.styles";
import { API_URL } from "../constants/api";
import { useAuthStore } from "../store/authStore";
import COLORS from "../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AppointmentDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { token } = useAuthStore();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchAppointment();
  }, [id]);

  const fetchAppointment = async () => {
    try {
      const response = await fetch(`${API_URL}/appointments/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      const found = data.find((a) => a._id === id);
      if (!found) throw new Error("Rendez-vous non trouvé");

      setAppointment(found);
    } catch (error) {
      Alert.alert("Erreur", error.message);
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
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

      setAppointment((prev) => ({ ...prev, status: "CONFIRMÉ" }));
    } catch (error) {
      Alert.alert("Erreur", "Impossible de confirmer le rendez-vous");
    }
  };

  const handleCall = () => {
    Linking.openURL(`tel:${appointment.clientPhone}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!appointment) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Impossible de charger les détails</Text>
      </View>
    );
  }

  const appointmentDate = new Date(appointment.appointmentDate);
  const month = appointmentDate.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase();
  const day = appointmentDate.getDate();
  const isConfirmed = appointment.status === "CONFIRMÉ";

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails du rendez-vous</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Card */}
      <View style={styles.card}>
        {/* Card Header: Date + Client Name + Status */}
        <View style={styles.cardHeader}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateBadgeMonth}>{month}</Text>
            <Text style={styles.dateBadgeDay}>{day}</Text>
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.clientName}>{appointment.clientName}</Text>
          </View>

          <View style={[
            styles.statusBadge,
            isConfirmed ? styles.statusBadgeConfirmed : styles.statusBadgePending
          ]}>
            <Text style={[
              styles.statusBadgeText,
              isConfirmed ? styles.statusTextConfirmed : styles.statusTextPending
            ]}>
              {appointment.status}
            </Text>
          </View>
        </View>

        {/* Time & Service */}
        <View style={styles.timeRow}>
          <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.timeText}>
            {appointment.appointmentTime} • {appointment.duration || "1h30"}
          </Text>
        </View>

        <Text style={styles.serviceText}>{appointment.service}</Text>
        <Text style={styles.addressText}>{appointment.address}</Text>

        <View style={styles.divider} />

        {/* Client Info */}
        <Text style={styles.sectionTitle}>Client</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Nom :</Text>
          <Text style={styles.detailValue}>{appointment.clientName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email :</Text>
          <Text style={styles.detailValue}>{appointment.clientEmail}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Téléphone :</Text>
          <Text style={styles.detailValue}>{appointment.clientPhone}</Text>
        </View>

        <View style={styles.divider} />

        {/* Service Info */}
        <Text style={styles.sectionTitle}>Service</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Type :</Text>
          <Text style={styles.detailValue}>{appointment.service}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Adresse :</Text>
          <Text style={styles.detailValue}>{appointment.address}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Ville :</Text>
          <Text style={styles.detailValue}>{appointment.city}</Text>
        </View>
        {appointment.motif && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Motif :</Text>
            <Text style={styles.detailValue}>{appointment.motif}</Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {isConfirmed ? (
            <TouchableOpacity style={styles.buttonCall} onPress={handleCall}>
              <Ionicons name="call-outline" size={16} color={COLORS.white} />
              <Text style={styles.buttonTextCall}>Appeler</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.buttonConfirm} onPress={handleConfirm}>
              <Text style={styles.buttonTextConfirm}>Confirmer</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
