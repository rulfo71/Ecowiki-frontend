import React, { Component } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import ProductsRepository from '../Repositories/products';
import { BarCodeScanner } from "expo-barcode-scanner";

// import { firebaseApp } from "../utils/firebase";
// import firebase from "firebase/app";
// import "firebase/firestore";

// const db = firebase.firestore(firebaseApp);

export default class BarcodeScannerExample extends Component {
  state = {
    hasCameraPermission: null,
    scanned: false
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

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
      </View>
    );
  }

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // this.lookForBarCode(data);
    
    var productsRepository = new ProductsRepository();
    await productsRepository.lookForBarCode(data).then(foundProduct => {
      console.log('foundProduct es ' + foundProduct);
      if (foundProduct){
        console.log('Lo encontramos!');  
        alert('este producto va en ' + foundProduct.Material)
      }
      else{
        console.log('parece que no esta...')
        this.addProductAlert();
      }
    });  
  }; 

  goToScreen = (screen) => {
    console.log('gotoscreen' + screen);
  }

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
          // onPress: () =>{ this.goToScreen("SetMaterial");}
          onPress :  () =>  this.goToScreen('SetMaterial')
        }
      ]
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
