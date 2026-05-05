import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import COLORS from "../../constants/colors";
import styles from "../../assets/styles/welcome.styles";
import ConfettiCannon from "react-native-confetti-cannon";

export default function Welcome() {
  const [confettiActive, setConfettiActive] = useState(true);
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setConfettiActive(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      {confettiActive && (
        <ConfettiCannon
          count={100}
          origin={{ x: -10, y: 0 }}
          fadeOut={true}
        />
      )}

      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require("../../assets/images/i.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>
          Bienvenue, {user?.fullName?.split(' ')[0] || "Artisan"} !
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Votre espace de travail est prêt. Transformez chaque appel en opportunité dès aujourd'hui.
        </Text>

        {/* Configuration Card */}
        <View style={styles.configCard}>
          <View style={styles.configHeader}>
            <Text style={styles.configLabel}>CONFIGURATION</Text>
            <Text style={styles.configTitle}>Guide de démarrage rapide</Text>
          </View>

          {/* Configuration Rows */}
          <TouchableOpacity style={styles.configRow}>
            <View style={styles.configRowContent}>
              <Ionicons name="chatbubble-outline" size={20} color={COLORS.primary} />
              <Text style={styles.configRowText}>Configuration SMS</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <View style={styles.configDivider} />

          <TouchableOpacity style={styles.configRow}>
            <View style={styles.configRowContent}>
              <Ionicons name="person-outline" size={20} color={COLORS.primary} />
              <Text style={styles.configRowText}>Profil Professionnel</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <View style={styles.configDivider} />

          <TouchableOpacity style={styles.configRow}>
            <View style={styles.configRowContent}>
              <Ionicons name="document-outline" size={20} color={COLORS.primary} />
              <Text style={styles.configRowText}>Formulaire</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Accéder au tableau de bord</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
