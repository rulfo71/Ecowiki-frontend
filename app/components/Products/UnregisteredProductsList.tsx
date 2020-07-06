import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import UnregisteredProduct from './UnregisteredProduct';

export default function UnregisteredProductsList(props) {
    const { toastRef, products, isLoading, navigation, handleLoadMore, isLoadingMore } = props

    // const [startProductName, setStartProductName] = useState('')
    // const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
    }, [])

    return (
        <View style={styles.container}>
            {products.length == 0 && isLoading !== false ? (
                <View>
                    <Text>No hay productos para agregar</Text>
                </View>
            ) : (
                    <FlatList
                        data={products}
                        renderItem={(product) => <UnregisteredProduct productParam={product.item} navigation={navigation} />}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReachedThreshold={0.2}
                        onEndReached={handleLoadMore}
                        ListFooterComponent={<FooterList isLoadingMore={isLoadingMore} />}
                    />
                )}
        </View>
    )
}

function FooterList(props) {
    const { isLoadingMore } = props
    if (isLoadingMore) {
        return (
            <View style={styles.loaderProducts} >
                <ActivityIndicator size='large' />
            </View>
        )
    }
    else {
        return (
            <View style={styles.notFoundProducts}>
                <Text>Gracias! No quedan mas productos</Text>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loaderProducts: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    notFoundProducts: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
    }

})