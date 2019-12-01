import React, { Component, useState } from 'react'
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

var product: Product

export default class SetMaterial extends Component<IProps, IState> {
  constructor(props) {
    super(props)
    product = new Product()
    product.BarCode = this.props.navigation.getParam('barCode', '')
    console.log('product.BarCode')
    console.log(product.BarCode)
  }

  updateMaterial = async material => {
    product.Material = material
    console.log('update Material')
    console.log(product)
  }

  buttonCancelar = () => {
    console.log('Boton Cancelar')
    //TODO: ProductService.EmptyProduct()
    ;(product.Material = ''),
      (product.Name = ''),
      (product.Description = ''),
      (product.BarCode = '')
    this.props.navigation.goBack()
  }

  buttonAceptar = async () => {
    console.log('Boton Aceptar')

    var productsRepository = new ProductsRepository()
    await productsRepository
      .updateProduct(product)
      .then(response => {
        this.props.navigation.goBack()
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

        // this.setState({ loading: false })
      })
  }
  setName = name => {
    product.Name = name
  }
  setDescription = async description => {
    product.Description = description
  }

  render() {
    return (
      <View style={styles.ViewOverlay}>
        <Picker
          selectedValue={product.Material}
          onValueChange={this.updateMaterial}
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
          onChange={e => this.setName(e.nativeEvent.text)}
        ></Input>
        <Input
          style={styles.description}
          placeholder='Datos Adicionales (opcional)'
          onChange={e => this.setDescription(e.nativeEvent.text)}
        ></Input>

        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.buttonCancel}
            title='Cancelar'
            onPress={() => {
              this.buttonCancelar()
            }}
          />
          <Button
            buttonStyle={styles.buttonSave}
            title='Guardar'
            onPress={() => {
              this.buttonAceptar()
            }}
          />
        </View>
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
    // padding: 20,
    // borderColor: "#00a680",
    backgroundColor: '#fff'
    // borderLeftWidth: 2,
    // borderRightWidth: 2,
    // borderTopWidth: 2,
    // borderBottomWidth: 2,
    // borderRadius: 5
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  buttonCancel: {
    backgroundColor: '#990000'
    // padding: 10
  },
  buttonSave: {
    backgroundColor: '#00a680'
    // padding: 10
  },
  description: {
    height: 50
  }
  // descriptionContainer: {
  //   height: 50
  // }
})
