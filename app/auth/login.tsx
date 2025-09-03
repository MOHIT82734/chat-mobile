// login.tsx
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔑 Login</Text>
      <TextInput
        placeholder="Enter Username"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <Button
        title="Login"
        onPress={() => router.push({ pathname: "/(tabs)/chat", params: { username } })}
      />
      <Text style={styles.footer}>✨ Build by Mohit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#c33c34ff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#e40d0dff",
    color: "#fff",
    padding: 10,
    width: "100%",
    marginBottom: 20,
    borderRadius: 8,
  },
  footer: { marginTop: 40, color: "#a45cd0ff" },
});
