import React, { Component, useState, useEffect } from 'react'
import { TouchableHighlight, Image, Text} from 'react-native'
import { View, StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'
import { Constants } from '../../Common/Constants/Constants'

import MaterialModel from '../../Models/MaterialModel'

const defaultPicturesMap = {
	plastico: require('../../../assets/img/materials/plastico.png'),
	papelCarton: require('../../../assets/img/materials/papelCarton.png'),
	vidrio: require('../../../assets/img/materials/vidrio.png'),
	metalAluminio: require('../../../assets/img/materials/metalAluminio.png'),
	organico: require('../../../assets/img/materials/organico.png'),
	botellaDeAmor: require('../../../assets/img/materials/botellaDeAmor.jpg'),
	noSeRecicla: require('../../../assets/img/materials/noSeRecicla.png'),
}

export default function Material(props) {
	const { materialParam, navigation } = props

	const material: MaterialModel = materialParam

	const onPressCard = () => {
		// navigation.navigate(Constants.Navigations.ProductStack.clasify, material.name)
        navigation.navigate(Constants.Navigations.ProductStack.productsByMaterial,  material);
	}

	return (
        <View style={styles.view}>
            <TouchableHighlight
                activeOpacity={0.5}
                underlayColor='#e5e5e5'
                onPress={onPressCard}
            >
                <Card
                    // title={material.name}
                    // titleStyle={styles.title}
                    containerStyle={styles.container}>
                    <View style={styles.innerCard}>
                        <Image
                        style={styles.image}
                        source={defaultPicturesMap[material.name]}/>
                        <Text style={styles.title}>{material.displayName} </Text>
                    </View>

                </Card>
            </TouchableHighlight>
        </View>
	)
}

const styles = StyleSheet.create({
	title: {
		letterSpacing: 1.2,
		fontSize: 20,
        textAlign: 'center',
	},
	container: {
		borderRadius: 20,
        height: 200,
	},
    view: {
        flex: 0.5,
    },
    image: {
        width: 100,
        height: 100,
		borderRadius: 100,
	},
    innerCard: {
        alignItems: 'center',
    }
})
