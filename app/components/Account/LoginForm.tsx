import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { isEmpty } from 'lodash'
import * as firebase from 'firebase'
import { useNavigation } from '@react-navigation/native'

import { Constants } from '../../Common/Constants/Constants';
import { validateEmail } from '../../utils/validations';


export default function LoginForm(props) {
    const { toastRef, redirectTo } = props

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);

    console.log('************************');
    console.log(`redirectTo es: ${redirectTo}`);                        
    console.log('************************');

    const navigation = useNavigation();    

    const getTitle = (redirection: string) => {
        let title = ''
        switch (redirection) {
            
            case Constants.Navigations.AccountStack.account:
                title = Constants.Navigations.titles.AccountStack.account                
                break;
            case Constants.Navigations.ProductStack.clasify:
                title = Constants.Navigations.titles.ProductStack.clasify
                break;
            case Constants.Navigations.ProductStack.addNewProduct:
                title = Constants.Navigations.titles.ProductStack.addNewProduct
                break;
            case Constants.Navigations.ProductStack.voteProducts:
                title = Constants.Navigations.titles.ProductStack.voteProducts
                break;
            default:
                break;
        }
        return title;
    }


    const onSubmit = () => {
        if (
            isEmpty(formData.email) || isEmpty(formData.password)) {
            toastRef.current.show('Todos los campos son obligatorios')
            //console.log('Hay campos vacios');
        }
        else if (!validateEmail(formData.email)) {
            toastRef.current.show('El email no es correcto')
        }
        else {
            setLoading(true);
            firebase
                .auth()
                .signInWithEmailAndPassword(formData.email, formData.password)
                .then(response => {
                    setLoading(false);
                    console.log(`navigation: ${JSON.stringify(navigation)} ${navigation}`);
                    if (isEmpty(redirectTo)) {
                        navigation.navigate(Constants.Navigations.AccountStack.account)
                        const title = getTitle(Constants.Navigations.AccountStack.account)
                        navigation.setOptions({
                            title: title
                        })                        
                    }
                    else {                        
                        navigation.navigate(redirectTo)
                        const title = getTitle(redirectTo)
                        navigation.setOptions({
                            title: title
                        })                        
                    }
                    // navigation.goBack()
                    // navigation.goBack()
                    // navigation.navigate(Constants.Navigations.AccountStack.account);
                })
                .catch((error) => {
                    setLoading(false);
                    toastRef.current.show('La contraseña es incorrecta')
                });
        }
    }

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder='Correo electrónico'
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
            <Button
                title='Iniciar sesión'
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={onSubmit}
            />
        </View>
    )
}


function defaultFormValue() {
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
        backgroundColor: Constants.Colors.brandGreenColor,
        borderRadius: 10,
    },
    iconRight: {
        color: '#c1c1c1'
    },
})
