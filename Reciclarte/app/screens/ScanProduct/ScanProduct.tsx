import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator
} from "react-native";
import * as Permissions from "expo-permissions";
import ProductsRepository from "../../Repositories/products";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Text as TextElem, Overlay } from "react-native-elements";
import OverlaySelectMaterial from "./OverlaySelectMaterial";

interface IProps {
  hasCameraPermission?: any;
  scanned?: boolean;
  overlayComponent?: any;
}

interface IState {
  hasCameraPermission?: any;
  scanned?: boolean;
  overlayComponent?: any;
  loading: boolean;
}

export default class ScanProduct extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null,
      scanned: false,
      overlayComponent: null,
      loading: false
    };
  }

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };
  openOverlaySelectMaterial = async closeFunction => {
    // console.log("openOverlaySelectMaterial");
    this.setState({
      overlayComponent: (
        <OverlaySelectMaterial
          isVisibleOverlay={true}
          onAcceptButton={this.updateProduct}
          onCancelButton={this.closeOverlay}
        />
      )
    });
  };

  updateProduct = async () => {
    this.setState({
      overlayComponent: null
    });
    console.log("update Product");
  };

  closeOverlay = async () => {
    this.setState({
      overlayComponent: null
    });
    console.log("closeOverlay");
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      loading: true
    });
    var productsRepository = new ProductsRepository();
    await productsRepository
      .lookForBarCode(data)
      .then(foundProduct => {
        this.setState({ loading: false });
        if (foundProduct) {
          alert("este producto va en " + foundProduct.Material);
        } else {
          this.addProductAlert();
        }
      })
      .catch(error => {
        // this.refs.toast.show('Error de servidor, intente de nuevo mas tarde')
        console.log("error");
        this.setState({ loading: false });
      });
  };

  // goToScreen = (screen) => {
  //   this.props.navigation.navigate(screen);
  // }

  addProductAlert = () => {
    Alert.alert("No tenemos registrado este producto", "Queres agregarlo?", [
      {
        text: "No",
        onPress: () => console.log("No quiere agregarlo")
      },
      {
        text: "Si",
        onPress: async () =>
          await this.openOverlaySelectMaterial(this.closeOverlay)
      }
    ]);
  };

  render() {
    const {
      hasCameraPermission,
      scanned,
      overlayComponent,
      loading
    } = this.state;

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
        <Overlay
          overlayStyle={styles.overlayLoading}
          isVisible={loading}
          width="auto"
          height="auto"
        >
          <View>
            <TextElem style={styles.overlayLoadingText}>
              Buscando el producto
            </TextElem>
            <ActivityIndicator size="large" color="#00a680"></ActivityIndicator>
          </View>
        </Overlay>
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
  },
  overlayLoading: {
    padding: 20
  },
  overlayLoadingText: {
    color: "#00a680",
    marginBottom: 20,
    fontSize: 20
  }
});
