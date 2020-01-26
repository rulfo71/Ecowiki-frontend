import React, { Component, useEffect } from 'react'
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
// import { Toast } from 'react-native-easy-toast'

interface IProps {
  hasCameraPermission?: any
  scanned?: boolean
  overlayComponent?: any
  navigation?: any
}

interface IState {
  hasCameraPermission?: any
  scanned?: boolean
  overlayComponent?: any
  loading: boolean
  barCode: string
  searchBar: string
}

export default class ScanProduct extends Component<IProps, IState> {
  searchBarRef: any

  constructor(props) {
    super(props)

    this.state = {
      hasCameraPermission: null,
      scanned: false,
      loading: false,
      barCode: '',
      searchBar: ''
    }
    this.searchBarRef = React.createRef();

    // toastRef = useRef()
  }

  async componentDidMount() {
    this.getPermissionsAsync()

    // this.searchBarRef.clear();
  }

  updateSearch = searchBar => {
    this.setState({ searchBar });
  };

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }
  goToSetMaterial = async () => {
    this.props.navigation.push('SetMaterial', {
      barCode: this.state.barCode,
      name: this.state.searchBar
      // toastRef: { toastRef }
    })
  }
  goToProductInfo = async (product) => {
    this.props.navigation.push('ProductInfo', {
      product: product
    })
  }

  updateProduct = async () => {
    this.setState({
      overlayComponent: null
    })
  }

  closeOverlay = async () => {
    this.setState({
      overlayComponent: null
    })
  }

  handleBarCodeScanned = async ({ type, data }) => {
    console.log('handleBarCodeScanned')

    this.setState({
      scanned: true,
      loading: true
    })

    await getProductByBarCode(data)
      .then(foundProduct => {
        this.setState({
          loading: false,
          barCode: data
        })
        if (foundProduct) {
          this.goToProductInfo(foundProduct)
        } else {
          this.addProductAlert()
        }
      })
      .catch(error => {
        // this.refs.toast.show('Error de servidor, intente de nuevo mas tarde')
        console.log('error')
        this.setState({ loading: false })
      })
  }

  searchSubmit = async () => {
    this.setState({
      loading: true
    })

    await getProductByName(this.state.searchBar)
      .then(foundProduct => {
        this.setState({
          loading: false,
          barCode: ''
        })
        if (foundProduct) {
          this.goToProductInfo(foundProduct)
          this.searchBarRef.clear();
        } else {
          this.addProductAlert();
          this.searchBarRef.clear();
        }
      })
      .catch(error => {
        // this.refs.toast.show('Error de servidor, intente de nuevo mas tarde')
        console.log('error')
        this.setState({ loading: false })
      })
  }

  mockeoParaBorrar = async () => {
    console.log('mockeoParaBorrar')

    await getProductByBarCode('4002604064767')
      .then(foundProduct => {
        console.log('foundProduct desde scanproduct');
        console.log(foundProduct);
        this.setState({
          loading: false,
          barCode: '4002604064767'
        })

        if (foundProduct) {
          //goto 
          alert(
            'este producto va en ' +
            foundProduct.Material +
            ' . Descripcion: ' +
            foundProduct.Description
          )
        } else {
          this.addProductAlert()
        }
      })
      .catch(error => {
        // this.refs.toast.show('Error de servidor, intente de nuevo mas tarde')
        console.log('error en scanProduct')
        console.log(error);

        this.setState({ loading: false })
      })
  }

  // goToScreen = (screen) => {
  //   this.props.navigation.navigate(screen);
  // }

  addProductAlert = () => {
    Alert.alert('No tenemos registrado este producto', 'Queres agregarlo?', [
      {
        text: 'No',
        onPress: () => console.log('No quiere agregarlo')
      },
      {
        text: 'Si',
        onPress: async () => {
          console.log('onPressAddProductAlert - this.state.barCode');
          console.log(this.state);
          await this.goToSetMaterial();
        }
      }
    ])
  }

  //TODO: BORRAR
  MockScan = () => {
    // TODO: Remove mock
    this.props.navigation.push('SetMaterial', {
      barCode: '0101'
      // toastRef: { toastRef }
    })
  }

  render() {
    const {
      hasCameraPermission,
      scanned,
      overlayComponent,
      loading,
      searchBar
    } = this.state

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    }
    return (
      <View style={styles.view}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={[StyleSheet.absoluteFill, styles.barCodescanner]}
        />
        <SearchBar
          ref={search => this.searchBarRef = search}
          round
          lightTheme
          returnKeyType='search'
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={searchBar}
          onSubmitEditing={this.searchSubmit}
          style={styles.searchBar}
        />

        {scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => this.setState({ scanned: false })}
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
        {/* <View>
          <Button
            title='Ir a set material'
            onPress={() => {
              this.MockScan()
            }}
          />
        </View>
        <View>
          <Button
            title='Mock escaneo producto'
            onPress={() => {
              this.mockeoParaBorrar()
            }}
          />
        </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  overlayLoading: {
    padding: 20
  },
  barCodescanner: {
    flex: 1
  },
  overlayLoadingText: {
    color: '#00a680',
    marginBottom: 20,
    fontSize: 20
  },
  searchBar: {
    position: 'absolute',
    top: 0
  }
})
