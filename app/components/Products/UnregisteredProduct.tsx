import React, { Component, useState, useEffect } from 'react'
import { TouchableHighlight, Image, ActivityIndicator } from 'react-native'
import { Text, View, StyleSheet, Alert } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { Icon } from 'react-native-elements'
import ImageView from 'react-native-image-view'

import { addVote, subtractVote } from '../../Repositories/ProductsRepository'
import ProductModel from '../../Models/ProductModel'
import { Constants } from '../../Common/Constants/Constants'
import { isEmpty } from 'lodash'
import ConfirmModal from '../ConfirmModal'
import { getUserById } from '../../Repositories/UsersRepository'
import { ScrollView } from 'react-native-gesture-handler'
import UnregisteredProductModel from '../../Models/UnregisteredProductModel'

export default function UnregisteredProduct(props) {
	const { productParam, navigation } = props

	const product: UnregisteredProductModel = productParam

	const [uriImageLogo, seturiImageLogo] = useState('')
	const [showAddProductModal, setShowAddProductModal] = useState(false)
	const [addProductModalResponse, setAddProductModalResponse] = useState(null)
	// const [showNameInHeader, setShowNameInHeader] = useState(true)
	const [loadingImage, setLoadingImage] = useState(false)
	const [imageViewVisible, setImageViewVisible] = useState(false)
	const [addedBy, setAddedBy] = useState(null)

	const Name = () => {
		// if (!showNameInHeader) {
		return (
			<>
				<Text style={styles.title}>{'NOMBRE'} </Text>
				<Text style={styles.data}> {product.name} </Text>
			</>
		)
		// }
		// return null;
	}

	const Picture = () => {
		if (!isEmpty(product.photoUrl)) {
			return (
				<TouchableHighlight
					activeOpacity={0.5}
					underlayColor='#e5e5e5'
					onPress={() => {
						setImageViewVisible(true)
					}}
				>
					<Image
						source={{ uri: product.photoUrl }}
						style={styles.image}
						onProgress={() => {
							;<ActivityIndicator color='#fff' />
						}}
					/>
				</TouchableHighlight>
			)
		}
		return null
	}

	const Barcode = () => {
		if (!isEmpty(product.barcode)) {
			return (
				<>
					<Text style={styles.title}>{'CÓDIGO DE BARRAS'} </Text>
					<Text style={styles.data}> {product.barcode} </Text>
				</>
			)
		} else return null
	}

	const Observations = () => {
		if (!isEmpty(product.observations)) {
			return (
				<>
					<Text style={styles.title}>{'OBSERVACIONES'} </Text>
					<Text style={styles.data}> {product.observations} </Text>
				</>
			)
		}
		return null
	}

	const onPress = () => {
		console.log(
			`me voy a ir para addProduct con la data: ${JSON.stringify(product)} `
		)
		navigation.navigate(Constants.Navigations.ProductStack.addProduct, product)
	}

	return (
		// <Text> product: {product.displayName}</Text>
		<TouchableHighlight
			activeOpacity={0.5}
			underlayColor='#e5e5e5'
			onPress={onPress}
		>
			<View style={styles.AllContainer}>
				<View style={styles.Container}>
					<Picture />
					<Name />
					<Barcode />
					<Observations />
					{/* <AddedBy /> */}
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	AllContainer: {
		flex: 1,
		// width: '100%',
		// height: '100%',
		// justifyContent: 'space-around',
		backgroundColor: Constants.Colors.backgroundGrey,
		margin: 20,
		padding: 20,
		borderRadius: 20,
		// borderWidth: 2,
		// borderRadius: 20,
	},
	Container: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	IconsAgreeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		alignContent: 'space-between',
	},
	iconAgreeContainer: {
		alignContent: 'center',
	},
	title: {
		paddingTop: 15,
		fontSize: 15,
		fontWeight: 'bold',
		letterSpacing: 1.2,
		opacity: 0.8,
		alignSelf: 'flex-start',
		color: 'black',
	},
	data: {
		fontSize: 15,
		marginTop: 10,
		width: '100%',
		padding: 10,
		fontWeight: 'bold',
		color: 'white',
		borderColor: Constants.Colors.brandGreenColor,
		backgroundColor: Constants.Colors.brandGreenColor,
		borderRadius: 10,
	},
	material: {
		fontSize: 20,
		paddingTop: 30,
		fontWeight: 'bold',
		alignItems: 'center',
	},
	name: {
		fontSize: 30,
		fontWeight: 'bold',
		alignItems: 'center',
		alignSelf: 'center',
		paddingTop: 10,
		paddingBottom: 10,
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 100,
		borderWidth: 3,
	},
	textThumbs: {
		fontSize: 15,
		alignSelf: 'center',
		fontWeight: 'bold',
	},
	touchableIcon: {
		marginTop: 20,
		// padding: 10,
		alignContent: 'center',
		width: 100,
	},
})
