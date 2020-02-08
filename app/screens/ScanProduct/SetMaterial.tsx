import React, { Component, useState, useEffect } from 'react'
import { StyleSheet, View, Picker } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Product from '../../Models/ProductModel'
import { setProduct } from '../../Repositories/ProductsRepository'
import {withNavigation} from 'react-navigation'

// interface IProps {
//   BarCode: string
//   navigation: any
//   Name: string
// }

// interface IState {
//   Material: string
//   Name: string
//   Description: string
//   BarCode: string
// }

// var product: Product
// var toastRef

export default withNavigation(SetMaterial);

function SetMaterial({navigation}){
  let [barCode, setBarCode] = useState(navigation.getParam('barCode'));
  let [name, setName] = useState(navigation.getParam('name'));
  let [description, setDescription] = useState('');
  let [material, setMaterial] = useState('');

//     var name = this.props.navigation.getParam('name', '')


// export default class SetMaterial extends Component<IProps, IState> {
//   constructor(props) {
//     super(props)
//     // console.log(this.state.BarCode);

//     // product = new Product()
//     var barCode = this.props.navigation.getParam('barCode', '')
//     var name = this.props.navigation.getParam('name', '')
//     this.state = {
//       BarCode: barCode,
//       Material: '',
//       Description: '',
//       Name: name
//     }
//     // toastRef = this.props.navigation.getParam('toast')
//     // console.log('toastRef')
//     // console.log(toastRef)
//   }

  const buttonCancel = () => {
    console.log('Boton Cancelar')
    //TODO: ProductService.EmptyProduct()
    // product.Material = ''
    // product.Name = ''
    // product.Description = ''
    // product.BarCode = ''
    this.props.navigation.goBack()
  }

  const buttonAccept = async () => {
    var product = new Product()
    product.BarCode = barCode;
    product.Description = description;  
    product.Name = name
    product.Material = material
    console.log('acccept desde setMaterial')
  
    await setProduct(product)  
      .then(response => {
        if (response) {
          console.log('El producto fue guardado correctamente')
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
  // var productsRepository = new ProductsRepository()
  // await productsRepository
  //   .updateProduct(product)
  //   .then(response => {
  //     if (response) {
  //       console.log('El producto fue guardado correctamente')
  //       this.props.navigation.goBack()
  //     } else {
  //       console.log('El producto no se pudo guardar')
  //       this.props.navigation.goBack()
  //     }
  //   })
  //   .catch(error => {
  //     // this.refs.toast.show('Error de servidor, intente de nuevo mas tarde')
  //     console.log('error desde SetMaterial')
  //     this.props.navigation.goBack()
  //     // this.setState({ loading: false })
  //   })

  // function BarCode() {
  //   if (this.state.BarCode) {
  //     return <Input disabled={true}>{this.state.BarCode}</Input>
  //   }
  //   else return
  // }
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

  function BarCode(){
    if (barCode !== ''){
      return <Input disabled={true}>{barCode}</Input>
    }
    return null;
  }
  function Name(){
    if (name !== '')
      return <Input disabled={true}>{name}</Input>
    else
      return <Input placeholder='Nombre (opcional)' onChange={e => setName(e.nativeEvent.text)}/>
  }

  // render() {
  //   let barCodeInput;
  //   if (barCode !== '') {
  //     barCodeInput = <Input disabled={true}>{barCode}</Input>
  //   }
  //   let nameInput
  //   if (name !== '') {
  //     nameInput = <Input disabled={true}>{this.state.Name}</Input>
  //   }
  //   else {
  //     nameInput = <Input
  //       placeholder='Nombre (opcional)'
  //       onChange={e => setName(e.nativeEvent.text)}
  //     ></Input>
  //   }

  return (
    <View style={styles.ViewOverlay}>
      {/* {barCodeInput} */}
      <BarCode/>
      <Picker
        selectedValue={material}
        onValueChange={value => setMaterial(value)}
      >
        <Picker.Item label='Elija un material' value='' />
        <Picker.Item label='Plastico' value='plastico' />
        <Picker.Item label='Papel y Carton' value='papelCarton' />
        <Picker.Item label='Vidrio' value='vidrio' />
        <Picker.Item label='Metal' value='metal' />
        <Picker.Item label='Orgánico' value='organico' />
      </Picker>
      <Name/>
      <Input
        style={styles.description}
        placeholder='Datos Adicionales (opcional)'
        onChange={e => setDescription(e.nativeEvent.text)}
      ></Input>

      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.buttonCancel}
          title='Cancelar'
          onPress={buttonCancel}
        />
        <Button
          buttonStyle={styles.buttonSave}
          title='Guardar'
          onPress={buttonAccept}
        />
      </View>
      {/* <Toast position='center' opacity={0.5}></Toast> */}
    </View>
  )
  // }
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
