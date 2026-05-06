import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import GlobalHeader from "../components/GlobalHeader";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const { checkAuth, user, token } = useAuthStore();

  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    checkAuth();
  }, []);

  // handle navigation based on the auth state
  useEffect(() => {
    const inAuthScreen = segments[0] === "(auth)";
    const currentAuthRoute = segments[1];
    const isSignedIn = user && token;
    const onboardingRoutes = ["cgu", "welcome"];
    const isOnboardingScreen = onboardingRoutes.includes(currentAuthRoute);

    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)");
    else if (isSignedIn && inAuthScreen && !isOnboardingScreen) router.replace("/(tabs)");
  }, [user, token, segments]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack
          screenOptions={{
            headerShown: false, // Let individual layouts handle headers
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen
            name="appointment_details"
            options={{
              header: () => <GlobalHeader  />,
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="appointment_booking/calendar"
            options={{
              header: () => <GlobalHeader  />,
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="appointment_booking/time"
            options={{
              header: () => <GlobalHeader  />,
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="appointment_booking/client_info"
            options={{
              header: () => <GlobalHeader  />,
              headerShown: true,
            }}
          />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
