import React, { Component } from 'react'
import Product from '../../Models/ProductModel'
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator
} from 'react-native'

interface IProps {
  product: Product,
  navigation: any
}

interface IState {

}


export default class ProductInfo extends Component<IProps, IState> {
  constructor(props) {
    super(props)
    var product = this.props.navigation.getParam('product', '')
    console.log('estoy en productInfo con product: ');
    console.log(product);


    this.state = {
      product: product
    }
  }

  render() {
    return (
      <View style={styles.ViewOverlay}>
        <Text>Pantalla ProductInfo</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ViewOverlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
})
