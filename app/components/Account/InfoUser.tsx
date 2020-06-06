import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import * as firebase from 'firebase'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

import { Constants } from '../../Common/Constants/Constants';
import UploadImage from '../UploadImage'
import { isEmpty } from 'lodash'
import UpdateUserDto from '../../Dtos/Users/UpdateUserDto'
import { updateUser } from '../../Repositories/UsersRepository'

export default function InfoUser(props) {
    const {
        userInfo: { userId, photoUrl, displayName, email },
        toastRef,
        setLoading
    } = props;

    console.log(`InfoUser: photoURL: ${photoUrl} `);


    const [imageUri, setImageUri] = useState(photoUrl)
    const [imageChanged, setImageChanged] = useState(false)

    useEffect(() => {
        if (imageChanged) {
            uploadImage(imageUri).then(async () => {
                await updatePhotoUrl()
                setImageChanged(false)
            }).catch(() => {
                toastRef.current.show('Error al subir la imagen')
            })
        }

    }, [imageChanged])

    // const changeAvatar = async () => {
    //     const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //     const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;

    //     if (resultPermissionCamera === 'denied') {
    //         toastRef.current.show('No tenemos permisos. Podes cambiarlos desde la configuracion del telefono')
    //     }
    //     else {
    //         const result = await ImagePicker.launchImageLibraryAsync({
    //             allowsEditing: true,
    //             aspect: [4, 3]
    //         })
    //         if (result.cancelled) {
    //             //cerró la selección de imagenes
    //         }
    //         else {
    //             uploadImage(result.uri).then(() => {
    //                 updatePhotoUrl()
    //             }).catch(() => {
    //                 toastRef.current.show('Error al subir la imagen')
    //             })
    //         }
    //     }
    // }
    const uploadImage = async (uri) => {

        setLoading(true)
        const response = await fetch(uri);
        const blob = await response.blob();
        // var uid = firebase.auth().currentUser.uid
        const ref = firebase.storage().ref().child(`avatar/${userId}`)
        return ref.put(blob);
    }

    const updatePhotoUrl = async () => {

        firebase
            .storage()
            .ref(`avatar/${userId}`)
            .getDownloadURL()
            .then(async (photoUrl) => {
                console.log('photoUrl: ', photoUrl);
                var updateUserDto = new UpdateUserDto()
                updateUserDto.userId = userId
                updateUserDto.fieldToUpdate = Constants.User.fields.photoUrl
                updateUserDto.newValue = photoUrl
                await updateUser(updateUserDto)
                setLoading(false);
            })
            .catch(() => {
                toastRef.current.show('Error al cargar la imagen')
            })
    }


    return (
        <View style={styles.viewUserInfo}>
            <UploadImage toastRef={toastRef} imageUri={imageUri} setImageUri={setImageUri} setImageChanged={setImageChanged} />
            <View>
                <Text style={styles.displayName}>
                    {displayName ? displayName : ''}
                </Text>
                <Text>
                    {email ? email : ''}
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