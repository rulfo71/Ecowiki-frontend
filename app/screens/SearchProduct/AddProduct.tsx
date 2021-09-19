import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Toast from 'react-native-easy-toast';
import Spinner from "react-native-loading-spinner-overlay";
import AddProductForm from '../../components/Products/AddProductForm'

export default function AddProduct({ route, navigation }) {
    const { name, barcode, photoUrl, observations } = route.params
    console.log(`recibi por params el product: name: ${name}, barcode: ${barcode}, photoUrl: ${photoUrl}, observations: ${observations}`);

    const [isLoading, setIsLoading] = useState(false)
    const toastRef = useRef();

    return (
        <View>
            <AddProductForm
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
                barcodeParam={barcode}
                nameParam={name}
                photoUrlParam={photoUrl}
                observationsParam={observations}
                isUnRegistered={false}
            />
            <Toast ref={toastRef} position='center' opacity={0.8}></Toast>
            <Spinner visible={isLoading} />
        </View>

    )
}

const styles = StyleSheet.create({

})