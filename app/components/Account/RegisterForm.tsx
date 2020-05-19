import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native'; 
import { Input, Icon, Button } from 'react-native-elements'
import { Constants } from '../../Common/Constants/Constants';
import { validateEmail } from '../../utils/validations'
import {size, isEmpty} from 'lodash'
import * as firebase from 'firebase'  
import { useNavigation } from '@react-navigation/native'    

import Spinner from "react-native-loading-spinner-overlay";



export default function RegisterForm (props) {
    const {toastRef} = props

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();


    const onSubmit = () => {
        if (
            isEmpty(formData.email) || 
            isEmpty(formData.password) || 
            isEmpty(formData.repeatPassword))
            {
                toastRef.current.show('Todos los campos son obligatorios')
                //console.log('Hay campos vacios');
            }
        else if (!validateEmail(formData.email)) {
            toastRef.current.show('El email no es correcto')
        } 
        else if (formData.password !== formData.repeatPassword){
            toastRef.current.show('Las contraseñas tienen que ser iguales')
        }
        // else if (size(formData.password) < Constants.Account.minimumCharactersPassword){
        //     toastRef.current.show('La contraseña debe tener al menos 6 caracteres')
        // }
        else{
            setLoading(true);
            firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email,formData.password)
            .then (response => {
                setLoading(false); 
                navigation.navigate(Constants.Navigations.AccountStack.account);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);                
                const errorMessage = getErrorMessage(error)
                toastRef.current.show(errorMessage)
            });
        }
    }  


    const onChange = (e, type) => {
        setFormData({ ...formData,  [type]: e.nativeEvent.text  })
    }

    return (
        <View style={styles.formContainer} >
            <Input
                placeholder='Correo Electrónico'
                containerStyle={styles.inputForm}
                onChange={e => onChange(e,'email')}
                rightIcon={
                    <Icon
                        type='material-community'
                        name='at'
                        color= {Constants.Colors.brandGreenColor}
                    />
                }
            />
            <Input
                placeholder='Contraseña'
                containerStyle={styles.inputForm}
                secureTextEntry={!showPassword}
                onChange={e => onChange(e,'password')}
                rightIcon={
                    <Icon
                        type='material-community'
                        name= {showPassword ? 'eye-off-outline' : 'eye-outline' }  
                        color= {Constants.Colors.brandGreenColor}
                        onPress={()=> setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder='Repetir contraseña'
                containerStyle={styles.inputForm}
                secureTextEntry={!showRepeatPassword}
                onChange={e => onChange(e,'repeatPassword')}
                rightIcon={
                    <Icon
                        type='material-community'
                        name= {showRepeatPassword ? 'eye-off-outline' : 'eye-outline' }  
                        color= {Constants.Colors.brandGreenColor}
                        onPress={()=> setShowRepeatPassword(!showRepeatPassword)}

                    />
                }
            />
            <Button
                title='Unirse'
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={onSubmit}
            />    
            <Spinner visible={loading} />
        </View>
    )
}


function getErrorMessage (error) {

    let response = '';

    console.log(error);
    console.log(error.code);
    // console.log(error.code instanceof string);
    console.log(error.message);
    

    switch (error.code) {
        case 'auth/email-already-in-use':
            response = 'Ups. Ya tenemos un usuario registrado con ese mail!'
            break;
        case 'auth/weak-password':
            response = 'La contraseña tiene que tener al menos 6 caracteres'
            break;
        default:
            response = 'Ups.. Hubo un error, intentá de nuevo'
            break;
    }
    return response

}

function defaultFormValue(){
    return {
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
    }
})