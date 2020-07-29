import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import Toast from 'react-native-easy-toast'

import { Constants } from '../../Common/Constants/Constants';
import Login from '../Account/Login';
import * as firebase from 'firebase';
import UnregisteredProductsList from '../../components/Products/UnregisteredProductsList';
import GetProductsToVoteDto from '../../Dtos/Products/GetProductsToVoteDto';
import { getUnregisteredProducts, getProductByBarCode } from '../../Repositories/ProductsRepository';
import { isEmpty } from 'lodash';

export default function Clasify({ route, navigation }) {
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
            title: Constants.Navigations.titles.ProductStack.clasify,
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

    if (isLogged === null) return <Spinner visible={isLogged === null} />

    return (
        !isLogged ? <Login redirectTo={Constants.Navigations.ProductStack.clasify} /> :
            <View style={styles.view}>
                <UnregisteredProductsList
                    products={unRegisteredProducts}
                    toastRef={toastRef}
                    isLoading={isLoading}
                    navigation={navigation}
                    handleLoadMore={getProducts}
                    isLoadingMore={isLoadingMore}
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
    },
})