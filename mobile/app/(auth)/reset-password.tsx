import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import styles from "../../assets/styles/reset-password.styles";
import COLORS from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token } = useLocalSearchParams(); // In real app, get token from URL

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      return Alert.alert("Erreur", "Veuillez remplir tous les champs");
    }
    if (password !== confirmPassword) {
      return Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
    }

    setLoading(true);
    try {
      // TODO: POST /auth/reset-password with token
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert("Succès", "Votre mot de passe a été mis à jour", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de mettre à jour le mot de passe");
    } finally {
      setLoading(false);
    }
  };

  const passwordRules = [
    { text: "10 caractères minimum", valid: password.length >= 10 },
    { text: "1 majuscule", valid: /[A-Z]/.test(password) },
    { text: "1 chiffre", valid: /\d/.test(password) },
    { text: "1 caractère spécial", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1 }}>
        {/* Dark navy top */}
        <View style={styles.topSection}>
          
          <Text style={styles.subtitle}>
            Choisissez un nouveau mot de passe pour sécuriser votre compte.
          </Text>
        </View>

        {/* White form card */}
        <View style={styles.formCard}>
          <Text style={styles.title}>Nouveau mot de passe</Text>

          {/* New Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nouveau mot de passe</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Min. 10 caractères"
                placeholderTextColor={COLORS.placeholderText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmer le mot de passe</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirmer le mot de passe"
                placeholderTextColor={COLORS.placeholderText}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
              />
              <TouchableOpacity
                onPress={() => setShowConfirm(!showConfirm)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showConfirm ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Password Rules Checklist */}
          <View style={styles.rulesContainer}>
            {passwordRules.map((rule, index) => (
              <View key={index} style={styles.ruleRow}>
                <View style={[styles.ruleDot, rule.valid && styles.ruleDotValid]}>
                  {rule.valid && (
                    <Ionicons name="checkmark" size={12} color={COLORS.white} />
                  )}
                </View>
                <Text style={[styles.ruleText, rule.valid && styles.ruleTextValid]}>
                  {rule.text}
                </Text>
              </View>
            ))}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <Text style={styles.buttonText}>Envoi en cours...</Text>
            ) : (
              <Text style={styles.buttonText}>Confirmer</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
