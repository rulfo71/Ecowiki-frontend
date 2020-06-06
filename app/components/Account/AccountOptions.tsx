import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Switch } from 'react-native'
import { Text } from 'react-native-elements'
import { ListItem } from 'react-native-elements'
import { map } from 'lodash';
import * as Linking from 'expo-linking';

import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm'
import ChangePasswordForm from './ChangePasswordForm'
import { Constants } from '../../Common/Constants/Constants'
import * as firebase from 'firebase';
import Logout from './Logout';
import CameraOrGallery from '../CameraOrGallery';
import UpdateUserDto from '../../Dtos/Users/UpdateUserDto';
import { getWhatsappLink, updateUser } from '../../Repositories/UsersRepository';

export default function AccountOptions(props) {

    const { userInfo, toastRef, setReloadUserInfo, userDb, setLoading } = props
    const [showModal, setShowModal] = useState(true);
    const [isEnabledSwitch, setIsEnabledSwitch] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)

    useEffect(() => {
        if (userInfo) {
            setIsEnabledSwitch(userInfo.showContributions)
        }
    }, [userInfo])

    const selectedComponent = async (key) => {
        switch (key) {
            case 'displayName':
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo={setReloadUserInfo}
                    />
                )
                setShowModal(true)
                break;
            case 'password':
                setRenderComponent(
                    <ChangePasswordForm
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                    />
                )
                setShowModal(true)
                break;
            case 'whatsapp':
                setLoading(true)
                var whatsappLinkResponse = await getWhatsappLink();
                setLoading(false)
                var response = await Linking.openURL(whatsappLinkResponse.url);
                console.log(`response: ${response}`);
                break;
            case 'logout':
                setRenderComponent(
                    <Logout
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                    />
                )
                setShowModal(true)
                break;
            default:
                setRenderComponent(null)
                setShowModal(false)
                break;
        }
    }

    const menuOptions = generateOptions(selectedComponent);
    const toggleSwitch = async () => {
        //por alguna extraña razon el isEnabledSwitch funciona al reves. yafu
        setIsEnabledSwitch(previousState => !previousState);
        const user = firebase.auth().currentUser
        if (user) {
            let updateUserDto = new UpdateUserDto();
            updateUserDto.userId = firebase.auth().currentUser.uid
            updateUserDto.fieldToUpdate = Constants.User.fields.showContributions
            updateUserDto.newValue = !isEnabledSwitch
            setLoading(true)
            try {
                await updateUser(updateUserDto);
                setLoading(false)
                setReloadUserInfo(true)

            } catch (error) {
                toastRef.current.show('No pudimos actualizar tu perfil. Intentá de nuevo')
                setIsEnabledSwitch(previousState => !previousState)
                setLoading(false)
            }
        }
    }


    return (
        <View>
            {map(menuOptions, (menu, index) => (
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColor
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight
                    }}
                    containerStyle={styles.menuItem}
                    onPress={menu.onPress}
                    onLongPress={menu.onPress}
                />
            ))}
            <View style={styles.viewSwitch}>
                <Text style={styles.switchText}>Quiero que mis contribuciónes sean públicas</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#91cc93" }}
                    thumbColor={isEnabledSwitch ? Constants.Colors.brandGreenColor : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabledSwitch}
                />
            </View>
            {renderComponent && (
                <Modal isVisible={showModal} setIsVisible={setShowModal}>
                    {renderComponent}
                </Modal>
            )}
        </View>
    )

    function generateOptions(selectedComponent) {
        return [
            {
                title: "Cambiar apodo",
                iconType: 'material-community',
                iconNameLeft: 'account-circle',
                iconColor: Constants.Colors.brandGreenColor,
                iconNameRight: 'chevron-right',
                iconColorRight: Constants.Colors.brandGreenColor,
                onPress: () => selectedComponent('displayName')
            },
            {
                title: 'Cambiar contraseña',
                iconType: 'material-community',
                iconNameLeft: 'lock-reset',
                iconColor: Constants.Colors.brandGreenColor,
                iconNameRight: 'chevron-right',
                iconColorRight: Constants.Colors.brandGreenColor,
                onPress: () => selectedComponent('password')
            },
            {
                title: 'Contactanos por whatsapp',
                iconType: 'material-community',
                iconNameLeft: 'whatsapp',
                iconColor: Constants.Colors.brandGreenColor,
                iconNameRight: 'chevron-right',
                iconColorRight: Constants.Colors.brandGreenColor,
                onPress: () => selectedComponent('whatsapp')

            },
            {
                title: 'Cerrar sesión',
                iconType: 'material-community',
                iconNameLeft: 'logout',
                iconColor: Constants.Colors.brandGreenColor,
                iconNameRight: 'chevron-right',
                iconColorRight: Constants.Colors.brandGreenColor,
                onPress: () => selectedComponent('logout')
            },
        ]
    }
}

const styles = StyleSheet.create({
    menuItem: {
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        padding: 10,
        width: '90%',
        alignSelf: 'center'
    },
    viewSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        // width: '80%',
        height: 'auto'
    },
    switchText: {
        fontSize: 15,
        width: '80%'
        // marginRight: 20
    }
})