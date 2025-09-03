// index.tsx
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Welcome to ChatApp</Text>
      <Text style={styles.subtitle}>Choose an option below</Text>

      <View style={styles.buttonBox}>
        <Button title="🔑 Login" onPress={() => router.push("/(tabs)/login")} />
      </View>
      <View style={styles.buttonBox}>
        <Button
          title=" Register"
          onPress={() => router.push("/(tabs)/register")}
        />
      </View>

      <Text style={styles.footer}>✨ Build by Mohit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#c580e8ff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10, color: "#060505ff" },
  subtitle: { fontSize: 16, color: "gray", marginBottom: 30 },
  buttonBox: { marginVertical: 10, width: 200 },
  footer: { marginTop: 40, color: "#020202ff" },
});
