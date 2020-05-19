import React from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements'

import AccountStack from './AccountStack'

import Home from '../screens/Home';
import SearchProduct from '../screens/SearchProduct/SearchProduct';
import { Constants } from '../Common/Constants/Constants';
import SearchProductStack from './SearchProductStack';
import ProductInfo from '../screens/SearchProduct/ProductInfo';
import BottomTabBar from './BottomTabBar';
import Register from '../screens/Account/Register';
import Account from '../screens/Account/Account';

// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={Constants.Navigations.Home.home}
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: Constants.Colors.brandGreenColor,
                        borderBottomStartRadius: 20,
                        borderBottomEndRadius: 20,
                    },
                    headerTitleStyle: {
                        fontSize: 30,
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}
            >
                <Stack.Screen
                    name={Constants.Navigations.Home.home}
                    component={Home}
                    options={{
                        title: 'Hola! ',
                        // headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={Constants.Navigations.SearchProductStack.searchProduct}
                    component={SearchProduct}
                    options={{
                        // title: 'Escaneá el codigo de barras ',
                        // headerTitleAlign: 'center',
                        // headerStyle: {
                        //     backgroundColor: Constants.Colors.brandGreenColor,
                        //     borderBottomStartRadius: 20,
                        //     borderBottomEndRadius: 20,
                        // },
                        headerTransparent: true,
                        title: '',
                        // headerTitleStyle: {
                        //     fontSize: 30,
                        //     color: 'white'
                        // },
                        headerTintColor: Constants.Colors.brandGreenColor
                    }}
                />
                <Stack.Screen
                    name={Constants.Navigations.AccountStack.account}
                    component={Account}
                    options={{
                        title: 'Mi Cuenta'
                        // title: 'hola',
                        // headerTransparent: false,
                        // headerTintColor: 'white'
                        // headerShown: false, 
                        // headerBackTitleVisible: true,
                    }}
                />
                <Stack.Screen
                    name={Constants.Navigations.AccountStack.register}
                    component={Register}
                    options={{

                        title: 'Registrarme'
                        // title: 'hola',
                        // headerTransparent: false,
                        // headerTintColor: 'white'
                        // headerShown: false, 
                        // headerBackTitleVisible: true,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
