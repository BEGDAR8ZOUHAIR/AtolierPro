import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { Link, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../constants/colors";
import { useAuthStore } from "../../store/authStore";
import styles from "../../assets/styles/login.styles";
 
const { width } = Dimensions.get("window");
 
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
 
  const { login, isLoading, isCheckingAuth, user } = useAuthStore();
  const router = useRouter();
 
  useEffect(() => {
    if (user) router.replace("/(tabs)");
  }, [user]);
 
  const handleLogin = async () => {
    setErrors({});
    if (!email || !password) {
      setErrors({ general: "Veuillez saisir vos identifiants" });
      return;
    }
    const result = await login(email, password);
    if (!result.success) {
      setErrors({ general: result.error });
    }
  };
 
  if (isCheckingAuth) return null;
 
  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* ── Navy top section with wave curve ── */}
        <View style={styles.topSection}>
          {/* Logo — white two-block, top-left */}
          <View style={styles.logo}>
            <View style={styles.logoBlockLeft} />
            <View style={styles.logoBlockRight} />
          </View>
 
          {/* Tagline — left-aligned */}
          <Text style={styles.tagline}>
            Gérez vos chantiers et vos devis en toute simplicité.
          </Text>
 
          {/* Wave curve at bottom of navy section */}
          <View style={styles.waveContainer}>
            <View style={styles.waveLeft} />
            <View style={styles.waveRight} />
          </View>
        </View>
 
        {/* ── Light gray form section ── */}
        <View style={styles.formSection}>
          {/* Email field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Adresse e-mail</Text>
            <View style={[styles.inputContainer, errors.email && styles.inputError]}>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre e-mail"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={(t) => { setEmail(t); setErrors({}); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {errors.email && <Text style={styles.fieldError}>{errors.email}</Text>}
          </View>
 
          {/* Password field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mot de passe</Text>
            <View style={[styles.inputContainer, errors.password && styles.inputError]}>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre mot de passe"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={(t) => { setPassword(t); setErrors({}); }}
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
            {errors.password && <Text style={styles.fieldError}>{errors.password}</Text>}
          </View>
 
          {/* Forgot password — right-aligned, dark text */}
          <TouchableOpacity
            style={styles.forgotContainer}
            onPress={() => router.push("/forgot-password")}
          >
            <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
 
          {/* General error */}
          {errors.general && (
            <Text style={styles.generalError}>{errors.general}</Text>
          )}
 
          {/* Login CTA */}
          <TouchableOpacity
            style={[
              styles.button,
              (isLoading || !email || !password) && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading || !email || !password}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Se connecter</Text>
            )}
          </TouchableOpacity>
 
          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Se connecter avec</Text>
            <View style={styles.dividerLine} />
          </View>
 
          {/* Social buttons — icon only */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              {/* Google G logo */}
              <Text style={styles.googleG}>G</Text>
            </TouchableOpacity>
 
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              {/* Apple logo */}
              <Ionicons name="logo-apple" size={22} color="#000000" />
            </TouchableOpacity>
          </View>
 
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Pas encore de compte ? </Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Créer un compte</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}