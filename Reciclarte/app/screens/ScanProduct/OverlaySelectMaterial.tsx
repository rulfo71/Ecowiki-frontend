import React, {Component } from 'react';
import {StyleSheet, View, Picker } from 'react-native';
import { Overlay, Input, Button, Text } from 'react-native-elements';

export default class OverlaySelectMaterial extends Component {

    constructor(props){
        super(props);
        this.state = {
            ...props,
            material: ''
        }
        console.log(this.state);
    }
    // state = {material: ''}
    updateMaterial = (material) => {
       this.setState({ material: material })
    }

    render (){
        return ( 
        <Overlay isVisible = {true} overlayBackgroundColor = 'transparent' overlayStyle = {styles.overlayStyle} > 
         <View style={styles.ViewOverlay}>
            <Picker selectedValue = {this.state.material} onValueChange = {this.updateMaterial}>
               <Picker.Item label = "Plastico" value = "plastico" />
               <Picker.Item label = "Papel y Carton" value = "papelCarton" />
               <Picker.Item label = "Vidrio" value = "vidrio" />
               <Picker.Item label = "Metal" value = "metal" />
               <Picker.Item label = "Orgánico" value = "organico" />
            </Picker>

            <View style={styles.buttonContainer}>
                <Button 
                buttonStyle={styles.buttonCancel}
                title='Cancelar'
                onPress={() => {
                    console.log('cancelar');
                }}
                />
                <Button 
                buttonStyle={styles.buttonSave}
                title='Guardar'
                onPress={() => {
                    console.log('guardar');
                }}
                />
            </View>
        </View>
        </Overlay> 
        )
    }
}
const styles = StyleSheet.create({
    text: {
       fontSize: 30,
       alignSelf: 'center',
       color: 'red'
    },
    overlayStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ViewOverlay: {
        width: '100%',
        padding: 20,     
        borderColor: '#00a680',
        backgroundColor: '#fff',
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderRadius: 5
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonCancel: {
        backgroundColor: '#990000',
        padding: 10
    },
    buttonSave: {
        backgroundColor: '#00a680',
        padding: 10
    }
 })