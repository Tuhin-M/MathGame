import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Settings = ({ navigation, gameMode, setGameMode }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity
        style={[styles.button, gameMode === "easy" && styles.activeButton]}
        onPress={() => setGameMode("easy")}
      >
        <Text style={styles.buttonText}>Easy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, gameMode === "medium" && styles.activeButton]}
        onPress={() => setGameMode("medium")}
      >
        <Text style={styles.buttonText}>Medium</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, gameMode === "hard" && styles.activeButton]}
        onPress={() => setGameMode("hard")}
      >
        <Text style={styles.buttonText}>Hard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFA500",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  activeButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    fontSize: 18,
    color: "#000",
  },
  backButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default Settings;
