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
import { useRouter } from "expo-router";
import COLORS from "../../constants/colors";
import styles from "../../assets/styles/forgot-password.styles";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email) {
      return Alert.alert("Erreur", "Veuillez saisir votre adresse email");
    }

    setLoading(true);
    try {
      // TODO: POST /auth/forgot-password
      // For now simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert(
        "Succès",
        "Un lien de réinitialisation a été envoyé à votre adresse email.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert("Erreur", "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex:1 }}>
        {/* Dark navy top */}
        <View style={styles.topSection}>
          <Text style={styles.subtitle}>
            Entrez votre email professionnel.{"\n"}
            Vous recevrez un lien valable 1 heure.
          </Text>
        </View>

        {/* White bottom */}
        <View style={styles.formCard}>
          <Text style={styles.title}>Mot de passe oublié</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Adresse e-mail</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="votre@email.com"
                placeholderTextColor={COLORS.placeholderText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Retour à la </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.link}>Connexion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
