import React, { useState } from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { Input, Icon, Button, Text } from 'react-native-elements'
import { Constants } from '../../Common/Constants/Constants';
import { validateEmail } from '../../utils/validations'
import { size, isEmpty } from 'lodash'
import * as firebase from 'firebase'
import { useNavigation } from '@react-navigation/native'

import Spinner from "react-native-loading-spinner-overlay";
import AddUserDto from '../../Dtos/Users/AddUserDto';
import { addUser } from '../../Repositories/UsersRepository';
import AddUserResponse from '../../Dtos/Users/AddUserResponse';



export default function RegisterForm(props) {
    const { toastRef } = props

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);
    const [isEnabledSwitch, setIsEnabledSwitch] = useState(true);

    const navigation = useNavigation();

    const onSubmit = async () => {
        if (
            isEmpty(formData.email) ||
            isEmpty(formData.password) ||
            isEmpty(formData.repeatPassword) ||
            isEmpty(formData.nickname)) {
            toastRef.current.show('Todos los campos son obligatorios')
        }
        else if (!validateEmail(formData.email.trim())) {
            toastRef.current.show('El email no es valido')
        }
        else if (formData.password !== formData.repeatPassword) {
            toastRef.current.show('Las contraseñas no coinciden')
        }
        else {

            //TODO: EMPROLIJAR ESTO. lo deberia hacer todo el back
            setLoading(true);
            let addUserDto = new AddUserDto()
            addUserDto.nickname = formData.nickname
            addUserDto.email = formData.email
            addUserDto.password = formData.password
            addUserDto.showContributions = isEnabledSwitch

            try {
                const response: AddUserResponse = await addUser(addUserDto)

                console.log(`response de addUser: ${JSON.stringify(response)}`);

                if (!isEmpty(response.userId)) {
                    await firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
                    setLoading(false);
                    navigation.navigate(Constants.Navigations.AccountStack.account);
                }
                else if (!isEmpty(response.error.code)) {
                    setLoading(false);
                    const errorMessage = getErrorMessage(response.error)
                    toastRef.current.show(errorMessage)
                }
                else {
                    setLoading(false);
                    toastRef.current.show('Ups.. Hubo un error, intentá de nuevo')
                }

            } catch (error) {
                setLoading(false);
                console.log(error);
                toastRef.current.show('Ups.. Hubo un error, intentá de nuevo')
            }
        }
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const toggleSwitch = () => setIsEnabledSwitch(previousState => !previousState);

    return (
        <View style={styles.formContainer} >
            <Input
                placeholder='¿Cómo te gusta que te digan?'
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, 'nickname')}
                rightIcon={
                    <Icon
                        type='material-community'
                        name='account'
                        color={Constants.Colors.brandGreenColor}
                    />
                }
            />
            <Input
                placeholder='Correo Electrónico'
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, 'email')}
                rightIcon={
                    <Icon
                        type='material-community'
                        name='at'
                        color={Constants.Colors.brandGreenColor}
                    />
                }
            />
            <Input
                placeholder='Contraseña'
                containerStyle={styles.inputForm}
                secureTextEntry={!showPassword}
                onChange={e => onChange(e, 'password')}
                rightIcon={
                    <Icon
                        type='material-community'
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        color={Constants.Colors.brandGreenColor}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder='Repetir contraseña'
                containerStyle={styles.inputForm}
                secureTextEntry={!showRepeatPassword}
                onChange={e => onChange(e, 'repeatPassword')}
                rightIcon={
                    <Icon
                        type='material-community'
                        name={showRepeatPassword ? 'eye-off-outline' : 'eye-outline'}
                        color={Constants.Colors.brandGreenColor}
                        onPress={() => setShowRepeatPassword(!showRepeatPassword)}

                    />
                }
            />
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
            <Button
                title='Unirme'
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={onSubmit}
            />
            <Spinner visible={loading} />
        </View>
    )
}


function getErrorMessage(error) {
    console.log(`entre a getEerrormessage con ${JSON.stringify(error)}`);
    let response = '';

    switch (error.code) {
        case 'auth/email-already-in-use':
        case 'auth/email-already-exists':
            console.log('email already in useee');
            response = 'Ups.. Ya tenemos un usuario registrado con ese mail!'
            break;
        case 'auth/weak-password':
        case 'auth/invalid-password':
            response = 'La contraseña tiene que tener al menos 6 caracteres'
            break;
        default:
            response = 'Upssss.. Hubo un error, intentá de nuevo'
            break;
    }
    return response
}

function defaultFormValue() {
    return {
        nickname: '',
        email: '',
        password: '',
        repeatPassword: ''
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    inputForm: {
        width: '100%',
        marginTop: 20,
    },
    btnContainerRegister: {
        marginTop: 20,
        width: '95%'
    },
    btnRegister: {
        backgroundColor: Constants.Colors.brandGreenColor
    },
    iconRight: {
        color: '#c1c1c1'
    },
    viewSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        // margin: 20,
        width: '80%',
        height: 'auto'
    },
    switchText: {
        fontSize: 15,
        marginRight: 20
    }
})