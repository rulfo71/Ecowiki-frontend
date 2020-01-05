import React, { Component } from "react";
import { StyleSheet, View, Picker } from "react-native";
import { Overlay, Input, Button, Text } from "react-native-elements";

interface IProps {
  isVisibleOverlay: boolean;
  material?: string;
  onAcceptButton: any;
  onCancelButton: any;
}

interface IState {
  isVisibleOverlay: boolean;
  material: string;
  onAcceptButton: any;
  onCancelButton: any;
}

export default class OverlaySelectMaterial extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      ...props,
      material: "",
      isVisibleOverlay: props.isVisibleOverlay,
      onAcceptButton: props.onAcceptButton,
      onCancelButton: props.onCancelButton
    };
  }

  updateMaterial = material => {
    this.setState({ material: material });
  };

  buttonCancelar = () => {
    this.setState({
      isVisibleOverlay: false
    });
    this.state.onCancelButton();
  };

  buttonAceptar = () => {
    this.setState({
      isVisibleOverlay: false
    });
    this.state.onAcceptButton();
  };

  render() {
    const { isVisibleOverlay } = this.state;

    return (
      <Overlay
        isVisible={isVisibleOverlay}
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlayStyle}
      >
        <View style={styles.ViewOverlay}>
          <Input placeholder="Nombre (opcional)"></Input>
          <Input
            style={styles.description}
            containerStyle={styles.descriptionContainer}
            placeholder="Datos Adicionales (opcional)"
          ></Input>
          <Picker
            selectedValue={this.state.material}
            onValueChange={this.updateMaterial}
          >
            <Picker.Item label="Plastico" value="plastico" />
            <Picker.Item label="Papel y Carton" value="papelCarton" />
            <Picker.Item label="Vidrio" value="vidrio" />
            <Picker.Item label="Metal" value="metal" />
            <Picker.Item label="Orgánico" value="organico" />
          </Picker>

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
      </Overlay>
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
    width: "100%",
    height: "100%",
    padding: 20,
    borderColor: "#00a680",
    backgroundColor: "#fff",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 5
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
  description: {},
  descriptionContainer: {
    height: 50
  }
});
