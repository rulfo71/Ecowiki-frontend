import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import AccountStack from './AccountStack'

import Home from '../screens/Home';
import ScanProduct from '../screens/ScanProduct/ScanProduct';
import { Constants } from '../Common/Constants/Constants';


const Tab = createBottomTabNavigator();


export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='account'
                tabBarOptions={{
                    inactiveTintColor: Constants.Colors.grey,
                    activeTintColor: Constants.Colors.brandGreenColor
                }}
                screenOptions={({ route }) => ({
                    // tabBarIcon: ({ color }) => <Icon type='material-community' name='account' size={22} color='#808080' />
                    tabBarIcon: ({ color }) => screenOptions(route, color),
                })}
            >
                <Tab.Screen
                    name='account'
                    component={AccountStack}
                    options={{ title: 'Account' }}
                />
                <Tab.Screen
                    name='home'
                    component={Home}
                    options={{ title: 'Home' }}
                />
                {/* <Tab.Screen
                    name='scan'
                    component={ScanProduct}
                    options={{ title: 'Scan' }} /> */}
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function screenOptions(route, color) {
    let iconName;

    switch (route.name) {
        case 'account':
            iconName = 'account'
            break;
        default:
            break;
    }
    return (
        <Icon type='material-community' name={iconName} size={22} color={color} />
    )
}