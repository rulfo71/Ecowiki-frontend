import React, { Component, useEffect, useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native'
import Toast from 'react-native-easy-toast'
import * as Permissions from 'expo-permissions'
import { getProductByBarCode, getProductByName, addUnregisteredProduct } from '../../Repositories/ProductsRepository'
import { Text as TextElem, Overlay, SearchBar, Button } from 'react-native-elements'
import Spinner from "react-native-loading-spinner-overlay";

import CodeScanner from '../../utils/CodeScanner'
import Product from '../../Models/ProductModel'
import { isEmptyProduct } from '../../Services/ProductsService'
import { useNavigation } from '@react-navigation/native'
import { Constants } from '../../Common/Constants/Constants'
import ConfirmModal from '../../components/ConfirmModal'
import { isEmpty } from 'lodash'

export default function AddNewProduct({ route, navigation }) {
  let searchBarRef = useRef(null);
  const toastRef = useRef(null);

  let [hasCameraPermission, setCameraPermission] = useState(null);
  let [loading, setLoading] = useState(false);
  // let [searchBar, setSearchBar] = useState('');
  const [barcode, setBarcode] = useState('');
  const [barcodeScanned, setBarcodeScanned] = useState(false)
  // // const [scanning, setScanning] = useState(true)
  const [scanned, setScanned] = useState(false)
  const [alreadySearched, setAlreadySearched] = useState(false)
  // const [lastSearchedName, setLastSearchedName] = useState('')
  // const [showAddProductModal, setShowAddProductModal] = useState(false)
  // const [addProductModalResponse, setAddProductModalResponse] = useState(false)

  useEffect(() => {
    getPermissionsAsync();

    if (scanned && !alreadySearched) {
      onBarcodeScanned()
      setAlreadySearched(true)
    }
  }, [scanned]);

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    setCameraPermission(status === 'granted');
  }

  const goToAddProduct = () => {
    navigation.navigate(
      Constants.Navigations.ProductStack.addProduct,
      {
        name: '',
        barcode: ''
      }
    )
  }

  const onBarcodeScanned = async () => {
    console.log(`escaneee el codigo de barras: ${barcode} `);
    if (!isEmpty(barcode)) {
      navigation.navigate(
        Constants.Navigations.ProductStack.addProduct,
        {
          name: '',
          barcode: barcode
        }
      )
    }
  }

  return (
    <View style={styles.view}>
      <CodeScanner setBarcodeScanned={setBarcodeScanned} setBarcode={setBarcode} scanned={scanned} setScanned={setScanned} setAlreadySearched={setAlreadySearched}></CodeScanner>
      <Button
        title='Agregar por nombre'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={goToAddProduct}
      />
      {/* <Spinner visible={loading} /> */}
      {/* <Toast ref={toastRef} position='center' /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
  },
  overlayLoading: {
    padding: 20
  },
  overlayLoadingText: {
    color: '#00a680',
    marginBottom: 20,
    fontSize: 20
  },
  btnContainer: {
    width: '70%',
    top: 100,
    borderRadius: 20,
    position: 'absolute',
    alignSelf: 'center',
    // borderTopColor: 'transparent',
    // borderBottomColor: 'transparent',
    // backgroundColor: 'transparent'
  },
  btn: {
    backgroundColor: Constants.Colors.brandGreenColor,
    borderRadius: 50,
  },
  SearchBar: {
    opacity: 1,
  },
})
