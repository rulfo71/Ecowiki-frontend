import React, { Component, useState, useEffect } from 'react'
import { TouchableHighlight } from 'react-native'
import { getMaterialLogo, addVote, subtractVote } from '../../Repositories/ProductsRepository'
// import { withNavigation } from 'react-navigation'
import { Icon, Image } from "react-native-elements";
import { Constants } from '../../Common/Constants/Constants'
import {
  Text,
  View,
  StyleSheet,
  Alert,
} from 'react-native'

// export default withNavigation(ProductInfo);
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
  
  const {productParam} = route.params

  console.log(`productParam: ${productParam} `);

  let [product, setProduct] = useState(productParam);
  const [uriImage, seturiImage] = useState('');
  console.log('estoy en productInfo con product: ', product);
  console.log('uriImageInicial: ', uriImage);
  useEffect(() => {
    console.log('getMaterialLogo dentro de useEffect');
    setProduct(navigation.getParam('product'));
    getLogo();
  }, []);

  const getLogo = async () => {
    await getMaterialLogo(product.Material)
      .then(uriImage => {
        console.log('uriImage: ', uriImage);
        seturiImage(uriImage);
        console.log('uriImageDsp: ', uriImage);
      })
      .catch(error => {
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
      barCode: product.BarCode,
      name: product.Name
    });
  }

  const goBack = () => {
    navigation.goBack();
  }

  const Description = (props) => {
    console.log(props.style.Description);
    if (product.Description !== '') {
      return (
        <>
          <Text style={styles.title}>{"Descripción"} </Text>
          <Text style={props.style.Description}> {product.Description} </Text>
        </>
      )
    }
    return null;
  }

  const MaterialLogo = (props) => {
    console.log('props.style.image: ', props.style.image);
    if (uriImage !== '') {
      console.log('uriImage en el componente de image', uriImage);
      return <Image
        style={props.style.image}
        source={{ uri: uriImage }}
      />
    }
    return null;
  }
  const BasketText = (props) => {
    console.log('materials: ', materials);
    console.log('product.Material: ', product.Material);
    console.log('materials[product.Material]', materials[product.Material]);

    if (materials[product.Material]) {
      if (product.Material !== 'noSeRecicla') {
        return (
          <>
            <Text style={styles.title}>{"Tacho"} </Text>
            <Text style={props.styles.Description}>{materials[product.Material]}</Text>
          </>
        )
      }
      else {
        return <Text style={props.styles.Description}>{"Este producto no se recicla "}</Text>
      }
    }
  }

  return (
    <View style={styles.AllContainer} >
      <View style={styles.Container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{"INFORMACION DE PRODUCTO"}</Text>
        </View>
        <Text style={styles.name} >{product.Name}</Text>
        <MaterialLogo style={styles} />
        <BasketText styles={styles} />
        <Description style={styles} />
      </View>
      <View style={styles.IconsAgreeContainer}>
        <TouchableHighlight onPress={doesntAgree} >
          <View>
            <Icon name="thumbs-down" color={Constants.Colors.cancelColor} size={60} type="font-awesome" />
            <Text> No estoy de acuerdo </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={agree}>
          <View >
            <Icon name="thumbs-up" color={Constants.Colors.brandGreenColor} size={60} type="font-awesome" />
            <Text> Gracias! </Text>
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
  },
  Container: {
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  IconsAgreeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent: 'space-between',
  },
  name: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  Description: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  material: {
    fontSize: 15,
    letterSpacing: 1.2,
    opacity: 0.8,
    alignSelf: "center",
    paddingTop: 20,
    marginBottom: 10,
    color: Constants.Colors.brandGreenColor,
  },
  image: {
    width: 230,
    height: 230
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 1.2,
    opacity: 0.8,
    alignSelf: "center",
    paddingTop: 20,
    marginBottom: 10,
    color: Constants.Colors.brandGreenColor
  },
  headerContainer: {
    marginBottom: 40,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: Constants.Colors.brandGreenColor
  },
  headerTitle: {
    fontWeight: "bold",
    letterSpacing: 1.2,
    paddingTop: 20,
    width: '100%',
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingBottom: 20,
    color: Constants.Colors.white,
    fontSize: 20,
    // opacity: 0.8
  },
})
