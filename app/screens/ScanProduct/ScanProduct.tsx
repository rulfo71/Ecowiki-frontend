import React, { Component, useEffect, useState, useRef } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator
} from 'react-native'
import * as Permissions from 'expo-permissions'
import { getProductByBarCode, getProductByName } from '../../Repositories/ProductsRepository'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Text as TextElem, Overlay, SearchBar } from 'react-native-elements'
import Product from '../../Models/ProductModel'
import { withNavigation } from 'react-navigation'
// import { Toast } from 'react-native-easy-toast'

function ScanProduct(props) {
  let searchBarRef = useRef(null);
  const {navigation} = props;
  let [hasCameraPermission, setCameraPermission] = useState(null);
  let [scanned, setScanned] = useState(false);
  let [overlayComponent, setOverlayComponent] = useState(null);
  let [loading, setLoading] = useState(false);
  let [barCode, setBarCode] = useState('');
  let [searchBar, setSearchBar] = useState('');

  useEffect(() => {
    getPermissionsAsync()
  },[]);

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
    console.log('vamos para productInfo con ',product);
    
    navigation.navigate("ProductInfo", {
      product: product
    });
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    console.log('handleBarCodeScanned')
    setScanned(true);
    setLoading(true);

    await getProductByBarCode(data)
      .then(foundProduct => {
        setLoading(false);
        setBarCode(data);
        if (foundProduct) {
          goToProductInfo(foundProduct)
        } else {
          addProductAlert()
        }
      })
      .catch(error => {
        console.log('error')
        setLoading(false);
      })
  }

  const searchSubmit = async () => {
    setLoading(true);

    await getProductByName(searchBar)
      .then(foundProduct => {
        setLoading(false);
        setBarCode('');
        if (foundProduct) {
          goToProductInfo(foundProduct)
          // this.searchBarRef.clear();
        } else {
          addProductAlert();
          // this.searchBarRef.clear();
        }
      })
      .catch(error => {
        // this.refs.toast.show('Error de servidor, intente de nuevo mas tarde')
        console.log('error')
        setLoading(false);
      })
  }

  const mockeoParaBorrar = async () => {
    console.log('mockeoParaBorrar')

    await getProductByBarCode('4002604064767')
      .then(foundProduct => {
        console.log('foundProduct desde scanproduct');
        console.log(foundProduct);
        setLoading(false);
        setBarCode('4002604064767');
        if (foundProduct) {
          alert(
            'este producto va en ' +
            foundProduct.Material +
            ' . Descripcion: ' +
            foundProduct.Description
          )
        } else {
          addProductAlert()
        }
      })
      .catch(error => {
        // this.refs.toast.show('Error de servidor, intente de nuevo mas tarde')
        console.log('error en scanProduct')
        console.log(error);
        setLoading(false);
      })
  }

  const addProductAlert = () => {
    Alert.alert('No tenemos registrado este producto', 'Queres agregarlo?', [
      {
        text: 'No',
        onPress: () => console.log('No quiere agregarlo')
      },
      {
        text: 'Si',
        onPress: async () => {
          await goToSetMaterial();
        }
      }
    ])
  }

  //TODO: BORRAR
  const mockProductInfo = () => {
    // TODO: Remove mock
    var product = new Product();
    product.Name = 'Filtros';
    product.Description = 'alguna descripcion';
    product.Material = 'Plastico'
    goToProductInfo(product);
  }
  const cameraPermission = () => {
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    }
  }
  return (
    <View style={styles.view}>
      {cameraPermission}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.barCodescanner]}
      />
      <SearchBar
        ref={search => searchBarRef}
        round
        lightTheme
        returnKeyType='search'
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={searchBar}
        onSubmitEditing={searchSubmit}
        style={styles.SearchBar}
      />

      {scanned && (
        <Button
          title={'Tap to Scan Again'}
          onPress={() => setScanned(false)}
          // onPress={() => this.setState({ scanned: false })}
        />
      )}
      {overlayComponent}
      <Overlay
        overlayStyle={styles.overlayLoading}
        isVisible={loading}
        width='auto'
        height='auto'
      >
        <View>
          <TextElem style={styles.overlayLoadingText}>
            Buscando el producto
          </TextElem>
          <ActivityIndicator size='large' color='#00a680'></ActivityIndicator>
        </View>
      </Overlay>
      {/* <Toast ref={toastRef} position='center' opacity={0.5}></Toast> */}
      <View>
        <Button
          title='Ir a ProductInfo'
          onPress={() => {
            mockProductInfo()
          }}
        />
      </View>
      {/* <View>
        <Button
          title='Mock escaneo producto'
          onPress={() => {
            mockeoParaBorrar()
          }}
        />
      </View> */}
    </View>
  )
}
export default withNavigation(ScanProduct);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'flex-end',
    // alignItems: 'stretch'
  },
  overlayLoading: {
    padding: 20
  },
  barCodescanner: {
    marginHorizontal: 0, marginLeft: 0, marginStart: 0,
      paddingHorizontal: 0, paddingLeft: 0, paddingStart: 0,
      height: '115%',
      padding: 0
  },
  overlayLoadingText: {
    color: '#00a680',
    marginBottom: 20,
    fontSize: 20
  },
  SearchBar: {
  },
})
