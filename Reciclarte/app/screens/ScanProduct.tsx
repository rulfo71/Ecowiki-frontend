import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import BarcodeScanner from "../components/BarCodeScanner";

export default class ScanProduct extends Component {
  render() {
    return (
      <View style={styles.viewBody}>
        <BarcodeScanner/>
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
