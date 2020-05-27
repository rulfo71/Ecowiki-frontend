import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Alert, Image, TouchableHighlight } from 'react-native';
import { isEmpty } from 'lodash';
import { Icon, Avatar } from 'react-native-elements';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import ImageView from 'react-native-image-view';

import Modal from './Modal';
import CameraOrGallery from './CameraOrGallery';
import { Constants } from '../Common/Constants/Constants';
import ConfirmModal from './ConfirmModal';

export default function UploadImage(props) {
    const { toastRef, imageUri, setImageUri } = props

    const [showModalCameraOrGallery, setShowModalCameraOrGallery] = useState(false)
    const [photoSource, setPhotoSource] = useState('')
    const [photoSourceUpdate, setPhotoSourceUpdate] = useState(false)
    const [confirmModalResponse, setConfirmModalresponse] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)    
    const [imageViewVisible, setImageViewVisible] = useState(false)

    useEffect(() => {
        if (photoSourceUpdate){
            if (!isEmpty(photoSource)) {
                if (photoSource == 'camera') {
                    uploadFromCamera()
                }
                else if (photoSource == 'gallery') {
                    uploadFromGallery()
                }
            }
            setPhotoSource('')
            setPhotoSourceUpdate(false)
        }
        if (confirmModalResponse){
            setShowModalCameraOrGallery(true)
            setShowConfirmModal(false)
            setConfirmModalresponse(false)
        }
        else {
            setShowConfirmModal(false)
            setConfirmModalresponse(false)
        }
    }, [photoSourceUpdate, confirmModalResponse])

    const uploadFromCamera = async () => {
        const resultCameraPermissions = await Permissions.askAsync(Permissions.CAMERA)

        if (resultCameraPermissions.status == 'denied') {
            toastRef.current.show('Negaste los permisos para la camara. Para aceptarlos, tenés que ir a ajustes del telefono')
        }
        else {
            const result = await ImagePicker.launchCameraAsync({
                // allowsEditing: true,
                // aspect: [4, 3]
            })
            if (result.cancelled) {
                toastRef.current.show('No sacaste ninguna foto', 2000)
            }
            else {
                setImageUri(result.uri)
            }
        }
    }
    const uploadFromGallery = async () => {
        const resultGalleryPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (resultGalleryPermissions.status == 'denied') {
            toastRef.current.show('Negaste los permisos a la galería. Para aceptarlos, tenés que ir a ajustes del telefono')
        }
        else {
            const result = await ImagePicker.launchImageLibraryAsync({
            })
            if (result.cancelled) {
                toastRef.current.show('No elegiste ninguna foto', 2000)
            }
            else {
                setImageUri(result.uri)
            }
        }
    }

    return (
        <View style={styles.viewImage}>
            {isEmpty(imageUri) ?
                <Icon
                    type='material-community'
                    name='camera'
                    color='#7a7a7a'
                    containerStyle={styles.containerIcon}
                    onPress={() => setShowModalCameraOrGallery(true)}
                /> :
                <TouchableHighlight onPress = {() => {setImageViewVisible(true)}}>
                    <Image
                        source={{uri: imageUri}}
                        style={styles.image}                    
                        // containerStyle={styles.imageContainer}
                    />
                </TouchableHighlight>
                // <Avatar
                //     rounded={true}
                //     style={styles.avatarImage}
                //     size='xlarge'
                //     showEditButton
                //     editButton={{
                //         name: 'mode-edit',
                //         type: 'material',
                //         size: 10,
                //         color: Constants.Colors.brandGreenColor,
                //         reverseColor: 'white',
                //         reverse: true
                //     }}
                //     source={{ uri: imageUri }}
                //     onEditPress={() => setShowModalCameraOrGallery(true)}
                //     onPress={ () => setShowConfirmModal(true)}
                // />
            } 
            <ImageView
                images={[{
                    source: {
                        uri: imageUri,
                    },
                    title: '',
                    width: 806,
                    height: 720,
                }]}
                // imageIndex={0}
                isVisible={imageViewVisible}
                onClose={() => setImageViewVisible(false)}
                // renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
            />
            <Modal isVisible={showModalCameraOrGallery} setIsVisible={setShowModalCameraOrGallery}>
                <CameraOrGallery
                    showModal={showModalCameraOrGallery}
                    setShowModal={setShowModalCameraOrGallery}
                    setPhotoSource={setPhotoSource}
                    setPhotoSourceUpdate={setPhotoSourceUpdate} />
            </Modal>
            <ConfirmModal
                showModal= {showConfirmModal}
                setShowModal = {setShowConfirmModal}
                questionText = {' ¿ Seguro querés eliminar la imagen ?'}
                confirmText = {'Si'}
                cancelText = {'No'}           
                setResponse = {setConfirmModalresponse}                 
            />
        </View>
    )
}
const styles = StyleSheet.create({
    viewImage: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 30,
    },
    containerIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        height: 120,
        width: 120,
        backgroundColor: '#e3e3e3',
        borderRadius: 50,
    },
    avatarImage: {
        width: 110,
        height: 110,
        marginRight: 10,
        borderTopLeftRadius: 20,
        borderTopEndRadius: 20,
    },
    image: {
        width: 110,
        height: 110,
        // marginRight: 10,        
        borderRadius: 50,
        borderWidth: 3,
        // borderTopLeftRadius: 20,
        // borderTopEndRadius: 20,
    },
    // imageContainer: {
    //     borderRadius: 100,
    // }

})
