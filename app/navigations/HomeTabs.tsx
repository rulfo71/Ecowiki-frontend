import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Constants } from '../Common/Constants/Constants';
import AccountStack from './AccountStack';
import SearchProductStack from './SearchProductStack';
import SearchProduct from '../screens/SearchProduct/SearchProduct';
import { Icon } from 'react-native-elements';
import Account from '../screens/Account/Account';


const Tab = createBottomTabNavigator();

export default function HomeTabs() {
    return (
        <Tab.Navigator
            initialRouteName='scan'
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
                component={Account}
                options={{ title: 'Account' }}
            />
            <Tab.Screen
                name='scan'
                component={SearchProduct}
                options={{ title: 'Scan' }} />
        </Tab.Navigator>
    );
}

function screenOptions(route, color) {
    let iconName;

    switch (route.name) {
        case 'account':
            iconName = 'account'
            break;
        case 'scan':
            iconName = 'magnify'
            break;
        default:
            break;
    }
    return (
        <Icon type='material-community' name={iconName} size={22} color={color} />
    )
}