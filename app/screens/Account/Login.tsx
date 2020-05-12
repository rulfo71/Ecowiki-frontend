import React, { useRef } from 'react'
import { StyleSheet, ScrollView, Image, View, Text} from 'react-native'
import {Divider} from 'react-native-elements'
import { Constants } from '../../Common/Constants/Constants'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useNavigation } from '@react-navigation/native'

import LoginForm from '../../components/Account/LoginForm'
import Toast from 'react-native-easy-toast'

export default function Login() {
    const toastRef = useRef();

    return (
        <ScrollView>            
            <Image
                source={require('../../../assets/icon.png')}
                resizeMode='contain'
                style={styles.logo}
            />  
        <View style={styles.viewContainer}>
            <LoginForm toastRef = {toastRef}/> 
            <CreateAccount/>
        </View>
        <Divider style={styles.divider}/>
        <Toast ref={toastRef} position='center' opacity={0.9}/>
        </ScrollView>
    )
}

function CreateAccount () {

    const navigation = useNavigation(); 

    return( 
        <Text style={styles.textRegister}>
            ¿Todavía no tenés cuenta? {' '}
            <Text 
                style={styles.btnRegister}
                onPress={() => navigation.navigate(Constants.Navigations.AccountStack.register)}
            >
                Registrarme
            </Text> 
        </Text>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: 150,
        marginTop: 20,
    },
    viewContainer: {
        marginRight: 40,
        marginLeft: 40
    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },
    btnRegister: {
        color: Constants.Colors.brandGreenColor,
        fontWeight: 'bold', 
    },
    divider: {
        backgroundColor: Constants.Colors.brandGreenColor,
        margin: 40
    }
});