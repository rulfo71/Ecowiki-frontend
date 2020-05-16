import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Constants } from '../Common/Constants/Constants';
import SearchProduct from '../screens/SearchProduct/SearchProduct';
import ProductInfo from '../screens/SearchProduct/ProductInfo';

const Stack = createStackNavigator();

export default function SearchProductStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= {Constants.Navigations.SearchProductStack.searchProduct}
                component={SearchProduct}
                options={{ title: 'Scan Product' }}
            />
            <Stack.Screen
                name={Constants.Navigations.SearchProductStack.productInfo}
                component={ProductInfo}
                options={{ title: 'Product Info' }}
            />
        </Stack.Navigator>
    )   
} 