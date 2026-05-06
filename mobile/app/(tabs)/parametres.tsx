import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useAuthStore } from "../../store/authStore";
import COLORS from "../../constants/colors";

export default function Parametres() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Voulez-vous vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      { text: "Se déconnecter", style: "destructive", onPress: logout }
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background, padding: 20 }}>
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", color: COLORS.textPrimary }}>
          Paramètres
        </Text>
      </View>

      <View style={{
        backgroundColor: COLORS.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginBottom: 30,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
      }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: COLORS.textPrimary, marginBottom: 16 }}>
          Compte
        </Text>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 14, color: COLORS.textSecondary }}>Nom</Text>
          <Text style={{ fontSize: 16, color: COLORS.textPrimary, fontWeight: "500" }}>
            {user?.fullName || "Non renseigné"}
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 14, color: COLORS.textSecondary }}>Email</Text>
          <Text style={{ fontSize: 16, color: COLORS.textPrimary, fontWeight: "500" }}>
            {user?.email || "Non renseigné"}
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 14, color: COLORS.textSecondary }}>Profession</Text>
          <Text style={{ fontSize: 16, color: COLORS.textPrimary, fontWeight: "500" }}>
            {user?.profession || "Non renseigné"}
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 14, color: COLORS.textSecondary }}>Téléphone</Text>
          <Text style={{ fontSize: 16, color: COLORS.textPrimary, fontWeight: "500" }}>
            {user?.phone || "Non renseigné"}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#EF4444",
          borderRadius: 9999,
          height: 56,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handleLogout}
      >
        <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: "bold" }}>
          Se déconnecter
        </Text>
      </TouchableOpacity>
    </View>
  );
}
