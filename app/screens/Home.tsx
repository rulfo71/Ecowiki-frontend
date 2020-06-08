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
    const user = firebase.auth().currentUser
    if (user) {
      setIsLogged(true)
    }
    else {
      setIsLogged(false)
    }
    if (loggedModalResponse) {
      navigation.navigate(Constants.Navigations.ProductStack.addProductHome)
      setLoggedModalResponse(false)
    }
  }, [loggedModalResponse])

  const goToAddProduct = () => {
    if (isLogged) {
      navigation.navigate(
        Constants.Navigations.ProductStack.addProductHome
      )
    }
    else {
      setShowLoggedModal(true)
    }
  }

  return (
    <View style={styles.viewBody}>
      <View style={styles.buttonsTop}>
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
      </View>
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
    alignSelf: 'center',
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
  },
  buttonsTop: {
    flexDirection: 'row'
  }

});