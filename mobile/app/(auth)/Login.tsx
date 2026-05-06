import React, { useState, useEffect } from "react";
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
  Image,
} from "react-native";
import { Link, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../styles/colors";
import { useAuthStore } from "../../stores/authStore";
import { commonStyles } from "../../styles/theme";
import { StyleSheet, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from "../../styles/theme";

const { width } = Dimensions.get("window");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

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

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    scrollContent: {
      flexGrow: 1,
    },
    topSection: {
      backgroundColor: COLORS.navy,
      paddingTop: 60,
      paddingBottom: 100,
      paddingHorizontal: SPACING.lg,
      position: 'relative',
    },
    logoImage: {
      width: 120,
      height: 120,
      marginBottom: SPACING.md,
      alignSelf: 'center',
    },
    tagline: {
      color: COLORS.white,
      fontSize: FONT_SIZE.md,
      textAlign: 'center',
      fontFamily: 'System',
      lineHeight: 24,
    },
    waveContainer: {
      position: 'absolute',
      bottom: -20,
      left: 0,
      right: 0,
      height: 40,
      backgroundColor: COLORS.background,
    },
    formSection: {
      flex: 1,
      paddingHorizontal: SPACING.lg,
      paddingTop: SPACING.xxl,
      paddingBottom: SPACING.xxl,
    },
    inputGroup: {
      marginBottom: SPACING.lg,
    },
    label: {
      color: COLORS.textPrimary,
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.bold,
      marginBottom: SPACING.sm,
    },
    inputContainer: {
      ...commonStyles.input,
      position: 'relative',
    },
    inputError: {
      borderColor: COLORS.pending,
    },
    input: {
      ...commonStyles.input,
      paddingLeft: SPACING.md,
    },
    eyeButton: {
      position: 'absolute',
      right: SPACING.md,
      top: '50%',
      transform: [{ translateY: -10 }],
    },
    fieldError: {
      color: COLORS.pending,
      fontSize: FONT_SIZE.sm,
      marginTop: SPACING.xs,
    },
    forgotContainer: {
      alignItems: 'flex-end',
      marginBottom: SPACING.lg,
    },
    forgotText: {
      color: COLORS.textSecondary,
      fontSize: FONT_SIZE.sm,
    },
    generalError: {
      color: COLORS.pending,
      fontSize: FONT_SIZE.sm,
      marginBottom: SPACING.lg,
      textAlign: 'center',
    },
    button: {
      ...commonStyles.button,
      marginBottom: SPACING.lg,
    },
    buttonDisabled: {
      backgroundColor: COLORS.disabled,
    },
    buttonText: {
      color: COLORS.white,
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.bold,
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: SPACING.lg,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: COLORS.border,
    },
    dividerText: {
      color: COLORS.textSecondary,
      fontSize: FONT_SIZE.sm,
      marginHorizontal: SPACING.md,
    },
    socialRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: SPACING.xxl,
    },
    socialButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.white,
      borderRadius: BORDER_RADIUS.xl,
      height: 56,
      borderWidth: 1,
      borderColor: COLORS.border,
      marginHorizontal: SPACING.sm,
    },
    socialButtonText: {
      color: COLORS.textSecondary,
      fontSize: FONT_SIZE.md,
      marginLeft: SPACING.sm,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerText: {
      color: COLORS.textSecondary,
      fontSize: FONT_SIZE.sm,
    },
    footerLink: {
      color: COLORS.primary,
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.bold,
    },
  });

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
          {/* Logo — using logoLogin.png */}
          <Image
            source={require("../../assets/images/logoLogin.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>
            Gérez vos chantiers et vos devis en toute simplicité.
          </Text>

          {/* Wave curve at bottom of navy section */}
          <View style={styles.waveContainer}>
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

          {/* Social buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <Ionicons name="logo-google" size={20} color="#DB4437" />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <Ionicons name="logo-apple" size={20} color="#000000" />
              <Text style={styles.socialButtonText}>Apple</Text>
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
};

export default Login;