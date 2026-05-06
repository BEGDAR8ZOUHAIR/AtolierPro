import { useState, useEffect } from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  Image,
  SafeAreaView,
} from "react-native";
import styles from "../../assets/styles/signup.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
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
    return score; // 0–4
  };

  const handleSignUp = async () => {
    if (
      !fullName || !profession || !phone || !serviceArea ||
      !address || !postalCode || !city || !email || !password
    ) {
      return Alert.alert("Erreur", "Veuillez remplir tous les champs requis");
    }

    const result = await register(
      fullName, profession, phone, serviceArea,
      address, postalCode, city, email, password
    );

    if (!result.success) {
      Alert.alert("Erreur", result.error);
    } else {
      router.push({ pathname: "/verify-email", params: { email } });
    }
  };

  const passwordStrength = getPasswordStrength();
  // Strength bar fill: 0→0%, 1→25%, 2→50%, 3→75%, 4→100%
  const strengthPercent = (passwordStrength / 4) * 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >


          {/* ── Logo ── */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* ── Top subtitle ── */}
          <Text style={styles.topSubtitle}>
            créez votre espace professionnel et commencez{"\n"}à utiliser la plateforme.
          </Text>

          {/* ── Step indicator ── */}
          <View style={styles.stepIndicator}>
            {/* Step 1 — active */}
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, styles.activeStep]}>
                <Text style={styles.activeStepText}>1</Text>
              </View>
              <Text style={[styles.stepLabel, styles.activeLabelText]}>Identité</Text>
            </View>

            <View style={styles.stepLine} />

            {/* Step 2 — inactive */}
            <View style={styles.stepItem}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepCircleText}>2</Text>
              </View>
              <Text style={styles.stepLabel}>Accès</Text>
            </View>

            <View style={styles.stepLine} />

            {/* Step 3 — inactive */}
            <View style={styles.stepItem}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepCircleText}>3</Text>
              </View>
              <Text style={styles.stepLabel}>CGU</Text>
            </View>
          </View>

          {/* ── Form fields ── */}

          {/* Nom complet */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Nom complet</Text>
              <Text style={styles.required}> *</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Thomas Ribeiro"
              placeholderTextColor="#9CA3AF"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          {/* Métier / Spécialité */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Métier / Spécialité</Text>
              <Text style={styles.required}> *</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Électricien"
              placeholderTextColor="#9CA3AF"
              value={profession}
              onChangeText={setProfession}
            />
          </View>

          {/* Numéro de téléphone */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Numéro de téléphone</Text>
              <Text style={styles.required}> *</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="06 23 45 67 89"
              placeholderTextColor="#9CA3AF"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Zone d'intervention */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Zone d'intervention</Text>
              <Text style={styles.required}> *</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Bordeaux et Gironde"
              placeholderTextColor="#9CA3AF"
              value={serviceArea}
              onChangeText={setServiceArea}
            />
          </View>

          {/* Adresse postal */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Adresse postal</Text>
              <Text style={styles.required}> *</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="12 rue de la République"
              placeholderTextColor="#9CA3AF"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          {/* Code postale + Ville — side by side */}
          <View style={styles.rowGroup}>
            <View style={styles.halfGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Code postale</Text>
                <Text style={styles.required}> *</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="75008"
                placeholderTextColor="#9CA3AF"
                value={postalCode}
                onChangeText={setPostalCode}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Ville</Text>
                <Text style={styles.required}> *</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Paris"
                placeholderTextColor="#9CA3AF"
                value={city}
                onChangeText={setCity}
              />
            </View>
          </View>

          {/* Adresse email — no asterisk in design */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Adresse email</Text>
            <TextInput
              style={styles.input}
              placeholder="thomas.ribeiro.elec@gmail.com"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Mot de passe */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Mot de passe</Text>
              <Text style={styles.required}> *</Text>
            </View>
            {/* Input + eye icon in same row */}
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••••••"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>

            {/* Strength bar — single continuous bar */}
            <View style={styles.strengthRow}>
              <Text style={styles.strengthLabelLeft}>Faible</Text>
              <View style={styles.strengthTrack}>
                <View
                  style={[
                    styles.strengthFill,
                    { width: `${strengthPercent}%` },
                    passwordStrength >= 3 && styles.strengthFillStrong,
                  ]}
                />
              </View>
              <Text style={styles.strengthLabelRight}>sécurisé</Text>
            </View>
          </View>

          {/* ── CTA Button ── */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={isLoading}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Créer mon compte</Text>
            )}
          </TouchableOpacity>

          {/* ── Footer ── */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>j'ai déjà un compte - </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.footerLink}>Me connecter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}