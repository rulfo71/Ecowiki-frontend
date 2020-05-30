import React, { Component, useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Picker, ActivityIndicator } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { Text, Overlay, Icon } from 'react-native-elements'
import Product from '../../Models/ProductModel'
import { addProduct } from '../../Repositories/ProductsRepository'
// import { withNavigation } from 'react-navigation'
import Toast from 'react-native-easy-toast'
import { Constants } from '../../Common/Constants/Constants'


// export default withNavigation(AddProduct);

export default function AddProductViejo({ route, navigation }) {

  const { nameParam, barcodeParam } = route.params

  const toastRef = useRef();
  let [barcode, setBarCode] = useState(nameParam);
  let [name, setName] = useState(barcodeParam);

  console.log(`name del state : ${name}`);
  console.log(`barcode del state: ${barcode}`);

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
      toastRef.current.show('Tenés que completar el material');
      return;
    }
    if (name === '') {
      toastRef.current.show('Tenés que completar el nombre');
      return;
    }

    var product = new Product()
    product.barcode = barcode;
    product.description = description;
    product.displayName = name
    product.material = material
    console.log('acccept desde setMaterial')

    setLoading(true);
    await addProduct(product)
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

  function BarCode(props) {
    if (barcode !== '') {
      return (
        <View style={props.style.dataItemContainer}>
          <Text style={props.style.title}>{"Codigo de barras"} </Text>
          <Input disabled={true}>{barcode}</Input>
        </View>
      )
    }
    return null;
  }

  return (
    <View style={styles.ViewOverlay}>
      <View style={styles.mainContainer}>
        {/* <View style={styles.headerContainer}>
          {/* <View
            style={{
              // flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          > */}
        {/* <Text style={styles.headerTitle}>{"CARGAR PRODUCTO"}</Text> */}
        {/* </View> }
        </View> */}
        <UploadImage />
        <View style={styles.dataContainer} >
          <BarCode style={styles} />
          {/* <View> */}
          <View style={styles.dataItemContainer} >
            <Text style={styles.title}>{"Nombre"} </Text>
            <Input
              multiline
              numberOfLines={2}
              placeholder='Nombre'
              // disabled={!emptyInputName}
              style={styles.inputText}
              value={name}
              onChange={e => setName(e.nativeEvent.text)} />
          </View>
          <View style={styles.dataItemContainer}>
            <Text style={styles.title}>{"Material"} </Text>
            <Picker
              selectedValue={material}
              onValueChange={value => setMaterial(value)}>
              <Picker.Item label='Elegí un material' value='' />
              <Picker.Item label='Plastico' value='plastico' />
              <Picker.Item label='Papel y Carton' value='papelCarton' />
              <Picker.Item label='Vidrio' value='vidrio' />
              <Picker.Item label='Metal' value='metal' />
              <Picker.Item label='Orgánico' value='organico' />
              <Picker.Item label='No se recicla' value='noSeRecicla' />
            </Picker>
          </View>
          <View style={styles.dataItemContainer}>
            <Text style={styles.title}>{"Datos adicionales"} </Text>
            <Input
              multiline
              numberOfLines={3}
              style={styles.inputText}
              placeholder='Acá podés ingresar cualquier consejo que te parezca util'
              onChange={e => setDescription(e.nativeEvent.text)}
            ></Input>
          </View>
        </View>
      </View>
      {/* </View> */}
      <View style={styles.buttonsSuperContainer}>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.buttonCancel}
            title='Cancelar'
            onPress={buttonCancel}
            titleStyle={styles.buttonText}
          />
          <Button
            buttonStyle={styles.buttonSave}
            title='Guardar'
            onPress={buttonAccept}
            titleStyle={styles.buttonText}
          />
        </View>
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
          <ActivityIndicator size='large' color={Constants.Colors.brandGreenColor}></ActivityIndicator>
        </View>
      </Overlay>
      <Toast ref={toastRef} position='center' />
    </View>
  )
}

function UploadImage() {
  return (<View style={styles.viewImages}>
    <Icon
      type='material-community'
      name='camera'
      color='#7a7a7a'
      containerStyle={styles.containerIcon}
    />
  </View>)
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
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: Constants.Colors.backgroundGrey,
  },
  // headerContainer: {
  //   // paddingBottom: 15,
  //   alignItems: "center",
  //   alignContent: "center",
  //   justifyContent: "center",
  //   borderRadius: 10,
  //   flexDirection: "row",
  //   backgroundColor: Constants.Colors.brandGreenColor,
  // },
  headerTitle: {
    fontWeight: "bold",
    letterSpacing: 1.2,
    paddingTop: 20,
    paddingBottom: 10,
    color: Constants.Colors.white,
    fontSize: 18,
    // opacity: 0.8
  },
  buttonsSuperContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 30,
    paddingBottom: 50

  },
  buttonCancel: {
    backgroundColor: Constants.Colors.cancelColor,
    padding: 15,
    borderRadius: 15
  },
  buttonSave: {
    backgroundColor: Constants.Colors.brandGreenColor,
    padding: 15,
    borderRadius: 15
  },
  buttonText: {
    letterSpacing: 1.2,
    fontSize: 16
  },
  overlayLoading: {
    padding: 20
  },
  overlayLoadingText: {
    color: Constants.Colors.brandGreenColor,
    marginBottom: 20,
    fontSize: 20
  },
  mainContainer: {
    flex: 1,
    marginTop: 10,
    borderRadius: 10,
    paddingBottom: 15,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    letterSpacing: 1.2,
    opacity: 0.8,
    alignSelf: "center",
    marginBottom: 5,
    color: Constants.Colors.brandGreenColor
  },
  inputText: {
    fontSize: 15,
    letterSpacing: 1.2,
    marginTop: 50,
    opacity: 0.8,
    alignSelf: "center",
    marginBottom: 10,
    borderBottomWidth: 0,
  },
  picker: {
    borderRadius: 10,
    backgroundColor: Constants.Colors.brandGreenColor,
    opacity: 0.8
  },
  dataContainer: {
    justifyContent: 'space-between',
    // marginTop: 100
  },
  dataItemContainer: {
    marginTop: 30,
    marginBottom: 30
  },
  viewImages: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: '#e3e3e3'

  },
})
