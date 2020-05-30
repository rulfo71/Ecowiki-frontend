import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Toast from 'react-native-easy-toast';
import Spinner from "react-native-loading-spinner-overlay";
import AddProductForm from '../../components/Products/AddProductForm'
import * as firebase from 'firebase'
import Login from '../Account/Login';
import { Constants } from '../../Common/Constants/Constants';

export default function AddProduct(props) {
    const { navigation } = props
    const [isLoading, setIsLoading] = useState(false)
    const toastRef = useRef();
    const [isLogged, setIsLogged] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                setIsLogged(false)
                // navigation.navigate(Constants.Navigations.AccountStack.account)
            }
            else {
                setIsLogged(true);
            }
        });
        navigation.setOptions({
            title: 'Agregar Producto',
        })
    })

    if (isLogged === null) return <Spinner visible={isLogged === null} />

    return (
        !isLogged ? <Login redirectTo={Constants.Navigations.ProductStack.addProduct} /> :
            <View>
                <AddProductForm
                    toastRef={toastRef}
                    setIsLoading={setIsLoading}
                    navigation={navigation}
                    isUnRegistered={false}
                />
                <Toast ref={toastRef} position='center' opacity={0.8}></Toast>
                <Spinner visible={isLoading} />
            </View>

    )
}

const styles = StyleSheet.create({

})