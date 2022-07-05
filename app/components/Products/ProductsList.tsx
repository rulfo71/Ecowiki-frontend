import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import Product from './Product';

export default function ProductsList(props) {
    const { toastRef, products, isLoading, navigation, handleLoadMore, isLoadingMore } = props

    useEffect(() => {
    }, [])

    return (
        <View style={styles.container}>
            {products.length == 0 && isLoading == false ? (
                <View>
                    <Text>No hay productos para este material</Text>
                </View>
            ) : (
                <ScrollView>
                    <FlatList
                        data={products}
                        renderItem={(product) => <Product productParam={product.item} navigation={navigation} />}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReachedThreshold={0.2}
                        onEndReached={handleLoadMore}
                        ListFooterComponent={<FooterList isLoadingMore={isLoadingMore} isLoading={isLoading} />}
                    />
                    </ScrollView>
                )}
        </View>
    )
}

function FooterList(props) {
    const { isLoadingMore, isLoading } = props
    if (isLoadingMore || isLoading) {
        return (
            <View style={styles.loaderProducts} >
                <ActivityIndicator size='large' />
            </View>
        )
    }
    else {
        return (
            <View style={styles.notFoundProducts}>
                <Text>No hay mas productos</Text>
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
    },
    text: {
        fontSize: 20,
        alignSelf: 'center',
        padding: 20,
        justifyContent: 'center',
        color: 'white'

    }
})