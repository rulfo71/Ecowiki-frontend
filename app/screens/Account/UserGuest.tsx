import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import {useNavigation} from '@react-navigation/native';
import { Constants } from "../../Common/Constants/Constants";

export default function UserGuest() {

  const navigation = useNavigation();

  return (
    <ScrollView centerContent={true}>
      <Text>Te gustaría poder agregar productos y sumar puntos? a ver si conseguís estar en el top 5 ! </Text>
      <Button
        title='Iniciar Sesión'
        onPress={() => navigation.navigate(Constants.Navigations.AccountStack.login)}
      />
    </ScrollView>
  );     
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});
