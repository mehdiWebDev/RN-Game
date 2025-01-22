import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import Colors from "../../contants/colors";

const GuessLogItem = ({ roundNumber, guess }) => {
  const { height, width } = useWindowDimensions();
  const screenOrientation = height > width ? "portrait" : "landscape";
  return (
    <View
      style={[
        styles.listItem,
        {
          width: screenOrientation === "portrait" ? "100%" : 300,
          marginHorizontal: screenOrientation === "portrait" ? 0 : 8,
          marginVertical: screenOrientation === "portrait" ? 8 : 0,
        },
      ]}
    >
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
    backgroundColor: Colors.accent500,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});

export default GuessLogItem;
