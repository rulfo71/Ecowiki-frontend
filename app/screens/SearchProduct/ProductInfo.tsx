import React, { Component, useState, useEffect } from 'react'
import { TouchableHighlight } from 'react-native'
import {
  Text,
  View,
  StyleSheet,
  Alert,
} from 'react-native'
import Spinner from "react-native-loading-spinner-overlay";
import { Icon, Image } from "react-native-elements";

import { getMaterialLogo, addVote, subtractVote } from '../../Repositories/ProductsRepository'
import Product from '../../Models/ProductModel'
import { Constants } from '../../Common/Constants/Constants'

const materials = {
  plastico: 'Plastico',
  papelCarton: 'Papel y carton',
  vidrio: 'Vidrio',
  metal: 'Metal',
  organico: 'Orgánico',
  noSeRecicla: 'No se recicla'
}

export default function ProductInfo({ route, navigation }) {
  console.log('*************');
  console.log(`ProductInfo--- Params: ${JSON.stringify(route.params)}`)
  console.log('*************');

  const { productParam } = route.params

  console.log(`productParam: ${JSON.stringify(productParam)} `);
  const product: Product = productParam;
  console.log(`product: ${JSON.stringify(product)} `);

  // let [product, setProduct] = useState(productParam);
  const [uriImage, seturiImage] = useState('');
  const [showNameInHeader, setShowNameInHeader] = useState(true)
  const [loadingImage, setLoadingImage] = useState(false)
  console.log('estoy en productInfo con product: ', product);
  console.log('uriImageInicial: ', uriImage);
  useEffect(() => {
    console.log('getMaterialLogo dentro de useEffect');

    if (product.displayName.length <= 20) {
      setShowNameInHeader(true)
      navigation.setOptions({
        title: product.displayName,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: Constants.Colors.brandGreenColor,
          borderBottomStartRadius: 20,
          borderBottomEndRadius: 20,
        },
        headerTitleStyle: {
          fontSize: 30,
          color: 'white'
        },
        headerTransparent: false
      })
    }
    else {
      setShowNameInHeader(false)
    }


    // setProduct(navigation.getParam('product'));
    getLogo();
  }, []);

  const getLogo = async () => {
    setLoadingImage(true);
    await getMaterialLogo(product.material)
      .then(uriImage => {
        setLoadingImage(false)
        console.log('uriImage: ', uriImage);
        seturiImage(uriImage);
        console.log('uriImageDsp: ', uriImage);
      })
      .catch(error => {
        setLoadingImage(false)
        seturiImage('default')
        console.log('error obteniendo el logo:', error);
      });
  }

  const doesntAgree = () => {
    Alert.alert('¿Querés modificarlo?', '', [
      {
        text: 'No',
        onPress: () => {
          subtractVote(product)
          goBack()
        }
      },
      {
        text: 'Si',
        onPress: async () => {
          goToSetMaterial();
        }
      }
    ])
  }

  const agree = () => {
    addVote(product);
    goBack()
  }

  const goToSetMaterial = () => {
    navigation.navigate('SetMaterial', {
      barCode: product.barcode,
      name: product.displayName
    });
  }

  const goBack = () => {
    navigation.goBack();
  }

  const Name = () => {
    console.log('component name');
    if (!showNameInHeader) {
      return (
        <>
          <Text style={styles.title}>{"NOMBRE"} </Text>
          <Text style={styles.data}> {product.displayName} </Text>
        </>
      )
    }
    return null;
  }

  const MaterialLogo = () => {
    if (loadingImage)
      return <Spinner visible={loadingImage} />

    if (uriImage !== '') {
      console.log('uriImage en el componente de image', uriImage);
      return <Image
        style={styles.image}
        source={{ uri: uriImage }}
      />
    }
    return null;
  }

  const Barcode = () => {
    console.log('component barcode', product.barcode);
    if (product.barcode !== '') {
      return (
        <>
          <Text style={styles.title}>{"CÓDIGO DE BARRAS"} </Text>
          <Text style={styles.data}> {product.barcode} </Text>
        </>
      )
    }
    else
      return null;
  }

  const BasketText = () => {
    if (materials[product.material]) {
      if (product.material !== 'noSeRecicla') {
        return (
          <>
            <Text style={styles.title}>{"CONTENEDOR"} </Text>
            <Text style={styles.data}>{materials[product.material]}</Text>
          </>
        )
      }
      else {
        return <Text style={styles.material}>{"Este producto no se recicla "}</Text>
      }
    }
    return null;
  }

  const Description = () => {
    if (product.description !== '') {
      return (
        <>
          <Text style={styles.title}>{"OBSERVACIONES"} </Text>
          <Text style={styles.data}> {product.description} </Text>
        </>
      )
    }
    return null;
  }
  //TODO: ADDED BY 
  const AddedBy = () => {
    if (product.addedBy !== '') {
      return (
        <>
          <Text style={styles.title}>{"Agregado por "} </Text>
          {/* <Text style={styles.data}> {product.description} </Text> */}
        </>
      )
    }
    return null;
  }

  return (
    <View style={styles.AllContainer} >
      <View style={styles.Container}>
        <MaterialLogo />
        <Name />
        <Barcode />
        <BasketText />
        <Description />
        <AddedBy />
      </View>
      <View style={styles.IconsAgreeContainer}>
        <TouchableHighlight onPress={doesntAgree} >
          <View>
            <Icon name="thumbs-down" color={Constants.Colors.cancelColor} size={50} type="font-awesome" />
            <Text style={styles.textThumbs}> No estoy de acuerdo </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={agree}>
          <View >
            <Icon name="thumbs-up" color={Constants.Colors.brandGreenColor} size={50} type="font-awesome" />
            <Text style={styles.textThumbs} > Gracias! </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  AllContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    backgroundColor: Constants.Colors.backgroundGrey,
    padding: 20,
  },
  Container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  IconsAgreeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent: 'space-between',
  },
  title: {
    paddingTop: 15,
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 1.2,
    opacity: 0.8,
    alignSelf: 'flex-start',
    color: 'black'
  },
  data: {
    fontSize: 15,
    marginTop: 10,
    width: '100%',
    padding: 10,
    fontWeight: 'bold',
    color: 'white',
    borderColor: Constants.Colors.brandGreenColor,
    backgroundColor: Constants.Colors.brandGreenColor,
    borderRadius: 10,
  },
  material: {
    fontSize: 30,
    paddingTop: 30,
    fontWeight: 'bold',
    alignItems: 'center'
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  image: {
    width: 150,
    height: 150,
  },
  textThumbs: {
    fontSize: 15,
    fontWeight: "bold",
  }
})
