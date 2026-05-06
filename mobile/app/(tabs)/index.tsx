import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "../../store/authStore";
import COLORS from "../../constants/colors";
import { useRouter } from "expo-router";

export default function Accueil() {
  const { user } = useAuthStore();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background, padding: 20 }}>
      <View style={{ marginTop: 20, marginBottom: 30 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", color: COLORS.textPrimary }}>
          Bonjour, {user?.fullName?.split(' ')[0] || "Artisan"}
        </Text>
        <Text style={{ fontSize: 16, color: COLORS.textSecondary, marginTop: 4 }}>
          Gérez vos chantiers et vos devis en toute simplicité.
        </Text>
      </View>

      <View style={{
        backgroundColor: COLORS.cardBackground,
        borderRadius: 16,
        padding: 20,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 24,
      }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: COLORS.textPrimary, marginBottom: 12 }}>
          Tableau de bord
        </Text>
        <Text style={{ fontSize: 14, color: COLORS.textSecondary }}>
          Accédez à vos rendez-vous et gérez votre activité.
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.primary,
          borderRadius: 9999,
          height: 56,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 24,
        }}
        onPress={() => router.push("/(tabs)/rendez-vous")}
      >
        <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: "bold" }}>
          Voir mes rendez-vous
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: COLORS.primary,
          borderRadius: 9999,
          height: 56,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 16,
        }}
        onPress={() => router.push("/(tabs)/rendez-vous")}
      >
        <Text style={{ color: COLORS.primary, fontSize: 16, fontWeight: "bold" }}>
          Nouveau rendez-vous
        </Text>
      </TouchableOpacity>
    </View>
  );
}
