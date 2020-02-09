import React, { Component, useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Picker, ActivityIndicator } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { Text, Overlay, } from 'react-native-elements'
import Product from '../../Models/ProductModel'
import { setProduct } from '../../Repositories/ProductsRepository'
import { withNavigation } from 'react-navigation'
import Toast from 'react-native-easy-toast'

export default withNavigation(SetMaterial);

function SetMaterial({ navigation }) {
  const toastRef = useRef();
  let [barCode, setBarCode] = useState(navigation.getParam('barCode'));
  let [name, setName] = useState(navigation.getParam('name'));
  let [description, setDescription] = useState('');
  let [material, setMaterial] = useState('');
  let [loading, setLoading] = useState(false);
  let [emptyInputName, setEmptyInputName] = (name === '') ? useState(true) : useState(false)

  const buttonCancel = () => {
    console.log('Boton Cancelar')
    //TODO: ProductService.EmptyProduct()
    // product.Material = ''
    // product.Name = ''
    // product.Description = ''
    // product.BarCode = ''
    // navigation.goBack();
    navigation.goBack();
  }

  const buttonAccept = async () => {

    if (material === '') {
      toastRef.current.show('Debes completar el material');
      return;
    }
    if (barCode === '' && name === '') {
      toastRef.current.show('Debes completar el nombre');
      return;
    }

    var product = new Product()
    product.BarCode = barCode;
    product.Description = description;
    product.Name = name
    product.Material = material
    console.log('acccept desde setMaterial')

    setLoading(true);
    await setProduct(product)
      .then(response => {
        setLoading(false);
        if (response) {
          console.log('El producto fue guardado correctamente')
          toastRef.current.show('El producto fue guardado correctamente', 500, () => {
            navigation.goBack();
          });
        } else {
          console.log('El producto no se pudo guardar')
          toastRef.current.show('El producto no se pudo guardar. Intente de nuevo mas tarde', 500, () => {
            navigation.goBack();
          });
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error desde SetMaterial')
        toastRef.current.show('El producto no se pudo guardar. Intente de nuevo mas tarde', 500, () => {
          navigation.goBack();
        });
      })
  }

  function BarCode() {
    if (barCode !== '') {
      return <Input disabled={true}>{barCode}</Input>
    }
    return null;
  }

  return (
    <View style={styles.ViewOverlay}>
      <BarCode />
      <Picker
        selectedValue={material}
        onValueChange={value => setMaterial(value)}>
        <Picker.Item label='Elija un material' value='' />
        <Picker.Item label='Plastico' value='plastico' />
        <Picker.Item label='Papel y Carton' value='papelCarton' />
        <Picker.Item label='Vidrio' value='vidrio' />
        <Picker.Item label='Metal' value='metal' />
        <Picker.Item label='Orgánico' value='organico' />
      </Picker>
      {/* <Name /> */}
      <Input
        placeholder='Nombre (opcional)'
        disabled={!emptyInputName}
        value={name}
        onChange={e => setName(e.nativeEvent.text)} />

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
      <Overlay
        overlayStyle={styles.overlayLoading}
        isVisible={loading}
        width='auto'
        height='auto'>
        <View>
          <Text style={styles.overlayLoadingText}>
            Guardando el producto
          </Text>
          <ActivityIndicator size='large' color='#00a680'></ActivityIndicator>
        </View>
      </Overlay>
      <Toast ref={toastRef} position='center' />
    </View>
  )
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
