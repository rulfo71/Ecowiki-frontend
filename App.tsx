import React, { useEffect } from "react";
import { StyleSheet, Text, View, YellowBox } from "react-native";
import { Button, Avatar } from "react-native-elements";
// import UserNavigation from "./app/navigations/User";
import { firebaseConfig } from './app/utils/firebase';
import * as firebase from 'firebase'
import Navigation from './app/navigations/Navigation'
import HomeScreen from "./app/screens/Home";

YellowBox.ignoreWarnings(['Setting a timer'])

export default function App() {

  firebase.initializeApp(firebaseConfig);
  return <Navigation />

  //return (
  // <View style={styles.container}>
  // <UserNavigation></UserNavigation> 

  // </View>

  // <HomeScreen />
  // <View style={styles.container}>
  //   <Avatar
  //     rounded
  //     source={{
  //       uri:
  //         "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
  //     }}
  //   />
  //   <Text>Aplicacion Abierta</Text>
  //   <Button
  //     title="Mi Primer Boton"
  //     onPress={() => this.buttonOnClick("Hola Mundo")}
  //   ></Button>
  // </View>
  //);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
