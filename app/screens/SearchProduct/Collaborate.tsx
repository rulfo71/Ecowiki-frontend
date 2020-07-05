import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FloatingAction } from 'react-native-floating-action'
import Spinner from "react-native-loading-spinner-overlay";
import Toast from 'react-native-easy-toast'

import { Constants } from '../../Common/Constants/Constants';
import { Icon } from 'react-native-elements';
import Login from '../Account/Login';
import * as firebase from 'firebase';
import UnregisteredProductsList from '../../components/Products/UnregisteredProductsList';
import GetProductsToVoteDto from '../../Dtos/Products/GetProductsToVoteDto';
import { getUnregisteredProducts, getProductByBarCode } from '../../Repositories/ProductsRepository';
import UnregisteredProduct from '../../components/Products/UnregisteredProduct';
import { isEmpty } from 'lodash';

export default function Collaborate({ route, navigation }) {
    const toastRef = useRef();
    const [isLogged, setIsLogged] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [startProductName, setStartProductName] = useState('')
    const [unRegisteredProducts, setUnRegisteredProducts] = useState([])
    const [noMoreProducts, setNoMoreProducts] = useState(false)

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
            title: 'Colaborar',
            headerStyle: {
                backgroundColor: Constants.Colors.brandGreenColor,
                borderBottomStartRadius: 0,
                borderBottomEndRadius: 0,  
            },
        })
    })

    useEffect(() => {
        (async () => {
            await getProducts()
        })()
    }, [])

    const getProducts = async () => {
        try {
            if (noMoreProducts) return

            var getUnregisteredProductsDto = new GetProductsToVoteDto()
            const user = firebase.auth().currentUser
            if (user) {
                getUnregisteredProductsDto.userId = user.uid
            }
            else {
                getUnregisteredProductsDto.userId = ''
            }
            getUnregisteredProductsDto.startProductName = startProductName
            isEmpty(startProductName) ? setIsLoading(true) : setIsLoadingMore(true)
            var response = await getUnregisteredProducts(getUnregisteredProductsDto)
            setUnRegisteredProducts(unRegisteredProducts.concat(response))
            if (response.length == 0) {
                setNoMoreProducts(true)
                isEmpty(startProductName) ? setIsLoading(false) : setIsLoadingMore(false)
            } else {
                isEmpty(startProductName) ? setIsLoading(false) : setIsLoadingMore(false)                
                var newStartProductName = response[response.length - 1].name.toLowerCase()
                setStartProductName(newStartProductName)
            }
        } catch (error) {
            //poner toast
            console.log(`error: ${error} `);
            setIsLoading(false)
            setIsLoading(false)
        }
    }

    const onPressItem = (name) => {
        switch (name) {
            case 'add_new_product':
                navigation.navigate(Constants.Navigations.ProductStack.addNewProduct)
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
            text: "Votar productos",
            icon: <Icon
                type='material'
                name='done'
                color='white'
            />,
            name: "vote_added_products",
            position: 1,
            color: Constants.Colors.brandGreenColor,
            size: 50,
        },
        {
            text: "Agregar un producto nuevo",
            icon: <Icon
                type='material-community'
                name='barcode'
                color='white'
            />,
            name: "add_new_product",
            position: 2,
            color: Constants.Colors.brandGreenColor,
            size: 50,
        },
    ]

    if (isLogged === null) return <Spinner visible={isLogged === null} />

    return (
        !isLogged ? <Login redirectTo={Constants.Navigations.ProductStack.collaborate} /> :
            <View style={styles.view}>
                <UnregisteredProductsList
                    products={unRegisteredProducts}
                    toastRef={toastRef}
                    isLoading={isLoading}
                    navigation={navigation}
                    handleLoadMore={getProducts}
                    isLoadingMore={isLoadingMore}
                />
                <FloatingAction
                    actions={actions}
                    color={Constants.Colors.brandBlueColor}
                    onPressItem={name => {
                        onPressItem(name)
                    }}
                />
                <Spinner visible={isLoading} />
                <Toast ref={toastRef} position='center' opacity={0.9} />
            </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "#b9b9b9",
    }
})