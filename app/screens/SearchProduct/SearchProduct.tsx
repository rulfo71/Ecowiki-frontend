import React, { Component, useEffect, useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native'
import Toast from 'react-native-easy-toast'
import * as Permissions from 'expo-permissions'
import { getProductByBarCode, getProductByName, setUnregisteredProduct } from '../../Repositories/ProductsRepository'
import { Text as TextElem, Overlay, SearchBar } from 'react-native-elements'
import Spinner from "react-native-loading-spinner-overlay";

import CodeScanner from '../../utils/CodeScanner'
import Product from '../../Models/ProductModel'
import { isEmptyProduct } from '../../Services/ProductsService'
import { useNavigation } from '@react-navigation/native'
import { Constants } from '../../Common/Constants/Constants'

export default function SearchProduct() {
  let searchBarRef = useRef(null);
  const toastRef = useRef(null);
  const navigation = useNavigation();

  let [hasCameraPermission, setCameraPermission] = useState(null);
  let [loading, setLoading] = useState(false);
  let [barCode, setBarCode] = useState('');
  let [searchBar, setSearchBar] = useState('');

  useEffect(() => {
    getPermissionsAsync();
    searchBarRef.current.clear();
    // todo: remove mock
    // let productMock = new Product()
    // productMock.displayName = 'Botella de coca'
    // productMock.description = 'aca iria alguna observacion adicional que dejaron escrita'
    // productMock.material = 'plastico'
    // productMock.barcode = '101010101010110'

    // goToProductInfo(productMock);

  }, []);

  const updateSearch = searchBar => {
    setSearchBar(searchBar);
  };

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    setCameraPermission(status === 'granted');
  }
  const goToSetMaterial = async () => {
    navigation.navigate('SetMaterial', {
      barCode: barCode,
      name: searchBar
    });
  }
  const goToProductInfo = async (product: Product) => {
    console.log('vamos para productInfo con ', product);
    navigation.navigate(Constants.Navigations.SearchProductStack.productInfo, {
      productParam: product
    });
  }

  const searchSubmit = async () => {
    setLoading(true);
    await getProductByName(searchBar)
      .then(foundProduct => {
        setLoading(false);
        setBarCode('');
        if (foundProduct && !isEmptyProduct(foundProduct)) {
          goToProductInfo(foundProduct)
          searchBarRef.current.clear();
        } else {
          addProductAlert()
          searchBarRef.current.clear();
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error')
        toastRef.current.show('Error de servidor. Intente de nuevo mas tarde', 600)
      })
  }

  const addProductAlert = () => {
    Alert.alert('No tenemos registrado este producto', 'Queres agregarlo?',
      [
        {
          text: 'No',
          onPress: () => {
            console.log('No quiere agregarlo')
            var product = new Product();
            product.displayName = searchBar;
            console.log(product.displayName);
            setUnregisteredProduct(product);
          }
        },
        {
          text: 'Si',
          onPress: async () => {
            await goToSetMaterial();
          }
        }
      ],
    )
  }

  return (
    <View style={styles.view}>
      <CodeScanner></CodeScanner>
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
    top: 50,
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