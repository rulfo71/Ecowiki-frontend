import React, { Component, useState, useEffect } from 'react'
import { TouchableHighlight } from 'react-native'
import { getMaterialLogo, addVote, subtractVote } from '../../Repositories/ProductsRepository'
import { withNavigation } from 'react-navigation'
import { Icon, Image } from "react-native-elements";
import {
  Text,
  View,
  StyleSheet,
  Alert,
} from 'react-native'

export default withNavigation(ProductInfo);

function ProductInfo({ navigation }) {
  let [product, setProduct] = useState(navigation.getParam('product'));
  const [uriImage, seturiImage] = useState('');
  console.log('estoy en productInfo con product: ', product);
  console.log('uriImageInicial: ', uriImage);
  useEffect(() => {
    console.log('getMaterialLogo dentro de useEffect');
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
        console.log('error:', error);
      });
  }

  const dontAgree = () => {
    Alert.alert('¿Querés agregarlo?', '', [
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
      return <Text style={props.style.Description}> {product.Description} </Text>
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

  return (
    <View style={styles.AllContainer} >
      <View style={styles.Container}>
        <Text style={styles.name} >{product.Name}</Text>
        <MaterialLogo style={styles} />
        <Text style={styles.Description}>{"Va en el tacho de " + product.Material}</Text>
        <Description style={styles} />
      </View>
      <View style={styles.IconsAgreeContainer}>
        <TouchableHighlight onPress={dontAgree} >
          <View>
            <Icon name="thumbs-down" color="#990000" size={60} type="font-awesome" />
            <Text> No estoy de acuerdo </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={agree}>
          <View >
            <Icon name="thumbs-up" color="#00a680" size={60} type="font-awesome" />
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
    justifyContent: 'space-around'
  },
  Container: {
    // flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    // justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  IconsAgreeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent: 'space-between',
  },
  name: {
    fontSize: 60,
    fontWeight: 'bold',
    // alignContent: 'center',
    // textAlignVertical: 'center',
    // justifyContent: 'center'
  },
  Description: {
    fontSize: 25,
    fontWeight: 'bold',
    // alignContent: 'center',
    // textAlignVertical: 'center',
    // justifyContent: 'center'
  },
  material: {
    fontSize: 15,
    letterSpacing: 1.2,
    opacity: 0.8,
    alignSelf: "center",
    paddingTop: 20,
    marginBottom: 10,
    color: '#03960A',
  },
  image: {
    width: 250,
    height: 250
  }
})
