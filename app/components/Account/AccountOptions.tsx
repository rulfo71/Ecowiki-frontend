import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { map } from 'lodash';

import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm'
import ChangePasswordForm from './ChangePasswordForm'
import { Constants } from '../../Common/Constants/Constants'
import * as firebase from 'firebase';
import Logout from './Logout';
import CameraOrGallery from '../CameraOrGallery';

export default function AccountOptions(props) {

    const { userInfo, toastRef, setReloadUserInfo } = props
    const [showModal, setShowModal] = useState(true);

    const [renderComponent, setRenderComponent] = useState(null)


    const selectedComponent = (key) => {
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
            case 'email':
                setRenderComponent(
                    <ChangeEmailForm
                        email={userInfo.email}
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
                title: 'Cambiar correo electrónico',
                iconType: 'material-community',
                iconNameLeft: 'at',
                iconColor: Constants.Colors.brandGreenColor,
                iconNameRight: 'chevron-right',
                iconColorRight: Constants.Colors.brandGreenColor,
                onPress: () => selectedComponent('email')
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
    }
})