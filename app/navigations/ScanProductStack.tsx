import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ScanProduct from '../screens/ScanProduct/ScanProduct';

const Stack = createStackNavigator();

export default function ScanProductStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="scan-product"
                component={ScanProduct}
                options={{ title: 'Scan Product' }}
            />
        </Stack.Navigator>
    )
} 