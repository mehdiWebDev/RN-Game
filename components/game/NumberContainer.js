import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../contants/colors";
import { number } from "prop-types";

const NumberContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent500,
    padding: 24,
    borderRadius: 8,
    margin: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontFamily: "open-sans-bold",
    color: Colors.accent500,
    fontSize: 36,
  },
});

export default NumberContainer;
