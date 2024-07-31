import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MathGame from "./src/screens/MathGame";
import Settings from "./src/screens/Settings";

const Stack = createStackNavigator();

export default function App() {
  const [gameMode, setGameMode] = useState("easy");

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MathGame">
          {(props) => <MathGame {...props} gameMode={gameMode} />}
        </Stack.Screen>
        <Stack.Screen name="Settings">
          {(props) => (
            <Settings
              {...props}
              gameMode={gameMode}
              setGameMode={setGameMode}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
