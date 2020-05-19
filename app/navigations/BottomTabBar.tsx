import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Constants } from '../Common/Constants/Constants';
import AccountStack from './AccountStack';
import SearchProductStack from './SearchProductStack';
import SearchProduct from '../screens/SearchProduct/SearchProduct';
import { Icon } from 'react-native-elements';
import Account from '../screens/Account/Account';


const Tab = createBottomTabNavigator();

export default function BottomTabBar() {
    return (
        <Tab.Navigator
            initialRouteName={Constants.Navigations.AccountStack.account}
            tabBarOptions={{
                inactiveTintColor: Constants.Colors.grey,
                activeTintColor: Constants.Colors.brandGreenColor
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => screenOptions(route, color),
            })}
        >
            <Tab.Screen
                name={Constants.Navigations.AccountStack.account}
                component={AccountStack}
                options={{
                    title: 'Mi Cuenta',
                }}
            />
            <Tab.Screen
                name={Constants.Navigations.SearchProductStack.searchProduct}
                component={SearchProduct}
                options={{ title: 'Buscar' }} />
        </Tab.Navigator>
    );
}

function screenOptions(route, color) {
    let iconName;

    switch (route.name) {
        case Constants.Navigations.AccountStack.account:
            iconName = 'account'
            break;
        case Constants.Navigations.SearchProductStack.searchProduct:
            iconName = 'magnify'
            break;
        default:
            break;
    }
    return (
        <Icon type='material-community' name={iconName} size={22} color={color} />
    )
}