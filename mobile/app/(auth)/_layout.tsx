import { Stack } from "expo-router";
import GlobalHeader from "../../components/GlobalHeader";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => <GlobalHeader />,
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // Hide header on login screen for special design
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          header: () => <GlobalHeader  />,
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          header: () => <GlobalHeader  />,
        }}
      />
      <Stack.Screen
        name="reset-password"
        options={{
          header: () => <GlobalHeader  />,
        }}
      />
      <Stack.Screen
        name="verify-email"
        options={{
          header: () => <GlobalHeader />,
        }}
      />
      <Stack.Screen
        name="cgu"
        options={{
          header: () => <GlobalHeader  />,
        }}
      />
      <Stack.Screen
        name="welcome"
        options={{
          header: () => <GlobalHeader />,
        }}
      />
    </Stack>
  );
}
