import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Overlay, Text, Button } from 'react-native-elements'
import { Constants } from '../Common/Constants/Constants';


export default function ConfirmModal(props) {
    const { showModal, setShowModal, questionText, confirmText, cancelText, setResponse } = props

    const closeModal = () => setShowModal(false);
    const onSubmit = (selection: boolean) => {

        
        // setShowModal(false)

        console.log(`selection: ${selection}`);
        console.log(showModal);
        // setPhotoSource(selection)
        // setPhotoSourceUpdate(true)
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
        >
            <View style={styles.view}>
            <Text style={styles.text}>{questionText} </Text>
            <View style={styles.buttonView}>
                <Button
                    title= {cancelText}
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={() => { onSubmit(false) }}
                />
                <Button
                    title={confirmText}
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={() => { onSubmit(true) }}
                />
            </View>
        </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        height: 'auto',
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10
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
        marginRight: 20,
        marginLeft: 20,
        width: 80,
        // width: '30%',
    },
    btn: {
        backgroundColor: Constants.Colors.brandGreenColor,
        borderRadius: 100,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // width: '80%'
    }
})