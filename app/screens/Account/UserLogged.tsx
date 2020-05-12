import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import * as firebase from 'firebase'

export default function UserLogged() {
    return (
      <View style={styles.viewBody}>
        <Text>User Logged</Text>
        <Button title='Cerrar Sesión' onPress={() => firebase.auth().signOut()} />
      </View>
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
