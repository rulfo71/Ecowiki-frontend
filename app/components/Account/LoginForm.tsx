import React, {useState} from 'react';
import {StyleSheet, View } from 'react-native'
import {Input, Icon, Button } from 'react-native-elements'
import {isEmpty} from 'lodash'
import * as firebase from 'firebase'  
import { useNavigation } from '@react-navigation/native'    

import { Constants } from '../../Common/Constants/Constants';
import { validateEmail } from '../../utils/validations';


export default function LoginForm (props) {
    const {toastRef} = props

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    
    const onSubmit = () => {
        if (
            isEmpty(formData.email) || isEmpty(formData.password))
            {
                toastRef.current.show('Todos los campos son obligatorios')
                //console.log('Hay campos vacios');
            }
        else if (!validateEmail(formData.email)) {
            toastRef.current.show('El email no es correcto')  
        } 
        else{
            setLoading(true);
            firebase
            .auth()
            .signInWithEmailAndPassword(formData.email, formData.password)
            .then (response => {
                setLoading(false); 
                navigation.navigate(Constants.Navigations.AccountStack.account);
            })
            .catch((error) => {
                setLoading(false);
                toastRef.current.show('La contraseña es incorrecta')
            });
        }
    }  

    const onChange = (e, type) => {
        setFormData({ ...formData,  [type]: e.nativeEvent.text  })
    }

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder='Correo Electrónico'
                containerStyle={styles.inputForm}
                onChange={e => onChange(e,'email')}
                rightIcon={
                    <Icon
                        type='material-community'
                        name='at'
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input
                placeholder='Contraseña'
                containerStyle={styles.inputForm}
                secureTextEntry={!showRepeatPassword}
                onChange={e => onChange(e,'password')}
                rightIcon={
                    <Icon
                        type='material-community'
                        name= {showRepeatPassword ? 'eye-off-outline' : 'eye-outline' }  
                        iconStyle={styles.iconRight}
                        onPress={()=> setShowRepeatPassword(!showRepeatPassword)}

                    />
                }
            />    
            <Button
                title='Iniciar sesión'
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={onSubmit}
            />        
        </View>
    )
}


function defaultFormValue(){
    return {
        email: '',
        password: '',
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
    btnContainerLogin: {
        marginTop: 20,
        width: '95%'
    },
    btnLogin: {
        backgroundColor: Constants.Colors.brandGreenColor
    },
    iconRight: {
        color: '#c1c1c1'
    },
})
