// chat.tsx
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

export default function Chat() {
  const { username } = useLocalSearchParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socket.emit("join", username);

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    const msgData = { user: username, text: message };
    socket.emit("sendMessage", msgData);
    setMessage("");
  };

  const renderMessage = ({ item }: any) => {
    const isMine = item.user === username;
    return (
      <View
        style={[
          styles.msgContainer,
          isMine ? styles.myMsg : styles.otherMsg,
        ]}
      >
        {!isMine && <Text style={styles.user}>{item.user}</Text>}
        <Text style={styles.msgText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(_, i) => i.toString()}
        style={styles.chatBox}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#777"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Build with ❤️ by Mohit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fdf4", // soft mint green background
    padding: 10,
  },
  chatBox: { flex: 1, marginBottom: 10 },
  msgContainer: {
    padding: 14,
    marginVertical: 6,
    maxWidth: "75%",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  myMsg: {
    backgroundColor: "#2196f3", // premium blue
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  otherMsg: {
    backgroundColor: "#4caf50", // premium green
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  user: {
    color: "#e0f7fa",
    fontSize: 12,
    marginBottom: 4,
    fontWeight: "600",
  },
  msgText: { color: "#fff", fontSize: 16, lineHeight: 22 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 15,
    color: "#000",
  },
  sendBtn: {
    backgroundColor: "#2196f3",
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginLeft: 8,
    elevation: 3,
  },
  sendText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  footer: {
    marginTop: 8,
    color: "#444",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 13,
  },
});
