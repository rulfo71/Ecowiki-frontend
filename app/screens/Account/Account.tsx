import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as firebase from 'firebase'
import Spinner from "react-native-loading-spinner-overlay";

import { Constants } from '../../Common/Constants/Constants';
import UserLogged from './UserLogged'
import Login from "./Login";

export default function Account({ route, navigation }) {


  // console.log(`Account. route: ${JSON.stringify(route)}, navigation: ${JSON.stringify(navigation)}`);
  // const { redirectTo } = route.params
  // console.log(`redirectTo: ${redirectTo}`);

  // console.log(`redirectTo: ${redirectTo}`);

  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('entrando a account');    

    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, [])

  if (login === null) return <Spinner visible={login === null} />

  return (
    login ? <UserLogged /> : <Login redirectTo={Constants.Navigations.AccountStack.account} />
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
