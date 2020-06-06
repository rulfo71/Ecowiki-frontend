import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import * as firebase from 'firebase'

import { Constants } from '../../Common/Constants/Constants'
import { validateEmail } from '../../utils/validations'
import { reauthenticate } from '../../utils/api'
import { updateUser } from '../../Repositories/UsersRepository'
import UpdateUserDto from '../../Dtos/Users/UpdateUserDto'


export default function ChangeEmailForm(props) {
    const { email, setShowModal, toastRef, setReloadUserInfo } = props
    const [formData, setFormData] = useState(defaultFormValue())
    const [showPassword, setshowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }

    const onSubmit = () => {
        if (!formData.email || email === formData.email) {
            setErrors({
                email: 'El email no ha cambiado'
            })
        }
        else if (!validateEmail(formData.email)) {
            setErrors({
                email: 'El email no es valido'
            })
        }
        else if (!formData.password) {
            setErrors({
                password: 'Tenes que poner tu contraseña'
            })
        }
        else {
            setIsLoading(true);
            reauthenticate(formData.password)
                .then(response => {

                    const user = firebase.auth().currentUser;
                    const updateUserDto = new UpdateUserDto()
                    updateUserDto.userId = user.uid
                    updateUserDto.fieldToUpdate = Constants.User.fields.email
                    updateUserDto.newValue = formData.email
                    updateUser(updateUserDto)


                    // firebase.auth()
                    //     .currentUser.updateEmail(formData.email)
                    //     .then(() => {
                    //         setIsLoading(false)
                    //         setReloadUserInfo(true)
                    //         toastRef.current.show('Email actualizado correctamente')
                    //         setShowModal(false)
                    //     })
                    //     .catch(() => {
                    //         setErrors({ email: 'Error al actualizar el email' })
                    //         setIsLoading(false);
                    //     })
                })
                .catch((error) => {
                    setErrors({ password: 'La contraseña no es correcta' })
                    setIsLoading(false);
                })

        }


    }

    return (
        <View style={styles.view} >
            <Input
                placeholder='Correo electrónico'
                containerStyle={styles.input}
                defaultValue={email}
                rightIcon={{
                    type: 'material-community',
                    name: 'at',
                    color: '#c2c2c2'
                }}
                onChange={(e) => onChange(e, 'email')}
                errorMessage={errors.email}
            />
            <Input
                placeholder='Contraseña'
                secureTextEntry={!showPassword}
                rightIcon={{
                    type: 'material-community',
                    name: showPassword ? 'eye-off-outline' : 'eye-outline',
                    color: '#c2c2c2',
                    onPress: () => setshowPassword(!setshowPassword)
                }}
                onChange={(e) => onChange(e, 'password')}
                errorMessage={errors.password}
            />
            <Button
                title='Cambiar email'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    )
}

function defaultFormValue() {
    return {
        email: '',
        password: ''
    }
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
        width: '95%'
    },
    btn: {
        borderRadius: 20,
        backgroundColor: Constants.Colors.brandGreenColor
    },
})