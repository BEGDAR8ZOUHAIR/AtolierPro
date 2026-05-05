import { View, Text } from "react-native";
import COLORS from "../../constants/colors";

export default function ROI() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: COLORS.textPrimary }}>ROI</Text>
      <Text style={{ color: COLORS.textSecondary, marginTop: 8 }}>En construction</Text>
    </View>
  );
}
