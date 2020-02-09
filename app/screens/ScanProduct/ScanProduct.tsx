import React, { Component, useEffect, useState, useRef } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator
} from 'react-native'
import Toast from 'react-native-easy-toast'
import CodeScanner from '../../utils/barcodescaneador'
import * as Permissions from 'expo-permissions'
import { getProductByBarCode, getProductByName } from '../../Repositories/ProductsRepository'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Text as TextElem, Overlay, SearchBar } from 'react-native-elements'
import Product from '../../Models/ProductModel'
import { withNavigation } from 'react-navigation'
// import { Toast } from 'react-native-easy-toast'
export default withNavigation(ScanProduct);

function ScanProduct(props) {
  let searchBarRef = useRef(null);
  const toastRef = useRef(null);
  const { navigation } = props;
  let [hasCameraPermission, setCameraPermission] = useState(null);
  let [scanned, setScanned] = useState(false);
  let [overlayComponent, setOverlayComponent] = useState(null);
  let [loading, setLoading] = useState(false);
  let [barCode, setBarCode] = useState('');
  let [searchBar, setSearchBar] = useState('');

  useEffect(() => {
    getPermissionsAsync();
    searchBarRef.current.clear();
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
        setBarCode('');
        if (foundProduct) {
          goToProductInfo(foundProduct)
          searchBarRef.current.clear();
        } else {
          addProductAlert();
          searchBarRef.current.clear();
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error')
        toastRef.current.show('Error de servidor. Intente de nuevo mas tarde', 600)
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
        setLoading(false);
        console.log(error);
        console.log('error en scanProduct')
        toastRef.current.show('Error de servidor. Intente de nuevo mas tarde', 600)
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
  const showToast = () => {
    toastRef.current.show('El producto fue guardado correctamente', 600)
    searchBarRef.current.clear();
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
      return <Text>Pidiendo permisos para acceder a la camara</Text>
    }
    if (hasCameraPermission === false) {
      return <Text>No tenemos permisos para acceder a tu camara</Text>
    }
  }
  return (
    <View style={styles.view}>
      {/* {cameraPermission} */}
      {/* <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.barCodescanner]}
      /> */}
      <CodeScanner></CodeScanner>
      <SearchBar
        ref={searchBarRef}
        round
        lightTheme
        returnKeyType='search'
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={searchBar}
        onSubmitEditing={searchSubmit}
        containerStyle={styles.SearchBarContainer}
        inputContainerStyle={styles.SearchBar}
        inputStyle={styles.SearchBar}
      // style={styles.SearchBar}
      />

      {/* {scanned && (
        <Button
          title={'Tap to Scan Again'}
          onPress={() => setScanned(false)}
        />
      )} */}
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
      {/* <View>
        <Button
          title='Ir a ProductInfo'
          onPress={() => {
            mockProductInfo()
          }}
        />
      </View>
      <View>
        <Button
          title='a ver ese toast'
          onPress={() => {
            showToast()
          }}
        />
      </View> */}
      {/* <View>
        <Button
          title='Mock escaneo producto'
          onPress={() => {
            mockeoParaBorrar()
          }}
        />
      </View> */}
      <Toast ref={toastRef} position='center' />

    </View>
  )
}

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
  overlayLoadingText: {
    color: '#00a680',
    marginBottom: 20,
    fontSize: 20
  },
  barCodescanner: {
    flex: 1,
    // height: 
    // marginHorizontal: 0, marginLeft: 0, marginStart: 0,
    // paddingHorizontal: 0, paddingLeft: 0, paddingStart: 0,
    // padding: 0
  },
  SearchBarContainer: {
    // marginTop: 50,
    // opacity: 0,
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
