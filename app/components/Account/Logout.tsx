import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button, Icon, Text, colors } from 'react-native-elements'
import * as firebase from 'firebase'

import { Constants } from '../../Common/Constants/Constants'

// TODO: Pasarlo al modal nuevo que hice confirmationModal
export default function Logout(props) {

    const { setShowModal } = props
    return (
        <View style={styles.view}>
            <Text style={styles.text}> ¿ Seguro querés cerrar sesión ? </Text>
            <Button
                title='No, quedarme logueado'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnNo}
                onPress={() => setShowModal(false)}
            />
            <Button
                title='Si, cerrar sesión'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnSi}
                onPress={async () => await firebase.auth().signOut()}
                titleStyle={styles.titleButtonLogout}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        marginTop: 20,
        width: '100%',
    },
    btnNo: {
        backgroundColor: Constants.Colors.brandGreenColor,
        borderRadius: 20,
    },
    btnSi: {
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        // paddingBottom: 5,
    },
    titleButtonLogout: {
        color: 'black'
    }

})