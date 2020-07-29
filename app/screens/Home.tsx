import React, { Component, useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Animated, TouchableHighlight, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as firebase from 'firebase'
import Spinner from "react-native-loading-spinner-overlay";
import { FloatingAction } from 'react-native-floating-action'

import { Constants } from "../Common/Constants/Constants";
import { Button, Icon } from "react-native-elements";
import ConfirmModal from "../components/ConfirmModal";
import EcotipsList from "../components/Ecotips/EcotipsList";

export default function Home() {

  const navigation = useNavigation();
  const [showLoggedModal, setShowLoggedModal] = useState(false)
  const [loggedModalResponse, setLoggedModalResponse] = useState(false)
  const [isLogged, setIsLogged] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [goTo, setGoTo] = useState('')

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
      console.log('****************');
      console.log(`goTo: ${goTo} `);
      console.log('****************');
      
      navigation.navigate(goTo)
      setLoggedModalResponse(false)
    }
  }, [loggedModalResponse])

  const goToIfLogged = (url : string) => {
    if (isLogged) {
      setGoTo('')
      navigation.navigate(url)
    }
    else {
      setGoTo(url);
      setShowLoggedModal(true)
    }
  }


  const actions = [
    {
        text: "Votar productos",
        icon: <Icon
            type='material'
            name='done'
            color='white'
        />,
        name: "vote_added_products",
        position: 1,
        color: Constants.Colors.brandGreenColor,
        size: 50,
    },
    {
        text: "Agregar un producto nuevo",
        icon: <Icon
            type='material-community'
            name='barcode'
            color='white'
        />,
        name: "add_new_product",
        position: 2,
        color: Constants.Colors.brandGreenColor,
        size: 50,
    },
    {
      text: "Clasificar",
      icon: <Icon
          type='material-community'
          name='barcode'
          color='white'
      />,
      name: "clasify_products",
      position: 2,
      color: Constants.Colors.brandGreenColor,
      size: 50,
    },
]

const onPressItem = (name) => {
  switch (name) {
      case 'add_new_product':
          goToIfLogged(Constants.Navigations.ProductStack.addNewProduct)
          break;
      case 'vote_added_products':
          // console.log(`toastRef: ${toastRef}`);
          goToIfLogged(Constants.Navigations.ProductStack.voteProducts)
          break;
      case 'clasify_products':
        goToIfLogged(Constants.Navigations.ProductStack.clasify)
        break;
      default:
          break;
  }
}


  return (
    <View style={styles.viewBody}>
      <ScrollView>
        <TresR/>
        <View>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor= '#e5e5e5'
            onPress={() => navigation.navigate(Constants.Navigations.ProductStack.searchProduct)}
            style={styles.touchable}
          >
            <View>
              <Icon
                size={50}
                type='material'
                name='search'
                // reverse={true}
                color={Constants.Colors.brandGreenColor}
                // raised={true}
                containerStyle={styles.containerIcon}
              />
              <Text style={styles.buttonsText}> ¿ En qué tacho va ? </Text>
            </View>
          </TouchableHighlight>
        </View>
        <EcotipsList/>
        <ConfirmModal
          showModal={showLoggedModal}
          setShowModal={setShowLoggedModal}
          questionText={' Para agregar productos tenés que estar logueado'}
          confirmText={'Iniciar Sesión'}
          cancelText={'Cancelar'}
          setResponse={setLoggedModalResponse}
        />
        <Spinner visible={isLoading} />
      </ScrollView>
      <FloatingAction
                    actions={actions}
                    color={Constants.Colors.brandGreenColor}
                    onPressItem={name => {
                        onPressItem(name)
                    }}
                />
    </View>
  )
}

function TresR() {
  return (
    <Image
    source={require('../../assets/img/3r.png')}
    resizeMode='contain'
    style={styles.tresR}
/>
    // <View>
    //   <Text style = {styles.title}>
    //       Acordate!
    //     </Text>
    //     <Text style = {styles.text}>
    //     {`
    //       1) Reducir

    //       2) Reutilizar
          
    //       y recien ahí...
          
    //       3) Reciclar`
    //     }
    //     </Text>
    //   </View>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    flexDirection: 'column',
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
    textAlign: 'center',
    fontSize: 30,
    alignSelf: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  text: {
    fontSize: 20,
  },
  buttonsText: {
    textAlign: 'center',
    fontSize: 15
  },
  touchable: {
    alignContent: 'center',
    alignSelf: 'center',
    width: '90%',
    margin: 10,
    padding: 10,
    borderRadius: 20,

    //raised
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 3, // Android
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

  },
  icon: {
  },
  // buttonsTop: {
  //   flexDirection: 'row'
  // },
  tresR: {
    width: '100%',
    height: 150,
    marginTop: 20,
  }

});