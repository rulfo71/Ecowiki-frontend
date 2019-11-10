import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Barcode from "../components/BarCodeScanner";

export default class ScanProduct extends Component {
  render() {
    return (
      <View style={styles.viewBody}>
        <Barcode />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "#fff"
  }
});
