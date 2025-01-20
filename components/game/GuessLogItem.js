import { View, Text, StyleSheet } from "react-native";
import Colors from "../../contants/colors";

const GuessLogItem = ({ roundNumber, guess }) => {
  return (
    <View style={styles.listItem}>
      <Text>#{roundNumber}</Text>
      <Text>Opponent's Guess: {guess}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: Colors.primary700,
    borderWidth: 1,
    borderRadius: 30,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    width: "100%",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});

export default GuessLogItem;
