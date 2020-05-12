import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../screens/Account/Account';
import Login from '../screens/Account/Login'
import { Constants } from '../Common/Constants/Constants';
import Register from '../screens/Account/Register';

const Stack = createStackNavigator();

export default function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= {Constants.Navigations.AccountStack.account}
                component={Account}
                options={{ title: 'Account' }}
            />
            <Stack.Screen
                name={Constants.Navigations.AccountStack.login}
                component={Login}
                options={{ title: 'Iniciar sesión' }}
            />
            <Stack.Screen
                name={Constants.Navigations.AccountStack.register}
                component={Register}
                options={{ title: 'Registrarme' }}
            />
        </Stack.Navigator>
    )   
} 