// _layout.tsx
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#010406ff" },
        headerTintColor: "#fff",
      }}
    />
  );
}
