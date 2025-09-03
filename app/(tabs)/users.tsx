// users.tsx
import { StyleSheet, Text, View } from "react-native";

export default function Users() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 Users List</Text>
      <Text style={styles.subtitle}>Coming soon...</Text>
      <Text style={styles.footer}>✨ Build by Mohit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#9bc3a0ff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#fff" },
  subtitle: { fontSize: 16, color: "gray" },
  footer: { marginTop: 40, color: "#888" },
});
