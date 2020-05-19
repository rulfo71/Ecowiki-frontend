import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as firebase from 'firebase'
import Spinner from "react-native-loading-spinner-overlay";

import UserLogged from './UserLogged'
import Login from "./Login";

export default function Account({ route, navigation }) {
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, [])

  if (login === null) return <Spinner visible={login === null} />

  return (
    login ? <UserLogged /> : <Login />
  );
}

// const styles = StyleSheet.create({
//   viewBody: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff"
//   }
// });
