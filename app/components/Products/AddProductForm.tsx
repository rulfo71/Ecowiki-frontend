import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements'
import { isEmpty } from 'lodash';
import * as firebase from 'firebase'
import AddProductDto from '../../Models/AddProductDto'
import { addProduct as addProductRepository, addUnregisteredProduct } from '../../Repositories/ProductsRepository'

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

    console.log(`AddProductForm. name: ${name} barcode: ${barcode}`);


    //el back va a subir el producto. si todo salio ok me va a devolver el id
    const uploadImageStorage = async (productId) => {
        //con ese id lo voy a meter en products    
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const ref = await firebase.storage().ref().child(`products/${productId}`)
        await ref.put(blob);
    }

    const addProduct = async () => {

        console.log(`imageUri: ${imageUri}`);
        console.log(`name: ${name}`);
        console.log(`material: ${material}`);
        console.log(`observations: ${observations}`);
        console.log(`other: ${other}`);

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
            addProductDto.hasImage = !isEmpty(imageUri) ? true : false
            if (!isUnRegistered)
                addProductDto.material = (material !== 'otro') ? material : other

            const user = firebase.auth().currentUser
            console.log(`user: ${user}`);
            if (!user && !isUnRegistered) {
                toastRef.current.show('Tenés que estar logueado para poder registrar productos')
                return
            } else {
                addProductDto.addedBy = firebase.auth().currentUser.uid
            }
            try {
                setIsLoading(true)

                let response
                if (!isUnRegistered) {
                    response = await addProductRepository(addProductDto)
                }
                else {
                    response = await addUnregisteredProduct(addProductDto)
                }
                if (addProductDto.hasImage) {
                    if (response.detailsId) {
                        await uploadImageStorage(response.detailsId);
                        setIsLoading(false)
                        toastRef.current.show('Gracias! Ya agregamos el producto', 500, () => {
                            navigation.navigate(Constants.Navigations.home);
                        });
                    }
                    else {
                        setIsLoading(false)
                        toastRef.current.show('Ups.. hubo un problema. Intentá de nuevo mas tarde')
                    }
                }
                else {
                    setIsLoading(false)
                    toastRef.current.show('Gracias! Ya agregamos el producto', 500, () => {
                        navigation.navigate(Constants.Navigations.home);
                    });
                }
                // console.log(`AddProductForm - response : ${JSON.stringify(response)}`);            

            } catch (error) {
                toastRef.current.show('Upss.. hubo un problema. Intentá de nuevo mas tarde')
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
                onPress={addProduct}
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
        isUnregistered
    } = props


    console.log(`name: ${name}`);


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
            {barcode && <Input
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
            {isUnregistered &&
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