import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements'
import { isEmpty } from 'lodash';
import * as firebase from 'firebase'
import AddProductDto from '../../Dtos/Products/AddProductDto'
import { addProduct, addUnregisteredProduct } from '../../Repositories/ProductsRepository'
import uuid from 'random-uuid-v4'

import { Constants } from '../../Common/Constants/Constants';
import Modal from '../Modal';
import CameraOrGallery from '../CameraOrGallery'
import UploadImage from '../UploadImage';

export default function AddProductForm(props) {

    const { toastRef, setIsLoading, navigation, isUnRegistered, nameParam, barcodeParam } = props

    const [barcode, setBarcode] = useState(barcodeParam)
    const [material, setMaterial] = useState('')
    const [name, setName] = useState(nameParam)
    const [observations, setObservations] = useState('')
    const [other, setOther] = useState('')
    const [imageUri, setImageUri] = useState('')

    const uploadImageStorage = async () => {

        try {
            const response = await fetch(imageUri)
        
            const blob = await response.blob()
            console.log(`blob: ${blob}`);        
            const ref = firebase.storage().ref('products').child(uuid())
            console.log(`ref: ${ref}`);
            const result = await ref.put(blob)
            console.log(`result: ${result}`);
            const photoUrl = await firebase
                                        .storage()
                                        .ref(`products/${result.metadata.name}`)
                                        .getDownloadURL()
            return photoUrl
        } catch (error) {
            console.log(`hubo un error subiendo las imagenes: ${error}`);                        
        }
    }

    const onSubmit = async () => {
        if (isEmpty(name)) {
            toastRef.current.show('Tenés que completar el nombre')
        }
        else if (isEmpty(material) && !isUnRegistered) {
            toastRef.current.show('Tenés que completar el material')
        }
        else if (material == 'otro' && isEmpty(other) && !isUnRegistered) {
            toastRef.current.show('Tenés que completar el material')
        }
        else {
            let addProductDto = new AddProductDto()
            addProductDto.barcode = barcode
            addProductDto.name = name
            addProductDto.observations = observations
            // addProductDto.hasImage = !isEmpty(imageUri) ? true : false
            if (!isUnRegistered)
                addProductDto.material = (material !== 'otro') ? material : other
            const user = firebase.auth().currentUser
            // console.log(`user: ${user}`);
            if (!user && !isUnRegistered) {
                toastRef.current.show('Tenés que estar logueado para poder registrar productos')
                return
            } else {
                addProductDto.addedBy = firebase.auth().currentUser.uid
            }
            try {
                setIsLoading(true)

                if (!isEmpty(imageUri))
                    addProductDto.photoUrl = await uploadImageStorage()                    

                let response
                if (!isUnRegistered) {
                    response = await addProduct(addProductDto)
                }
                else {
                    response = await addUnregisteredProduct(addProductDto)
                }

                setIsLoading(false)
                
                toastRef.current.show('Gracias! Ya agregamos el producto', 500, () => {
                    navigation.navigate(Constants.Navigations.home);
                });
                console.log(`AddProductForm - response : ${JSON.stringify(response)}`);            
            } catch (error) {
                toastRef.current.show('Upss.. hubo un problema. Intentá de nuevo mas tarde')
                console.log(`error: ${error}`)
                setIsLoading(false)
            }
        }
    }

    return (
        <ScrollView style={styles.scrollView}>
            <UploadImage toastRef={toastRef} imageUri={imageUri} setImageUri={setImageUri} />
            <FormAdd
                barcode={barcode}
                material={material}
                setMaterial={setMaterial}
                name={name}
                setName={setName}
                setObservations={setObservations}
                other={other}
                setOther={setOther}
                navigation={navigation}
                isUnRegistered={isUnRegistered}
            />
            <Button
                title='Guardar'
                onPress={onSubmit}
                buttonStyle={styles.buttonAccept}
                containerStyle={styles.buttonAcceptContainer}
            />
        </ScrollView>
    )
}


function FormAdd(props) {
    const {
        barcode,
        material,
        setMaterial,
        setName,
        name,
        setObservations,
        navigation,
        other,
        setOther,
        isUnRegistered
    } = props

    // console.log('estoy en formadd');
    // console.log();


    // console.log(`isUnRegistered: ${isUnRegistered}`);

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
        <ScrollView style={styles.viewForm}>
            {!isEmpty(barcode) && <Input
                label='CÓDIGO DE BARRAS'
                labelStyle={styles.title}
                value={barcode}
                disabled={true}
                // placeholder='¿Qué nombre le ponemos?'
                containerStyle={styles.input}
                onChange={e => onChangeName(e.nativeEvent.text)}
            />}
            <Input
                label='NOMBRE'
                labelStyle={styles.title}
                value={name}
                placeholder='¿Qué nombre le ponemos?'
                containerStyle={styles.input}
                onChange={e => onChangeName(e.nativeEvent.text)}
            />
            {!isUnRegistered &&
                <>
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
                        <Picker.Item label='Metal y Aluminio' value='metalAluminio' />
                        <Picker.Item label='Orgánico' value='organico' />
                        <Picker.Item label='No se recicla' value='noSeRecicla' />
                        <Picker.Item label='Otro' value='otro' />
                    </Picker>
                </>
            }
            {
                showOther &&
                <Input
                    placeholder='Contenedor'
                    containerStyle={styles.input}
                    onChange={e => { setOther(e.nativeEvent.text) }}
                />

            }
            <Input
                label='ACLARACIONES'
                labelStyle={styles.title}
                placeholder='¿Alguna aclaración para agregar?'
                containerStyle={styles.input}
                multiline={true}
                inputContainerStyle={styles.observationsText}
                onChange={e => setObservations(e.nativeEvent.text)}
            />
        </ScrollView>
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
        // paddingLeft: 10,
        fontSize: 15,
        fontWeight: "bold",
        letterSpacing: 1.2,
        opacity: 0.8,
        alignSelf: 'flex-start',
        color: Constants.Colors.brandGreenColor,
        marginBottom: 10,
    },
})