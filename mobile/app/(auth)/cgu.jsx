import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import styles from "../../assets/styles/cgu.styles";
import COLORS from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CGU() {
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    if (!accepted) {
      return Alert.alert("Erreur", "Vous devez accepter les conditions d'utilisation");
    }
    router.replace("/welcome");
  };

  return (
    <View style={styles.container}>
      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        <View style={[styles.stepCircle, styles.completedStep]}>
          <Ionicons name="checkmark" size={16} color={COLORS.white} />
        </View>
        <View style={styles.stepLine} />
        <View style={[styles.stepCircle, styles.completedStep]}>
          <Ionicons name="checkmark" size={16} color={COLORS.white} />
        </View>
        <View style={styles.stepLine} />
        <View style={[styles.stepCircle, styles.activeStep]}>
          <Text style={[styles.stepCircleText, styles.activeStepText]}>3</Text>
        </View>
      </View>

      {/* Lock Icon */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="lock-closed" size={32} color={COLORS.primary} />
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Conditions d'utilisation</Text>
      <Text style={styles.subtitle}>CGU</Text>

      {/* Terms Card */}
      <View style={styles.termsCard}>
        <ScrollView style={styles.termsScroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>1 Objet du Service</Text>
          <Text style={styles.paragraph}>
            Atelier Pro est une plateforme destinee aux artisans professionnels pour la gestion de leurs rendez-vous clients. Le service permet de planifier, confirmer et suivre les interventions aupres de la clientele.
          </Text>
          <Text style={styles.paragraph}>
            En utilisant ce service, l'artisan s'engage à respecter les conditions générales décrites ci-dessous et à maintenir une conduite professionnelle exemplaire.
          </Text>
          <Text style={styles.sectionTitle}>2 Acces au service</Text>
          <Text style={styles.paragraph}>
            L'acces a la plateforme est strictement réservé aux artisans disposant d'un compte validé. Chaque artisan est responsable de la confidentialité de ses identifiants de connexion.
          </Text>
          <Text style={styles.sectionTitle}>3 Responsabilité</Text>
          <Text style={styles.paragraph}>
            Atelier Pro agit uniquement comme un outil de gestion. L'artisan reste seul responsable de la qualité des interventions réalisées aupres de ses clients.
          </Text>
          <Text style={styles.sectionTitle}>4 Données personnelles</Text>
          <Text style={styles.paragraph}>
            Nous collectons et traitons vos données personnelles conformément à notre politique de confidentialité. Vous disposez d'un droit d'acces, de rectification et de suppression de vos données.
          </Text>
        </ScrollView>
      </View>

      {/* Checkbox */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setAccepted(!accepted)}
      >
        <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
          {accepted && <Ionicons name="checkmark" size={16} color={COLORS.white} />}
        </View>
        <Text style={styles.checkboxText}>
          J'accepte les Conditions Générales et la politique de Confidentialité
        </Text>
      </TouchableOpacity>

      {/* Continue Button */}
      <TouchableOpacity
        style={[styles.button, !accepted && styles.buttonDisabled]}
        onPress={handleContinue}
        disabled={!accepted}
      >
        <Text style={styles.buttonText}>Continuer</Text>
      </TouchableOpacity>
    </View>
  );
}
