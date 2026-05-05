import { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/authStore";
import styles from "../../assets/styles/welcome.styles";
import ConfettiCannon from "react-native-confetti-cannon";
import Ionicons from "@expo/vector-icons/Ionicons";
 
// Config rows data
const CONFIG_ITEMS = [
  {
    id: "sms",
    icon: "chatbubble-ellipses-outline",
    title: "Configuration SMS",
    subtitle: "Activez les réponses automatiques",
  },
  {
    id: "profile",
    icon: "person-circle-outline",
    title: "Profil Professionnel",
    subtitle: "Personnalisez votre carte de visite",
  },
  {
    id: "form",
    icon: "document-text-outline",
    title: "Formulaire",
    subtitle: "Personnalisez votre formulaire",
  },
];
 
export default function Welcome() {
  const { user } = useAuthStore();
  const router = useRouter();
  const confettiLeftRef = useRef(null);
  const confettiRightRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
 
  const firstName = user?.fullName?.split(" ")[0] || "Artisan";
 
  useEffect(() => {
    // Fade in the content
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
 
    // Fire confetti from both sides
    setTimeout(() => {
      confettiLeftRef.current?.start();
      confettiRightRef.current?.start();
    }, 300);
  }, []);
 
  const handleContinue = () => {
    router.replace("/(tabs)");
  };
 
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Confetti — left side */}
      <ConfettiCannon
        ref={confettiLeftRef}
        count={60}
        origin={{ x: -20, y: -10 }}
        autoStart={false}
        fadeOut
        fallSpeed={2800}
        explosionSpeed={400}
        colors={["#F97316", "#1E2D50", "#FCD34D", "#FFFFFF"]}
      />
 
      {/* Confetti — right side */}
      <ConfettiCannon
        ref={confettiRightRef}
        count={60}
        origin={{ x: 420, y: -10 }}
        autoStart={false}
        fadeOut
        fallSpeed={2800}
        explosionSpeed={400}
        colors={["#F97316", "#1E2D50", "#FCD34D", "#FFFFFF"]}
      />
 
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {/* ── Top section ── */}
        <View style={styles.topSection}>
          {/* Logo */}
          <View style={styles.logo}>
            <View style={styles.logoLeft} />
            <View style={styles.logoRight} />
          </View>
 
          {/* Title */}
          <Text style={styles.title}>Bienvenue, {firstName} !</Text>
 
          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Votre espace de travail est prêt. Transformez chaque appel en
            opportunité dès aujourd'hui.
          </Text>
        </View>
 
        {/* ── Configuration card ── */}
        <View style={styles.configCard}>
          {/* CONFIGURATION chip */}
          <View style={styles.configChip}>
            <Text style={styles.configChipText}>CONFIGURATION</Text>
          </View>
 
          {/* Card title */}
          <Text style={styles.configTitle}>Guide de démarrage rapide</Text>
 
          {/* Rows */}
          <View style={styles.rowsContainer}>
            {CONFIG_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.configRow}
                activeOpacity={0.7}
              >
                {/* Icon box */}
                <View style={styles.iconBox}>
                  <Ionicons name={item.icon } size={22} color="#6B7280" />
                </View>
 
                {/* Text */}
                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowTitle}>{item.title}</Text>
                  <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
                </View>
 
                {/* Chevron */}
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
 
          {/* CTA button inside card */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Accéder au tableau de bord</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}