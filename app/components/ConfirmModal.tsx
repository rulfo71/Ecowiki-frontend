import React, { useState } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import { Overlay, Text, Button } from 'react-native-elements'
import { Constants } from '../Common/Constants/Constants';


export default function ConfirmModal(props) {
    const { showModal, setShowModal, questionText, secondaryQuestionText, confirmText, cancelText, setResponse } = props
    const closeModal = () => setShowModal(false);

    const onSubmit = (selection: boolean) => {
        setShowModal(false)
        setResponse(selection)
    }

    return (
        <Overlay
            isVisible={showModal}
            windowBackgroundColor='rgba(0,0,0,0.5)'
            overlayBackgroundColor='transparent'
            overlayStyle={styles.overlay}
            onBackdropPress={closeModal}
            animationType='slide'
        >
            <View style={styles.view}>
                <Text style={styles.text}>{questionText} </Text>
                {secondaryQuestionText && <Text style={styles.secondaryText}> {secondaryQuestionText} </Text>}
                <Button
                    title={confirmText}
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={() => { onSubmit(true) }}
                />
                <Button
                    title={cancelText}
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={() => { onSubmit(false) }}
                />
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        height: 'auto',
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // borderRadius: 10,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'column'
    },
    view: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        // backgroundColor: '#c3c3c3'
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        marginTop: 20,
        width: '100%',
        // marginRight: 20,
        // marginLeft: 20,
        // width: ,
        // width: '30%',
    },
    btn: {
        backgroundColor: Constants.Colors.brandGreenColor,
        borderRadius: 20,
        marginBottom: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 20,
    },
    secondaryText: {
        fontSize: 15,
        marginBottom: 20
    },
    buttonView: {
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        // width: '80%'
    }
})