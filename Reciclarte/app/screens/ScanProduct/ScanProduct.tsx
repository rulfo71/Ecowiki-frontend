import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator
} from 'react-native'
import * as Permissions from 'expo-permissions'
import ProductsRepository from '../../Repositories/products'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Text as TextElem, Overlay } from 'react-native-elements'
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
}

// var toastRef

export default class ScanProduct extends Component<IProps, IState> {
  constructor(props) {
    super(props)

    this.state = {
      hasCameraPermission: null,
      scanned: false,
      loading: false,
      barCode: ''
    }

    // toastRef = useRef()
  }

  async componentDidMount() {
    this.getPermissionsAsync()
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }
  goToSetMaterial = async () => {
    console.log('vamos pa set material con barcode ' + this.state.barCode)

    this.props.navigation.push('SetMaterial', {
      barCode: this.state.barCode
      // toastRef: { toastRef }
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
    var productsRepository = new ProductsRepository()
    await productsRepository
      .lookForBarCode(data)
      .then(foundProduct => {
        this.setState({
          loading: false,
          barCode: data
        })
        if (foundProduct) {
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
        console.log('error')
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
        onPress: async () => await this.goToSetMaterial()
      }
    ])
  }

  MockScan = () => {
    // TODO: Remove mock
    this.props.navigation.push('SetMaterial', {
      barCode: '01010101'
      // toastRef: { toastRef }
    })
  }

  render() {
    const {
      hasCameraPermission,
      scanned,
      overlayComponent,
      loading
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
          style={StyleSheet.absoluteFillObject}
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
        <View>
          <Button
            title='Mock'
            onPress={() => {
              this.MockScan()
            }}
          />
        </View>
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
  overlayLoadingText: {
    color: '#00a680',
    marginBottom: 20,
    fontSize: 20
  }
})
