import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import Toast from 'react-native-easy-toast'
import Product from '../../Models/MaterialModel'
import { Constants } from '../../Common/Constants/Constants';
import Login from '../Account/Login';
import * as firebase from 'firebase';
import UnregisteredProductsList from '../../components/Products/UnregisteredProductsList';
import GetProductsToVoteDto from '../../Dtos/Products/GetProductsToVoteDto';
import { getUnregisteredProducts, getProductByBarCode, getProductsByMaterial } from '../../Repositories/ProductsRepository';
import { isEmpty } from 'lodash';
import MaterialModel from '../../Models/MaterialModel';
import GetProductsByMaterialDto from '../../Dtos/Products/GetProductsByMaterialDto';
import ProductsList from '../../components/Products/ProductsList';

export default function ProductsByMaterial({ route, navigation }) {
    const toastRef = useRef();
    const [isLoading, setIsLoading] = useState(null)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [startProductName, setStartProductName] = useState('')
    const [products, setProducts] = useState([])
    const [noMoreProducts, setNoMoreProducts] = useState(false)
    
    const { name, displayName } = route.params
	const materialName = name

    useEffect(() => {
        navigation.setOptions({
            title: displayName,
            headerStyle: {
                backgroundColor: Constants.Colors.brandGreenColor,
                borderBottomStartRadius: 0,
                borderBottomEndRadius: 0,  
            },
        })
    })

    useEffect(() => {
        (async () => {
            await getProducts(materialName)
        })()
    }, [])

    const getProducts = async (material: string) => {
        try {
            if (noMoreProducts) return

            var getProductsByMaterialDto = new GetProductsByMaterialDto()
            getProductsByMaterialDto.startProductName = startProductName
            getProductsByMaterialDto.material = material
            isEmpty(startProductName) ? setIsLoading(true) : setIsLoadingMore(true)
            var response = await getProductsByMaterial(getProductsByMaterialDto)
            setProducts(products.concat(response))
            if (response.length == 0) {
                setNoMoreProducts(true)
                isEmpty(startProductName) ? setIsLoading(false) : setIsLoadingMore(false)
            } else {
                isEmpty(startProductName) ? setIsLoading(false) : setIsLoadingMore(false)                
                var newStartProductName = response[response.length - 1].displayName.toLowerCase()
                setStartProductName(newStartProductName)
            }
        } catch (error) {
            //poner toast
            console.log(`error: ${error} `);
            setIsLoading(false)
            setIsLoading(false)
        }
    }

    return (
        <View style={styles.view}>
            <ProductsList
                products={products}
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