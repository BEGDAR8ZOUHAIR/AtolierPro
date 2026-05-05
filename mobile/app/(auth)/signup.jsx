import { useState, useEffect } from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import styles from "../../assets/styles/signup.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../constants/colors";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [profession, setProfession] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { user, isLoading, register } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/");
  }, [user]);

  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const handleSignUp = async () => {
    if (
      !fullName ||
      !profession ||
      !phone ||
      !serviceArea ||
      !address ||
      !postalCode ||
      !city ||
      !email ||
      !password
    ) {
      return Alert.alert("Erreur", "Veuillez remplir tous les champs requis");
    }

    const result = await register(
      fullName,
      profession,
      phone,
      serviceArea,
      address,
      postalCode,
      city,
      email,
      password
    );

    if (!result.success) {
      Alert.alert("Erreur", result.error);
    } else {
      // Navigate to email verification
      router.push({
        pathname: "/verify-email",
        params: { email: email }
      });
    }
  };

  const passwordStrength = getPasswordStrength();
  const strengthLabels = ["Faible", "Faible", "Moyen", "Fort", "Sécurisé"];
  const strengthColors = ["#EF4444", "#EF4444", "#F59E0B", "#10B981", "#10B981"];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollViewStyle}
      >
        <View style={styles.card}>
          {/* Step Indicator */}
          <View style={styles.stepIndicator}>
            <View style={[styles.stepCircle, styles.activeStep]}>
              <Text style={[styles.stepCircleText, styles.activeStepText]}>1</Text>
            </View>
            <View style={styles.stepLine} />
            <View style={styles.stepCircle}>
              <Text style={styles.stepCircleText}>2</Text>
            </View>
            <View style={styles.stepLine} />
            <View style={styles.stepCircle}>
              <Text style={styles.stepCircleText}>3</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            {/* Nom complet */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nom complet *</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
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

            {/* Métier / Spécialité */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Métier / Spécialité *</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="construct-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Plombier, électricien, peintre..."
                  placeholderTextColor={COLORS.placeholderText}
                  value={profession}
                  onChangeText={setProfession}
                />
              </View>
            </View>

            {/* Numéro de téléphone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Numéro de téléphone *</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="call-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="06 12 34 56 78"
                  placeholderTextColor={COLORS.placeholderText}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Zone d'intervention */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Zone d'intervention *</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Ville ou région"
                  placeholderTextColor={COLORS.placeholderText}
                  value={serviceArea}
                  onChangeText={setServiceArea}
                />
              </View>
            </View>

            {/* Adresse postal */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Adresse postal *</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="home-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Rue et numéro"
                  placeholderTextColor={COLORS.placeholderText}
                  value={address}
                  onChangeText={setAddress}
                />
              </View>
            </View>

            {/* Code postale + Ville */}
            <View style={styles.inputGroupRow}>
              <View style={styles.inputGroupHalf}>
                <Text style={styles.label}>Code postale *</Text>
                <View style={[styles.inputContainer, { paddingHorizontal: 12 }]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Code postal"
                    placeholderTextColor={COLORS.placeholderText}
                    value={postalCode}
                    onChangeText={setPostalCode}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={styles.inputGroupHalf}>
                <Text style={styles.label}>Ville *</Text>
                <View style={[styles.inputContainer, { paddingHorizontal: 12 }]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Ville"
                    placeholderTextColor={COLORS.placeholderText}
                    value={city}
                    onChangeText={setCity}
                  />
                </View>
              </View>
            </View>

            {/* Adresse email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Adresse email *</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="contact@entreprise.com"
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Mot de passe */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mot de passe *</Text>
              <View style={styles.passwordContainer}>
                <View style={[styles.inputContainer, { flex: 1 }]}>
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
                </View>
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

              {/* Password strength bar */}
              <View style={styles.strengthContainer}>
                <View style={styles.strengthBar}>
                  {[0,1,2,3].map((i) => (
                    <View
                      key={i}
                      style={[
                        styles.strengthSegment,
                        i < passwordStrength && { backgroundColor: strengthColors[passwordStrength] }
                      ]}
                    />
                  ))}
                </View>
                <Text style={[styles.strengthText, { color: strengthColors[passwordStrength] }]}>
                  {strengthLabels[passwordStrength]}
                </Text>
              </View>

              {/* Password rules */}
              <View style={styles.passwordRules}>
                <Text style={password.length >= 10 ? styles.passwordRuleMet : styles.passwordRule}>
                  {password.length >= 10 ? "✓" : "●"} 10 caractères minimum
                </Text>
                <Text style={/[A-Z]/.test(password) ? styles.passwordRuleMet : styles.passwordRule}>
                  {/[A-Z]/.test(password) ? "✓" : "●"} 1 majuscule
                </Text>
                <Text style={/\d/.test(password) ? styles.passwordRuleMet : styles.passwordRule}>
                  {/\d/.test(password) ? "✓" : "●"} 1 chiffre
                </Text>
                <Text style={/[^A-Za-z0-9]/.test(password) ? styles.passwordRuleMet : styles.passwordRule}>
                  {/[^A-Za-z0-9]/.test(password) ? "✓" : "●"} 1 caractère spécial
                </Text>
              </View>
            </View>

            {/* Signup button */}
            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Créer mon compte</Text>
              )}
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>J'ai déjà un compte - </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Me connecter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
