import { StyleSheet, ImageBackground } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import Screen from "./components/Screen";
import GameScreen from "./screens/GameScreen";
import Colors from "./contants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [roundsNumber, setRoundsNumber] = useState(0);

  const [loaded, error] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const startNewGameHandler = () => {
    setGameIsOver(true);
    setUserNumber(null);
    setRoundsNumber(0);
  };
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGameIsOver(false);
  };

  const gameOverHandler = () => {
    setGameIsOver(true);
  };
  let screen = <StartGameScreen onStartGame={startGameHandler} />;
  if (userNumber) {
    screen = (
      <GameScreen
        userChoice={userNumber}
        gameOverHandler={gameOverHandler}
        setRoundsNumber={setRoundsNumber}
        roundNumber={roundsNumber}
      />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        restartGame={startNewGameHandler}
        userNumber={userNumber}
        roundsNumber={roundsNumber}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary900, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={{ opacity: 0.15 }}
      >
        <Screen>{screen}</Screen>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
