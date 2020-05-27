import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions} from 'react-native';
import {Picker} from '@react-native-community/picker';

import { Icon, Avatar, Image, Input, Button } from 'react-native-elements'
import { isEmpty } from 'lodash';

import { Constants } from '../../Common/Constants/Constants';
import Modal from '../Modal';
import CameraOrGallery from '../CameraOrGallery'
import UploadImage from '../UploadImage';

export default function AddProductForm(props) {

    const { toastRef, setIsLoading, navigation } = props

    const [material, setMaterial] = useState('')
    const [name, setName] = useState('')
    const [observations, setObservations] = useState('')
    const [other, setOther] = useState('')
    const [imageUri, setImageUri] = useState('')

    const addProduct = () => {
        
        console.log(`imageUri: ${imageUri}`);
        console.log(`name: ${name}`);
        console.log(`material: ${material}`);
        console.log(`observations: ${observations}`);
        console.log(`other: ${other}`);

        if (isEmpty(name)){
            toastRef.current.show('Tenés que completar el nombre')
        }
        else if (isEmpty(material)) {
            toastRef.current.show('Tenés que completar el material')
        }
        else if (material == 'otro' && isEmpty(other)){
            toastRef.current.show('Tenés que completar el material')
        }
        else{
            toastRef.current.show('Gracias! Ya agregamos el producto')            
        }

    }

    return (
        <ScrollView style={styles.scrollView}>
            <UploadImage toastRef={toastRef} imageUri={imageUri} setImageUri={setImageUri} />
            <FormAdd
                material={material}
                setMaterial={setMaterial}
                setName={setName}
                setObservations={setObservations}
                other={other}
                setOther={setOther}
                navigation={navigation}
            />
            <Button
                title='Guardar'
                onPress={addProduct}
                buttonStyle={styles.buttonAccept}
                containerStyle={styles.buttonAcceptContainer}
            />
        </ScrollView>
    )
}

function FormAdd(props) {
    const {
        material,
        setMaterial,
        setName,
        setObservations,
        navigation,
        other,
        setOther,
    } = props

    const [showOther, setShowOther] = useState(false)

    const materialChange = (material) => {
        material == 'otro' ? setShowOther(true) : setShowOther(false)
        setMaterial(material)
    }
    const onChangeName = (newName) => {
        navigation.setOptions({
            title: newName,
          })
        setName(newName)
    }

    return (
        <View style={styles.viewForm}>
    
            <Text style={styles.title}>{"NOMBRE "} </Text>
            <Input
                placeholder='¿Qué nombre le ponemos? '
                containerStyle={styles.input}
                onChange={e =>onChangeName(e.nativeEvent.text)}
            />
            <Text style={styles.title}>{"CONTENEDOR"} </Text>
            <Picker
                selectedValue={material} 
                mode='dialog'
                style={styles.picker}            
                itemStyle={styles.pickerItems}
                onValueChange={value => materialChange(value)}>
                <Picker.Item color='#c9c9c9' label='¿En qué tacho va?' value='' />
                <Picker.Item label='Plastico' value='plastico' />
                <Picker.Item label='Papel y Carton' value='papelCarton' />
                <Picker.Item label='Vidrio' value='vidrio' />
                <Picker.Item label='Metal' value='metal' />
                <Picker.Item label='Orgánico' value='organico' />
                <Picker.Item label='No se recicla' value='noSeRecicla' />
                <Picker.Item label='Otro' value='otro' />
            </Picker>
            {
                showOther &&
                <Input
                    placeholder='Contenedor'
                    containerStyle={styles.input}
                    onChange={e => { setOther(e.nativeEvent.text) }}
                />
                
            }
            <Text style={styles.title}>{"OBSERVACIONES"} </Text>
            <Input
                placeholder='¿Alguna observación para agregar? Por ejemplo: ¡Limpio y seco!'
                containerStyle={styles.input}
                multiline={true}
                inputContainerStyle={styles.observationsText}
                onChange={e => setObservations(e.nativeEvent.text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        height: '100%'
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10
    },
    input: {
        marginBottom: 10,
    },
    observationsText: {
        height: 70
    },
    buttonAccept: {
        backgroundColor: Constants.Colors.brandGreenColor,
        borderRadius: 100,
    }, 
    buttonAcceptContainer: {
        marginTop: 20,
        alignSelf: 'center',
        width: '80%'
    },
    picker: {
        alignContent: 'center',
        borderBottomColor: 'black',
        borderWidth: 3,
        borderColor: 'black',

    },
    pickerItems: {
        alignSelf: 'center',
    },
    title: {
        paddingTop: 15,
        paddingLeft: 10,
        fontSize: 15,
        fontWeight: "bold",
        letterSpacing: 1.2,
        opacity: 0.8,
        alignSelf: 'flex-start',
        color: Constants.Colors.brandGreenColor,
        marginBottom: 10,
      },
})