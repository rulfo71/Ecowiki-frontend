import React, { Component, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Constants } from "../Common/Constants/Constants";
import { Button } from "react-native-elements";
import ModalRN from "../components/ModalRN";
import Modal from 'react-native-modal';


export default function Home() {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={styles.viewBody}>
      <Text>Home Screen...</Text>
      <Button
        title='Mi Cuenta'
        onPress={() => navigation.navigate(Constants.Navigations.AccountStack.account)}
      />
      <Button
        title='Buscar productos'
        onPress={() => navigation.navigate(Constants.Navigations.ProductStack.searchProduct)}
      />
      <Button
        title='Agregar productos'
        onPress={() => navigation.navigate(
          Constants.Navigations.ProductStack.addProduct,
          {
            nameParam: '',
            barcodeParam: ''
          }
        )}
      />

      {/* <Button
        title='Abrir modal'
        onPress={() => navigation.navigate('myModal')}
      />
      <Button
        title='Abrir modalRN'
        onPress={() => setModalVisible(true)}
      /> */}
      <Modal isVisible={modalVisible} >
        <View style={{ flex: 1 }}>
          <Text>I am the modal content!</Text>
          <Button>
            title='cerrar'
            onPress={() => { setModalVisible(false) }}
          </Button>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});