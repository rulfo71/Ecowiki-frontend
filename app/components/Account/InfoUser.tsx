import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import * as firebase from 'firebase'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

import { Constants } from '../../Common/Constants/Constants';

export default function InfoUser(props) {
    const {
        userInfo: { uid, photoURL, displayName, email },
        toastRef,
        setLoading
    } = props;

    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;

        if (resultPermissionCamera === 'denied') {
            toastRef.current.show('No tenemos permisos. Podes cambiarlos desde la configuracion del telefono')
        }
        else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            })
            if (result.cancelled) {
                //cerró la selección de imagenes
            }
            else {
                uploadImage(result.uri).then(() => {
                    updatePhotoUrl()
                }).catch(() => {
                    toastRef.current.show('Error al subir la imagen')
                })
            }
        }
    }
    const uploadImage = async (uri) => {

        setLoading(true)
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`avatar/${uid}`)
        return ref.put(blob);
    }

    const updatePhotoUrl = async () => {

        firebase
            .storage()
            .ref(`avatar/${uid}`)
            .getDownloadURL()
            .then(async (response) => {
                console.log('fotoUrl: ', response);
                const update = {
                    photoURL: response
                };
                await firebase.auth().currentUser.updateProfile(update)
                setLoading(false);
            })
            .catch(() => {
                toastRef.current.show('Error al cargar la imagen')
            })
    }


    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size='large'
                showEditButton
                editButton={{
                    name: 'mode-edit',
                    type: 'material',
                    size: 13,
                    color: Constants.Colors.brandGreenColor,
                    reverseColor: 'white',
                    reverse: true
                }}
                containerStyle={styles.userInfoAvatar}
                onEditPress={changeAvatar}
                onPress={changeAvatar}
                source={
                    photoURL
                        ? { uri: photoURL }
                        : require('../../../assets/img/avatar-default.jpg')
                }
            />
            <View>
                <Text style={styles.displayName}>
                    {displayName ? displayName : ''}
                </Text>
                <Text>
                    {email ? email : 'Social Login'}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: Constants.Colors.backgroundGrey,
        paddingTop: 40,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 20,
    },
    displayName: {
        fontWeight: 'bold',
        paddingBottom: 5,
    }

})