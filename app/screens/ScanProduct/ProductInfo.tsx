import React, { Component } from 'react'
import {TouchableHighlight} from 'react-native'
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

interface IProps {
  product: Product,
  navigation: any
}

interface IState {
  product: Product,
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
 
  dontAgree = () => {
      Alert.alert('¿Querés agregarlo?', '', [
        {
          text: 'No',
          onPress: () => this.goBack()
        },
        {
          text: 'Si',
          onPress: async () => {
            await this.goToSetMaterial();
          }
        }
      ])
  }
  goToSetMaterial = () => {
    this.props.navigation.push('SetMaterial', {
      barCode: this.state.product.BarCode,
      name: this.state.product.Name
    })
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {

    let description;
    if (this.state.product.Description !== '') {
      description = <Text>Descripcion adicional: {this.state.product.Description} </Text>
    }

    return (
      <View style={styles.ViewOverlay}>
        <Text>{this.state.product.Name} va en {this.state.product.Material} </Text>
        {description}
        <View style={styles.IconsAgree}>
          <TouchableHighlight onPress={this.dontAgree} >
            <View>
              <Icon name="thumbs-down" size={60} type="font-awesome" />
              <Text> No estoy de acuerdo </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.goBack}>
            <View >
              <Icon name="thumbs-up" size={60} type="font-awesome" />
              <Text> Gracias! </Text>
            </View>
          </TouchableHighlight>
        </View>
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
  IconsAgree: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent: 'space-between'
  }
})
