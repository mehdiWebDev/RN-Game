import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState } from "react";
import AppButton from "../components/AppButton";
import Colors from "../contants/colors";
import Title from "../components/Title";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";

const StartGameScreen = ({ onStartGame }) => {
  const [enteredValue, setEnteredValue] = useState("");
  const { height } = useWindowDimensions();
  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const ConfirmHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number!", "Number has to be between 1 and 99", [
        {
          text: "Okay",
          style: "destructive",
          onPress: () => setEnteredValue(""),
        },
      ]);
      return;
    }
    onStartGame(chosenNumber);
  };
  const marginTop = height < 500 ? 30 : 100;
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position">
        <View style={[styles.container, { marginTop: marginTop }]}>
          <Title>Guess My number</Title>

          <Card>
            <InstructionText> Enter a number </InstructionText>
            <TextInput
              maxLength={2}
              style={styles.numberInput}
              keyboardType="number-pad"
              value={enteredValue}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <AppButton onPress={() => setEnteredValue("")}>Reset</AppButton>
              </View>
              <View style={styles.buttonContainer}>
                <AppButton onPress={ConfirmHandler}>Confirm</AppButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  numberInput: {
    height: 60,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonsContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
  },
  buttonContainer: {
    flex: 1,
  },
});

export default StartGameScreen;
