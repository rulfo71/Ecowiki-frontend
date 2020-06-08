import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FloatingAction } from 'react-native-floating-action'
import Spinner from "react-native-loading-spinner-overlay";

import { Constants } from '../../Common/Constants/Constants';
import { Icon } from 'react-native-elements';
import Login from '../Account/Login';
import * as firebase from 'firebase';

export default function AddProductHome({ route, navigation }) {

    const [isLogged, setIsLogged] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                setIsLogged(false)
            }
            else {
                setIsLogged(true);
            }
        });
        navigation.setOptions({
            title: 'Agregar Producto',
        })
    })


    const onPressItem = (name) => {
        switch (name) {
            case 'add_new_product':
                navigation.navigate(Constants.Navigations.ProductStack.addNewProduct)
                break;

            case 'add_unregistered_products':
                console.log('entre a add_unregistered_products');
                break;

            case 'vote_added_products':
                navigation.navigate(Constants.Navigations.ProductStack.voteProducts)
                break;
            default:
                break;
        }
    }

    const actions = [
        {
            text: "Agregar productos sin registrar",
            icon: <Icon
                type='material'
                name='done'
                color='white'
            // containerStyle={styles.containerIcon}
            />,
            name: "add_unregistered_products",
            position: 1,
            color: Constants.Colors.brandGreenColor,
            size: 50,
        },
        {
            text: "Votar productos agregados",
            icon: <Icon
                type='material'
                name='done'
                color='white'
            // containerStyle={styles.containerIcon}
            />,
            name: "vote_added_products",
            position: 2,
            color: Constants.Colors.brandGreenColor,
            size: 50,
        },
        {
            text: "Agregar un producto nuevo",
            icon: <Icon
                type='material-community'
                name='barcode'
                color='white'
            // containerStyle={styles.containerIcon}
            />,
            name: "add_new_product",
            position: 3,
            color: Constants.Colors.brandGreenColor,
            size: 50,
        },
    ]

    if (isLogged === null) return <Spinner visible={isLogged === null} />

    return (
        !isLogged ? <Login redirectTo={Constants.Navigations.ProductStack.addProductHome} /> :
            <View style={styles.view}>
                <Text> Add Product Home</Text>
                <FloatingAction
                    actions={actions}
                    color={Constants.Colors.brandGreenColor}
                    onPressItem={name => {
                        onPressItem(name)
                    }}
                />
            </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    }

})