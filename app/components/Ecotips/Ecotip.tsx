import React from 'react'
import { TouchableHighlight, Linking } from 'react-native'
import { Text, View, StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'

import { isEmpty } from 'lodash'
import EcotipModel from '../../Models/EcotipModel'

export default function Ecotip(props) {
	const { ecotipParam, navigation } = props

	const ecotip: EcotipModel = ecotipParam

	const Source = () => {
		if (isEmpty(ecotip.source)) {
			return null
		} else {
			return (
				<View style={styles.sourceView}>
					<Text style={styles.source}>Fuente: </Text>
					<Text style={styles.link} onPress={() => Linking.openURL(ecotip.url)}>
						{ecotip.source}
					</Text>
				</View>
			)
		}
	}

	const onPressCard = () => {
		if (isEmpty(ecotip.source)) {
			return
		} else {
			Linking.openURL(ecotip.url)
			return
		}
	}

	return (
		<TouchableHighlight
			activeOpacity={0.5}
			underlayColor='#e5e5e5'
			onPress={onPressCard}
		>
			<Card
				title='¿Sabías que...?'
				titleStyle={styles.title}
				containerStyle={styles.container}
			>
				<Text style={styles.tip}>{ecotip.tip}</Text>
				<Source />
			</Card>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	title: {
		fontStyle: 'italic',
		letterSpacing: 1.2,
		fontSize: 20,
	},
	container: {
		borderRadius: 20,
		margin: 20,
	},
	tip: {
		fontWeight: 'bold',
		fontSize: 15,
	},
	source: {
		fontSize: 15,
	},
	link: {
		fontSize: 15,
		color: 'blue',
	},
	sourceView: {
		paddingTop: 20,
		flexDirection: 'row',
	},
})
