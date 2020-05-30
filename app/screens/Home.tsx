import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, Animated, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as firebase from 'firebase'

import { Constants } from "../Common/Constants/Constants";
import { Button, Icon } from "react-native-elements";
import ModalRN from "../components/ModalRN";
import ConfirmModal from "../components/ConfirmModal";

export default function Home() {

  const navigation = useNavigation();
  const [showLoggedModal, setShowLoggedModal] = useState(false)
  const [loggedModalResponse, setLoggedModalResponse] = useState(false)
  const [isLogged, setIsLogged] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setIsLogged(false) : setIsLogged(true);
    });

    if (loggedModalResponse) {
      navigation.navigate(Constants.Navigations.ProductStack.addProduct)
      setLoggedModalResponse(false)
    }
  }, [loggedModalResponse])

  const goToAddProduct = () => {

    // const user = firebase.auth().currentUser
    // console.log(`user: ${user}`);
    if (isLogged) {
      console.log('esta loggeado');

      navigation.navigate(
        Constants.Navigations.ProductStack.addProduct,
        {
          nameParam: '',
          barcodeParam: ''
        }
      )
    }
    else {
      console.log('no esta loggeado');
      setShowLoggedModal(true)
    }
  }

  return (
    <View style={styles.viewBody}>
      <TouchableHighlight
        onPress={() => navigation.navigate(Constants.Navigations.ProductStack.searchProduct)}
        style={styles.touchable}
      >
        <View>
          <Icon
            type='material'
            name='search'
            reverse={true}
            color={Constants.Colors.brandGreenColor}
            raised={true}
            containerStyle={styles.containerIcon}
          />
          <Text style={styles.title}> Buscar productos </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={goToAddProduct}
        style={styles.touchable}
      >
        <View>
          <Icon
            type='material'
            name='add'
            color={Constants.Colors.brandGreenColor}
            reverse={true}
            raised={true}
            style={styles.icon}
            containerStyle={styles.containerIcon}
          />
          <Text style={styles.title}> Agregar productos </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => navigation.navigate(Constants.Navigations.AccountStack.account)}
        style={styles.touchable}
      >
        <View>
          <Icon
            type='material-community'
            name='account'
            color={Constants.Colors.brandGreenColor}
            reverse={true}
            raised={true}
            containerStyle={styles.containerIcon}
          />
          <Text style={styles.title}> Mi Cuenta </Text>
        </View>
      </TouchableHighlight>

      <ConfirmModal
        showModal={showLoggedModal}
        setShowModal={setShowLoggedModal}
        questionText={' Para agregar productos tenés que estar logueado'}
        confirmText={'Iniciar Sesión'}
        cancelText={'Cancelar'}
        setResponse={setLoggedModalResponse}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: "center",
    // justifyContent:,
    backgroundColor: Constants.Colors.backgroundGrey
  },
  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: 100,
  },
  containerIcon: {
    // padding: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginRight: 10,
    // height: 50,
    // width: 50,
    // backgroundColor: Constants.Colors.brandGreenColor,
    // borderRadius: 20,
    alignSelf: 'center',
    // width: 20
  },
  title: {
    textAlign: 'center'
  },
  touchable: {
    padding: 10,
    alignContent: 'center',
    width: 100,
  },
  icon: {
  }

});