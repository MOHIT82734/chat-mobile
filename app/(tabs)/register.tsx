import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Register</Text>
      <TextInput
        placeholder="Choose Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Register" onPress={() => router.push("/users")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    width: "100%",
    marginBottom: 20,
    borderRadius: 8,
  },
});
