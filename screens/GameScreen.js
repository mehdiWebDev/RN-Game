import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Title from "../components/Title";
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer";
import AppButton from "../components/AppButton";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";
import Ionicons from "@expo/vector-icons/Ionicons";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({
  userChoice,
  gameOverHandler,
  setRoundsNumber,
  roundNumber,
}) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userChoice) {
      gameOverHandler();
    }
  }, [currentGuess, userChoice, gameOverHandler]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    setRoundsNumber((prev) => prev + 1);
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prev) => [newRndNumber, ...prev]);
  }

  const guessRoundsLength = guessRounds.length;

  let orientation = width > height ? "landscape" : "portrait";
  const content = (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText>Higher or lower</InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <AppButton onPress={() => nextGuessHandler("lower")}>
              <Ionicons name="remove" size={24} color="white" />
            </AppButton>
          </View>
          <View style={styles.buttonContainer}>
            <AppButton onPress={() => nextGuessHandler("greater")}>
              <Ionicons name="add" size={24} color="white" />
            </AppButton>
          </View>
        </View>
      </Card>

      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          horizontal={orientation === "landscape"}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item, index }) => (
            <GuessLogItem
              guess={item}
              roundNumber={guessRoundsLength - index}
            />
          )}
        />
      </View>
    </View>
  );

  return (
    <>
      {orientation === "portrait" ? (
        content
      ) : (
        <ScrollView>{content}</ScrollView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  screen: {
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
  },
});

export default GameScreen;
