import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import styles from "../../assets/styles/client_info.styles";
import { API_URL } from "../../constants/api";
import { useAuthStore } from "../../store/authStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../constants/colors";

export default function ClientInfoForm() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const date = params.date ? new Date(params.date) : null;
  const time = params.time || "";
  const { token } = useAuthStore();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [motif, setMotif] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!fullName || !email || !phone || !address || !postalCode || !city || !motif) {
      return Alert.alert("Erreur", "Veuillez remplir tous les champs");
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientName: fullName,
          clientEmail: email,
          clientPhone: phone,
          address: address,
          postalCode: postalCode,
          city: city,
          service: motif,
          appointmentDate: date,
          appointmentTime: time,
        })
      });


      if (!response.ok) {
        throw new Error("Échec de la création du rendez-vous : " + (await response.text()));
      }

      Alert.alert("Succès", "Votre rendez-vous est confirmé !");
      router.replace("/(tabs)/rendez-vous");
    } catch (error) {
      Alert.alert("Erreur", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>{"<"}</Text>
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Comment vous appeler?</Text>
            <Text style={styles.subtitle}>Entrez les informations de votre client</Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Card container */}
          <View style={styles.card}>
            {/* Nom et prénom */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nom et prénom *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Prénom et nom"
                  placeholderTextColor={COLORS.placeholderText}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Adresse e-mail */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Adresse e-mail *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="email@exemple.com"
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Téléphone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Téléphone *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="(000) 000 00 00"
                  placeholderTextColor={COLORS.placeholderText}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Adresse postale */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Adresse postale *</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Rue et numéro"
                  placeholderTextColor={COLORS.placeholderText}
                  value={address}
                  onChangeText={setAddress}
                />
              </View>
            </View>

            {/* Code postal + Ville */}
            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <Text style={styles.label}>Code postal *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="75000"
                  placeholderTextColor={COLORS.placeholderText}
                  value={postalCode}
                  onChangeText={setPostalCode}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.label}>Ville *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Paris"
                  placeholderTextColor={COLORS.placeholderText}
                  value={city}
                  onChangeText={setCity}
                />
              </View>
            </View>

            {/* Motif du rendez-vous */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Motif du rendez-vous *</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Dépannage, installation..."
                placeholderTextColor={COLORS.placeholderText}
                value={motif}
                onChangeText={setMotif}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>Confirmer</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
