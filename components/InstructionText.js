import { Text, StyleSheet } from "react-native";
import Colors from "../contants/colors";

function InstructionText({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});

export default InstructionText;
