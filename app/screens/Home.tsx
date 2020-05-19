import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Constants } from "../Common/Constants/Constants";
import { Button } from "react-native-elements";

export default function Home () {

  const navigation = useNavigation();

    return (
      <View style={styles.viewBody}>
        <Text>Home Screen...</Text>
        <Button
        title='Mi Cuenta'
        onPress={() => navigation.navigate(Constants.Navigations.AccountStack.account)}
      />
        <Button
        title='Buscar productos'
        onPress={() => navigation.navigate(Constants.Navigations.SearchProductStack.searchProduct)}
      />
      </View>
    )
  }

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});