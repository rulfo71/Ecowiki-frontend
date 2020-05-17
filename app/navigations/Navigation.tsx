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
import HomeTabs from './HomeTabs';
import Register from '../screens/Account/Register';


// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='home' component={HomeTabs}
                    options={{
                        title: '',
                        headerTransparent: true
                    }}
                />
                <Stack.Screen
                    name={Constants.Navigations.SearchProductStack.productInfo}
                    component={ProductInfo}
                    options={{
                        title: '',
                        headerTransparent: true,
                        headerTintColor: 'white'
                    }}
                />
                <Stack.Screen
                    name={Constants.Navigations.AccountStack.login}
                    component={AccountStack}
                    options={{
                        title: '',
                        headerTransparent: true,
                        headerTintColor: 'white'
                        // headerShown: false, 
                        // headerBackTitleVisible: true,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
