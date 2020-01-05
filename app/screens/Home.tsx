import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.viewBody}>
        <Text>Home Screen...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});
