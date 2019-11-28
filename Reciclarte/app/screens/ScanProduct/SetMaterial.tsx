import React, { Component, useState } from "react";
import { StyleSheet, View, Picker } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import Product from "../../Models/Products";

interface IProps {
  BarCode: string;
}

interface IState {
  material: string;
  name: string;
  description: string;
}

var product: Product;

export default class SetMaterial extends Component<IProps, IState> {
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  constructor(props) {
    super(props);
    // product = new Product();
    this.state = {
      material: "",
      name: "",
      description: ""
    };
  }

  updateMaterial = material => {
    this.setState({
      material: material
    });
  };

  buttonCancelar = () => {
    // this.setState({
    //   isVisibleOverlay: false
    // });
    // this.state.onCancelButton();
    console.log("Boton Cancelar");
  };

  buttonAceptar = () => {
    // product.BarCode =
    // console.log(this.state.material);
    // console.log(this.state.name);
    // console.log(this.state.description);

    // this.setState({
    //   isVisibleOverlay: false
    // });
    // this.state.onAcceptButton();
    console.log("Boton Aceptar");
    // console.log(name);
    // console.log(description);
  };
  // setName = text => {};
  // setDescription = text => {
  //   console.log(text);
  // };

  render() {
    return (
      <View style={styles.ViewOverlay}>
        <Picker
          selectedValue={this.state.material}
          onValueChange={this.updateMaterial}
        >
          <Picker.Item label="Elija un material" value="" />
          <Picker.Item label="Plastico" value="plastico" />
          <Picker.Item label="Papel y Carton" value="papelCarton" />
          <Picker.Item label="Vidrio" value="vidrio" />
          <Picker.Item label="Metal" value="metal" />
          <Picker.Item label="Orgánico" value="organico" />
        </Picker>
        <Input
          placeholder="Nombre (opcional)"
          onChange={e => setName(e.nativeEvent.text)}
        ></Input>
        <Input
          style={styles.description}
          placeholder="Datos Adicionales (opcional)"
          value={this.state.description}
          onChange={e => setDescription(e.nativeEvent.text)}
        ></Input>

        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.buttonCancel}
            title="Cancelar"
            onPress={() => {
              this.buttonCancelar();
            }}
          />
          <Button
            buttonStyle={styles.buttonSave}
            title="Guardar"
            onPress={() => {
              this.buttonAceptar();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: "center",
    color: "red"
  },
  overlayStyle: {
    alignItems: "center",
    justifyContent: "center"
  },
  ViewOverlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    // padding: 20,
    // borderColor: "#00a680",
    backgroundColor: "#fff"
    // borderLeftWidth: 2,
    // borderRightWidth: 2,
    // borderTopWidth: 2,
    // borderBottomWidth: 2,
    // borderRadius: 5
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15
  },
  buttonCancel: {
    backgroundColor: "#990000"
    // padding: 10
  },
  buttonSave: {
    backgroundColor: "#00a680"
    // padding: 10
  },
  description: {
    height: 50
  }
  // descriptionContainer: {
  //   height: 50
  // }
});
