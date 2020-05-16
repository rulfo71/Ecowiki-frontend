import React, { Component, useRef, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from 'react-native-elements'
import Toast from 'react-native-easy-toast'
import * as firebase from 'firebase'
import Spinner from "react-native-loading-spinner-overlay";

import { Constants } from "../../Common/Constants/Constants";
import AccountOptions from '../../components/Account/AccountOptions';
import InfoUser from '../../components/Account/InfoUser'
import Account from "./Account";


export default function UserLogged() {

  const toastRef = useRef();
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [reloadUserInfo, setReloadUserInfo] = useState(false)

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user);
    })()
    setReloadUserInfo(false)
  }, [reloadUserInfo])

  return (
    <View style={styles.viewUserInfo}>
      {userInfo && <InfoUser
        userInfo={userInfo}
        toastRef={toastRef}
        setLoading={setLoading}
        
      />}
      <AccountOptions 
        userInfo={userInfo} 
        toastRef={toastRef} 
        setReloadUserInfo={setReloadUserInfo} 
      />
      <Button
        title='Cerrar Sesión'
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={() => firebase.auth().signOut()}
      />
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
    borderRadius: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    paddingTop: 10,
    paddingBottom: 10,

  },
  btnCloseSessionText: {
    color: Constants.Colors.brandGreenColor
  }
});
