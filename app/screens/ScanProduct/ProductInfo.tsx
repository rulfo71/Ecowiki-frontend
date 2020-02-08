import React, { Component, useState, useEffect } from 'react'
import {TouchableHighlight} from 'react-native'
import {withNavigation} from 'react-navigation'
import { Icon } from "react-native-elements";

import Product from '../../Models/ProductModel'
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator
} from 'react-native'

export default withNavigation(ProductInfo);

function ProductInfo({navigation}) {
  let [product, setProduct] = useState(navigation.getParam('product'));
    console.log('estoy en productInfo con product: ',product);
  useEffect(() => {

  },[]);
 
  const dontAgree = () => {
      Alert.alert('¿Querés agregarlo?', '', [
        {
          text: 'No',
          onPress: () => goBack()
        },
        {
          text: 'Si',
          onPress: async () => {
            goToSetMaterial();
          }
        }
      ])
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

  function Description() {
    console.log('description');
    if (product.Description !== '') { 
      return <Text>Descripcion adicional: {product.Description} </Text>
    }
    return null;
  }

  return (
    <View style={styles.ViewOverlay}>
      <Text>{product.Name} va en {product.Material} </Text>
      <Description/>
      <View style={styles.IconsAgree}>
        <TouchableHighlight onPress={dontAgree} >
          <View>
            <Icon name="thumbs-down" size={60} type="font-awesome" />
            <Text> No estoy de acuerdo </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={goBack}>
          <View >
            <Icon name="thumbs-up" size={60} type="font-awesome" />
            <Text> Gracias! </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ViewOverlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  IconsAgree: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent: 'space-between'
  }
})
