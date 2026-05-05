import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import styles from "../../assets/styles/verify-email.styles";
import { useAuthStore } from "../../store/authStore";
import COLORS from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { email } = useLocalSearchParams();
  const { token, verifyEmail } = useAuthStore();
  const router = useRouter();

  const handleVerify = async () => {
    if (!otp || otp.length < 6) {
      return Alert.alert("Erreur", "Veuillez saisir le code de vérification");
    }

    setLoading(true);
    try {
      const result = await verifyEmail(otp);
      if (result.success) {
        router.replace("/welcome");
      } else {
        Alert.alert("Erreur", result.error || "Code invalide");
      }
    } catch (error) {
      Alert.alert("Erreur", "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      // TODO: POST /auth/resend-otp
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert("Succès", "Un nouveau code a été envoyé à votre adresse email.");
    } catch (error) {
      Alert.alert("Erreur", "Impossible de renvoyer le code");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        <View style={[styles.stepCircle, styles.completedStep]}>
          <Ionicons name="checkmark" size={16} color={COLORS.white} />
        </View>
        <View style={styles.stepLine} />
        <View style={[styles.stepCircle, styles.activeStep]}>
          <Text style={styles.stepCircleText}>2</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={styles.stepCircle}>
          <Text style={styles.stepCircleText}>3</Text>
        </View>
      </View>

      {/* Envelope Icon */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="mail" size={32} color={COLORS.primary} />
        </View>
      </View>

      {/* Title & Subtitle */}
      <Text style={styles.title}>Vérifiez votre email</Text>
      <Text style={styles.subtitle}>
        Un code de confirmation a été envoyé à{"\n"}
        <Text style={styles.emailText}>{email || "votre adresse email"}</Text>
      </Text>

      {/* OTP Input */}
      <View style={styles.otpContainer}>
        <TextInput
          style={styles.otpInput}
          placeholder="Entrez le code à 6 chiffres"
          placeholderTextColor={COLORS.placeholderText}
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
          maxLength={6}
          autoFocus={true}
        />
      </View>

      {/* Verify Button */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleVerify}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.buttonText}>Confirmer</Text>
        )}
      </TouchableOpacity>

      {/* Resend Link */}
      <TouchableOpacity
        style={styles.resendContainer}
        onPress={handleResend}
        disabled={resendLoading}
      >
        <Text style={styles.resendText}>
          {resendLoading ? "Envoi en cours..." : "Vous n'avez pas reçu l'email ? Renvoyer"}
        </Text>
      </TouchableOpacity>

      {/* Spam Note */}
      <Text style={styles.spamNote}>
        Pensez à vérifier votre dossier de courriers indésirables (spams).
      </Text>
    </View>
  );
}
