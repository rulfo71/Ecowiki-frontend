import React, { Component } from 'react'
import { StyleSheet, View, Picker } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import Product from '../../Models/Products'
import ProductsRepository from '../../Repositories/products'
import { bool } from 'prop-types'

interface IProps {
  BarCode: string
  navigation: any
}

interface IState {
  Material: string
  Name: string
  Description: string
  BarCode: string
}

// var product: Product
// var toastRef

export default class SetMaterial extends Component<IProps, IState> {
  constructor(props) {
    super(props)
    // product = new Product()
    console.log('SetMaterial constructor')
    var barCode = this.props.navigation.getParam('barCode', '')
    console.log('barcode ' + barCode)
    this.state = {
      BarCode: barCode,
      Material: '',
      Description: '',
      Name: ''
    }
    console.log(this.state)

    // toastRef = this.props.navigation.getParam('toast')
    // console.log('toastRef')
    // console.log(toastRef)
  }

  buttonCancel = () => {
    console.log('Boton Cancelar')
    //TODO: ProductService.EmptyProduct()
    // product.Material = ''
    // product.Name = ''
    // product.Description = ''
    // product.BarCode = ''
    this.props.navigation.goBack()
  }

  buttonAccept = async () => {
    console.log('Boton Aceptar')
    console.log(this.state)
    console.log(product)

    var product = new Product()
    product.BarCode = this.state.BarCode
    product.Description = this.state.Description
    product.Name = this.state.Name
    product.Material = this.state.Material

    console.log('product: ')

    console.log(product)

    var productsRepository = new ProductsRepository()
    await productsRepository
      .updateProduct(product)
      .then(response => {
        if (response) {
          console.log('El pproducto fue guardado correctamente')
          this.props.navigation.goBack()
        } else {
          console.log('El producto no se pudo guardar')
          this.props.navigation.goBack()
        }
      })
      .catch(error => {
        // this.refs.toast.show('Error de servidor, intente de nuevo mas tarde')
        console.log('error desde SetMaterial')
        this.props.navigation.goBack()
        // this.setState({ loading: false })
      })
  }
  // setName = name => {
  //   product.Name = name
  // }
  // setDescription = async description => {
  //   product.Description = description
  // }
  // setMaterial = async material => {
  //   console.log('setMaterial')
  //   console.log(material)
  //   product.Material = material
  //   console.log(product.Material)
  // }

  render() {
    console.log('y ahora toca renderizar!')

    return (
      <View style={styles.ViewOverlay}>
        <Input disabled={true}>{this.state.BarCode}</Input>
        <Picker
          selectedValue={this.state.Material}
          onValueChange={value => this.setState({ Material: value })}
        >
          <Picker.Item label='Elija un material' value='' />
          <Picker.Item label='Plastico' value='plastico' />
          <Picker.Item label='Papel y Carton' value='papelCarton' />
          <Picker.Item label='Vidrio' value='vidrio' />
          <Picker.Item label='Metal' value='metal' />
          <Picker.Item label='Orgánico' value='organico' />
        </Picker>
        <Input
          placeholder='Nombre (opcional)'
          onChange={e => this.setState({ Name: e.nativeEvent.text })}
        ></Input>
        <Input
          style={styles.description}
          placeholder='Datos Adicionales (opcional)'
          onChange={e => this.setState({ Description: e.nativeEvent.text })}
        ></Input>

        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.buttonCancel}
            title='Cancelar'
            onPress={() => {
              this.buttonCancel()
            }}
          />
          <Button
            buttonStyle={styles.buttonSave}
            title='Guardar'
            onPress={() => {
              this.buttonAccept()
            }}
          />
        </View>
        {/* <Toast position='center' opacity={0.5}></Toast> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red'
  },
  overlayStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  ViewOverlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  buttonCancel: {
    backgroundColor: '#990000'
  },
  buttonSave: {
    backgroundColor: '#00a680'
  },
  description: {
    height: 50
  }
})
