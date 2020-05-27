import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Toast from 'react-native-easy-toast';
import Spinner from "react-native-loading-spinner-overlay";
import AddProductForm from '../../components/Products/AddProductForm'

export default function AddProduct(props) {
    const { navigation } = props
    const [isLoading, setIsLoading] = useState(false)
    const toastRef = useRef();

    return (
        <View>
            <AddProductForm
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
            />
            <Text> Add Product ... </Text>
            <Toast ref={toastRef} position='center' opacity={0.8}></Toast>
            <Spinner visible={isLoading} />

        </View>

    )
}

const styles = StyleSheet.create({

})