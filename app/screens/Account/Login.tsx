import React, { useRef } from 'react'
import { StyleSheet, ScrollView, Image, View, Text } from 'react-native'
import { Divider } from 'react-native-elements'
import { Constants } from '../../Common/Constants/Constants'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useNavigation } from '@react-navigation/native'

import LoginForm from '../../components/Account/LoginForm'
import Toast from 'react-native-easy-toast'

export default function Login(props) {
    const { redirectTo } = props

    const toastRef = useRef();
    const navigation = useNavigation();

    return (
        <ScrollView>
            <Image
                source={require('../../../assets/icon.png')}
                resizeMode='contain'
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <LoginForm toastRef={toastRef} redirectTo={redirectTo} />
                <ForgotPassword toastRef={toastRef} navigation={navigation} />
                <CreateAccount navigation={navigation} />
            </View>
            <Divider style={styles.divider} />
            <Toast ref={toastRef} position='center' opacity={0.9} />
        </ScrollView>
    )
}

function ForgotPassword(props) {

    const { navigation, toastRef } = props

    return (
        <Text style={styles.textRegister}>
            ¿Olvidaste tu contraseña? {' '}
            <Text
                style={styles.btnRegister}
                onPress={() => navigation.navigate(Constants.Navigations.AccountStack.recoverPassword)}
            >
                Recuperala acá
            </Text>
        </Text>
    )
}

function CreateAccount(props) {

    const { navigation } = props

    return (
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