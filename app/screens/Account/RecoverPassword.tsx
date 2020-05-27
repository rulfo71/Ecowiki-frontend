import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native'
import Toast from 'react-native-easy-toast'
import * as firebase from 'firebase'
import Spinner from "react-native-loading-spinner-overlay";

import { Button, Text, Input, Icon } from 'react-native-elements';
import { Constants } from '../../Common/Constants/Constants';
import { isEmpty } from 'lodash';
import { validateEmail } from '../../utils/validations';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

export default function RecoverPassword() {

    const toastRef = useRef();
    const navigation = useNavigation();

    const [emailInput, setEmailInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, seterrorMessage] = useState('')    

    const onSubmit = () => {
        console.log(emailInput); 
        seterrorMessage('')

        if (isEmpty(emailInput)) {
            seterrorMessage('El mail no puede estar vacio')
        }
        else if (!validateEmail(emailInput)){
            seterrorMessage('Ingresaste un mail invalido')
        }
        else {         
            console.log('asi pues si');
            setLoading(true)
            firebase.auth().sendPasswordResetEmail(emailInput)
            .then(response => {
                setLoading(false)
                toastRef.current.show('Listo! Ya te enviamos un mail.',500,() => {navigation.navigate(Constants.Navigations.home)})
            })
            .catch((error) => {                
                setLoading(false)
                toastRef.current.show('Upss... hubo algun problema. Intentá de nuevo')
                console.log(`Error recuperar contraseña: ${error} con mail: ${emailInput}`)                
            })            
        }
    }


    return (
        <View style={styles.view}>
            <Input
                placeholder='Correo electrónico'
                containerStyle={styles.inputForm}
                onChange={e => setEmailInput(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        name='at'
                        type='material-community'
                        color={Constants.Colors.brandGreenColor}
                    />
                }
                errorMessage={errorMessage}
            />            
            <Button
                title='Enviar mail'
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={onSubmit}
            />
            <Spinner visible={loading} />
            <Toast ref={toastRef} position='center' opacity={0.8}/>
        </View> 
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 30,
    },
    btnContainerLogin: {
        marginTop: 20,
        width: '80%'
    },
    btnLogin: {
        backgroundColor: Constants.Colors.brandGreenColor,
        borderRadius: 10,
    },
    inputForm: {
        width: '90%',
        marginTop: 20,
    },
})