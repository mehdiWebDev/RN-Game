import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import Title from "../components/Title";
import Colors from "../contants/colors";
import AppButton from "../components/AppButton";

const GameOverScreen = ({ restartGame, roundsNumber, userNumber }) => {
  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <Title>Game Over</Title>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/success.png")}
            style={styles.image}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed{" "}
          <Text style={styles.hightlight}>{roundsNumber}</Text> rounds to guess
          the number
          <Text style={styles.hightlight}> {userNumber}</Text>
        </Text>
        <AppButton onPress={restartGame}>Start New Game</AppButton>
      </View>
    </ScrollView>
  );
};

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: 24,
  },
  imageContainer: {
    width: deviceWidth < 400 ? 150 : 300,
    height: deviceWidth < 400 ? 150 : 300,
    borderRadius: "50%",
    borderWidth: 3,
    borderColor: Colors.primary700,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  hightlight: {
    color: Colors.primary500,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
