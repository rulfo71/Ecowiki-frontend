import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import * as firebase from 'firebase'

import { Constants } from '../../Common/Constants/Constants'


export default function ChangeDisplayNameForm(props) {

    const { displayName, setShowModal, toastRef, setReloadUserInfo } = props
    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = () => {
        if (!newDisplayName) {
            setError('El nombre no puede estar vacío')
        }
        else if (displayName == newDisplayName) {
            setError('El nombre no puede ser igual al actual')
        }
        else {
            setIsLoading(true)
            const update = {
                displayName: newDisplayName
            }
            firebase
                .auth()
                .currentUser.updateProfile(update)
                .then(() => {
                    setIsLoading(false)
                    setReloadUserInfo(true)
                    setShowModal(false)
                })
                .catch((error) => {
                    setError('Error al actualizar el nombre')
                    setIsLoading(false)
                })
        }
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder='Nombre y Apellido'
                containerStyle={styles.input}
                rightIcon={{
                    type: 'material-community',
                    name: 'account-circle-outline',
                    color: Constants.Colors.brandGreenColor
                }}
                defaultValue={displayName && displayName}
                onChange={e => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button
                title='Cambiar apodo'
                // iconRight
                // icon={<Icon
                //     type='material-community'
                //     name='save'
                // />}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
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
        width: '95%',
    },
    btn: {
        borderRadius: 20,
        backgroundColor: Constants.Colors.brandGreenColor
    }

})