import React, { Component, useRef, useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import Toast from 'react-native-easy-toast'
import * as firebase from 'firebase'
import Spinner from "react-native-loading-spinner-overlay";

import { Constants } from "../../Common/Constants/Constants";
import AccountOptions from '../../components/Account/AccountOptions';
import InfoUser from '../../components/Account/InfoUser'
import { getUserById } from "../../Repositories/UsersRepository";


export default function UserLogged() {

  const toastRef = useRef();
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [userDb, setUserDb] = useState(null)
  const [reloadUserInfo, setReloadUserInfo] = useState(false)

  useEffect(() => {
    (async () => {
      setUserInfo(null);
      const userFirebase = await firebase.auth().currentUser;
      console.log(`userFirebase: ${JSON.stringify(userFirebase)}`);
      const user = await getUserById(userFirebase.uid)
      console.log(`response getUserById: ${user}`);

      setUserInfo(user);
    })()

  }, [reloadUserInfo])

  return (
    <View style={styles.viewUserInfo}>
      {userInfo == null ?
        <ActivityIndicator animating={true} /> :
        <InfoUser
          userInfo={userInfo}
          toastRef={toastRef}
          setLoading={setLoading}

        />}
      <AccountOptions
        userInfo={userInfo}
        userDb={userDb}
        toastRef={toastRef}
        setLoading={setLoading}
        setReloadUserInfo={setReloadUserInfo}
      />
      {/* <Button
        title='Cerrar Sesión'
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={() => firebase.auth().signOut()}
      /> */}
      <Toast ref={toastRef} position='center' opacity={0.9} />
      <Spinner visible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: '100%',
    backgroundColor: Constants.Colors.backgroundGrey,
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    padding: 10,
    width: '90%',
    alignSelf: 'center'

  },
  btnCloseSessionText: {
    color: Constants.Colors.brandGreenColor
  }
});
