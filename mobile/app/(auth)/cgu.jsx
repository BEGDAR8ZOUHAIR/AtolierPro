import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "../../assets/styles/cgu.styles";
import COLORS from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
 
export default function CGU() {
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();
 
  const handleContinue = () => {
    if (!accepted) {
      return Alert.alert(
        "Erreur",
        "Vous devez accepter les conditions d'utilisation"
      );
    }
    router.replace("/welcome");
  };
 
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
 
        {/* Logo */}
        <View style={styles.logoContainer}>
          {/* Two-part logo: navy left block + orange right block */}
          <View style={styles.logo}>
            <View style={styles.logoLeft} />
            <View style={styles.logoRight} />
          </View>
        </View>
 
        {/* Top subtitle */}
        <Text style={styles.topSubtitle}>
          créez votre espace professionnel et commencez{"\n"}à utiliser la plateforme.
        </Text>
 
        {/* Step Indicator */}
        <View style={styles.stepIndicator}>
          {/* Step 1 — completed */}
          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, styles.completedStep]}>
              <Ionicons name="checkmark" size={14} color={COLORS.white} />
            </View>
            <Text style={styles.stepLabel}>Identité</Text>
          </View>
 
          <View style={styles.stepLine} />
 
          {/* Step 2 — completed */}
          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, styles.completedStep]}>
              <Ionicons name="checkmark" size={14} color={COLORS.white} />
            </View>
            <Text style={styles.stepLabel}>Accès</Text>
          </View>
 
          <View style={styles.stepLine} />
 
          {/* Step 3 — active */}
          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, styles.activeStep]}>
              <Text style={styles.activeStepText}>3</Text>
            </View>
            <Text style={[styles.stepLabel, styles.activeLabelText]}>CGU</Text>
          </View>
        </View>
 
        {/* Terms Card — everything inside */}
        <View style={styles.termsCard}>
          {/* Lock Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="lock-closed" size={28} color={COLORS.primary} />
            </View>
          </View>
 
          {/* Card Title */}
          <Text style={styles.cardTitle}>Conditions d'utilisation</Text>
 
          {/* Card Subtitle */}
          <Text style={styles.cardSubtitle}>
            merci de consulter nos engagements{"\n"}avant l'inscription.
          </Text>
 
          {/* Divider */}
          <View style={styles.divider} />
 
          {/* Terms Content */}
          <View style={styles.sectionRow}>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>1</Text>
            </View>
            <Text style={styles.sectionTitle}>Objet du Service</Text>
          </View>
          <Text style={styles.paragraph}>
            Le présent document définit conditions dans lesquelles l'entreprise
            Atelier fournit ses services aux artisans. En utilisant notre
            plateforme, vous acceptez de respecter ces termes sans réserve. se
            réserve le droit de modifier ces termes à tout moment pour s'adapter
            aux évolutions législatives.
          </Text>
 
          <View style={styles.sectionRow}>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>2</Text>
            </View>
            <Text style={styles.sectionTitle}>Accès au service</Text>
          </View>
          <Text style={styles.paragraph}>
            L'accès à la plateforme est strictement réservé aux artisans
            disposant d'un compte validé. Chaque artisan est responsable de la
            confidentialité de ses identifiants de connexion.
          </Text>
 
          <View style={styles.sectionRow}>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>3</Text>
            </View>
            <Text style={styles.sectionTitle}>Responsabilité</Text>
          </View>
          <Text style={styles.paragraph}>
            Atelier Pro agit uniquement comme un outil de gestion. L'artisan
            reste seul responsable de la qualité des interventions réalisées
            auprès de ses clients.
          </Text>
 
          <View style={styles.sectionRow}>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>4</Text>
            </View>
            <Text style={styles.sectionTitle}>Données personnelles</Text>
          </View>
          <Text style={styles.paragraph}>
            Nous collectons et traitons vos données personnelles conformément à
            notre politique de confidentialité. Vous disposez d'un droit
            d'accès, de rectification et de suppression de vos données.
          </Text>
        </View>
 
        {/* Checkbox */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAccepted(!accepted)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
            {accepted && (
              <Ionicons name="checkmark" size={14} color={COLORS.white} />
            )}
          </View>
          <Text style={styles.checkboxText}>
            J'accepte les Conditions Générales et la politique de
            Confidentialité .
          </Text>
        </TouchableOpacity>
      </ScrollView>
 
      {/* Continue Button — fixed at bottom */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.button, !accepted && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!accepted}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continuer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}