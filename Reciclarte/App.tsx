import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Avatar } from "react-native-elements";
import UserNavigation from "./app/navigations/User";
import HomeScreen from "./app/screens/Home";
import { firebaseApp } from "./app/utils/firebase";

export default class App extends React.Component {
  buttonOnClick = value => {
    console.log(`Click en mi primer boton ${value}`);
  };

  render() {
    return (
      <View style={styles.container}>
        <UserNavigation></UserNavigation>
      </View>

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
    );
  }
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
