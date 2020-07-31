import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Toast from 'react-native-easy-toast';
import Spinner from "react-native-loading-spinner-overlay";
import AddProductForm from '../../components/Products/AddProductForm'
import * as firebase from 'firebase'
import Login from '../Account/Login';
import { Constants } from '../../Common/Constants/Constants';

export default function AddUnRegisteredProduct({ route, navigation }) {
    const { name, barcode } = route.params
    const [isLoading, setIsLoading] = useState(false)
    const toastRef = useRef();
    const [isLogged, setIsLogged] = useState(null)

    useEffect(() => {
        navigation.setOptions({
            title: 'Agregar Producto',
        })
    })

    return (
        <View>
            <AddProductForm
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
                isUnRegistered={true}
                nameParam={name}
                barcodeParam={barcode}
                observationsParam={''}
            />
            <Toast ref={toastRef} position='center' opacity={0.8}></Toast>
            <Spinner visible={isLoading} />
        </View>
    )
}

const styles = StyleSheet.create({

})