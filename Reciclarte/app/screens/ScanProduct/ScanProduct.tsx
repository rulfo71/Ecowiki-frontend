import React, { Component } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import * as Permissions from "expo-permissions";
import ProductsRepository from '../../Repositories/products';
import { BarCodeScanner } from "expo-barcode-scanner";
import OverlaySelectMaterial from './OverlaySelectMaterial'

export default class ScanProduct extends Component {



  state = {
    hasCameraPermission: null,
    scanned: false,
    overlayComponent: null
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };
  openOverlaySelectMaterial = () => {
    console.log('openOverlaySelectMaterial');
    this.setState({  
      overlayComponent: <OverlaySelectMaterial/>
    })
  }

  
  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({ scanned: true });
    var productsRepository = new ProductsRepository();
    await productsRepository.lookForBarCode(data).then(foundProduct => {
      if (foundProduct){
        alert('este producto va en ' + foundProduct.Material)
      }
      else{
        this.addProductAlert();
      }
    });  
  }; 

  // goToScreen = (screen) => {
  //   this.props.navigation.navigate(screen);
  // }

  addProductAlert = () => {
    Alert.alert(
      "No tenemos registrado este producto",
      "Queres agregarlo?",
      [
        {
          text: "No",
          onPress: () => console.log("No quiere agregarlo")
        },
        {
          text: "Si",
          onPress :  () =>  this.openOverlaySelectMaterial()
        }
      ]
    );
  }

  render() {
    const { hasCameraPermission, scanned, overlayComponent } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.view}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      {overlayComponent}
      </View>
    );
  }


}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "stretch"
  }
});
