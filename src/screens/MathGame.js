import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const generateRandomNumber = (digits) => {
  return Math.floor(Math.random() * Math.pow(10, digits));
};

const MathGame = ({ navigation, gameMode }) => {
  const [num1, setNum1] = useState(generateRandomNumber(1));
  const [num2, setNum2] = useState(generateRandomNumber(1));
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
      setMessage(`Time's up! The correct answer was ${num1 + num2}`);
    }

    if (!gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, gameOver]);

  useEffect(() => {
    let digits = 1;
    if (gameMode === "medium") digits = 2;
    else if (gameMode === "hard") digits = 3;

    setNum1(generateRandomNumber(digits));
    setNum2(generateRandomNumber(digits));
  }, [gameMode]);

  const handleNumberPress = (num) => {
    setUserInput((prevInput) => prevInput + num.toString());
  };

  const handleSubmit = () => {
    if (parseInt(userInput) === num1 + num2) {
      let digits = 1;
      if (gameMode === "medium") digits = 2;
      else if (gameMode === "hard") digits = 3;

      setNum1(generateRandomNumber(digits));
      setNum2(generateRandomNumber(digits));
      setUserInput("");
      setMessage("Correct!");
      setTimeLeft(30);
    } else {
      setGameOver(true);
      setMessage(`Game Over! The correct answer was ${num1 + num2}`);
    }
  };

  const handleRestart = () => {
    let digits = 1;
    if (gameMode === "medium") digits = 2;
    else if (gameMode === "hard") digits = 3;

    setNum1(generateRandomNumber(digits));
    setNum2(generateRandomNumber(digits));
    setUserInput("");
    setMessage("");
    setTimeLeft(30);
    setGameOver(false);
  };

  const handleClear = () => {
    setUserInput("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calculator</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.timerContainer}>
        <View style={styles.timer}>
          <Text style={styles.timerText}>{timeLeft}s</Text>
        </View>
      </View>
      <View style={styles.levelContainer}>
        <Text style={styles.levelText}>Level: 1</Text>
        <Text style={styles.scoreText}>0</Text>
        <Text style={styles.coinText}>45</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          {num1} + {num2} = ?
        </Text>
      </View>
      <TextInput
        style={styles.input}
        value={userInput}
        editable={false}
        placeholder="?"
        placeholderTextColor="#fff"
      />
      <View style={styles.numberPad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.numberButton}
            onPress={() => handleNumberPress(num)}
          >
            <Text style={styles.numberButtonText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={gameOver}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        {gameOver && (
          <TouchableOpacity
            style={styles.restartButton}
            onPress={handleRestart}
          >
            <Text style={styles.restartButtonText}>Restart</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  timer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: "#FFA500",
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 24,
    color: "#fff",
  },
  levelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  levelText: {
    fontSize: 20,
    color: "#fff",
  },
  scoreText: {
    fontSize: 20,
    color: "#fff",
  },
  coinText: {
    fontSize: 20,
    color: "#fff",
  },
  questionContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  question: {
    fontSize: 36,
    color: "#fff",
  },
  input: {
    fontSize: 36,
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  numberPad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  numberButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "#FFA500",
    borderRadius: 30,
  },
  numberButtonText: {
    fontSize: 24,
    color: "#000",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  clearButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  clearButtonText: {
    fontSize: 20,
    color: "#000",
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 8,
  },
  submitButtonText: {
    fontSize: 20,
    color: "#fff",
  },
  restartButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
  },
  restartButtonText: {
    fontSize: 20,
    color: "#fff",
  },
  message: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
  },
});

export default MathGame;
