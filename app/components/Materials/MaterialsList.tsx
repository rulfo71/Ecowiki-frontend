import React, { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay'
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions, FlatList, ActivityIndicator, TouchableHighlight } from 'react-native';

import Material from './Material';
import { getMaterials as getMaterialsRepository} from '../../Repositories/MaterialsRepository';

export default function MaterialsList(props) {

    const {navigation} = props

    const [isLoading, setIsLoading] = useState(null)
    const [materials, setMaterials] = useState([])
    
    useEffect(() => {
        (async () => {
            await getMaterials()
        })()
    }, [])

    const getMaterials = async () => {
        try {
            // var getEcotipsDto = new GetMaterialsDto()
            setIsLoading(true)
            var materialsDB = await getMaterialsRepository()
            setIsLoading(false)
            // setMaterials(materials.concat({displayName: "Papel y Cartón", name: 'papelCarton'},{displayName: "Plástico", name: 'plastico'}, {displayName: "Metal y Aluminio", name: 'metalAluminio'}, {displayName: "Botella de amor", name: 'botellaDeAmor'}, {displayName: "Vidrio", name: 'vidrio'}, {displayName: "Orgánico", name: 'organico'}, {displayName: "No se Recicla", name: 'noSeRecicla'}))
            setMaterials(materials.concat(materialsDB))
        } catch (error) {
            //poner toast
            console.log(`error: ${error} `);
            setIsLoading(false)
            setIsLoading(false)
        }
    }

    if (isLoading)
    return (
        <View style={styles.container}>
            <Spinner visible={isLoading} />
        </View>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={materials}
                numColumns={2}
                renderItem={(material) => (<Material materialParam = {material.item} navigation={navigation}/> )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})