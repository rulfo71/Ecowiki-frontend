import React, { Component, useEffect, useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native'
import Toast from 'react-native-easy-toast'
import * as Permissions from 'expo-permissions'
import { getProductByBarCode, getProductByName, addUnregisteredProduct } from '../../Repositories/ProductsRepository'
import { Text as TextElem, Overlay, SearchBar } from 'react-native-elements'
import Spinner from "react-native-loading-spinner-overlay";

import CodeScanner from '../../utils/CodeScanner'
import Product from '../../Models/ProductModel'
import { isEmptyProduct } from '../../Services/ProductsService'
import { useNavigation } from '@react-navigation/native'
import { Constants } from '../../Common/Constants/Constants'
import ConfirmModal from '../../components/ConfirmModal'

export default function SearchProduct() {
  let searchBarRef = useRef(null);
  const toastRef = useRef(null);
  const navigation = useNavigation();

  let [hasCameraPermission, setCameraPermission] = useState(null);
  let [loading, setLoading] = useState(false);
  let [searchBar, setSearchBar] = useState('');
  const [barcode, setBarcode] = useState('');
  const [barcodeScanned, setBarcodeScanned] = useState(false)
  const [scanning, setScanning] = useState(true)
  const [lastSearchedName, setLastSearchedName] = useState('')
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [addProductModalResponse, setAddProductModalResponse] = useState(false)

  useEffect(() => {
    console.log('entre al useEffect de searchProduct ');
    // setScanning(true)

    getPermissionsAsync();
    searchBarRef.current.clear();
    // todo: remove mock
    // let productMock = new Product()
    // productMock.displayName = 'Botella de coca'
    // productMock.description = 'aca iria alguna observacion adicional que dejaron escrita'
    // productMock.material = 'plastico'
    // productMock.barcode = '101010101010110'

    // goToProductInfo(productMock);
    if (addProductModalResponse) {
      goToAddProduct()
      setAddProductModalResponse(false)
      setScanning(false)
    }
    //TODO: SI CANCELA Y TIENE NOMBRE mando solo el nombre? 

    if (barcodeScanned) {
      onBarcodeScanned()
      setBarcodeScanned(false)
      setScanning(false)
    }


  }, [addProductModalResponse, barcodeScanned]);

  const updateSearch = searchBar => {
    setSearchBar(searchBar);
  };

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    setCameraPermission(status === 'granted');
  }
  const goToAddProduct = async () => {
    navigation.navigate(Constants.Navigations.ProductStack.addUnregisteredProduct, {
      barcode: barcode,
      name: lastSearchedName
    });
    setLastSearchedName('')
  }
  const goToProductInfo = async (product: Product) => {
    console.log('vamos para productInfo con ', product);
    navigation.navigate(Constants.Navigations.ProductStack.productInfo, {
      productParam: product
    });
  }

  const onBarcodeScanned = async () => {
    console.log(`escaneee el codigo de barras: ${barcode} `);
    setLoading(true)
    await getProductByBarCode(barcode)
      .then(foundProduct => {
        setLoading(false);
        if (foundProduct && !isEmptyProduct(foundProduct)) {
          goToProductInfo(foundProduct);
          // setScanned(false);
        } else {
          // addProductAlert(data)
          setShowAddProductModal(true)
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error')
        toastRef.current.show('Error de servidor. Intente de nuevo mas tarde', 600)
      })
  }

  const searchSubmit = async () => {
    setLoading(true);
    await getProductByName(searchBar)
      .then(foundProduct => {
        setLoading(false);
        setBarcode('');
        if (foundProduct && !isEmptyProduct(foundProduct)) {
          searchBarRef.current.clear();
          setLastSearchedName('')
          goToProductInfo(foundProduct)
        } else {
          setLastSearchedName(searchBar)
          setShowAddProductModal(true)
          // addProductAlert()
          searchBarRef.current.clear();
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error')
        toastRef.current.show('Error de servidor. Intente de nuevo mas tarde', 600)
      })
  }

  return (
    <View style={styles.view}>
      <CodeScanner setBarcodeScanned={setBarcodeScanned} setBarcode={setBarcode} scanning={scanning} setScanning={setScanning}></CodeScanner>
      <SearchBar
        ref={searchBarRef}
        round
        lightTheme
        returnKeyType='search'
        placeholder="Buscá por nombre acá"
        onChangeText={updateSearch}
        value={searchBar}
        onSubmitEditing={searchSubmit}
        containerStyle={styles.SearchBarContainer}
        inputContainerStyle={styles.SearchBar}
        inputStyle={styles.SearchBar}
      />
      <Spinner visible={loading} />
      <Toast ref={toastRef} position='center' />
      <ConfirmModal
        showModal={showAddProductModal}
        setShowModal={setShowAddProductModal}
        questionText={'Upss..No tenemos registrado este producto'}
        secondaryQuestionText={'Si agregás mas informacion, alguien va a poder cargar a que tacho va!'}
        confirmText={'Aceptar'}
        cancelText={'Cancelar'}
        setResponse={setAddProductModalResponse}
      />

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
  SearchBarContainer: {
    width: '100%',
    paddingTop: 90,
    borderRadius: 5,
    position: 'absolute',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    backgroundColor: 'transparent'
  },
  SearchBar: {
    opacity: 1,
  },
})
