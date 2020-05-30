import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import { Constants } from '../Common/Constants/Constants';

export default function CameraOrGallery(props) {
    const { setShowModal, showModal, setPhotoSource, setPhotoSourceUpdate } = props


    const onSubmit = (selection: string) => {
        console.log(`selection: ${selection}`);
        console.log(showModal);
        setPhotoSource(selection)
        setPhotoSourceUpdate(true)
        setShowModal(false)
    }
    return (
        <View style={styles.view}>
            <Text style={styles.text}>¿ Desde donde queres agregar la imagen ? </Text>
            {/* <View style={styles.buttonView}> */}
            <Button
                title='Cámara'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => { onSubmit('camera') }}
            />
            <Button
                title='Galeria'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => { onSubmit('gallery') }}
            />
            {/* </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'column',
        // backgroundColor: '#c3c3c3'
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        marginTop: 20,
        width: '100%',
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