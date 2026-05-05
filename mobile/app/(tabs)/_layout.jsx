import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.cardBackground,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          paddingTop: 5,
          paddingBottom: insets.bottom,
          height: 60 + insets.bottom,
        },
        tabBarItemStyle: {
          borderRadius: 9999,
          marginHorizontal: 4,
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={focused ? COLORS.primary : color}
            />
          ),
          tabBarItemStyle: {
            borderRadius: 9999,
            marginHorizontal: 4,
            paddingVertical: 4,
            backgroundColor: "transparent",
          },
          tabBarBackground: () => null,
        }}
      />
      <Tabs.Screen
        name="rendez-vous"
        options={{
          title: "Rendez-vous",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={focused ? COLORS.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="roi"
        options={{
          title: "ROI",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "bar-chart" : "bar-chart-outline"}
              size={size}
              color={focused ? COLORS.primary : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="parametres"
        options={{
          title: "Paramètres",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={focused ? COLORS.primary : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
